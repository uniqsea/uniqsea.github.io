import { useEffect, useCallback, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { toFullPath, toThumbPath, toTitleCase } from '../utils/imageUtils.js'

// ─── Spinner animation ───────────────────────────────────────────────────────

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

// ─── Overlay ─────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(240, 240, 245, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: center;
`

// ─── Top bar ─────────────────────────────────────────────────────────────────

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1002;
`

const Counter = styled.div`
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: rgba(0, 0, 0, 0.38);
  font-variant-numeric: tabular-nums;
`

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    color: #000;
    border-color: rgba(0, 0, 0, 0.2);
  }
`

// ─── Image area ──────────────────────────────────────────────────────────────

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  /* 56px top bar + 100px dock area + 36px info row + breathing room */
  max-height: calc(100vh - 220px);
`

const ImgContainer = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.12),
    0 18px 50px rgba(0, 0, 0, 0.18);
  min-width: min(50vw, 400px);
  min-height: min(30vh, 220px);
  max-width: min(88vw, 1200px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Img = styled.img`
  display: block;
  max-width: min(88vw, 1200px);
  /* top bar 56px + info 36px + dock 100px + gaps */
  max-height: calc(100vh - 220px);
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
`

const SpinnerWrap = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &::before {
    content: '';
    width: 26px;
    height: 26px;
    border-radius: 999px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top-color: rgba(0, 0, 0, 0.5);
    animation: ${spin} 0.75s linear infinite;
  }
`

// ─── Info row ────────────────────────────────────────────────────────────────

const InfoRow = styled.div`
  width: 100%;
  max-width: min(92vw, 1400px);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 0 2px;
`

const InfoCaption = styled.div`
  color: rgba(0, 0, 0, 0.78);
  font-family: var(--heading-font);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InfoMeta = styled.div`
  color: rgba(0, 0, 0, 0.38);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
`

// ─── Draggable thumbnail Dock ─────────────────────────────────────────────────

const PAGE_SIZE = 10  // max thumbs visible at once

function ThumbnailDock({ photos, currentIndex, onSelect }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [startIndex, setStartIndex] = useState(0)

  const thumbSrc = (photo) => {
    const src = photo.image || photo.url || ''
    return toThumbPath(src) || src
  }

  const visiblePhotos = photos.slice(startIndex, startIndex + PAGE_SIZE)
  const canLeft = startIndex > 0
  const canRight = startIndex + PAGE_SIZE < photos.length

  // keep selected in view
  useEffect(() => {
    if (currentIndex < startIndex) setStartIndex(currentIndex)
    else if (currentIndex >= startIndex + PAGE_SIZE) setStartIndex(currentIndex - PAGE_SIZE + 1)
  }, [currentIndex])

  const arrowBtn = (visible, onClick, label) => (
    <div
      onClick={e => { e.stopPropagation(); onClick() }}
      style={{
        width: 28, height: 28, borderRadius: '50%',
        border: '1px solid rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: visible ? 'pointer' : 'default',
        fontSize: 14, color: 'rgba(0,0,0,0.55)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s',
        userSelect: 'none', flexShrink: 0,
      }}
    >{label}</div>
  )

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 0, right: 0, zIndex: 1002, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        style={{ x: dragOffset.x, y: dragOffset.y, touchAction: 'none', pointerEvents: 'auto', cursor: 'grab' }}
        onDragEnd={(_, info) => setDragOffset(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
      >
        {/* pill — no overflow:hidden, thumbs float freely upward */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 10px 10px 10px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        }}>
          {arrowBtn(canLeft, () => setStartIndex(i => Math.max(0, i - PAGE_SIZE)), '‹')}

          {/* thumbs: negative margin stacking, exactly like the reference */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: -6 }}>
            {visiblePhotos.map((photo, vi) => {
              const i = startIndex + vi
              const isActive = currentIndex === i
              return (
                <motion.div
                  key={photo.id || i}
                  onClick={e => { e.stopPropagation(); onSelect(i) }}
                  style={{
                    marginLeft: 6,
                    flexShrink: 0,
                    borderRadius: 10,
                    overflow: 'hidden',
                    width: 36, height: 36,
                    cursor: 'pointer',
                    zIndex: isActive ? 30 : PAGE_SIZE - vi,
                    outline: isActive ? '2px solid rgba(0,0,0,0.45)' : '2px solid transparent',
                    outlineOffset: 1,
                    position: 'relative',
                  }}
                  initial={{ rotate: vi % 2 === 0 ? -12 : 12 }}
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    rotate: isActive ? 0 : vi % 2 === 0 ? -12 : 12,
                    y: isActive ? -10 : 0,
                  }}
                  whileHover={{ scale: 1.3, rotate: 0, y: -12, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                >
                  <img
                    src={thumbSrc(photo)}
                    alt={photo.caption || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                    draggable={false}
                  />
                </motion.div>
              )
            })}
          </div>

          {arrowBtn(canRight, () => setStartIndex(i => Math.min(photos.length - PAGE_SIZE, i + PAGE_SIZE)), '›')}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Motion variants ─────────────────────────────────────────────────────────

const variants = {
  enter: dir => ({ opacity: 0, x: dir * 22 }),
  center: { opacity: 1, x: 0 },
  exit:   dir => ({ opacity: 0, x: dir * -22 }),
}

const transition = { duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }

// ─── LightboxImage (owns imageLoaded so it resets on every remount) ───────────

function LightboxImage({ photo }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const fullSrc = toFullPath(photo)
  const originalSrc = photo?.image || photo?.url || ''
  const [currentSrc, setCurrentSrc] = useState(fullSrc)
  const hasInfo = photo?.caption || photo?.location || photo?.date

  const handleImageError = useCallback(() => {
    if (originalSrc && currentSrc !== originalSrc) {
      setCurrentSrc(originalSrc)
      setImageLoaded(false)
    }
  }, [currentSrc, originalSrc])

  return (
    <ImageWrapper>
      <ImgContainer style={{ boxShadow: imageLoaded ? undefined : 'none' }}>
        <Img
          src={currentSrc}
          alt={photo.caption || 'Photo'}
          draggable={false}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        {!imageLoaded && <SpinnerWrap />}
      </ImgContainer>

      {hasInfo && (
        <InfoRow>
          {photo.caption && <InfoCaption>{toTitleCase(photo.caption)}</InfoCaption>}
          {(photo.location || photo.date) && (
            <InfoMeta>{[photo.location, photo.date].filter(Boolean).join(' · ')}</InfoMeta>
          )}
        </InfoRow>
      )}
    </ImageWrapper>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

export function Lightbox({ photos, currentIndex, onClose, onPrev, onNext, onJump }) {
  // direction: -1 = going right (prev), +1 = going left (next), 0 = initial open
  const dirRef = useRef(0)

  const photo = photos[currentIndex]

  const handleOverlayClick = useCallback(e => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  const handlePrev = useCallback(() => {
    dirRef.current = -1
    onPrev()
  }, [onPrev])

  const handleNext = useCallback(() => {
    dirRef.current = 1
    onNext()
  }, [onNext])

  const handleSelect = useCallback(i => {
    dirRef.current = i > currentIndex ? 1 : -1
    onJump(i)
  }, [currentIndex, onJump])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft'  && currentIndex > 0) handlePrev()
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentIndex, photos.length, onClose, handlePrev, handleNext])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  if (!photo) return null

  return (
    <Overlay onClick={handleOverlayClick}>
      {/* Top bar */}
      <TopBar>
        <Counter>{currentIndex + 1} / {photos.length}</Counter>
        <CloseButton onClick={onClose} aria-label="Close">✕</CloseButton>
      </TopBar>

      {/* Image + info */}
      <AnimatePresence mode="wait" initial custom={dirRef.current}>
        <motion.div
          key={currentIndex}
          custom={dirRef.current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          style={{ display: 'flex' }}
        >
          {/* key on motion.div causes remount → LightboxImage's imageLoaded resets naturally */}
          <LightboxImage photo={photo} />
        </motion.div>
      </AnimatePresence>

      {/* Draggable thumbnail Dock */}
      <ThumbnailDock
        photos={photos}
        currentIndex={currentIndex}
        onSelect={handleSelect}
      />
    </Overlay>
  )
}
