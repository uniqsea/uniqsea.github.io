/**
 * Derives optimized image paths from the original image path.
 *
 * Convention:
 *   /moments/photo1.png  →  /moments/thumbs/photo1.webp  (gallery thumbnail)
 *   /moments/photo1.png  →  /moments/full/photo1.webp    (lightbox full-size)
 *
 * Works for any directory depth — inserts `subdir` before the filename.
 */

export { titleCase as toTitleCase } from 'title-case'

function insertSubdir(imagePath, subdir) {
  if (!imagePath) return imagePath
  const lastSlash = imagePath.lastIndexOf('/')
  const dir = imagePath.slice(0, lastSlash + 1)
  const file = imagePath.slice(lastSlash + 1)
  const baseName = file.replace(/\.[^.]+$/, '.webp')
  return `${dir}${subdir}/${baseName}`
}

/** Path to the thumbnail WebP (800px wide) used in the masonry gallery. */
export function toThumbPath(imagePath) {
  return insertSubdir(imagePath, 'thumbs')
}

/**
 * Path to the full-size WebP (2400px wide) used in the lightbox.
 * If the photo has `clickOriginal: true`, returns the original path instead.
 */
export function toFullPath(photo) {
  if (photo.clickOriginal) return photo.image || photo.url
  return insertSubdir(photo.image || photo.url, 'full')
}
