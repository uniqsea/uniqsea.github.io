export function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getProjectPath(project) {
  if (!project) return '/projects'
  if (project.path) return project.path
  const slug = project.slug || slugify(project.title || '')
  // default to projects namespace
  return `/projects/${slug}`
}
