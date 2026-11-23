// EchoMind: brand, opener and pages. Schema: see content/index.js.

export default {
  key: 'echomind',
  pubId: 'p4',
  name: 'EchoMind',
  place: 'Vaasa, Finland',
  brand: { c: '#2E5FA3', deep: '#2E5FA3', tint: '#EEF3FA' },
  logo: { src: 'em-logo.svg', w: '18mm', h: '20mm' },
  stages: ['Problem', 'Design', 'System', 'Evaluation'],
  role: 'Interaction design, system design, full-stack development, questionnaire design, and running the evaluation.',
  opener: {
    image: 'em-cover.jpg', fit: 'contain', bg: '#fff',
    intro: 'A video player that lets viewers ask a recorded talk their questions, and see where others got stuck.',
  },
  pages: [
    {
      section: 'Problem',
      stage: 'Problem',
      center: true,
      rows: [
        {
          align: 'center',
          cells: [
            { cols: [1, 6], stack: [{ h: 'The speaker isn\'t here. Only the recording is.' }, { lead: 'Imagine a talk where the speaker can\'t make it, so you watch the recording instead. The slides and the explanation are all still there. What is missing?' }] },
            { cols: [7, 12], stack: [{ fig: 'em-scenario.jpg' }] },
          ],
        },
        {
          cells: [{ cols: [1, 12], stack: [{ checks: [
            ['Learner–Content', 'You can still follow the slides and explanations.', true],
            ['Learner–Instructor', 'But what if you have a question while watching?', false],
            ['Learner–Learner', 'How do you know whether others are confused too?', false],
          ] }] }],
        },
        { cells: [{ cols: [1, 12], stack: [{ ask: 'How can a recorded presentation remain interactive across time?' }] }] },
      ],
    },
    {
      section: 'Viewer interface',
      stage: 'Design',
      rows: [
        {
          align: 'end',
          cells: [
            { cols: [1, 6], stack: [{ h: 'Ask the video, and see who else is stuck' }] },
            { cols: [7, 12], stack: [{ p: 'When viewers have a question, the video is automatically paused so they can ask an agent that has access to the current position in the video, the presentation materials, and the accumulated viewer signals.' }] },
          ],
        },
        {
          cells: [
            { cols: [1, 8], stack: [{ fig: 'em-ui.jpg', cap: ['Viewer interface.', 'Conversational agent beside the video, emoji reactions below the player, and a reaction-intensity timeline aligned with playback.'] }] },
            {
              cols: [9, 12],
              stack: [
                { bullets: [
                  ['Ask in context.', ' The video pauses and the agent answers from the current moment of the talk.'],
                  ['See collective signals.', ' Reactions and playback traces show where earlier viewers struggled.'],
                  ['Grounded answers.', ' Every answer cites the transcript, the slides, or the supplementary materials.'],
                  ['Escalate when needed.', ' An unresolved question can be forwarded to the speaker.'],
                ] },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'Speaker dashboard',
      stage: 'Design',
      rows: [
        {
          cells: [
            { cols: [1, 4], stack: [{ h: 'Evidence the speaker can act on' }] },
            { cols: [5, 8], stack: [{ p: 'The speaker dashboard provides post-hoc analytics linking engagement evidence to actionable improvements. The main area presents analytics and the knowledge base; a sidebar keeps the video player accessible for precise navigation.' }] },
            { cols: [9, 12], stack: [{ p: 'Questions deemed appropriate are forwarded to the speaker dashboard. The escalation package includes the agent\'s preliminary answer, allowing speakers to revise rather than start from scratch.' }] },
          ],
        },
        {
          align: 'end',
          cells: [
            { cols: [1, 9], stack: [{ fig: 'em-dashboard.jpg' }] },
            { cols: [10, 12], stack: [{ cap: ['Speaker dashboard.', 'Engagement patterns, confusion hotspots, escalated questions awaiting response, and tools to augment the knowledge base.'] }] },
          ],
        },
      ],
    },
    {
      section: 'System architecture',
      stage: 'System',
      rows: [
        {
          cells: [
            {
              cols: [1, 4],
              stack: [
                { h: 'A knowledge base that grows with its audience' },
                { p: 'A static layer holds the slides, transcript, and supplementary materials uploaded by the speaker. A dynamic layer accumulates viewer interaction traces — playback behaviors, reactions, and questions — and supports future viewers.' },
              ],
            },
            { cols: [5, 12], stack: [{ fig: 'em-overview.svg', cap: ['Ecosystem.', 'Speaker dashboard, evolving knowledge base, current and future viewers.'] }] },
          ],
        },
        {
          align: 'end',
          cells: [
            { cols: [1, 8], stack: [{ fig: 'em-rag.jpg', cap: ['Q&A pipeline.', 'Time-window retrieval, structured prompt, and confidence-based escalation to the speaker.'] }] },
            {
              cols: [9, 12],
              stack: [
                { p: 'A RAG-based pipeline retrieves context from both layers around the current timestamp. Playback behaviors are weighted by how strongly they signal confusion, based on a formative study with 16 participants.' },
                { p: 'When the agent\'s confidence is low, the question escalates to the speaker, and approved answers flow back into the knowledge base.' },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'Between-subjects study · N = 75',
      stage: 'Evaluation',
      rows: [
        {
          cells: [
            {
              cols: [1, 4],
              stack: [
                { h: 'Grounding, not just a chatbot' },
                { p: 'Participants watched a 5-minute recorded lecture under one of three conditions: video-only, video with a generic LLM chatbot, and video with EchoMind.' },
              ],
            },
            { cols: [5, 12], stack: [{ fig: 'em-conditions.jpg' }] },
          ],
        },
        { cells: [{ cols: [1, 12], stack: [{ fig: 'em-fig-ratings.png', cap: ['Subjective ratings across conditions.', '(a) Learning process-related measures, including confusion clarification, engagement, reflection, expression, co-learning, and active learning. (b) Usability-related measures, including ease of use, satisfaction, perceived learning support, and future use. Significance levels are marked above bars (+: p < .1; *: p < .05; **: p < .01; ***: p < .001).'] }] }] },
        {
          cells: [
            { cols: [1, 4], stack: [{ bullets: [['EchoMind significantly improved the subjective learning experience', ', including confusion clarification, in-the-moment expression, and co-learning perception.']] }] },
            { cols: [5, 8], stack: [{ bullets: [['It did so without increasing perceived workload', '. The generic LLM condition did not significantly outperform video-only and received the lowest mean ratings on usability.']] }] },
            { cols: [9, 12], stack: [{ bullets: [['Contextual grounding and community awareness', ', rather than the presence of conversational AI alone, make AI a meaningful support in asynchronous video learning.']] }] },
          ],
        },
      ],
    },
  ],
}
