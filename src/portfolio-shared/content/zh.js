// Chinese copy for the interactive portfolio, keyed by the exact English string in the content files.
// localize() in portfolio/i18n.js swaps every string found here; anything missing stays in English.
// A value may also be an array: a project's role is listed item by item in Chinese.
// When you edit English copy in projects/*.js, profile.js or more.js, update its key here too.

export default {
  /* ---------- Profile ---------- */
  'Human-Computer Interaction': '人机交互',
  'M.Sc. Computer Science, Aarhus University': '奥胡斯大学 · 计算机科学硕士',
  'I am interested in how technology can enhance human experiences in everyday life, particularly within certain communities, and in creating interfaces that transform technology into creative and meaningful experiences.':
    '我关注技术如何提升人们的日常体验，尤其是特定群体的体验；也希望创造能把技术转化为富有创造力、有意义体验的界面。',

  /* ---------- Paper metadata (src/data/publications.js) ---------- */
  'Honorable Mention': '荣誉提名',
  'Enabling Tongue-Tooth Interaction with Capacitive Sensing and Electrotactile Feedback using an Intraoral Wearable':
    '基于电容感应与电触觉反馈的口内可穿戴舌–齿交互',
  'Augmenting Recorded Presentations with Context-Grounded Conversational Agents and Collective Viewer Signals':
    '以情境锚定的对话智能体与群体观看信号增强录播演讲',
  'Exploring Playful Avatar Co-Creation and Shared Heartbeats for Icebreaking in Hybrid Meetings':
    '在混合会议中以趣味化身共创与心跳共享破冰',
  'Detroit, MI, USA': '美国 · 底特律',
  'Vaasa, Finland': '芬兰 · 瓦萨',
  'Barcelona, Spain': '西班牙 · 巴塞罗那',

  /* ---------- More work ---------- */
  'A general-purpose agent with long-term memory that makes the context and memories behind every turn visible, editable, and traceable · Personal project':
    '一个具备长期记忆的通用智能体，让每一轮对话背后的上下文与记忆可见、可编辑、可追溯 · 个人项目',
  'A playful AR-based ceramic making game exploring embodied interaction and creative expression · Course project':
    '一款基于 AR 的趣味陶艺制作游戏，探索具身交互与创意表达 · 课程项目',
  'An assistive navigation system integrating IoT and computer vision, with vibration feedback through wearable devices · Course project':
    '融合物联网与计算机视觉的辅助导航系统，通过可穿戴设备提供振动反馈 · 课程项目',

  /* ---------- TeethMark ---------- */
  'Background': '背景',
  'Formative study': '形成性研究',
  'Design': '设计',
  'System': '系统',
  'Validation': '验证',
  'Applications': '应用',
  'Formative study, design and development of the device software architecture, study interfaces, and the language, VR, therapy and cycling applications.':
    ['形成性研究', '设备软件架构设计与开发', '实验界面', '应用开发：语言教学、VR、康复训练、骑行'],
  'An interactive brace that lets the tongue tap, slide and press on individual teeth, and feel electrotactile feedback in return.':
    '一副交互式牙套：舌头可以在单颗牙齿上点击、滑动和按压，并感受到电触觉反馈。',
  'What if your teeth became a touch surface?': '如果牙齿变成一块触控面板，会怎样？',
  'Sometimes our hands are busy, our eyes are elsewhere, and speaking out loud is not an option. The mouth offers another channel.':
    '有时双手腾不开，视线在别处，也不方便开口说话。口腔提供了另一条交互通道。',
  'The tongue is dexterous and sensitive enough to act as both an input and an output surface. The teeth are natural landmarks: the tongue can find each one without looking, and feels where it is.':
    '舌头足够灵活、敏感，既能作为输入面，也能作为输出面。牙齿是天然的地标：舌头无需目视就能找到每一颗，并感知自己的位置。',
  'Earlier tongue–tooth systems sensed only coarse areas and used the tongue only for input. TeethMark goes down to individual teeth, and talks back: gestures go in, sensations come out.':
    '以往的舌–齿系统只能感知粗略区域，且舌头仅用于输入。TeethMark 精确到单颗牙齿，并能“回应”：手势输入，感觉输出。',
  'Formative study · 14 participants': '形成性研究 · 14 名参与者',
  'Where should the tongue touch?': '舌头该触碰哪里？',
  'To investigate which tooth locations are most physically and socially comfortable for tongue gestures, we examined three gestures on 32 tooth locations across surfaces (tongue- vs. lip-facing) and jaws (upper vs. lower), rated for perceived accuracy, physical comfort, and social acceptance.':
    '为探究哪些牙齿位置在生理与社交层面最适合舌头手势，我们在 32 个牙齿位置上考察了三种手势，覆盖不同牙面（舌侧与唇侧）和上下颌，并由参与者评价感知准确度、身体舒适度和社会接受度。',
  'Users favor the inner side of the teeth': '用户偏好牙齿内侧',
  ', so input sits on the inner tooth surfaces.': '，因此输入设在牙齿内侧表面。',
  'Gesture preference varies from person to person': '手势偏好因人而异',
  ', so TeethMark supports tapping, sliding, and area-touch.': '，因此 TeethMark 同时支持点击、滑动和区域触碰。',
  'Teeth guide the tongue, but not precisely': '牙齿能引导舌头，但不够精确',
  ', so electrotactile cues help it find the right tooth.': '，因此用电触觉提示帮助舌头找到正确的牙齿。',
  'Comfort differs between individuals': '舒适度存在个体差异',
  ', so each brace can be customized.': '，因此每副牙套都可以定制。',
  '(a) Diagram illustrating the distribution of teeth and the five tooth types: incisor, canine, premolar, molar, wisdom. (b) Heat map of study results showing perceived accuracy, physical comfort, and social acceptance ratings for performing tapping, sliding, and area-touch gestures across different tooth locations, measured on a 7-point Likert scale.':
    '(a) 牙齿分布及五种牙齿类型示意图：切牙、尖牙、前磨牙、磨牙、智齿。(b) 研究结果热力图：在不同牙齿位置执行点击、滑动和区域触碰手势时的感知准确度、身体舒适度与社会接受度评分（7 点李克特量表）。',
  'Interaction concepts': '交互概念',
  'Gestures in, sensations out': '手势输入，感觉输出',
  'Tongue input gestures': '舌头输入手势',
  'Tapping': '点击',
  ' — the tongue tip makes contact with a single tooth.': ' —— 舌尖接触单颗牙齿。',
  'Sliding': '滑动',
  ' — the tongue tip glides along adjacent teeth within the same row, enabling continuous directional sensing.':
    ' —— 舌尖沿同一排相邻牙齿滑过，实现连续的方向感知。',
  'Area-touch': '区域触碰',
  ' — the tongue tip or a broader tongue surface contacts multiple adjacent teeth simultaneously.':
    ' —— 舌尖或更大面积的舌面同时接触多颗相邻牙齿。',
  'Electrotactile feedback modes': '电触觉反馈模式',
  'Co-located feedback (tongue-facing)': '同位反馈（舌侧）',
  ' — positioned on the tongue-facing side of the teeth, the output electrodes are shared with the input electrodes.':
    ' —— 位于牙齿舌侧，输出电极与输入电极共用。',
  'Always-available feedback (lip-facing)': '常驻反馈（唇侧）',
  ' — positioned on the lip-facing side of the teeth, where they remain in continuous contact with the inner lip.':
    ' —— 位于牙齿唇侧，与内唇持续接触。',
  'Four perceptual dimensions': '四个感知维度',
  ' — direction, intensity, rhythm, and continuity.': ' —— 方向、强度、节奏和连续性。',
  'Teeth as landmarks, the tongue as the interface': '牙齿作地标，舌头作界面',
  '(a) TeethMark schematic: a customized 3D-printed brace with an attached flexible PCB, which includes four electrode arrays. (b) The fabricated TeethMark brace. (c) Wearing the TeethMark brace.':
    '(a) TeethMark 结构示意：定制的 3D 打印牙套，附有包含四组电极阵列的柔性 PCB。(b) 制作完成的 TeethMark 牙套。(c) 佩戴 TeethMark 牙套。',
  'Brace and circuit': '牙套与电路',
  'A flexible PCB on a 3D-printed brace, extending out of the mouth to the electronics.': '柔性 PCB 贴合在 3D 打印牙套上，延伸出口腔连接电子元件。',
  'Two electrodes per tooth': '每颗牙两个电极',
  'One senses input and delivers output, the other is ground. Feedback is co-located on the tongue side and always available on the lip side.':
    '一个负责感应输入并输出反馈，另一个接地。舌侧提供同位反馈，唇侧提供常驻反馈。',
  'Sensing': '感应',
  'An ESP32 reads capacitance. A short calibration records each sensor\'s maximum; a touch fires at 70% of it.':
    'ESP32 读取电容值。一次简短校准记录每个传感器的最大值，达到其 70% 即判定为触碰。',
  'Validation study · 12 participants': '验证研究 · 12 名参与者',
  'Gesture input and feedback perception': '手势输入与反馈感知',
  'We used Processing to acquire raw data from the microcontroller and visualize real-time tongue movements and gesture recognition. A React-based interface presented gesture and sensory feedback tasks, receiving captured gesture events from a FastAPI backend.':
    '我们用 Processing 从微控制器采集原始数据，实时可视化舌头运动与手势识别；基于 React 的界面呈现手势与感觉反馈任务，并从 FastAPI 后端接收捕获的手势事件。',
  'Area touch': '区域触碰',
  'Directional cues': '方向提示',
  'Positional cues, tongue / lip side': '位置提示，舌侧 / 唇侧',
  '(a) The Processing interface developed for real-time visualization of tongue movements and gesture recognition. (b) The interface used in the study to provide prompts to participants and record recognized gestures and timing data.':
    '(a) 用于实时可视化舌头运动与手势识别的 Processing 界面。(b) 研究中向参与者发出提示、记录识别手势与时间数据的界面。',
  '(a) Accuracy and reaction time of three gestures. (b) Comparison of positional and directional electrotactile feedback perception on the lip-facing and tongue-facing sides.':
    '(a) 三种手势的准确率与反应时间。(b) 唇侧与舌侧位置、方向电触觉反馈感知的对比。',
  'Application · Language education': '应用 · 语言教学',
  'Seeing where the tongue goes': '看见舌头的位置',
  'We designed specific sensor layouts for the upper and lower teeth to detect tongue positions relevant to language-specific pronunciations, along with an on-screen interface that visualizes in real time which teeth the tongue is touching.':
    '我们为上下牙设计了专门的传感器布局，用来检测与特定语言发音相关的舌位，并配有屏幕界面，实时显示舌头正接触哪些牙齿。',
  'In a demonstration session, a language learner wore the device while practicing Danish phonemes such as l, d, and r under the guidance of an experienced teacher with 13 years of teaching experience.':
    '在一次演示中，一位语言学习者佩戴设备，在拥有 13 年教龄的教师指导下练习 l、d、r 等丹麦语音素。',
  'I like very much that this could visualize to my students what I try to explain... because I can hear it, but sometimes it’s hard to explain.':
    '我非常喜欢它能把我想解释的东西直观地展示给学生……因为我听得出来，但有时很难讲清楚。',
  'The language teacher, after the session': '语言教师，演示结束后',
  'A real-time interface that visualizes tongue–tooth contact and tongue position in a side view.': '实时界面：以侧视图显示舌–齿接触与舌位。',
  'A demonstration session featuring a language teacher instructing with the TeethMark brace.': '演示现场：语言教师借助 TeethMark 牙套进行教学。',
  'Application · VR sensory sharing & gamified therapy': '应用 · VR 感官共享与游戏化康复',
  'Feeling virtual worlds through the mouth': '用嘴感受虚拟世界',
  'In **social VR**, holding the tongue on the front teeth makes the avatar drink, while electrotactile pulses on the tongue feel like champagne bubbles; a “kissing” emoji arrives as a light tingle on the lips. A Unity shooting game turns **myofunctional therapy** into play, training tongue flexibility and oral perception.':
    '在**社交 VR** 中，舌头抵住门牙，化身就会喝饮料，舌上的电触觉脉冲像香槟气泡；收到“亲吻”表情时，嘴唇会感到轻微的酥麻。一款 Unity 射击游戏把**口肌功能训练**变成游戏，锻炼舌头灵活度与口腔感知。',
  '(a) TeethMark in VR social interaction. Long area-touch triggers a drinking action with bubble-like tactile feedback. (b) A “kissing” emoji delivers lip feedback; users reply with a double tap. (c) Gamified myofunctional therapy. Area-touch fires lasers with continuous feedback; hits are signaled on the lips.':
    '(a) TeethMark 用于 VR 社交。长按区域触碰触发喝饮料动作，并伴有气泡般的触觉反馈。(b) “亲吻”表情通过嘴唇反馈传达，用户双击回应。(c) 游戏化口肌功能训练。区域触碰发射激光并伴随连续反馈，命中时嘴唇收到提示。',
  'Application · Everyday use': '应用 · 日常使用',
  'Hands on the handlebars': '双手不离车把',
  'On a bike, hands stay on the bars and eyes stay on the road. Directional pulses on the lips give turn-by-turn navigation, switched on and off with a long area-touch.':
    '骑车时，双手握着车把，目光留在路上。嘴唇上的方向脉冲提供逐向导航，长按区域触碰即可开关。',
  'When a call comes in, a lip alert signals it: slide left to reject, or slide right to reply with a message.':
    '来电时，嘴唇会收到提醒：向左滑动拒接，向右滑动回复短信。',
  '(c) Lip directional feedback provides biking navigation cues, toggled by long area-touch. (d) Calls are managed via lip feedback alerts, with sliding to reject or reply.':
    '(c) 嘴唇方向反馈提供骑行导航提示，长按区域触碰切换。(d) 通过嘴唇反馈提醒管理来电，滑动即可拒接或回复。',
  'TeethMark can also control fabrication tools hands-free, such as zooming a microscope or toggling a UV light.':
    'TeethMark 还能免手控制制造工具，例如缩放显微镜或开关紫外灯。',

  /* ---------- EchoMind ---------- */
  'Problem': '问题',
  'Evaluation': '评估',
  'Interaction design, system design, full-stack development, questionnaire design, and running the evaluation.':
    ['交互设计', '系统设计', '全栈开发', '问卷设计与用户评估'],
  'A video player that lets viewers ask a recorded talk their questions, and see where others got stuck.':
    '一个视频播放器：观众可以向录播演讲提问，也能看到其他人在哪里卡住了。',
  'The speaker isn\'t here. Only the recording is.': '讲者不在场，只有录像在。',
  'Imagine a talk where the speaker can\'t make it, so you watch the recording instead. The slides and the explanation are all still there. What is missing?':
    '想象一场讲者无法到场的演讲，你只能看录像。幻灯片和讲解都还在，那缺了什么？',
  'Learner–Content': '学习者–内容',
  'You can still follow the slides and explanations.': '你仍然可以跟着幻灯片和讲解学习。',
  'Learner–Instructor': '学习者–讲者',
  'But what if you have a question while watching?': '但看的过程中有问题怎么办？',
  'Learner–Learner': '学习者–学习者',
  'How do you know whether others are confused too?': '你怎么知道别人是不是也没看懂？',
  'How can a recorded presentation remain interactive across time?': '录播演讲如何跨越时间保持互动？',
  'Viewer interface': '观众界面',
  'Ask the video, and see who else is stuck': '向视频提问，看看还有谁卡住了',
  'When viewers have a question, the video is automatically paused so they can ask an agent that has access to the current position in the video, the presentation materials, and the accumulated viewer signals.':
    '观众有疑问时，视频会自动暂停，让他们向智能体提问；智能体能获取视频当前位置、演讲材料以及累积的观众信号。',
  'Viewer interface.': '观众界面。',
  'Conversational agent beside the video, emoji reactions below the player, and a reaction-intensity timeline aligned with playback.':
    '视频旁是对话智能体，播放器下方是表情反应，以及与播放进度对齐的反应强度时间轴。',
  'Ask in context.': '在情境中提问。',
  ' The video pauses and the agent answers from the current moment of the talk.': '视频暂停，智能体基于演讲的当前时刻作答。',
  'See collective signals.': '看见群体信号。',
  ' Reactions and playback traces show where earlier viewers struggled.': '反应与播放轨迹显示了先前观众在哪里遇到困难。',
  'Grounded answers.': '有据可依的回答。',
  ' Every answer cites the transcript, the slides, or the supplementary materials.': '每个回答都会引用讲稿、幻灯片或补充材料。',
  'Escalate when needed.': '必要时转交讲者。',
  ' An unresolved question can be forwarded to the speaker.': '未解决的问题可以转给讲者。',
  'Speaker dashboard': '讲者仪表盘',
  'Evidence the speaker can act on': '讲者可据此行动的证据',
  'The speaker dashboard provides post-hoc analytics linking engagement evidence to actionable improvements. The main area presents analytics and the knowledge base; a sidebar keeps the video player accessible for precise navigation.':
    '讲者仪表盘提供事后分析，把参与度证据与可执行的改进联系起来。主区域展示分析结果与知识库，侧边栏保留视频播放器，便于精确定位。',
  'Questions deemed appropriate are forwarded to the speaker dashboard. The escalation package includes the agent\'s preliminary answer, allowing speakers to revise rather than start from scratch.':
    '符合条件的问题会被转到讲者仪表盘。转交内容附带智能体的初步回答，讲者只需修改，而不必从头作答。',
  'Speaker dashboard.': '讲者仪表盘。',
  'Engagement patterns, confusion hotspots, escalated questions awaiting response, and tools to augment the knowledge base.':
    '参与模式、困惑热点、待回复的转交问题，以及扩充知识库的工具。',
  'System architecture': '系统架构',
  'A knowledge base that grows with its audience': '随观众一同成长的知识库',
  'A static layer holds the slides, transcript, and supplementary materials uploaded by the speaker. A dynamic layer accumulates viewer interaction traces — playback behaviors, reactions, and questions — and supports future viewers.':
    '静态层存放讲者上传的幻灯片、讲稿和补充材料；动态层累积观众的交互痕迹——播放行为、反应与提问——为后来的观众提供支持。',
  'Ecosystem.': '生态系统。',
  'Speaker dashboard, evolving knowledge base, current and future viewers.': '讲者仪表盘、持续演进的知识库、当前与未来的观众。',
  'Q&A pipeline.': '问答流程。',
  'Time-window retrieval, structured prompt, and confidence-based escalation to the speaker.': '时间窗检索、结构化提示，以及基于置信度向讲者转交。',
  'A RAG-based pipeline retrieves context from both layers around the current timestamp. Playback behaviors are weighted by how strongly they signal confusion, based on a formative study with 16 participants.':
    '基于 RAG 的流程围绕当前时间戳从两层中检索上下文。根据一项 16 人的形成性研究，播放行为按其反映困惑的强弱加权。',
  'When the agent\'s confidence is low, the question escalates to the speaker, and approved answers flow back into the knowledge base.':
    '当智能体置信度较低时，问题会转交讲者；经讲者认可的回答再回流到知识库。',
  'Between-subjects study · N = 75': '组间实验 · N = 75',
  'Grounding, not just a chatbot': '关键在情境锚定，而不只是聊天机器人',
  'Participants watched a 5-minute recorded lecture under one of three conditions: video-only, video with a generic LLM chatbot, and video with EchoMind.':
    '参与者在三种条件之一下观看一段 5 分钟的录播讲座：仅视频、视频加通用 LLM 聊天机器人、视频加 EchoMind。',
  'Subjective ratings across conditions.': '各条件下的主观评分。',
  '(a) Learning process-related measures, including confusion clarification, engagement, reflection, expression, co-learning, and active learning. (b) Usability-related measures, including ease of use, satisfaction, perceived learning support, and future use. Significance levels are marked above bars (+: p < .1; *: p < .05; **: p < .01; ***: p < .001).':
    '(a) 学习过程相关指标，包括困惑澄清、投入度、反思、表达、共同学习和主动学习。(b) 可用性相关指标，包括易用性、满意度、感知学习支持和未来使用意愿。柱上标注显著性水平（+: p < .1；*: p < .05；**: p < .01；***: p < .001）。',
  'EchoMind significantly improved the subjective learning experience': 'EchoMind 显著改善了主观学习体验',
  ', including confusion clarification, in-the-moment expression, and co-learning perception.': '，包括困惑澄清、即时表达和共同学习感知。',
  'It did so without increasing perceived workload': '且没有增加感知负荷',
  '. The generic LLM condition did not significantly outperform video-only and received the lowest mean ratings on usability.':
    '。通用 LLM 条件并未显著优于仅视频条件，且可用性平均评分最低。',
  'Contextual grounding and community awareness': '情境锚定与群体感知',
  ', rather than the presence of conversational AI alone, make AI a meaningful support in asynchronous video learning.':
    '，而非单纯引入对话式 AI，才让 AI 在异步视频学习中成为有意义的支持。',

  /* ---------- MagHeart ---------- */
  'Interaction': '交互',
  'Interaction and system design of the icebreaking app, full-stack development; contributed to the hardware prototype.':
    ['破冰应用的交互与系统设计', '全栈开发', '参与硬件原型制作'],
  'A playful icebreaker for hybrid meetings: build a LEGO avatar together, and feel your remote colleague\'s heartbeat in the room.':
    '为混合会议设计的趣味破冰：一起拼出乐高化身，在会议室里感受远程同事的心跳。',
  'Small talk happens in the room, not on the screen': '寒暄发生在会议室里，而不是屏幕上',
  'Hybrid meetings often begin with social awkwardness and uneven participation. Small talk flows among those in the room, while remote attendees struggle to find a moment to join, and that imbalance can shape the rest of the meeting.':
    '混合会议常以社交尴尬和参与不均开场。寒暄在现场的人之间展开，远程参会者却难以找到插话的时机，而这种失衡会影响整场会议。',
  'Icebreakers could help, but most assume a shared room or rely on talking. We wondered if something non-verbal could work: feeling a remote colleague\'s heartbeat, so a little nervousness becomes something shared rather than hidden. Heart rate is personal, though, and at work that needs care.':
    '破冰活动或许有帮助，但大多默认大家同处一室，或依赖语言交流。我们想知道非语言的方式是否可行：感受远程同事的心跳，让一点紧张变成共同的体验，而不是需要隐藏的东西。不过心率是私人信息，在工作场合需要谨慎对待。',
  'Heart rate streams from an Apple Watch to the MagHeart app.': '心率数据从 Apple Watch 实时传到 MagHeart 应用。',
  'Three goals for a symmetric icebreaker': '对称式破冰的三个目标',
  'Lower the barrier': '降低门槛',
  ': quiet, non-verbal ways to join in from the first minute.': '：从第一分钟起就能以安静、非语言的方式参与。',
  'Make the remote person present': '让远程者“在场”',
  ': visible and physical in the room, with a say in what happens.': '：在会议室里看得见、摸得着，并能参与决定。',
  'Share a heartbeat, gently': '温和地共享心跳',
  ': heart rate as an ambient rhythm, not a number to analyse.': '：心率是一种环境节奏，而不是用来分析的数字。',
  'Device': '设备',
  'A heartbeat you can hold': '握在手中的心跳',
  'An electromagnet hidden in the base pulses with the remote participant\'s heart rate, driven by an ESP32. Hold the magnet over the acrylic surface, and you feel each beat in your hand.':
    '底座中隐藏的电磁铁由 ESP32 驱动，随远程参与者的心率搏动。把磁铁悬在亚克力表面上方，就能在手中感受到每一次心跳。',
  'Physical display.': '实体展示装置。',
  'PETG cylindrical base with permanent magnet, electromagnet, transparent cast acrylic surface, and medium-density fiberboard base.':
    'PETG 圆柱底座，内含永磁体、电磁铁、透明浇铸亚克力面板和中密度纤维板底板。',
  'Persistent presence.': '持续在场。',
  'After co-creation, the remote participant\'s LEGO avatar stands on the base and moves to their heartbeat.': '共创完成后，远程参与者的乐高化身立在底座上，随其心跳律动。',
  'Interaction flow': '交互流程',
  'From a pulse to a persistent presence': '从一次脉动到持续在场',
  'The icebreaker unfolds in three stages, from a first connection to a presence that lasts for the rest of the meeting.':
    '破冰分三个阶段展开：从最初的连接，到贯穿会议剩余时间的在场感。',
  'Feel the heartbeat': '感受心跳',
  'People in the room hold the magnet and feel the remote participant\'s real-time heartbeat, streamed from an Apple Watch.':
    '现场的人握住磁铁，感受由 Apple Watch 实时传来的远程参与者心跳。',
  'Build an avatar together': '一起拼化身',
  'In the app, both sides answer prompt cards that become shared context, build a LEGO avatar of the remote participant, then show and discuss it.':
    '双方在应用中回答提示卡，形成共同话题，再一起拼出远程参与者的乐高化身，展示并讨论。',
  'Stay present': '保持在场',
  'The finished figure stays on the base and moves with the remote participant\'s heart rate for the rest of the meeting.':
    '完成的小人留在底座上，在会议剩余时间里随远程参与者的心率律动。',
  'Scenario-based study · N = 34': '情景式研究 · N = 34',
  'Anticipated engagement, from both sides of the screen': '屏幕两端的预期参与度',
  'A pre–post scenario-based online survey, in which participants reflected on hybrid meetings from both co-located and remote perspectives before and after a demo of MagHeart.':
    '一项前后测情景式在线问卷：参与者在观看 MagHeart 演示前后，分别从现场与远程两个视角反思混合会议。',
  'Playful co-creation as a low-pressure icebreaker': '趣味共创是低压力的破冰方式',
  ', shifting early interaction from forced small talk to a shared task.': '，把开场互动从勉强寒暄变成共同任务。',
  'Tangible and embodied cues enhancing perceived presence': '可触、具身的线索增强了在场感',
  '; remote participants seen as less likely to be overlooked.': '；远程参与者被认为更不容易被忽视。',
  'Tensions around privacy, distraction, and contextual fit': '隐私、分心与场景适配之间存在张力',
  '; heart rate is a sensitive and ambiguous signal.': '；心率是一种敏感且含义模糊的信号。',
  'Pre–post comparison': '前后测对比',
  ' of anticipated embarrassment, anxiety, low participation, and low speaking intent: co-located (top) and remote (bottom) perspectives. 7-point Likert; lower is better.':
    '：预期尴尬、焦虑、低参与和低发言意愿，分别为现场（上）与远程（下）视角。7 点李克特量表，越低越好。',
}
