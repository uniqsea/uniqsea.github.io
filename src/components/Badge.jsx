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
  neutral: { color: '#111', bg: '#e5e7eb' },
  info: { color: '#fff', bg: '#3b82f6' },
  danger: { color: '#fff', bg: '#ef4444' },
  success: { color: '#fff', bg: '#22c55e' },
  amber: { color: '#111', bg: '#fde68a' },
  gold: { color: '#111', bg: '#fbbf24' },
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

export function Dot({ color = '#f59e0b', size = 10, ...props }) {
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
