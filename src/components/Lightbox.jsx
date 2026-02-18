import { useEffect, useCallback, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { toFullPath, toTitleCase } from '../utils/imageUtils.js'

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
  background: rgba(0, 0, 0, 0.95);
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
  color: rgba(255, 255, 255, 0.38);
  font-variant-numeric: tabular-nums;
`

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.22);
  }
`

// ─── Image area ──────────────────────────────────────────────────────────────

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  /* 56px top bar + ~70px bottom bar + breathing room */
  max-height: calc(100vh - 140px);
`

const ImgContainer = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.45),
    0 18px 50px rgba(0, 0, 0, 0.55);
  /* fixed minimum so Spinner is visible before image dimensions resolve */
  min-width: min(50vw, 400px);
  min-height: min(30vh, 220px);
  max-width: min(92vw, 1400px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Img = styled.img`
  display: block;
  max-width: min(92vw, 1400px);
  max-height: calc(100vh - 200px);
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
    border: 2px solid rgba(255, 255, 255, 0.14);
    border-top-color: rgba(255, 255, 255, 0.75);
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
  color: rgba(255, 255, 255, 0.82);
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
  color: rgba(255, 255, 255, 0.42);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
`

// ─── Bottom navigation & dots ────────────────────────────────────────────────

const BottomBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  z-index: 1002;
`

const NavButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.1s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.22;
    cursor: default;
    transform: none;
  }
`

const DotsBar = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const Dot = styled.div`
  width: ${props => props.$active ? '18px' : '5px'};
  height: 5px;
  border-radius: 3px;
  background: ${props => props.$active ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.22)'};
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.3s;
`

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
  const hasInfo = photo?.caption || photo?.location || photo?.date

  return (
    <ImageWrapper>
      <ImgContainer>
        <Img
          src={fullSrc}
          alt={photo.caption || 'Photo'}
          draggable={false}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
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

export function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
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

  const showDots = photos.length <= 11

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

      {/* Bottom navigation */}
      <BottomBar>
        <NavButton onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous">
          ‹
        </NavButton>

        {showDots && (
          <DotsBar>
            {photos.map((_, i) => (
              <Dot key={i} $active={i === currentIndex} />
            ))}
          </DotsBar>
        )}

        <NavButton onClick={handleNext} disabled={currentIndex === photos.length - 1} aria-label="Next">
          ›
        </NavButton>
      </BottomBar>
    </Overlay>
  )
}
