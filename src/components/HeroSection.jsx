import styled from 'styled-components'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { site, socials } from '../data.js'
import { Icon } from './Icon.jsx'
import haiyangPhoto from '../assets/haiyang.png'

const Hero = styled.header`
  display: flex;
  align-items: center;
  padding: 80px 0 64px;
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
  font-family: var(--heading-font);
  font-size: clamp(1.6rem, 8vw, 5rem);
  line-height: 1.15; /* avoid glyph clipping */
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--fg);
  font-weight: 700;
  white-space: nowrap; /* single line */
  display: block;
  padding-block: 0.08em; /* extra breathing room for ascenders/descenders */
  min-height: 1.15em; /* 防止文字变化时高度跳动 */
`

// no subtitle per user request

const Description = styled.p`
  max-width: 640px;
  color: var(--muted);
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.75;
  margin: 0 0 18px;
  text-align: left;
  
  @media (max-width: 640px) {
    max-width: 100%;
  }
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
  width: 300px; height: 300px;
  border-radius: 150px;
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  @media (max-width: 860px) { width: 240px; height: 240px; }
  @media (max-width: 480px) { width: 200px; height: 200px; }
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    display: block;
    /* 调整图片位置：第一个值是水平(0-100%)，第二个值是垂直(0-100%) */
    /* 例如: 50% 30% 表示水平居中，垂直偏上显示 */
    object-position: 50% 18%;
    /* 缩放图片：1.0 = 原始大小，1.2 = 放大20%，0.8 = 缩小20% */
    transform: scale(1);
    /* 滤镜效果：可以组合多个效果 */
    /* brightness(1) = 亮度正常，1.2 = 更亮，0.8 = 更暗 */
    /* contrast(1) = 对比度正常，1.2 = 对比度高，0.8 = 对比度低 */
    /* saturate(1) = 饱和度正常，1.5 = 更鲜艳，0.5 = 偏灰 */
    /* grayscale(0) = 彩色，1 = 黑白 */
    /* sepia(0) = 无复古效果，1 = 复古怀旧 */
    /* blur(0px) = 无模糊，5px = 模糊 */
    filter: brightness(1) contrast(1) saturate(1);
  }
`

export function HeroSection({ maxWidth: Max }) {
  const preferred = site.preferredName || site.fullName?.split(' ').slice(-1)[0] || site.name
  const fullText = `Hello, I'm ${preferred}`

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
              {site.blurb.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < site.blurb.split('\n').length - 1 && <br />}
                </span>
              ))}
            </Description>
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
            <img src={haiyangPhoto} alt={site.fullName || 'Portrait'} />
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
