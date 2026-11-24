// Trace the moving figure and magnetic disc together in the photo's 882 × 960 coordinate space.
import { useId } from 'react'
import { asset } from '../../portfolio-shared/content/index.js'

const cylinderWall = 'M247 436 L632 421 V541 C636 589 561 625 447 629 C341 630 250 599 247 556 Z'
const silhouette = 'M155 0 H548 V278 L533 281 Q546 300 538 313 Q531 326 521 326 L522 358 C587 369 629 390 632 421 C636 469 561 505 447 509 C341 510 250 479 247 436 C243 400 291 370 363 359 L362 340 Q354 325 358 295 L356 271 H345 V288 H155 Z'

export default function MagHeartAvatar({ figure }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="avatar-photo" viewBox="0 0 882 960" aria-hidden="true">
      <defs>
        <image id={id + '-photo'} href={asset(figure)} width="882" height="960" preserveAspectRatio="none" />
        <clipPath id={id + '-actor'}><path d={silhouette} /></clipPath>
        <clipPath id={id + '-surround'}>
          <path clipRule="evenodd" d={`M0 0 H882 V960 H0 Z ${silhouette}`} />
        </clipPath>
        <linearGradient id={id + '-acrylic'} x2=".8" y2="1">
          <stop stopColor="#77664c" /><stop offset=".52" stopColor="#584b38" /><stop offset="1" stopColor="#78684e" />
        </linearGradient>
        <pattern id={id + '-grain'} width="28" height="28" patternUnits="userSpaceOnUse">
          <svg width="28" height="28" viewBox="210 400 28 28">
            <use href={'#' + id + '-photo'} />
          </svg>
        </pattern>
        <linearGradient id={id + '-rim'}>
          <stop stopColor="#131a14" /><stop offset=".29" stopColor="#222922" />
          <stop offset=".43" stopColor="#30352e" /><stop offset=".64" stopColor="#151c17" />
          <stop offset="1" stopColor="#141911" />
        </linearGradient>
        <pattern id={id + '-rim-texture'} width="42" height="13" patternUnits="userSpaceOnUse">
          <svg width="42" height="13" viewBox="277 408 42 26" preserveAspectRatio="none">
            <use href={'#' + id + '-photo'} />
          </svg>
        </pattern>
        {/* The opening hides the lower cylinder inside the wooden enclosure. */}
        <clipPath id={id + '-opening'}>
          <path d="M0 -48 H882 V421 H632 C636 469 561 505 447 509 C341 510 250 479 247 436 H0 Z" />
        </clipPath>
        <clipPath id={id + '-back-rail'}>
          <path d="M345 300 L440 264 L545 307 V376 H345 Z" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="882" height="960" fill="white" />
      {/* Continue the visible wooden rail behind the legs using only unoccupied rail pixels. */}
      <g clipPath={`url(#${id}-back-rail)`}>
        <svg x="345" y="260" width="95" height="116" viewBox="345 260 95 116"><use href={'#' + id + '-photo'} transform="translate(175 -66)" /></svg>
        <svg x="440" y="260" width="105" height="116" viewBox="440 260 105 116"><use href={'#' + id + '-photo'} transform="translate(880 0) scale(-1 1) translate(175 -66)" /></svg>
      </g>
      <path d="M245 367 Q438 301 636 367 V511 H245 Z" fill={`url(#${id}-acrylic)`} />
      <path d="M245 367 Q438 301 636 367 V511 H245 Z" fill={`url(#${id}-grain)`} opacity=".55" />
      <use href={'#' + id + '-photo'} clipPath={`url(#${id}-surround)`} />
      <g clipPath={`url(#${id}-opening)`}>
        <g className="avatar-and-disc">
          <path d={cylinderWall} fill={`url(#${id}-rim)`} />
          <path d={cylinderWall} fill={`url(#${id}-rim-texture)`} opacity=".24" />
          <use href={'#' + id + '-photo'} clipPath={`url(#${id}-actor)`} />
        </g>
      </g>
    </svg>
  )
}
