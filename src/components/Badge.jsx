import styled from 'styled-components'

const Base = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: ${({ $equalWidth }) => ($equalWidth ? '40px' : 'auto')};
  height: ${({ $equalWidth }) => ($equalWidth ? '24px' : 'auto')};
  padding: ${({ $equalWidth }) => ($equalWidth ? '0 10px' : '6px 10px')};
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  border-radius: 999px;
  border: 1px solid transparent;
  text-decoration: none;
  user-select: none;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;

  &[href]:hover {
    text-decoration: none;
  }
`

const palette = {
  neutral: { color: 'var(--muted)', bg: 'transparent', border: 'var(--border)' },
  accent:  { color: 'var(--accent-contrast)', bg: 'var(--accent)', border: 'transparent' },
  pdf:     { color: '#ffffff', bg: '#EF4444', border: 'rgba(255, 0, 82, 0.36)' },
  info:    { color: '#ffffff', bg: '#2D78F1', border: 'rgba(0, 85, 218, 0.36)' },
  success: { color: '#ffffff', bg: '#00C68D', border: 'rgba(0, 198, 141, 0.42)' },
  amber:   { color: '#ffffff', bg: '#FFD400', border: 'rgba(255, 212, 0, 0.48)' },
  dark:    { color: '#f7f4ee', bg: '#232323', border: 'rgba(35, 35, 35, 0.34)' },
}

export function Badge({ as: asProp, tone = 'neutral', variant = 'soft', href, children, style, equalWidth = false, ...props }) {
  const { color, bg, border } = palette[tone] || palette.neutral
  const element = asProp || (href ? 'a' : 'span')
  const computed = variant === 'outline'
    ? { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }
    : { background: bg, color, borderColor: border }
  return (
    <Base as={element} href={href} style={{ ...computed, ...style }} $equalWidth={equalWidth} {...props}>
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
