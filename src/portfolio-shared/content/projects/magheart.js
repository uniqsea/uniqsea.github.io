// MagHeart: brand, opener and pages. Schema: see content/index.js.

export default {
  key: 'magheart',
  pubId: 'p2',
  name: 'MagHeart',
  place: 'Barcelona, Spain',
  brand: { c: '#FF4B33', deep: '#E0392A', tint: '#FFF1EC' },
  logo: { src: 'mh-logo-t.png', w: '16mm', h: '20mm' },
  stages: ['Problem', 'Design', 'Interaction', 'Evaluation'],
  role: 'Interaction and system design of the icebreaking app, full-stack development; contributed to the hardware prototype.',
  extraLinks: [{ label: 'GitHub', href: 'https://github.com/BlackThompson/MagHeart' }],
  opener: {
    image: 'mh-figure-cut.jpg', fit: 'contain', bg: '#fff',
    intro: 'A playful icebreaker for hybrid meetings: build a LEGO avatar together, and feel your remote colleague\'s heartbeat in the room.',
  },
  pages: [
    {
      section: 'Problem',
      stage: 'Problem',
      center: true,
      rows: [
        {
          cells: [
            {
              cols: [1, 7],
              stack: [
                { h: 'Small talk happens in the room, not on the screen' },
                { lead: 'Hybrid meetings often begin with social awkwardness and uneven participation. Small talk flows among those in the room, while remote attendees struggle to find a moment to join, and that imbalance can shape the rest of the meeting.' },
                { p: 'Icebreakers could help, but most assume a shared room or rely on talking. We wondered if something non-verbal could work: feeling a remote colleague\'s heartbeat, so a little nervousness becomes something shared rather than hidden. Heart rate is personal, though, and at work that needs care.' },
              ],
            },
            { cols: [9, 12], stack: [{ fig: 'mh-heartrate.jpg', cap: 'Heart rate streams from an Apple Watch to the MagHeart app.' }] },
          ],
        },
        {
          cells: [
            { cols: [1, 4], stack: [{ h3: 'Three goals for a symmetric icebreaker' }] },
            { cols: [5, 12], stack: [{ ordered: [
              ['Lower the barrier', ': quiet, non-verbal ways to join in from the first minute.'],
              ['Make the remote person present', ': visible and physical in the room, with a say in what happens.'],
              ['Share a heartbeat, gently', ': heart rate as an ambient rhythm, not a number to analyse.'],
            ], columns: 3 }] },
          ],
        },
      ],
    },
    {
      section: 'Device',
      stage: 'Design',
      rows: [
        {
          align: 'end',
          cells: [
            { cols: [1, 5], stack: [{ h: 'A heartbeat you can hold' }] },
            { cols: [6, 12], stack: [{ p: 'An electromagnet hidden in the base pulses with the remote participant\'s heart rate, driven by an ESP32. Hold the magnet over the acrylic surface, and you feel each beat in your hand.' }] },
          ],
        },
        {
          align: 'stretch',
          cells: [
            { cols: [1, 9], stack: [{ fig: 'mh-exploded-v.jpg', cap: ['Physical display.', 'PETG cylindrical base with permanent magnet, electromagnet, transparent cast acrylic surface, and medium-density fiberboard base.'] }] },
            { cols: [10, 12], stack: [], bottom: [{ fig: 'mh-minifigure.svg', cap: ['Persistent presence.', 'After co-creation, the remote participant\'s LEGO avatar stands on the base and moves to their heartbeat.'] }] },
          ],
        },
      ],
    },
    {
      section: 'Interaction flow',
      stage: 'Interaction',
      center: true,
      rows: [
        {
          align: 'end',
          cells: [
            { cols: [1, 6], stack: [{ h: 'From a pulse to a persistent presence' }] },
            { cols: [7, 12], stack: [{ p: 'The icebreaker unfolds in three stages, from a first connection to a presence that lasts for the rest of the meeting.' }] },
          ],
        },
        {
          align: 'end',
          cells: [
            { cols: [1, 3], stack: [{ fig: 'mh-hold-cut.jpg' }] },
            { cols: [4, 9], stack: [{ fig: 'mh-flow.jpg' }] },
            { cols: [10, 12], stack: [{ fig: 'mh-figure-cut.jpg' }] },
          ],
        },
        {
          tight: true,
          cells: [
            { cols: [1, 3], stack: [{ step: { n: 1, title: 'Feel the heartbeat', text: 'People in the room hold the magnet and feel the remote participant\'s real-time heartbeat, streamed from an Apple Watch.' } }] },
            { cols: [4, 9], stack: [{ step: { n: 2, title: 'Build an avatar together', text: 'In the app, both sides answer prompt cards that become shared context, build a LEGO avatar of the remote participant, then show and discuss it.' } }] },
            { cols: [10, 12], stack: [{ step: { n: 3, title: 'Stay present', text: 'The finished figure stays on the base and moves with the remote participant\'s heart rate for the rest of the meeting.' } }] },
          ],
        },
      ],
    },
    {
      section: 'Scenario-based study · N = 34',
      stage: 'Evaluation',
      rows: [
        {
          align: 'stretch',
          cells: [
            {
              cols: [1, 4],
              stack: [
                { h: 'Anticipated engagement, from both sides of the screen' },
                { p: 'A pre–post scenario-based online survey, in which participants reflected on hybrid meetings from both co-located and remote perspectives before and after a demo of MagHeart.' },
              ],
              bottom: [
                { findings: [
                  ['Playful co-creation as a low-pressure icebreaker', ', shifting early interaction from forced small talk to a shared task.'],
                  ['Tangible and embodied cues enhancing perceived presence', '; remote participants seen as less likely to be overlooked.'],
                  ['Tensions around privacy, distraction, and contextual fit', '; heart rate is a sensitive and ambiguous signal.'],
                ] },
              ],
            },
            {
              cols: [6, 12],
              stack: [
                { fig: 'mh-res-co.jpg' },
                { fig: 'mh-res-remote.jpg', cap: ['Pre–post comparison', ' of anticipated embarrassment, anxiety, low participation, and low speaking intent: co-located (top) and remote (bottom) perspectives. 7-point Likert; lower is better.'] },
              ],
            },
          ],
        },
      ],
    },
  ],
}
