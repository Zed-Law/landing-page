// One-off migration script: copies every blob from the old (source) Vercel
// Blob store to the new (destination) store, preserving exact pathnames.
//
// Usage:
//   SOURCE_BLOB_TOKEN=xxx DEST_BLOB_TOKEN=yyy node scripts/migrate-blobs.mjs
//
// Requires: npm install --no-save @vercel/blob (or it's already a dependency)

import { list, put } from "@vercel/blob";

const sourceToken = process.env.SOURCE_BLOB_TOKEN;
const destToken = process.env.DEST_BLOB_TOKEN;

if (!sourceToken || !destToken) {
  console.error(
    "Set SOURCE_BLOB_TOKEN and DEST_BLOB_TOKEN env vars before running.",
  );
  process.exit(1);
}

async function listAllBlobs() {
  const blobs = [];
  let cursor;
  do {
    const result = await list({ token: sourceToken, cursor, limit: 1000 });
    blobs.push(...result.blobs);
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);
  return blobs;
}

async function migrate() {
  const blobs = await listAllBlobs();
  console.log(`Found ${blobs.length} blobs in source store.`);

  let copied = 0;
  let failed = 0;

  for (const blob of blobs) {
    try {
      const res = await fetch(blob.url);
      if (!res.ok) {
        throw new Error(`download failed: ${res.status}`);
      }
      const arrayBuffer = await res.arrayBuffer();

      const uploaded = await put(blob.pathname, Buffer.from(arrayBuffer), {
        access: "public",
        token: destToken,
        addRandomSuffix: false,
        contentType: blob.contentType,
      });

      copied++;
      console.log(`[${copied}/${blobs.length}] ${blob.pathname} -> ${uploaded.url}`);
    } catch (err) {
      failed++;
      console.error(`FAILED: ${blob.pathname} — ${err.message}`);
    }
  }

  console.log(`\nDone. Copied: ${copied}, Failed: ${failed}, Total: ${blobs.length}`);
}

migrate();
