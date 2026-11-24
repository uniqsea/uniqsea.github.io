import { asset } from '../../portfolio-shared/content/index.js'

export default function MagHeartMeasurement({ figure, bpm }) {
  return (
    <svg className="measurement" viewBox="0 0 584 650" aria-hidden="true">
      <image href={asset(figure)} width="584" height="650" preserveAspectRatio="none" />
      {/* Fade the photographed hearts into their respective screen backgrounds. */}
      <g className="measurement-dimmer" opacity="0">
        <rect x="393" y="176" width="53" height="49" fill="white" />
        <rect x="104" y="425" width="45" height="40" fill="black" />
      </g>
      <g fontFamily="ui-rounded, 'SF Pro Rounded', 'Arial Rounded MT Bold', system-ui, sans-serif" fontWeight="700" textAnchor="end">
        <rect x="355" y="245" width="84" height="63" fill="white" />
        <text x="436" y="297" fontSize="62" textLength="73" lengthAdjust="spacingAndGlyphs">{bpm}</text>
        <rect x="71" y="478" width="73" height="56" fill="black" />
        <text x="141" y="528" fontSize="58" textLength="65" lengthAdjust="spacingAndGlyphs" fill="white">{bpm}</text>
      </g>
      <rect x="375" y="455" width="16" height="20" fill="#ecf8ee" />
      <text x="376" y="470" fontFamily="system-ui, sans-serif" fontSize="12" textLength="14" lengthAdjust="spacingAndGlyphs" fill="#808780">{bpm}</text>
    </svg>
  )
}
