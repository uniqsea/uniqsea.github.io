import visionnavCover from '../assets/projects/visionnav-cover.svg'
import bioralCover from '../assets/publication/bioral-demo-cover.png'
import letsCeramicCover from '../assets/projects/ceramic-cover.png'
import EchoMindCover from '../assets/projects/echomind-cover.png'

export const projects = [
  {
    slug: 'visionnav',
    title: 'VisionNav',
    subtitle: 'Revolutionizing Walking Experiences with an Intelligent Vibration-Guided Navigation Companion',
    summary: 'An assistive navigation system integrating IoT and computer vision to deliver real-time obstacle detection, path recognition, and intuitive vibration feedback through wearable devices.',
    summaryZh: '一套融合物联网与计算机视觉的辅助导航系统，通过可穿戴设备提供实时障碍检测、路径识别与直觉化振动反馈。',
    status: 'COURSE PROJECT',
    statusZh: '课程项目',
    org: 'Aarhus University',
    year: '2024',
    thumb: visionnavCover,
    cover: visionnavCover,
    bodyPath: '/projects/visionnav.md',
    // clickType: 'markdown' | 'external' | 'none'
    // - 'markdown' (default): 点击进入项目详情页并渲染 markdown
    // - 'external': 点击跳转到 externalUrl（新标签页）
    // - 'none': 卡片仅展示信息，不可点击
    clickType: 'markdown',
    // 如果是 external，可以配置 externalUrl
    // externalUrl: 'https://example.com',
    // tags: ['React Native', 'YOLOv8', 'CNN', 'M5Stack', 'Google Maps API'],
    // 只有在这里写链接才会在详情页渲染 Demo / Source Code 徽标
    links: [
      // { label: 'Demo', href: 'https://example.com/demo' },
      // { label: 'Source Code', href: 'https://github.com/...' },
    ],
    notes: `<p style="margin: 0; line-height: 1.8; font-size: 1.15rem; color: var(--fg); text-align: center; font-family: 'Georgia', 'Times New Roman', serif; letter-spacing: 0.01em;">
      This project was completed under the guidance of the late <strong style="font-weight: 600;">Niels Olof Bouvin</strong>, a truly wonderful and kind person, <em style="font-style: italic;">whom we dearly miss</em>.
    </p>`,
  },
  {
    slug: 'lets-ceramic',
    title: "Let's Ceramic",
    summary: 'A playful AR-based ceramic making game that explores embodied interaction and creative expression.',
    summaryZh: '一款探索具身交互与创意表达的趣味 AR 陶艺游戏。',
    status: 'COURSE PROJECT',
    statusZh: '课程项目',
    org: 'Aarhus University',
    year: '2025',
    clickType: 'external',
    externalUrl: 'https://yunhui-song.itch.io/ar-lets-ceramic',
    thumb: letsCeramicCover,
    cover: letsCeramicCover,
    // 可以按需补充 thumb / cover / tags
  },
  {
    slug: 'nobody-wants-to-talk-into-a-void',
    title: 'EchoMind',
    summary: 'An Intelligent Feedback System for Talks and Presentations',
    summaryZh: '面向演讲与展示的智能反馈系统。',
    status: 'COURSE PROJECT',
    statusZh: '课程项目',
    org: 'Aarhus University',
    year: '2025',
    clickType: 'external',
    externalUrl: 'https://medium.com/@uniqsea/nobody-wants-to-talk-into-a-void-38253448f0c4',
    // 可以按需补充 thumb / cover / tags
    thumb: EchoMindCover,
    cover: EchoMindCover,
  },
]
