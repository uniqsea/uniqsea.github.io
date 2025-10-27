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
  
  // Determine info display mode
  // Backward compatible with `showInfo` (boolean)
  // New API:
  //   - showInfoDetailed: true 显示标题(如有) + 时间/地点
  //   - showInfoBrief: true 仅显示时间/地点
  // 优先级：detailed > brief；任一显式为 true 则按照对应模式展示。
  // 若两者均未设置，则遵循旧逻辑：showInfo !== false 时显示详细信息（若有内容）。
  const wantsDetailed = photo.showInfoDetailed === true
  const wantsBrief = !wantsDetailed && photo.showInfoBrief === true
  const fallbackDetailed =
    photo.showInfoDetailed === undefined &&
    photo.showInfoBrief === undefined &&
    photo.showInfo !== false // undefined 或 true 都当作显示
  const displayDetailed = wantsDetailed || fallbackDetailed
  const displayBrief = wantsBrief

  const hasMeta = photo.location || photo.date
  const hasAnyInfo = (displayDetailed && (photo.caption || hasMeta)) || (displayBrief && hasMeta)
  
  // 优先使用本地 image，没有本地路径才用 url（图床）
  const imageSrc = photo.image || photo.url
  
  return (
    <Card
      onMouseEnter={() => hasAnyInfo && setShowInfoOverlay(true)}
      onMouseLeave={() => setShowInfoOverlay(false)}
    >
      <Image src={imageSrc} alt={photo.caption || 'Photo'} loading="lazy" />
      
      {hasAnyInfo && (
        <InfoOverlay $visible={showInfoOverlay}>
          {displayDetailed && photo.caption && <Caption>{photo.caption}</Caption>}
          {hasMeta && (displayDetailed || displayBrief) && (
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

