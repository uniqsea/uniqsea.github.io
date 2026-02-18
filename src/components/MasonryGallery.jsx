import { useState, useCallback } from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import { PhotoCard } from './PhotoCard.jsx'
import { Lightbox } from './Lightbox.jsx'

const MasonryGrid = styled(Masonry)`
  display: flex;
  margin-left: -16px; /* 抵消列间距 */
  width: auto;
  
  /* 列样式 */
  .masonry-column {
    padding-left: 16px; /* 列间距 */
    background-clip: padding-box;
    
    > * {
      margin-bottom: 16px; /* 图片之间的垂直间距 */
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--muted);
`

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: var(--fg);
`

const EmptyText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
`

export function MasonryGallery({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = useCallback(index => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(() => setLightboxIndex(i => Math.max(0, i - 1)), [])
  const nextPhoto = useCallback(
    () => setLightboxIndex(i => Math.min(photos.length - 1, i + 1)),
    [photos.length]
  )

  if (!photos || photos.length === 0) {
    return (
      <EmptyState>
        <EmptyTitle>No moments yet</EmptyTitle>
        <EmptyText>
          Photos will appear here once you add them to the moments array in data.js
        </EmptyText>
      </EmptyState>
    )
  }
  
  // 响应式列数配置
  const breakpointColumns = {
    default: 3,  // 桌面：3 列
    1024: 2,     // 平板：2 列
    640: 1       // 手机：1 列
  }
  
  return (
    <>
      <MasonryGrid
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onCardClick={() => openLightbox(index)}
          />
        ))}
      </MasonryGrid>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  )
}

