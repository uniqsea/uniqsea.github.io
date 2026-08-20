// "Hello" in the local language, keyed by ISO-3166-1 alpha-2 country code.
// Picks the country's most widely-used everyday greeting. Countries not listed
// fall back to English "Hello". Kept transliteration-free (native script) so it
// reads authentically to a local visitor.

export const GREETINGS = {
  // — East Asia —
  CN: '你好', TW: '你好', HK: '你好', JP: 'こんにちは', KR: '안녕하세요',
  MN: 'Сайн байна уу',
  // — South & Southeast Asia —
  IN: 'नमस्ते', PK: 'السلام علیکم', BD: 'হ্যালো', LK: 'ආයුබෝවන්',
  NP: 'नमस्ते', TH: 'สวัสดี', VN: 'Xin chào', ID: 'Halo', MY: 'Hai',
  PH: 'Kumusta', SG: 'Hello', KH: 'សួស្តី', LA: 'ສະບາຍດີ', MM: 'မင်္ဂလာပါ',
  // — Middle East —
  AE: 'مرحبا', SA: 'مرحبا', QA: 'مرحبا', KW: 'مرحبا', BH: 'مرحبا',
  OM: 'مرحبا', JO: 'مرحبا', LB: 'مرحبا', IQ: 'مرحبا', SY: 'مرحبا',
  IL: 'שלום', IR: 'سلام', TR: 'Merhaba',
  // — Europe —
  GB: 'Hello', IE: 'Hello', FR: 'Bonjour', DE: 'Hallo', AT: 'Hallo',
  CH: 'Grüezi', ES: 'Hola', PT: 'Olá', IT: 'Ciao', NL: 'Hallo',
  BE: 'Hallo', LU: 'Moien', SE: 'Hej', NO: 'Hei', DK: 'Hej', FI: 'Hei',
  IS: 'Halló', PL: 'Cześć', CZ: 'Ahoj', SK: 'Ahoj', HU: 'Szia',
  RO: 'Salut', BG: 'Здравей', GR: 'Γεια σου', HR: 'Bok', RS: 'Здраво',
  SI: 'Živjo', UA: 'Привіт', RU: 'Привет', BY: 'Прывітанне',
  LT: 'Labas', LV: 'Sveiki', EE: 'Tere',
  // — Africa —
  EG: 'مرحبا', MA: 'مرحبا', DZ: 'مرحبا', TN: 'مرحبا', LY: 'مرحبا',
  ZA: 'Sawubona', KE: 'Habari', TZ: 'Habari', UG: 'Habari', NG: 'Hello',
  GH: 'Hello', ET: 'ሰላም', SN: 'Bonjour', CI: 'Bonjour', CM: 'Bonjour',
  // — Americas —
  US: 'Hello', CA: 'Hello', MX: 'Hola', BR: 'Olá', AR: 'Hola',
  CL: 'Hola', CO: 'Hola', PE: 'Hola', VE: 'Hola', EC: 'Hola',
  BO: 'Hola', PY: 'Hola', UY: 'Hola', CR: 'Hola', PA: 'Hola',
  GT: 'Hola', CU: 'Hola', DO: 'Hola',
  // — Oceania —
  AU: 'Hello', NZ: 'Kia ora', FJ: 'Bula',
}

// Local-language "Hello" for a country, or English "Hello" as a fallback.
export function greetingFor(code) {
  return (code && GREETINGS[code]) || 'Hello'
}
