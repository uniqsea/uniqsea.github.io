// Inline markup used in page copy: **bold** and *italic*.
export const rich = (t) => t.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) =>
  part.startsWith('**') ? <b key={i}>{part.slice(2, -2)}</b>
    : part.startsWith('*') && part.length > 2 ? <i key={i}>{part.slice(1, -1)}</i>
      : part)

/* A [bold lead, rest] pair as a list item (keyed by position, so it survives a language switch). */
export const pair = ([b, t], i) => <li key={i}><span><b>{b}</b>{t}</span></li>

/* A caption is either plain text or [bold title, text]. */
export const captionParts = (c) => (typeof c === 'string' ? [null, c] : c)

/* The space after a caption's bold title: none when it ends in a Chinese full stop or Han character. */
export const gap = (title) => (/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]$/.test(title) ? '' : ' ')
