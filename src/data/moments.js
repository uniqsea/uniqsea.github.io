// Photography moments
// 优先使用本地 image 路径，没有本地路径才用 url（图床）
// 图片放入 public/moments/ 后运行 npm run optimize-images 自动生成缩略图和全尺寸压缩版。
// 可选字段：
//   clickOriginal: true  — 点击 lightbox 时展示原图而非压缩版（默认用 full/ WebP）
//   showInfo: false      — 隐藏悬浮信息（即使有 caption/location/date）

export const moments = [
  {
    id: 'm1',
    image: '/moments/photo1.png',
    caption: 'Golden hour at the beach',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm2',
    image: '/moments/photo3.png',
    caption: 'Between Sea and Sky',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm3',
    image: '/moments/photo2.png',
    caption: 'Child riding a bike',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm4',
    image: '/moments/photo4.png',
    caption: 'Seagulls flying over the church tower',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm5',
    image: '/moments/photo5.png',
    caption: 'Lonely bench in the sun',
    location: 'Deer Park, Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm6',
    image: '/moments/photo6.png',
    caption: 'Balcony in the sun',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm7',
    image: '/moments/photo7.png',
    caption: 'Evening sunset',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm8',
    image: '/moments/photo8.png',
    caption: 'Beautiful seaside buildings',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm9',
    image: '/moments/photo9.png',
    caption: 'Green Watchtower',
    location: 'Aarhus, Denmark',
    date: '2024-10-26',
    showInfo: false,
  },
  {
    id: 'm10',
    image: '/moments/photo10.jpg',
    caption: 'Rain hitting the window',
    location: 'Munich, Germany',
    date: '2024-10-13',
    showInfo: false,
  },
  {
    id: 'm11',
    image: '/moments/photo11.jpg',
    caption: 'Signpost in the mountains',
    location: 'Munich, Germany',
    date: '2024-10-13',
    showInfo: false,
  },
]
