import styled from 'styled-components'
import { useState } from 'react'
import { toThumbPath } from '../utils/imageUtils.js'
import { useSitePreferences } from '../context/SitePreferences.jsx'

const Card = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`

export function PhotoCard({ photo, onCardClick }) {
  const { t } = useSitePreferences()
  const caption = photo.caption

  const imageSrc = photo.image || photo.url || ''
  const thumbSrc = toThumbPath(imageSrc)
  const [currentSrc, setCurrentSrc] = useState(thumbSrc)

  function handleImageError() {
    if (imageSrc && currentSrc !== imageSrc) {
      setCurrentSrc(imageSrc)
    }
  }
  
  return (
    <Card
      type="button"
      onClick={onCardClick}
      aria-label={caption ? t('moments.open', { caption }) : t('moments.openPhoto')}
    >
      <Image
        src={currentSrc}
        alt={caption || t('moments.photo')}
        loading="lazy"
        onError={handleImageError}
      />
    </Card>
  )
}
