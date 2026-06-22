/**
 * Shared helpers for migrating a Squarespace (WordPress WXR) export into Sanity.
 *
 * The export is a WordPress WXR file. Post bodies and excerpts live inside CDATA,
 * so a real XML parser is overkill: <item> blocks never nest and CDATA can't
 * contain "</item>", which makes targeted extraction safe and dependency free.
 *
 * Used by migrate-blog.mjs (text import) and migrate-images.mjs (image import).
 */

import {createHash} from 'node:crypto'

import {JSDOM} from 'jsdom'

const decoderDom = new JSDOM('<!doctype html><body></body>')
const decoderEl = decoderDom.window.document.createElement('div')

/**
 * Decode HTML entities and strip tags, returning collapsed plain text.
 * Squarespace double-encodes entities in <title> (e.g. "&amp;nbsp;"), so decode
 * a second time when the first pass still leaves an entity behind.
 */
export function htmlToText(html) {
  if (!html) return ''
  decoderEl.innerHTML = html
  let text = decoderEl.textContent
  if (/&(?:[a-z]+|#\d+);/i.test(text)) {
    decoderEl.innerHTML = text
    text = decoderEl.textContent
  }
  return text.replace(/\s+/g, ' ').trim()
}

/** Pull the raw inner value of <tag>...</tag>, unwrapping a CDATA section. */
export function getTag(item, tag) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  if (!match) return null
  const cdata = match[1].match(/^\s*<!\[CDATA\[([\s\S]*)\]\]>\s*$/)
  return (cdata ? cdata[1] : match[1]).trim()
}

export function getItems(xml) {
  const items = []
  const re = /<item>([\s\S]*?)<\/item>/g
  let m
  while ((m = re.exec(xml)) !== null) items.push(m[1])
  return items
}

/**
 * Deterministic Sanity document _id from a slug. Sanity caps _id at 128 chars,
 * so for very long (sentence-style) slugs we truncate and append a short hash
 * of the full slug to keep it unique and stable across re-runs.
 */
export function postId(slug) {
  const id = `post-${slug}`
  if (id.length <= 128) return id
  const hash = createHash('sha1').update(slug).digest('hex').slice(0, 12)
  return `post-${slug.slice(0, 100)}-${hash}`
}

/** Convert a WXR datetime ("2024-09-03 10:13:00", treated as UTC) to ISO. */
export function toIso(gmt, pubDate) {
  let d = gmt ? new Date(`${gmt.replace(' ', 'T')}Z`) : null
  if (!d || Number.isNaN(d.getTime())) d = pubDate ? new Date(pubDate) : null
  return d && !Number.isNaN(d.getTime()) ? d.toISOString() : undefined
}

// --- HTML -> Portable Text --------------------------------------------------
// A focused serializer for the tags Squarespace actually emits in post bodies:
// headings, paragraphs, <pre><code> (which Squarespace uses for plain text),
// blockquotes, bullet/numbered lists, and the strong/em/link inline marks.
// Maps onto the studio's blockContent schema.
//
// Inline <img> are block-level in this export. By default they're skipped (they
// need to be uploaded as Sanity assets first); pass options.imageResolver — a
// function (src) => assetId | null — to turn them into image blocks referencing
// an already-uploaded asset.

const HEADING_STYLE = {h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h4', h6: 'h4'}
const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre'])

export function htmlToPortableText(html, {imageResolver} = {}) {
  const doc = new JSDOM(`<!doctype html><body>${html}</body>`).window.document
  const blocks = []
  let n = 0
  const key = () => `k${n++}`

  // Collect inline spans, accumulating active marks. Nested block/inline
  // wrappers (span, code, etc.) are treated as transparent; <ul>/<ol> are
  // skipped here and handled as their own blocks.
  function spansOf(node, marks, markDefs) {
    const spans = []
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        const text = child.textContent.replace(/\s+/g, ' ')
        if (text) spans.push({_type: 'span', _key: key(), text, marks: [...marks]})
        return
      }
      if (child.nodeType !== 1) return
      const tag = child.tagName.toLowerCase()
      if (tag === 'br') {
        spans.push({_type: 'span', _key: key(), text: '\n', marks: [...marks]})
      } else if (tag === 'strong' || tag === 'b') {
        spans.push(...spansOf(child, [...marks, 'strong'], markDefs))
      } else if (tag === 'em' || tag === 'i') {
        spans.push(...spansOf(child, [...marks, 'em'], markDefs))
      } else if (tag === 'a') {
        const href = child.getAttribute('href')
        if (href) {
          const k = key()
          markDefs.push({_key: k, _type: 'link', href})
          spans.push(...spansOf(child, [...marks, k], markDefs))
        } else {
          spans.push(...spansOf(child, marks, markDefs))
        }
      } else if (tag === 'ul' || tag === 'ol' || tag === 'img') {
        // handled elsewhere / skipped
      } else {
        spans.push(...spansOf(child, marks, markDefs))
      }
    })
    return spans
  }

  function makeBlock(el, style, listItem, level) {
    const markDefs = []
    const children = spansOf(el, [], markDefs)
    if (!children.some((s) => s.text.trim())) return null
    const block = {_type: 'block', _key: key(), style: style || 'normal', markDefs, children}
    if (listItem) {
      block.listItem = listItem
      block.level = level
    }
    return block
  }

  function processList(listEl, level) {
    const listItem = listEl.tagName.toLowerCase() === 'ol' ? 'number' : 'bullet'
    listEl.childNodes.forEach((li) => {
      if (li.nodeType !== 1 || li.tagName.toLowerCase() !== 'li') return
      const block = makeBlock(li, 'normal', listItem, level)
      if (block) blocks.push(block)
      li.childNodes.forEach((c) => {
        if (c.nodeType === 1 && (c.tagName.toLowerCase() === 'ul' || c.tagName.toLowerCase() === 'ol')) {
          processList(c, level + 1)
        }
      })
    })
  }

  function imageBlock(el) {
    if (!imageResolver) return // skipped: needs the image uploaded as an asset
    const assetId = imageResolver(el.getAttribute('src'))
    if (!assetId) return
    const block = {
      _type: 'image',
      _key: key(),
      asset: {_type: 'reference', _ref: assetId},
    }
    const alt = el.getAttribute('alt')
    if (alt) block.alt = alt
    blocks.push(block)
  }

  function walk(parent) {
    parent.childNodes.forEach((node) => {
      if (node.nodeType === 3) {
        const text = node.textContent.replace(/\s+/g, ' ').trim()
        if (text) blocks.push({_type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{_type: 'span', _key: key(), text, marks: []}]})
        return
      }
      if (node.nodeType !== 1) return
      const tag = node.tagName.toLowerCase()
      if (BLOCK_TAGS.has(tag)) {
        const block = makeBlock(node, HEADING_STYLE[tag] || (tag === 'blockquote' ? 'blockquote' : 'normal'))
        if (block) blocks.push(block)
      } else if (tag === 'ul' || tag === 'ol') {
        processList(node, 1)
      } else if (tag === 'img') {
        imageBlock(node)
      } else {
        walk(node) // div / article / section / figure / etc.
      }
    })
  }

  walk(doc.body)
  return blocks
}
