import styled from 'styled-components'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { site, socials } from '../data.js'
import { Icon } from './Icon.jsx'

const Hero = styled.header`
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  padding: 72px 0;
  position: relative;
`

const Lead = styled.div`
  max-width: 900px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

const Title = styled.h1`
  font-size: clamp(1.6rem, 8vw, 5rem);
  line-height: 1.15; /* avoid glyph clipping */
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--fg);
  font-weight: 700;
  white-space: nowrap; /* single line */
  display: block;
  padding-block: 0.08em; /* extra breathing room for ascenders/descenders */
`

// no subtitle per user request

const Description = styled.p`
  max-width: 760px;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.8;
  margin: 0 0 18px;
`

// removed CTA and topic tags per request

const SocialRow = styled.div`
  margin-top: 22px; display: flex; gap: 10px;
  a { 
    display: inline-flex; align-items: center; justify-content: center; 
    width: 36px; height: 36px; border-radius: 10px; 
    border: 1px solid var(--border); color: var(--fg); text-decoration: none; 
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; 
    will-change: transform; 
  }
  a:hover { 
    transform: translateY(-2px) scale(1.05); 
    border-color: var(--fg);
    box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  }
  a:active { transform: translateY(0) scale(0.97); }
  img { filter: invert(0); }
`

const PhotoWrap = styled.div`
  justify-self: center;
  width: 280px; height: 280px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  @media (max-width: 480px) { width: 220px; height: 220px; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`

export function HeroSection({ maxWidth: Max }) {
  const preferred = site.preferredName || site.fullName?.split(' ').slice(-1)[0] || site.name
  return (
    <Hero id="hero">
      <Max>
        <Grid>
          <Lead>
            <Title>Hello, I’m {preferred}</Title>
            <Description>{site.blurb}</Description>
            {/* CTA and topic tags removed */}
            <SocialRow>
              {['linkedin','github','email'].map(name => {
                const s = socials.find(x => x.icon === name)
                return s ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Icon name={name} size={16} />
                  </a>
                ) : null
              })}
            </SocialRow>
          </Lead>
          <PhotoWrap aria-label="Portrait">
            <img src="/sea.png" alt={site.fullName || 'Portrait'} />
          </PhotoWrap>
        </Grid>
      </Max>
      {/* subtle animated ocean-like circles (example-inspired) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.25, scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', right: '8%', top: '18%', width: 120, height: 120,
          borderRadius: 24, background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))',
          filter: 'blur(0.2px)'
        }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', left: '6%', bottom: '12%', width: 90, height: 90,
          borderRadius: 999, background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(0,0,0,0.02))'
        }}
        aria-hidden
      />
    </Hero>
  )
}
