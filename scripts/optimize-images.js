/**
 * Optimize moments images:
 *   - thumbs/  800px wide, WebP quality 80  (for gallery display)
 *   - full/   2400px wide, WebP quality 85  (for lightbox display)
 *
 * Usage: npm run optimize-images
 * Only processes files that don't already exist in the output dirs (incremental).
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOMENTS_DIR = path.join(__dirname, '..', 'public', 'moments')
const THUMBS_DIR = path.join(MOMENTS_DIR, 'thumbs')
const FULL_DIR = path.join(MOMENTS_DIR, 'full')

const THUMB_WIDTH = 800
const THUMB_QUALITY = 80
const FULL_WIDTH = 2400
const FULL_QUALITY = 85

const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp'])
// Subdirectories to skip when scanning
const SKIP_DIRS = new Set(['thumbs', 'full'])

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${bytes} B`
}

async function processImage(srcPath, destPath, width, quality) {
  if (fs.existsSync(destPath)) {
    return { skipped: true }
  }
  const srcSize = fs.statSync(srcPath).size
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(destPath)
  const destSize = fs.statSync(destPath).size
  return { skipped: false, srcSize, destSize }
}

async function main() {
  fs.mkdirSync(THUMBS_DIR, { recursive: true })
  fs.mkdirSync(FULL_DIR, { recursive: true })

  const files = fs.readdirSync(MOMENTS_DIR).filter(f => {
    const stat = fs.statSync(path.join(MOMENTS_DIR, f))
    if (stat.isDirectory()) return false
    return SUPPORTED_EXTS.has(path.extname(f).toLowerCase())
  })

  if (files.length === 0) {
    console.log('No images found in public/moments/')
    return
  }

  console.log(`\nProcessing ${files.length} image(s) in public/moments/\n`)
  console.log('─'.repeat(70))

  let totalSrcSize = 0
  let totalThumbSize = 0
  let totalFullSize = 0
  let processed = 0
  let skipped = 0

  for (const file of files) {
    const srcPath = path.join(MOMENTS_DIR, file)
    const baseName = path.basename(file, path.extname(file))
    const thumbPath = path.join(THUMBS_DIR, `${baseName}.webp`)
    const fullPath = path.join(FULL_DIR, `${baseName}.webp`)

    const srcSize = fs.statSync(srcPath).size
    totalSrcSize += srcSize

    process.stdout.write(`  ${file.padEnd(20)} → `)

    const [thumbResult, fullResult] = await Promise.all([
      processImage(srcPath, thumbPath, THUMB_WIDTH, THUMB_QUALITY),
      processImage(srcPath, fullPath, FULL_WIDTH, FULL_QUALITY),
    ])

    if (thumbResult.skipped && fullResult.skipped) {
      const thumbSize = fs.statSync(thumbPath).size
      const fullSize = fs.statSync(fullPath).size
      totalThumbSize += thumbSize
      totalFullSize += fullSize
      console.log(`already optimized (skipped)`)
      skipped++
    } else {
      const thumbSize = thumbResult.skipped ? fs.statSync(thumbPath).size : thumbResult.destSize
      const fullSize = fullResult.skipped ? fs.statSync(fullPath).size : fullResult.destSize
      totalThumbSize += thumbSize
      totalFullSize += fullSize
      const thumbPct = ((1 - thumbSize / srcSize) * 100).toFixed(0)
      const fullPct = ((1 - fullSize / srcSize) * 100).toFixed(0)
      console.log(
        `${formatBytes(srcSize).padStart(8)}  →  thumb ${formatBytes(thumbSize).padStart(7)} (-${thumbPct}%)  full ${formatBytes(fullSize).padStart(7)} (-${fullPct}%)`
      )
      processed++
    }
  }

  console.log('─'.repeat(70))
  const totalThumbPct = ((1 - totalThumbSize / totalSrcSize) * 100).toFixed(0)
  const totalFullPct = ((1 - totalFullSize / totalSrcSize) * 100).toFixed(0)
  console.log(`  Total original : ${formatBytes(totalSrcSize)}`)
  console.log(`  Total thumbs/  : ${formatBytes(totalThumbSize)} (-${totalThumbPct}%)`)
  console.log(`  Total full/    : ${formatBytes(totalFullSize)} (-${totalFullPct}%)`)
  console.log(`\n  Processed: ${processed}  |  Skipped (already exist): ${skipped}\n`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
