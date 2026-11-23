// TeethMark: brand, opener and pages. Schema: see content/index.js.

export default {
  key: 'teethmark',
  pubId: 'p3',
  name: 'TeethMark',
  place: 'Detroit, MI, USA',
  brand: { c: '#14B8A6', deep: '#0F756E', tint: '#E8F8F5' },
  logo: { src: 'tm-logo.svg', w: '20mm', h: '20mm' },
  stages: ['Background', 'Formative study', 'Design', 'System', 'Validation', 'Applications'],
  role: 'Formative study, design and development of the device software architecture, study interfaces, and the language, VR, therapy and cycling applications.',
  opener: {
    image: 'tm-braces-pair.jpg', fit: 'contain', bg: '#000101', pad: '0',
    intro: 'An interactive brace that lets the tongue tap, slide and press on individual teeth, and feel electrotactile feedback in return.',
  },
  pages: [
    {
      section: 'Background',
      stage: 'Background',
      center: true,
      rows: [
        { cells: [{ cols: [1, 9], stack: [{ display: 'What if your teeth became a touch surface?' }] }] },
        {
          cells: [
            { cols: [1, 4], stack: [{ lead: 'Sometimes our hands are busy, our eyes are elsewhere, and speaking out loud is not an option. The mouth offers another channel.' }] },
            { cols: [5, 8], stack: [{ p: 'The tongue is dexterous and sensitive enough to act as both an input and an output surface. The teeth are natural landmarks: the tongue can find each one without looking, and feels where it is.' }] },
            { cols: [9, 12], stack: [{ p: 'Earlier tongue–tooth systems sensed only coarse areas and used the tongue only for input. TeethMark goes down to individual teeth, and talks back: gestures go in, sensations come out.' }] },
          ],
        },
      ],
    },
    {
      section: 'Formative study · 14 participants',
      stage: 'Formative study',
      rows: [
        {
          align: 'stretch',
          cells: [
            {
              cols: [1, 4],
              stack: [
                { h: 'Where should the tongue touch?' },
                { p: 'To investigate which tooth locations are most physically and socially comfortable for tongue gestures, we examined three gestures on 32 tooth locations across surfaces (tongue- vs. lip-facing) and jaws (upper vs. lower), rated for perceived accuracy, physical comfort, and social acceptance.' },
              ],
              bottom: [
                { findings: [
                  ['Users favor the inner side of the teeth', ', so input sits on the inner tooth surfaces.'],
                  ['Gesture preference varies from person to person', ', so TeethMark supports tapping, sliding, and area-touch.'],
                  ['Teeth guide the tongue, but not precisely', ', so electrotactile cues help it find the right tooth.'],
                  ['Comfort differs between individuals', ', so each brace can be customized.'],
                ] },
              ],
            },
            { cols: [5, 12], stack: [{ fig: 'tm-fig-formative.png', cap: '(a) Diagram illustrating the distribution of teeth and the five tooth types: incisor, canine, premolar, molar, wisdom. (b) Heat map of study results showing perceived accuracy, physical comfort, and social acceptance ratings for performing tapping, sliding, and area-touch gestures across different tooth locations, measured on a 7-point Likert scale.' }] },
          ],
        },
      ],
    },
    {
      section: 'Interaction concepts',
      stage: 'Design',
      rows: [
        { cells: [{ cols: [1, 12], stack: [{ h: 'Gestures in, sensations out' }] }] },
        { cells: [{ cols: [1, 12], stack: [{ fig: 'tm-fig-concept.png' }] }] },
        {
          // text sits under the two halves of the figure
          template: '44.6% minmax(0, 1fr)',
          cells: [
            {
              stack: [
                { label: 'Tongue input gestures' },
                { bullets: [
                  ['Tapping', ' — the tongue tip makes contact with a single tooth.'],
                  ['Sliding', ' — the tongue tip glides along adjacent teeth within the same row, enabling continuous directional sensing.'],
                  ['Area-touch', ' — the tongue tip or a broader tongue surface contacts multiple adjacent teeth simultaneously.'],
                ] },
              ],
            },
            {
              stack: [
                { label: 'Electrotactile feedback modes' },
                { bullets: [
                  ['Co-located feedback (tongue-facing)', ' — positioned on the tongue-facing side of the teeth, the output electrodes are shared with the input electrodes.'],
                  ['Always-available feedback (lip-facing)', ' — positioned on the lip-facing side of the teeth, where they remain in continuous contact with the inner lip.'],
                  ['Four perceptual dimensions', ' — direction, intensity, rhythm, and continuity.'],
                ] },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'System',
      stage: 'System',
      rows: [
        { cells: [{ cols: [1, 7], stack: [{ h: 'Teeth as landmarks, the tongue as the interface' }] }] },
        { cells: [{ cols: [1, 12], stack: [{ fig: 'tm-fig-system.jpg', cap: '(a) TeethMark schematic: a customized 3D-printed brace with an attached flexible PCB, which includes four electrode arrays. (b) The fabricated TeethMark brace. (c) Wearing the TeethMark brace.' }] }] },
        {
          cells: [
            { cols: [1, 4], stack: [{ h3: 'Brace and circuit' }, { p: 'A flexible PCB on a 3D-printed brace, extending out of the mouth to the electronics.' }] },
            { cols: [5, 8], stack: [{ h3: 'Two electrodes per tooth' }, { p: 'One senses input and delivers output, the other is ground. Feedback is co-located on the tongue side and always available on the lip side.' }] },
            { cols: [9, 12], stack: [{ h3: 'Sensing' }, { p: 'An ESP32 reads capacitance. A short calibration records each sensor\'s maximum; a touch fires at 70% of it.' }] },
          ],
        },
      ],
    },
    {
      section: 'Validation study · 12 participants',
      stage: 'Validation',
      rows: [
        {
          align: 'stretch',
          cells: [
            {
              cols: [1, 4],
              stack: [
                { h: 'Gesture input and feedback perception' },
                { p: 'We used Processing to acquire raw data from the microcontroller and visualize real-time tongue movements and gesture recognition. A React-based interface presented gesture and sensory feedback tasks, receiving captured gesture events from a FastAPI backend.' },
              ],
              bottom: [
                { stats: [
                  ['Sliding', '94.92%'], ['Area touch', '92.78%'], ['Tapping', '82.92%'],
                  ['Directional cues', '99.17%'], ['Positional cues, tongue / lip side', '95.83 / 91.25%'],
                ] },
              ],
            },
            {
              cols: [5, 12],
              stack: [
                { fig: 'tm-fig-interfaces.jpg', cap: '(a) The Processing interface developed for real-time visualization of tongue movements and gesture recognition. (b) The interface used in the study to provide prompts to participants and record recognized gestures and timing data.' },
                { fig: 'tm-fig-results.png', cap: '(a) Accuracy and reaction time of three gestures. (b) Comparison of positional and directional electrotactile feedback perception on the lip-facing and tongue-facing sides.' },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'Application · Language education',
      stage: 'Applications',
      rows: [
        {
          cells: [
            { cols: [1, 4], stack: [{ h: 'Seeing where the tongue goes' }] },
            { cols: [5, 8], stack: [{ p: 'We designed specific sensor layouts for the upper and lower teeth to detect tongue positions relevant to language-specific pronunciations, along with an on-screen interface that visualizes in real time which teeth the tongue is touching.' }] },
            { cols: [9, 12], stack: [{ p: 'In a demonstration session, a language learner wore the device while practicing Danish phonemes such as l, d, and r under the guidance of an experienced teacher with 13 years of teaching experience.' }] },
          ],
        },
        { cells: [{ cols: [5, 12], stack: [{ quote: 'I like very much that this could visualize to my students what I try to explain... because I can hear it, but sometimes it’s hard to explain.', by: 'The language teacher, after the session' }] }] },
        {
          // the two images share one height: column widths follow their ratios
          template: '1.593fr 1.5fr',
          cells: [
            { stack: [{ fig: 'tm-language-ui.jpg', cap: 'A real-time interface that visualizes tongue–tooth contact and tongue position in a side view.' }] },
            { stack: [{ fig: 'tm-language-session.jpg', cap: 'A demonstration session featuring a language teacher instructing with the TeethMark brace.' }] },
          ],
        },
      ],
    },
    {
      section: 'Application · VR sensory sharing & gamified therapy',
      stage: 'Applications',
      rows: [
        {
          cells: [
            { cols: [1, 12], stack: [{ h: 'Feeling virtual worlds through the mouth' }, { lead: 'In **social VR**, holding the tongue on the front teeth makes the avatar drink, while electrotactile pulses on the tongue feel like champagne bubbles; a “kissing” emoji arrives as a light tingle on the lips. A Unity shooting game turns **myofunctional therapy** into play, training tongue flexibility and oral perception.', columns: 2 }] },
          ],
        },
        { cells: [{ cols: [1, 12], stack: [{ fig: 'tm-fig-vr.jpg', cap: '(a) TeethMark in VR social interaction. Long area-touch triggers a drinking action with bubble-like tactile feedback. (b) A “kissing” emoji delivers lip feedback; users reply with a double tap. (c) Gamified myofunctional therapy. Area-touch fires lasers with continuous feedback; hits are signaled on the lips.' }] }] },
      ],
    },
    {
      section: 'Application · Everyday use',
      stage: 'Applications',
      center: true,
      rows: [
        {
          cells: [
            { cols: [1, 4], stack: [{ h: 'Hands on the handlebars' }] },
            { cols: [5, 8], stack: [{ p: 'On a bike, hands stay on the bars and eyes stay on the road. Directional pulses on the lips give turn-by-turn navigation, switched on and off with a long area-touch.' }] },
            { cols: [9, 12], stack: [{ p: 'When a call comes in, a lip alert signals it: slide left to reject, or slide right to reply with a message.' }] },
          ],
        },
        {
          align: 'end',
          cells: [
            { cols: [1, 9], stack: [{ fig: 'tm-fig-bike.jpg' }] },
            { cols: [10, 12], stack: [{ cap: '(c) Lip directional feedback provides biking navigation cues, toggled by long area-touch. (d) Calls are managed via lip feedback alerts, with sliding to reject or reply.' }, { note: 'TeethMark can also control fabrication tools hands-free, such as zooming a microscope or toggling a UV light.' }] },
          ],
        },
      ],
    },
  ],
}
