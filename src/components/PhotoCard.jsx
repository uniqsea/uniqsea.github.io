import styled from 'styled-components'
import { useState } from 'react'

const Card = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
  cursor: default;
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

const InfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), transparent);
  color: white;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
`

const Caption = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.4;
`

const Meta = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export function PhotoCard({ photo }) {
  const [showInfoOverlay, setShowInfoOverlay] = useState(false)
  
  // Check if photo has any info to display
  // showInfo 为 false 时强制隐藏，未设置或为 true 时显示（如果有内容）
  const hasInfo = (photo.caption || photo.location || photo.date) && photo.showInfo !== false
  
  // 优先使用本地 image，没有本地路径才用 url（图床）
  const imageSrc = photo.image || photo.url
  
  return (
    <Card
      onMouseEnter={() => hasInfo && setShowInfoOverlay(true)}
      onMouseLeave={() => setShowInfoOverlay(false)}
    >
      <Image src={imageSrc} alt={photo.caption || 'Photo'} loading="lazy" />
      
      {hasInfo && (
        <InfoOverlay $visible={showInfoOverlay}>
          {photo.caption && <Caption>{photo.caption}</Caption>}
          {(photo.location || photo.date) && (
            <Meta>
              {photo.location && <span>{photo.location}</span>}
              {photo.location && photo.date && <span>·</span>}
              {photo.date && <span>{photo.date}</span>}
            </Meta>
          )}
        </InfoOverlay>
      )}
    </Card>
  )
}

