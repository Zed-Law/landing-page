/**
 * Migrate Squarespace (WordPress WXR) blog posts into Sanity.
 *
 * Reads a Squarespace XML export, extracts every published blog post
 * (title, slug, body, excerpt, publish date) and upserts it into Sanity.
 *
 * Idempotent: each post is written with a deterministic _id derived from its
 * slug and pushed with createOrReplace, so re-running never creates duplicates
 * (it overwrites the existing document with the latest content from the XML).
 *
 * Usage:
 *   cd studio
 *   SANITY_API_TOKEN=sk... node scripts/migrate-blog.mjs [path/to/export.xml]
 *
 * The XML path may be passed as the first argument or via the XML_PATH env var.
 * It defaults to the export currently in your Downloads folder.
 *
 * Only @sanity/client and jsdom are required (both already in the studio's
 * dependency tree). The HTML -> Portable Text conversion is done locally below.
 */

import {readFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'

import {createClient} from '@sanity/client'

import {getItems, getTag, htmlToPortableText, htmlToText, postId, toIso} from './wxr.mjs'

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
  console.error(
    'Missing SANITY_API_TOKEN env var.\n' +
      'Create a token in your Sanity project (Settings -> API -> Tokens) with Editor\n' +
      'permissions, then run:\n\n' +
      '  SANITY_API_TOKEN=sk... node scripts/migrate-blog.mjs\n',
  )
  process.exit(1)
}

const client = DRY_RUN
  ? null
  : createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: API_VERSION,
      token,
      useCdn: false,
    })

// --- Run --------------------------------------------------------------------

async function main() {
  console.log(`Reading export: ${XML_PATH}`)
  const xml = readFileSync(XML_PATH, 'utf8')

  const posts = getItems(xml)
    .filter(
      (item) =>
        getTag(item, 'wp:post_type') === 'post' && getTag(item, 'wp:status') === 'publish',
    )
    .map((item) => ({
      title: htmlToText(getTag(item, 'title')),
      slug: getTag(item, 'wp:post_name'),
      excerpt: htmlToText(getTag(item, 'excerpt:encoded')),
      publishedAt: toIso(getTag(item, 'wp:post_date_gmt'), getTag(item, 'pubDate')),
      body: htmlToPortableText(getTag(item, 'content:encoded') || ''),
    }))
    .filter((p) => p.title && p.slug)

  console.log(`Found ${posts.length} published post(s) to import.\n`)

  if (DRY_RUN) {
    const sample = posts[0]
    console.log('DRY RUN — no documents written. Sample (first post):')
    console.log(JSON.stringify({...sample, body: sample.body.slice(0, 6)}, null, 2))
    console.log(`\n(sample body shows first 6 of ${sample.body.length} blocks)`)
    console.log('\nTitles:')
    posts.forEach((p) => console.log(`  - ${p.title}  [${p.publishedAt}]`))
    return
  }

  let ok = 0
  const failed = []
  for (const post of posts) {
    const doc = {
      _id: postId(post.slug),
      _type: 'post',
      title: post.title,
      slug: {_type: 'slug', current: post.slug},
      excerpt: post.excerpt || undefined,
      publishedAt: post.publishedAt,
      body: post.body,
    }
    try {
      await client.createOrReplace(doc)
      ok += 1
      console.log(`  ✓ ${post.title}`)
    } catch (err) {
      failed.push({title: post.title, error: err.message})
      console.error(`  ✗ ${post.title} — ${err.message}`)
    }
  }

  console.log(`\nDone. ${ok}/${posts.length} upserted.`)
  if (failed.length) {
    console.log(`${failed.length} failed:`)
    failed.forEach((f) => console.log(`  - ${f.title}: ${f.error}`))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
