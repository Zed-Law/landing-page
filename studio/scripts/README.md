# Blog migration: Squarespace → Sanity

Imports a Squarespace (WordPress WXR) XML export into this Sanity project
(`6pehju2v` / `production`). Two scripts share `wxr.mjs` (WXR parsing + HTML →
Portable Text conversion):

- **`migrate-blog.mjs`** — post text. For each `post_type=post` with
  `status=publish`: **title, slug, body (HTML → Portable Text), excerpt,
  publishedAt**.
- **`migrate-images.mjs`** — post images. Downloads each post's inline `<img>`
  and featured image (`_thumbnail_id`) from the Squarespace CDN, uploads them to
  Sanity's asset store, then patches each post: inline images become image blocks
  in the body (rebuilt in place), and the featured image becomes `mainImage`.

## Run

```bash
cd studio
SANITY_API_TOKEN=sk... npm run migrate:blog    [path/to/export.xml]   # text first
SANITY_API_TOKEN=sk... npm run migrate:images  [path/to/export.xml]   # then images
```

Run `migrate:blog` before `migrate:images` (images patch existing posts). Only
`@sanity/client` and `jsdom` are needed and both are already in the studio's
dependency tree, so no extra `npm install` is required.

The XML path can be the first argument or the `XML_PATH` env var. It defaults to
`~/Downloads/Squarespace-Wordpress-Export-06-22-2026.xml`. Both scripts support
`DRY_RUN=1` to preview without writing.

## Idempotency

- **Text:** each post is written with `_id = post-<slug>` via `createOrReplace`,
  so re-running overwrites in place — no duplicate documents.
- **Images:** each uploaded asset is tagged with its origin URL (`source.url`),
  and the script reuses an existing asset for that URL instead of re-uploading.
  This is required because the Squarespace CDN can return slightly different bytes
  for the same URL on different requests, which would defeat Sanity's content-hash
  dedup and create duplicate assets. Post patches (`set` of `mainImage`/`body`)
  are deterministic.

## Known limitations

- **Ordered lists (`<ol>`) import as `number` list items.** The `blockContent`
  schema currently only declares a `bullet` list, so to render/validate them add
  `{title: 'Numbered', value: 'number'}` to its `lists`.
- **author / categories are not set** — out of scope for these migrations.

## Generating a Sanity API token

1. Go to https://www.sanity.io/manage and open the **Zed Law** project (`6pehju2v`).
2. **API → Tokens → Add API token**.
3. Name it (e.g. `blog-migration`), choose the **Editor** (or Deploy/write) role,
   and create it.
4. Copy the token immediately (it's shown only once) and pass it as
   `SANITY_API_TOKEN`. Don't commit it — `.env*` is gitignored.
