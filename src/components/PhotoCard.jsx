import styled from 'styled-components'
import { useState } from 'react'
import { toThumbPath, toTitleCase } from '../utils/imageUtils.js'

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 28px 14px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.62), transparent);
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  pointer-events: none;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.25s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export function PhotoCard({ photo, onCardClick }) {
  const [hovered, setHovered] = useState(false)
  const caption = photo.caption

  const imageSrc = photo.image || photo.url
  const thumbSrc = toThumbPath(imageSrc)
  
  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
    >
      <Image src={thumbSrc} alt={caption || 'Photo'} loading="lazy" />
      {caption && (
        <CaptionOverlay $visible={hovered}>{toTitleCase(caption)}</CaptionOverlay>
      )}
    </Card>
  )
}
