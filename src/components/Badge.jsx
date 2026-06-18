import styled from 'styled-components'

const Base = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  border-radius: 999px;
  border: 1px solid transparent;
  text-decoration: none;
  user-select: none;
`

const palette = {
  neutral: { color: 'var(--fg)',  bg: 'var(--surface-alt)' },
  accent:  { color: '#fff',       bg: 'var(--accent)' },       // PDF
  info:    { color: '#fff',       bg: '#2563eb' },              // DOI
  success: { color: '#fff',       bg: '#16a34a' },              // BibTeX
  amber:   { color: '#111',       bg: '#fde68a' },              // Web / arXiv / Demo
  dark:    { color: '#fff',       bg: '#111111' },              // GitHub / Code
}

export function Badge({ as: asProp, tone = 'neutral', variant = 'soft', href, children, style, ...props }) {
  const { color, bg } = palette[tone] || palette.neutral
  const element = asProp || (href ? 'a' : 'span')
  const computed = variant === 'outline'
    ? { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }
    : { background: bg, color, borderColor: 'transparent' }
  return (
    <Base as={element} href={href} style={{ ...computed, ...style }} {...props}>
      {children}
    </Base>
  )
}

export function Dot({ color = 'var(--muted)', size = 10, ...props }) {
  return (
    <span
      {...props}
      style={{
        display: 'inline-block', width: size, height: size, borderRadius: '50%',
        background: color, flex: `0 0 ${size}px`,
      }}
      aria-hidden
    />
  )
}
