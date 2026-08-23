import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'
import { site, socials } from '../data.js'
import { Icon } from './Icon.jsx'
import haiyangPhoto from '../assets/haiyang.png'
import seaPhoto from '../assets/sea.png'
import { useSitePreferences } from '../context/SitePreferences.jsx'

const Hero = styled.header`
  display: flex;
  align-items: center;
  padding: 72px 0 56px;
  position: relative;

  @media (max-width: 640px) {
    padding: 52px 0 44px;
  }
`

const Lead = styled.div`
  max-width: 720px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.65fr);
  gap: clamp(40px, 6vw, 72px);
  align-items: center;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`

const Title = styled.h1`
  font-family: var(--heading-font);
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  line-height: 1.08; /* avoid glyph clipping */
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: var(--fg);
  font-weight: 700;
  white-space: nowrap; /* single line */
  display: block;
  padding-block: 0.08em; /* extra breathing room for ascenders/descenders */
  min-height: 1.08em; /* 防止文字变化时高度跳动 */

  @media (max-width: 640px) {
    font-size: clamp(2.25rem, 10vw, 3rem);
    white-space: normal;
  }
`

// no subtitle per user request

const Description = styled.p`
  max-width: 600px;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.72;
  margin: 0;
  text-align: left;
  
  @media (max-width: 640px) {
    max-width: 100%;
  }
`

// removed CTA and topic tags per request

const SocialRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--fg);
    text-decoration: none;
    opacity: 0.78;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  a:hover {
    text-decoration: none;
    opacity: 1;
    transform: translateY(-1px);
  }
`

const FlipContainer = styled.div`
  width: 260px; height: 260px;
  perspective: 800px;
  cursor: pointer;
  justify-self: center;
  @media (max-width: 860px) { width: 220px; height: 220px; }
  @media (max-width: 480px) { width: 200px; height: 200px; }
`

const FlipInner = styled(motion.div)`
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  position: relative;
`

const PhotoFace = styled.div`
  position: absolute; inset: 0;
  border-radius: 50%;
  background: var(--surface);
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    object-position: 50% 18%;
    filter: brightness(1) contrast(1) saturate(1);
  }
`

const PhotoBack = styled(PhotoFace)`
  transform: rotateY(180deg);
  img { object-position: 50% 50%; }
`

export function HeroSection({ maxWidth: Max }) {
  const { t } = useSitePreferences()
  const preferred = site.preferredName || site.fullName?.split(' ').slice(-1)[0] || site.name
  const fullText = t('hero.greeting', { name: preferred })

  const [flipped, setFlipped] = useState(false)

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  }

  return (
    <Hero id="hero">
      <Max>
        <Grid>
          <Lead>
            <Title>
              {fullText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </Title>
            <Description>
              {t('hero.blurb').split('\n').map((line, index, lines) => (
                <span key={index}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </Description>
            <SocialRow>
              {['linkedin','github','email'].map(name => {
                const s = socials.find(x => x.icon === name)
                return s ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Icon name={name} size={17} />
                  </a>
                ) : null
              })}
            </SocialRow>
          </Lead>
          <Tilt
            tiltMaxAngleDeg={flipped ? 0 : 12}
            perspective={800}
            transitionSpeed={400}
            style={{ justifySelf: 'center' }}
          >
            <FlipContainer onClick={() => setFlipped(f => !f)} aria-label={t('hero.togglePortrait')}>
              <FlipInner
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <PhotoFace>
                  <img src={haiyangPhoto} alt={t('hero.portrait', { name: site.fullName })} />
                </PhotoFace>
                <PhotoBack>
                  <img src={seaPhoto} alt={t('hero.sea')} />
                </PhotoBack>
              </FlipInner>
            </FlipContainer>
          </Tilt>
        </Grid>
      </Max>
    </Hero>
  )
}
