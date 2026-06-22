/**
 * Import Squarespace post images into Sanity.
 *
 * The first migration (migrate-blog.mjs) imported post *text* only and dropped
 * images. This script pulls the images from the same Squarespace (WXR) export,
 * downloads them from the Squarespace CDN, uploads them to Sanity's asset store,
 * and patches each published post so that:
 *
 *   - inline <img> in the body become Sanity image blocks at their original
 *     position (the body is rebuilt from the XML with asset references), and
 *   - the post's featured image (WXR _thumbnail_id -> attachment) becomes its
 *     `mainImage`.
 *
 * Why re-derive from the XML rather than "scan Sanity and swap URLs"? Because no
 * external image URLs were ever stored in Sanity — the XML is the only place the
 * image URLs and their positions/featured-mappings exist.
 *
 * Idempotent: Sanity content-addresses image assets (re-uploading the same bytes
 * returns the same asset, no duplicates), and posts are patched (set) with
 * deterministic output, so re-running converges to the same state.
 *
 * Usage:
 *   cd studio
 *   SANITY_API_TOKEN=sk... node scripts/migrate-images.mjs [path/to/export.xml]
 *   DRY_RUN=1 node scripts/migrate-images.mjs        # list work, no network/writes
 */

import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'

import {createClient} from '@sanity/client'
import {JSDOM} from 'jsdom'

import {getItems, getTag, htmlToPortableText, postId} from './wxr.mjs'

// --- Config -----------------------------------------------------------------

const PROJECT_ID = '6pehju2v'
const DATASET = 'production'
const API_VERSION = '2024-08-01'

const XML_PATH =
  process.argv[2] ||
  process.env.XML_PATH ||
  join(homedir(), 'Downloads', 'Squarespace-Wordpress-Export-06-22-2026.xml')

const DRY_RUN = !!process.env.DRY_RUN

const token = process.env.SANITY_API_TOKEN
if (!token && !DRY_RUN) {
  console.error('Missing SANITY_API_TOKEN env var. See migrate-blog for how to create one.')
  process.exit(1)
}

const client = DRY_RUN
  ? null
  : createClient({projectId: PROJECT_ID, dataset: DATASET, apiVersion: API_VERSION, token, useCdn: false})

// --- Image-specific WXR extraction ------------------------------------------

/** Map every attachment's wp:post_id -> its image URL (the <link> value). */
function buildAttachmentMap(items) {
  const map = new Map()
  for (const item of items) {
    if (getTag(item, 'wp:post_type') !== 'attachment') continue
    const id = getTag(item, 'wp:post_id')
    const url = getTag(item, 'link')
    if (id && url) map.set(id, url)
  }
  return map
}

/** The featured image id from the post's _thumbnail_id postmeta. */
function thumbnailId(item) {
  const m = item.match(/_thumbnail_id<\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]/s)
  return m ? m[1] : null
}

/** Inline <img> sources as the DOM (and the converter) see them: entity-decoded. */
function inlineSrcs(html) {
  const doc = new JSDOM(`<!doctype html><body>${html}</body>`).window.document
  return [...doc.querySelectorAll('img')].map((img) => img.getAttribute('src')).filter(Boolean)
}

// --- Download + upload ------------------------------------------------------

const assetCache = new Map() // url -> Sanity asset _id (also dedupes within a run)
let uploadedCount = 0

/**
 * Upload an image by source URL and return its Sanity asset _id.
 *
 * Idempotent across runs: we tag each asset with its origin URL (source.url) and
 * reuse an existing asset for that URL instead of re-uploading. We can't rely on
 * Sanity's content-hash dedup alone because the Squarespace CDN can return
 * slightly different bytes for the same URL on different requests (re-encoding),
 * which would otherwise create duplicate assets.
 */
async function uploadFromUrl(url) {
  if (assetCache.has(url)) return assetCache.get(url)

  const existing = await client.fetch(
    '*[_type=="sanity.imageAsset" && source.url==$url][0]._id',
    {url},
  )
  if (existing) {
    assetCache.set(url, existing)
    return existing
  }

  const res = await fetch(url, {redirect: 'follow'})
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.startsWith('image/')) {
    throw new Error(`not an image (content-type: ${contentType || 'unknown'})`)
  }
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = decodeURIComponent(url.split('/').pop().split('?')[0]) || 'image'
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
    source: {name: 'squarespace-import', id: url, url},
  })
  uploadedCount += 1
  assetCache.set(url, asset._id)
  return asset._id
}

function imageValue(assetId) {
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
}

// --- Run --------------------------------------------------------------------

async function main() {
  console.log(`Reading export: ${XML_PATH}`)
  const items = getItems(readFileSync(XML_PATH, 'utf8'))
  const attachments = buildAttachmentMap(items)

  const posts = items
    .filter(
      (item) => getTag(item, 'wp:post_type') === 'post' && getTag(item, 'wp:status') === 'publish',
    )
    .map((item) => {
      const slug = getTag(item, 'wp:post_name')
      const html = getTag(item, 'content:encoded') || ''
      const thumbId = thumbnailId(item)
      return {
        slug,
        id: slug ? postId(slug) : null,
        title: getTag(item, 'title'),
        html,
        featuredUrl: thumbId ? attachments.get(thumbId) || null : null,
        inlineUrls: inlineSrcs(html),
      }
    })
    .filter((p) => p.id)

  const totalInline = posts.reduce((n, p) => n + p.inlineUrls.length, 0)
  const withFeatured = posts.filter((p) => p.featuredUrl).length
  console.log(
    `${posts.length} published post(s): ${withFeatured} with a featured image, ${totalInline} inline image(s).\n`,
  )

  if (DRY_RUN) {
    console.log('DRY RUN — no downloads or writes.')
    for (const p of posts) {
      const bits = []
      if (p.featuredUrl) bits.push('featured')
      if (p.inlineUrls.length) bits.push(`${p.inlineUrls.length} inline`)
      console.log(`  - ${p.slug}: ${bits.join(' + ') || 'no images'}`)
    }
    return
  }

  let patched = 0
  const failures = []

  for (const post of posts) {
    const patch = {}

    // Featured image -> mainImage
    if (post.featuredUrl) {
      try {
        patch.mainImage = imageValue(await uploadFromUrl(post.featuredUrl))
      } catch (err) {
        failures.push(`${post.slug} featured: ${err.message}`)
      }
    }

    // Inline images -> rebuild body with image blocks in place
    if (post.inlineUrls.length) {
      for (const url of post.inlineUrls) {
        try {
          await uploadFromUrl(url)
        } catch (err) {
          failures.push(`${post.slug} inline: ${err.message}`)
        }
      }
      const body = htmlToPortableText(post.html, {
        imageResolver: (src) => assetCache.get(src) || null,
      })
      if (body.some((b) => b._type === 'image')) patch.body = body
    }

    if (Object.keys(patch).length === 0) continue

    try {
      await client.patch(post.id).set(patch).commit()
      patched += 1
      const what = [patch.mainImage && 'mainImage', patch.body && 'body'].filter(Boolean).join(' + ')
      console.log(`  ✓ ${post.title || post.slug} (${what})`)
    } catch (err) {
      failures.push(`${post.slug} patch: ${err.message}`)
      console.error(`  ✗ ${post.slug} — ${err.message}`)
    }
  }

  console.log(
    `\nDone. ${uploadedCount} new image(s) uploaded, ${patched} post(s) patched.`,
  )
  if (failures.length) {
    console.log(`\n${failures.length} issue(s):`)
    failures.forEach((f) => console.log(`  - ${f}`))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
