export const messages = {
  en: {
    nav: { home: 'Home', design: 'Design', moments: 'Moments' },
    controls: {
      switchToChinese: 'Switch to Chinese',
      switchToEnglish: 'Switch to English',
      switchToDark: 'Use dark mode',
      switchToLight: 'Use light mode',
    },
    hero: {
      greeting: "Hello, I'm {name}",
      blurb: `I am currently a Master's student in Computer Science at Aarhus University, specializing in Human-Computer Interaction.\nMy interests lie in how technology can enhance human experiences in everyday life, particularly within certain communities. I am passionate about human-centered design and about creating interfaces that transform technology into creative and meaningful experiences that actively support people's well-being.`,
      togglePortrait: 'Toggle portrait',
      portrait: 'Portrait of {name}',
      sea: 'The sea',
    },
    sections: { publications: 'Publications', projects: 'Selected Projects' },
    design: {
      title: 'Design',
      subtitle: 'Design work and visual artifacts.',
      interactive: 'Interactive',
      liveCountry: 'Live · your country in dots',
      open: 'Open {title}',
      notFound: 'Design Not Found',
      back: 'Back to Design',
    },
    moments: {
      title: 'Moments',
      subtitle: 'Capturing life through my lens.',
      emptyTitle: 'No moments yet',
      emptyText: 'Photos will appear here once they are added.',
      open: 'Open {caption}',
      openPhoto: 'Open photo',
      photo: 'Photo',
      close: 'Close',
    },
    projects: {
      notFound: 'Project Not Found',
      back: 'Back to Projects',
    },
  },
  zh: {
    nav: { home: '首页', design: '设计', moments: '瞬间' },
    controls: {
      switchToChinese: '切换到中文',
      switchToEnglish: '切换到英文',
      switchToDark: '切换到暗黑模式',
      switchToLight: '切换到浅色模式',
    },
    hero: {
      greeting: '你好，我是{name}',
      blurb: `我目前就读于丹麦奥胡斯大学计算机科学硕士项目，研究方向是人机交互。\n我关注技术如何改善日常生活中的真实体验，尤其是它如何服务于不同社群。我热衷于以人为本的设计，并尝试把技术转化为富有创造力、意义明确且能主动支持人们身心健康的交互体验。`,
      togglePortrait: '切换头像',
      portrait: '{name}的肖像',
      sea: '海',
    },
    sections: { publications: '学术发表', projects: '精选项目' },
    design: {
      title: '设计',
      subtitle: '设计作品与视觉创作。',
      interactive: '互动作品',
      liveCountry: '实时 · 用点阵呈现你所在的国家',
      open: '打开{title}',
      notFound: '未找到该设计',
      back: '返回设计',
    },
    moments: {
      title: '瞬间',
      subtitle: '用镜头收藏生活片段。',
      emptyTitle: '还没有照片',
      emptyText: '添加照片后，它们会出现在这里。',
      open: '打开{caption}',
      openPhoto: '打开照片',
      photo: '照片',
      close: '关闭',
    },
    projects: {
      notFound: '未找到该项目',
      back: '返回项目',
    },
  },
}

export function translate(messagesForLanguage, key, values = {}) {
  const value = key.split('.').reduce((current, part) => current?.[part], messagesForLanguage)
  if (typeof value !== 'string') return key
  return Object.entries(values).reduce(
    (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement),
    value,
  )
}

