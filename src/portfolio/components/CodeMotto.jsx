// The motto at the top of the hero, written as a loop.
// It types itself in once; then the loop "runs". What ai.blurs is the line between the disciplines:
// now and then the quotes and commas between the three strings blur and close up, and the list of
// three becomes a list of one, ai.blurs(["product design engineering"]), the words in one colour.
// ai.blurs stays on screen throughout, since it is what does the blurring. Then they part again.
// Nothing leaves a hole, and the block keeps its width.
// A highlight steps between me.learn() and me.build(), round and round.
// Every character is laid out from the start, so typing never moves the page.
// Readers who prefer reduced motion get the finished, still block.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useReducedMotion } from 'motion/react'

/* The three strings. Only the boundaries inside the list (a closing quote, ", ", an opening quote)
   close up; the outer quotes stay, so the merged result is one string. */
const Q = (n) => ['"', `str oq g${n}`] // an outer quote moves with its word
const SEP_Q = ['"', 'str sep']
const MID = [', ', 'sep mid'] // closes up to a single space between two words
const WORD = (word, n) => [word, `w w${n} g${n}`]
const HEAD = [['while', 'kw'], [' ai.', ''], ['blurs', 'fn'], ['([', '']]
const TAIL = [[']):', '']]
const WIDE = [
  [...HEAD, Q(1), WORD('product', 1), SEP_Q, MID, SEP_Q, WORD('design', 2), SEP_Q, MID, SEP_Q, WORD('engineering', 3), Q(3), ...TAIL],
  [['    me.', ''], ['learn', 'fn'], ['()', '']],
  [['    me.', ''], ['build', 'fn'], ['()', '']],
]
/* On phones the list breaks over lines, the way a formatter would wrap it, instead of scrolling sideways. */
const NARROW = [
  HEAD,
  [['    ', ''], Q(1), WORD('product', 1), SEP_Q, [',', 'sep']],
  [['    ', ''], SEP_Q, WORD('design', 2), SEP_Q, [',', 'sep']],
  [['    ', ''], SEP_Q, WORD('engineering', 3), Q(3), [',', 'sep']],
  TAIL,
  [['    me.', ''], ['learn', 'fn'], ['()', '']],
  [['    me.', ''], ['build', 'fn'], ['()', '']],
]
const count = (lines) => lines.flat().reduce((n, [t]) => n + t.length, 0)
const PHONE = '(max-width: 600px)'
const useNarrow = () => {
  const [narrow, setNarrow] = useState(() => window.matchMedia(PHONE).matches)
  useEffect(() => {
    const mq = window.matchMedia(PHONE)
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return narrow
}
const STEP = 1.6 // seconds per loop body line

const CYCLE = 8 // seconds; apart most of the time, merged for a stretch in the middle
const close = keyframes`
  0%, 30%, 78%, 100% { max-width: var(--w); opacity: 1; filter: blur(0); }
  46%, 62% { max-width: var(--to, 0); opacity: 0; filter: blur(3px); }
`
/* ", " → " ": the comma fades out without blurring (it ends as a plain space). */
const join = keyframes`
  0%, 30%, 78%, 100% { max-width: var(--w); color: inherit; }
  46%, 62% { max-width: 1ch; color: transparent; }
`
const drift = keyframes`
  0%, 30%, 78%, 100% { transform: none; }
  46%, 62% { transform: translate(var(--dx, 0), var(--dy, 0)); }
`
const ink = keyframes`
  0%, 30%, 78%, 100% { color: var(--own); transform: none; }
  46%, 62% { color: var(--one); transform: translate(var(--dx, 0), var(--dy, 0)); }
`
const step = keyframes`
  0%, 46% { background: var(--hl); }
  50%, 96% { background: transparent; }
`
const blink = keyframes`50% { opacity: 0; }`

const Block = styled.pre`
  --hl: rgba(17, 17, 17, 0.06);
  margin: 0; padding: 14px 0; width: fit-content; max-width: 100%; overflow-x: auto;
  font: 500 clamp(12.5px, 1.35vw, 15px)/1.75 ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  color: var(--fg); background: var(--alt); border: 1px solid var(--line); border-radius: 12px;
  .ln { display: block; padding: 0 22px 0 0; border-radius: 4px; }
  .ln::before { content: attr(data-n); display: inline-block; width: 40px; padding-right: 14px; text-align: right; color: rgba(17, 17, 17, 0.28); user-select: none; }
  .kw { color: #8a3ffc; }
  .fn { color: #0f62fe; }
  .str { color: var(--muted); }
  --one: var(--fg); /* the merged string: one ink, not any one discipline's colour */
  .w { display: inline-block; color: var(--own); }
  .w1 { --own: #1a7f5a; }
  .w2 { --own: #c2185b; }
  .w3 { --own: #b45309; }
  .sep { display: inline-block; white-space: pre; overflow: hidden; vertical-align: bottom; }
  .oq { display: inline-block; }
  &.narrow .g1 { --dx: -1ch; --dy: 0.6em; }  /* one word per line on phones: the outer two come in towards the middle, the opening quote hanging so the words line up */
  &.narrow .g3 { --dy: -0.6em; }
  .todo { visibility: hidden; }
  .caret { position: relative; display: inline-block; width: 0; height: 1.15em; vertical-align: -0.2em; }
  .caret::after { content: ''; position: absolute; inset: 0 auto 0 0; width: 0.55em; background: var(--fg); opacity: 0.75; animation: ${blink} 1s steps(1) infinite; }

  &.run .sep { animation: ${close} ${CYCLE}s ease-in-out infinite; }
  &.run .mid { animation: ${join} ${CYCLE}s ease-in-out infinite; }
  &.run .oq { animation: ${drift} ${CYCLE}s ease-in-out infinite; }
  &.run .w { animation: ${ink} ${CYCLE}s ease-in-out infinite; }
  &.run .body { animation: ${step} ${STEP * 2}s steps(1) infinite; }
  &.run .body + .body { animation-delay: ${STEP}s; }
  @media (max-width: 600px) { .ln::before { width: 28px; padding-right: 10px; } }
`

export default function CodeMotto() {
  const reduce = useReducedMotion()
  const narrow = useNarrow()
  const lines = narrow ? NARROW : WIDE
  const [typed, setTyped] = useState(reduce ? Infinity : 0)

  useEffect(() => {
    if (reduce) { setTyped(Infinity); return undefined }
    const total = Math.max(count(WIDE), count(NARROW)) // either layout may be showing by the end
    let id
    const start = setTimeout(() => {
      id = setInterval(() => setTyped((n) => (n >= total ? (clearInterval(id), Infinity) : n + 1)), 28)
    }, 450)
    return () => { clearTimeout(start); clearInterval(id) }
  }, [reduce])

  const done = typed >= count(lines)

  /* Hold the block at its full width while the first line closes up (re-measured when the font scales). */
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const hold = () => { el.style.minWidth = ''; el.style.minWidth = `${el.offsetWidth}px` }
    hold()
    window.addEventListener('resize', hold)
    return () => window.removeEventListener('resize', hold)
  }, [lines])
  let left = typed
  return (
    <Block className={`${narrow ? 'narrow' : 'wide'}${done && !reduce ? ' run' : ''}`} ref={ref} aria-label='while ai.blurs(["product", "design", "engineering"]): me.learn(); me.build()'>
      {lines.map((tokens, i) => (
        <span key={i} className={`ln${i >= lines.length - 2 ? ' body' : ''}`} data-n={i + 1} aria-hidden>
          {tokens.map(([text, cls], j) => {
            const shown = Math.max(0, Math.min(text.length, left))
            const caretHere = !done && left >= 0 && left <= text.length && shown < text.length
            left -= text.length
            return (
              <span key={j} className={cls || undefined} style={cls.includes('sep') ? { '--w': `${text.length}ch` } : undefined}>
                {text.slice(0, shown)}
                {caretHere && <span className="caret" />}
                {shown < text.length && <span className="todo">{text.slice(shown)}</span>}
              </span>
            )
          })}
        </span>
      ))}
    </Block>
  )
}
