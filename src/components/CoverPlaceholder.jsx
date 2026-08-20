import styled from 'styled-components'

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: clamp(18px, 2.4vw, 28px);
  background: ${({ $palette }) => $palette.bg};
  color: ${({ $palette }) => $palette.ink};
  box-shadow: inset 0 0 0 1px ${({ $palette }) => $palette.border};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 7px;
    background: ${({ $palette }) => $palette.accent};
  }
`

const Name = styled.span`
  position: relative;
  z-index: 1;
  max-width: 11ch;
  font-family: var(--heading-font);
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 750;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-align: left;
  text-wrap: balance;
`

const palettes = [
  { bg: '#c94f4f', ink: '#fff8f5', accent: '#7f292d', border: 'rgba(255, 255, 255, 0.35)' },
  { bg: '#356fc8', ink: '#f5f8ff', accent: '#173f78', border: 'rgba(255, 255, 255, 0.35)' },
  { bg: '#7459b8', ink: '#fbf9ff', accent: '#433078', border: 'rgba(255, 255, 255, 0.35)' },
  { bg: '#3f836c', ink: '#f4fff9', accent: '#205140', border: 'rgba(255, 255, 255, 0.35)' },
]

function paletteFor(title) {
  const hash = [...title].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return palettes[hash % palettes.length]
}

export function CoverPlaceholder({ title }) {
  const displayTitle = title.includes(':') ? title.split(':')[0] : title
  const palette = paletteFor(displayTitle)

  return (
    <Frame role="img" aria-label={`${title} cover placeholder`} $palette={palette}>
      <Name>{displayTitle}</Name>
    </Frame>
  )
}
