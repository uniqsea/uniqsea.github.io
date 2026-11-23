// Images used by the portfolio, resolved to URLs by file name.
const files = import.meta.glob('../assets/*', { eager: true, import: 'default', query: '?url' })
export const asset = (name) => files[`../assets/${name}`]
