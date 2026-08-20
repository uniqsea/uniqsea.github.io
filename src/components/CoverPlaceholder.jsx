import styled from 'styled-components'
import { getUniversalCover } from '../data/coverLibrary.js'

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: clamp(18px, 2.4vw, 28px);
  background-color: ${({ $cover }) => $cover.fallback};
  background-image: url(${({ $cover }) => $cover.src});
  background-size: cover;
  background-position: center;
  color: ${({ $cover }) => $cover.textColor};
  box-shadow: inset 0 0 0 1px rgba(17, 17, 17, 0.12);
`

const Name = styled.span`
  position: relative;
  z-index: 1;
  max-width: 45%;
  font-family: var(--heading-font);
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 750;
  line-height: 1.05;
  letter-spacing: -0.04em;
  text-align: left;
  text-wrap: balance;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.28);
`

export function CoverPlaceholder({ title, coverId }) {
  const displayTitle = title.includes(':') ? title.split(':')[0] : title
  const cover = getUniversalCover(displayTitle, coverId)

  return (
    <Frame role="img" aria-label={`${title} cover placeholder`} $cover={cover}>
      <Name>{displayTitle}</Name>
    </Frame>
  )
}
