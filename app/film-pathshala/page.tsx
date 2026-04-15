'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'

const ease4: [number, number, number, number] = [0.22, 1, 0.36, 1]
const GOLD_IMG = { backgroundImage: 'linear-gradient(120deg, #C9A84C 0%, #F5D87A 50%, #C9A84C 100%)' }
const GOLD_CLS = 'bg-clip-text text-transparent'
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: ease4 },
})

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let n = 0; const step = Math.ceil(to / 50)
    const t = setInterval(() => { n += step; if (n >= to) { setCount(to); clearInterval(t) } else setCount(n) }, 25)
    return () => clearInterval(t)
  }, [started, to])
  return <span ref={ref}>{count}{suffix}</span>
}

const CONTENT = {
  en: {
    navMP: 'MP Film Industry',
    eyebrow: 'Madhya Pradesh · Film Pathshala',
    pills: ['Your Vision', 'Right Direction', 'Real Growth'],
    quote: 'Our shared vision is to establish Madhya Pradesh as a recognized force at the national and international level, inspiring people to take action, contribute, and grow together.',
    founders: 'Naveen Jain & Parmeshwar Patidar',
    scroll: 'Scroll',
    stats: ['Education Leadership', 'Film Ecosystem Years', 'Business Expertise', 'Unified Vision'],
    s01: {
      label: '01 — Industry Reality',
      title: 'What Makes Other Industries', titleGold: 'Thrive?',
      desc: 'South Indian, Bhojpuri, Marathi, Punjabi — every thriving regional film industry shares one powerful common factor that drives consistent growth.',
      cards: [
        { title: 'Ecosystem Unity', desc: 'They work together as one connected, supportive ecosystem' },
        { title: 'Full Department Support', desc: 'Every department involved in filmmaking is valued and supported' },
        { title: 'Local First Approach', desc: 'Actively promote local talent, vendors and regional resources' },
        { title: 'State Development', desc: 'Actively contribute to the economic growth of their state' },
      ],
    },
    s02: {
      label: '02 — The Challenge',
      title1: 'MP Has the', title1Gold: 'Potential…', title2: 'But the Gap is Real.',
      desc: 'The ecosystem of Madhya Pradesh is not yet fully developed. This gap — and bridging it — is the entire reason Film Pathshala exists.',
      tagline: 'And this gap is what we bridge',
      cards: [
        { has: 'Talent Exists', gap: 'but lacks connection', desc: 'Skilled individuals are everywhere — yet disconnected from the right opportunities.' },
        { has: 'Locations Exist', gap: 'but lack direction', desc: 'MP has stunning shooting locations — yet underutilized due to lack of awareness.' },
        { has: 'People Exist', gap: 'but lack unity & systems', desc: 'Industry members are active — yet working in silos without structure or collaboration.' },
      ],
    },
    phil: {
      label: 'Our Philosophy',
      t1: 'System', t2: 'Over', t3: 'Talent.',
      line1: 'Talent may help you enter the industry —',
      line2: 'but only a SYSTEM helps you sustain and grow in the long run.',
      italic: 'Even the most talented individuals face confusion, inconsistency, and failure — without a system.',
      listLabel: 'Without understanding…',
      list: ['How the industry operates', 'How processes are executed', 'How people and roles are interconnected', 'How decisions are made'],
      cards: [
        { label: 'Being Busy', sub: '≠ Growth', desc: 'Busy without direction leads to burnout', gold: false },
        { label: 'Being Structured', sub: '= Growth', desc: 'Consistency comes from working within a system', gold: true },
        { label: 'Random Struggle', sub: '→ Stagnation', desc: 'Leads to wasted potential and confusion', gold: false },
        { label: 'System Execution', sub: '→ Sustainable', desc: 'Leads to clarity, success, and long-term growth', gold: true },
      ],
    },
    s03: {
      label: '03 — Our Mission',
      title1: 'Building the Film', titleGold: 'Ecosystem', title2: 'of MP',
      sub: 'Three pillars. One purpose. A thriving, connected film industry for Madhya Pradesh.',
      pillars: [
        { title: 'Spread Knowledge', desc: 'Spreading real, unfiltered knowledge of how the film industry actually works — from ground level to top level.' },
        { title: 'Build Connections', desc: 'Creating bridges between every stakeholder — artists, crew, vendors, and producers — so no one works in isolation.' },
        { title: 'Create Systems', desc: 'Building structured, process-driven systems that make the ecosystem sustainable, scalable, and growth-oriented.' },
      ],
      bridgeLabel: 'Building bridges for',
      bridgeTitle: 'Every person connected to film in MP',
      stakeholders: ['Artists', 'Filmmakers', 'Technicians', 'Local Vendors', 'Aspiring Talent'],
    },
    what: {
      label: 'What We Do',
      title1: 'Guiding You Through', titleGold: 'Real Industry',
      desc: 'We help aspiring artists, filmmakers, and professionals develop a system-based approach to career growth.',
      cards: [
        { title: 'Understand Processes', desc: 'Complete film production flow from Pre-Production to Post-Production' },
        { title: 'Ground-Level Reality', desc: 'Learn how real work actually happens in the industry day-to-day' },
        { title: 'Avoid Common Mistakes', desc: 'Identify pitfalls and escape the trap of unstructured struggle' },
        { title: 'Right Connections', desc: 'Connect with the right people, locations, and opportunities' },
        { title: 'System-Based Career', desc: 'Develop a structured, process-driven approach to long-term growth' },
        { title: 'Practical Execution', desc: 'Practical understanding combined with structured, real-world execution' },
      ],
    },
    s04: {
      label: '04 — Leadership', title: 'Meet the', titleGold: 'Visionaries',
      sub: 'Two leaders, complementary expertise, one unified mission.',
      f1: {
        label: 'Founder 01', name: 'Mr. Naveen Jain',
        role: 'Former Founder & MD — All India Gyan Darshan Education Group',
        stat1l: 'Years Education', stat2l: 'Years in Film',
        bio: 'Built and expanded the Gyan Darshan Education Franchise across Madhya Pradesh. With 15+ years of deep involvement in film facilitation and production coordination, he brings unmatched ground-level expertise to Film Pathshala.',
        skills: ['Film Production', 'Location Intelligence', 'Industry Coordination'],
      },
      f2: {
        label: 'Founder 02', name: 'Mr. Parmeshwar Patidar',
        role: 'Founder & MD — PrintudeAI & Indas Analytics Pvt. Ltd.',
        stat1l: 'Yrs Expertise', stat2l: 'Companies',
        bio: 'National & international experience as a System Expert and Business Coach. Transforms industries into sustainable, process-driven growth models with a focus on long-term scalability and structured execution.',
        skills: ['Scalable Systems', 'Business Coaching', 'Process Execution'],
      },
    },
    s05: {
      label: '05 — Our Approach', title1: "We Don't Teach.", titleGold: 'We Guide.',
      desc: 'No fake courses. No false promises. Just real direction, real industry insight, and genuine connections that create real growth.',
      cards: [
        { icon: '✗', title: 'No False Courses', desc: 'No empty promises or fake credentials' },
        { icon: '→', title: 'Real Direction', desc: 'True industry insight and guidance' },
        { icon: '◎', title: 'Career Clarity', desc: 'Pre to Post Production understanding' },
        { icon: '◈', title: 'Real Connections', desc: 'Genuine industry opportunities' },
      ],
      moveLabel: 'A Digital Movement',
      moveLine1: 'Film Pathshala is not just a platform —',
      moveBold: 'it is a movement.',
      moveBold2: 'social media, videos, and podcasts',
      moveLine3: ', we are spreading real knowledge to every corner of Madhya Pradesh.',
    },
    nat: {
      label: 'National Impact', title1: 'Contributing to', titleGold: "India's Growth",
      desc: "A system-driven film industry doesn't just create content — it creates real economic and social impact for the nation.",
      quote: '"When talent works with the right system, it creates not just careers… but industry growth and national development."',
      impact: [
        { title: 'Employment Generation', desc: 'Structured production activities create consistent, quality employment' },
        { title: 'Local Talent Promotion', desc: 'Supports local artists, technicians, and service providers across MP' },
        { title: 'Regional Economy', desc: 'Strengthens the economic backbone of Madhya Pradesh' },
        { title: 'Tourism & Locations', desc: 'Boosts regional tourism through film shooting destinations' },
        { title: 'Youth Workforce', desc: 'Builds a skilled, aware, and career-confident young generation' },
      ],
    },
    s06: {
      label: '06 — Our Vision',
      titlePre: 'Madhya Pradesh —', titleGold: 'Organized. Connected.', titlePost: 'Growth-Driven.',
      cards: [
        { word: 'Organized', desc: 'A structured, system-driven film ecosystem' },
        { word: 'Connected', desc: 'Every talent linked to the right opportunity' },
        { word: 'Growth-Driven', desc: 'Just like other successful film industries' },
      ],
      beliefs: [
        '"We don\'t just share knowledge… we provide direction."',
        '"We are not building a platform… we are building an ecosystem."',
      ],
      finalLabel: '✦ Film Industry MP · Film Pathshala',
      final1: 'Your Vision.', final2: 'Right Direction.', final3: 'Real Growth.',
      finalTagline: '✦ Madhya Pradesh Film Ecosystem',
    },
    footer: { back: 'Back to Portal', copy: '© 2026 Film Industry MP · Film Pathshala · All Rights Reserved' },
  },
  hi: {
    navMP: 'MP फिल्म उद्योग',
    eyebrow: 'मध्य प्रदेश · फिल्म पाठशाला',
    pills: ['आपका विज़न', 'सही दिशा', 'वास्तविक विकास'],
    quote: 'हमारा साझा विज़न है कि मध्य प्रदेश को राष्ट्रीय और अंतरराष्ट्रीय स्तर पर एक मान्यता प्राप्त शक्ति के रूप में स्थापित किया जाए, जो लोगों को कार्रवाई करने, योगदान देने और साथ मिलकर बढ़ने के लिए प्रेरित करे।',
    founders: 'नवीन जैन और परमेश्वर पाटीदार',
    scroll: 'स्क्रॉल',
    stats: ['शिक्षा नेतृत्व', 'फिल्म इकोसिस्टम वर्ष', 'व्यवसाय विशेषज्ञता', 'एकीकृत विज़न'],
    s01: {
      label: '01 — उद्योग की वास्तविकता',
      title: 'अन्य उद्योग क्यों', titleGold: 'सफल होते हैं?',
      desc: 'साउथ इंडियन, भोजपुरी, मराठी, पंजाबी — हर सफल क्षेत्रीय फिल्म उद्योग में एक शक्तिशाली साझा कारक होता है जो निरंतर विकास को चलाता है।',
      cards: [
        { title: 'पारिस्थितिकी एकता', desc: 'वे एक जुड़े, सहायक इकोसिस्टम के रूप में मिलकर काम करते हैं' },
        { title: 'पूर्ण विभाग समर्थन', desc: 'फिल्म निर्माण में शामिल हर विभाग को महत्व दिया जाता है' },
        { title: 'स्थानीय प्रथम दृष्टिकोण', desc: 'स्थानीय प्रतिभा, विक्रेताओं और क्षेत्रीय संसाधनों को बढ़ावा देते हैं' },
        { title: 'राज्य विकास', desc: 'अपने राज्य के आर्थिक विकास में सक्रिय योगदान देते हैं' },
      ],
    },
    s02: {
      label: '02 — चुनौती',
      title1: 'MP में', title1Gold: 'क्षमता है…', title2: 'पर अंतर वास्तविक है।',
      desc: 'मध्य प्रदेश का इकोसिस्टम अभी पूरी तरह विकसित नहीं है। यही अंतर — और इसे पाटना — ही फिल्म पाठशाला के अस्तित्व का कारण है।',
      tagline: 'और यही अंतर हम पाटते हैं',
      cards: [
        { has: 'प्रतिभा है', gap: 'पर जुड़ाव नहीं', desc: 'कुशल व्यक्ति हर जगह हैं — फिर भी सही अवसरों से कटे हुए हैं।' },
        { has: 'स्थान हैं', gap: 'पर दिशा नहीं', desc: 'MP में शानदार शूटिंग लोकेशन हैं — फिर भी जागरूकता की कमी से उपयोग नहीं होतीं।' },
        { has: 'लोग हैं', gap: 'पर एकता और प्रणाली नहीं', desc: 'उद्योग के सदस्य सक्रिय हैं — फिर भी बिना संरचना के अकेले काम करते हैं।' },
      ],
    },
    phil: {
      label: 'हमारा दर्शन',
      t1: 'प्रणाली', t2: 'से ऊपर', t3: 'प्रतिभा।',
      line1: 'प्रतिभा आपको उद्योग में प्रवेश दिला सकती है —',
      line2: 'लेकिन केवल एक प्रणाली आपको लंबे समय तक टिकाए रखती है।',
      italic: 'यहाँ तक कि सबसे प्रतिभाशाली व्यक्ति भी बिना प्रणाली के भ्रम, अनिश्चितता और विफलता का सामना करते हैं।',
      listLabel: 'इसे समझे बिना…',
      list: ['उद्योग कैसे काम करता है', 'प्रक्रियाएँ कैसे चलती हैं', 'लोग और भूमिकाएँ कैसे जुड़े हैं', 'निर्णय कैसे लिए जाते हैं'],
      cards: [
        { label: 'व्यस्त रहना', sub: '≠ विकास', desc: 'बिना दिशा के व्यस्त रहना थकान देता है', gold: false },
        { label: 'व्यवस्थित रहना', sub: '= विकास', desc: 'प्रणाली में काम करने से निरंतरता आती है', gold: true },
        { label: 'अनियमित संघर्ष', sub: '→ ठहराव', desc: 'क्षमता की बर्बादी और भ्रम होता है', gold: false },
        { label: 'प्रणाली-आधारित कार्य', sub: '→ टिकाऊ', desc: 'स्पष्टता, सफलता और दीर्घकालिक विकास मिलता है', gold: true },
      ],
    },
    s03: {
      label: '03 — हमारा मिशन',
      title1: 'MP का फिल्म', titleGold: 'इकोसिस्टम', title2: 'बनाना',
      sub: 'तीन स्तंभ। एक उद्देश्य। मध्य प्रदेश के लिए एक समृद्ध, जुड़ा फिल्म उद्योग।',
      pillars: [
        { title: 'ज्ञान फैलाना', desc: 'फिल्म उद्योग कैसे काम करता है इसकी वास्तविक, बिना फ़िल्टर की जानकारी — ज़मीनी स्तर से शीर्ष तक।' },
        { title: 'जुड़ाव बनाना', desc: 'कलाकारों, क्रू, विक्रेताओं और निर्माताओं के बीच पुल बनाना — ताकि कोई अकेला न रहे।' },
        { title: 'प्रणालियाँ बनाना', desc: 'संरचित, प्रक्रिया-आधारित प्रणालियाँ बनाना जो इकोसिस्टम को टिकाऊ और विकास-उन्मुख बनाए।' },
      ],
      bridgeLabel: 'इनके लिए पुल बना रहे हैं',
      bridgeTitle: 'MP में फिल्म से जुड़ा हर व्यक्ति',
      stakeholders: ['कलाकार', 'फिल्मकार', 'तकनीशियन', 'स्थानीय विक्रेता', 'उभरती प्रतिभा'],
    },
    what: {
      label: 'हम क्या करते हैं',
      title1: 'वास्तविक उद्योग में', titleGold: 'आपका मार्गदर्शन',
      desc: 'हम उभरते कलाकारों, फिल्मकारों और पेशेवरों को करियर विकास के लिए प्रणाली-आधारित दृष्टिकोण विकसित करने में मदद करते हैं।',
      cards: [
        { title: 'प्रक्रियाएँ समझें', desc: 'प्री-प्रोडक्शन से पोस्ट-प्रोडक्शन तक पूरा फिल्म प्रोडक्शन फ्लो' },
        { title: 'ज़मीनी वास्तविकता', desc: 'सीखें कि उद्योग में वास्तव में काम कैसे होता है' },
        { title: 'सामान्य गलतियाँ टालें', desc: 'कमज़ोरियाँ पहचानें और अव्यवस्थित संघर्ष से बचें' },
        { title: 'सही जुड़ाव', desc: 'सही लोगों, स्थानों और अवसरों से जुड़ें' },
        { title: 'प्रणाली-आधारित करियर', desc: 'दीर्घकालिक विकास के लिए व्यवस्थित दृष्टिकोण विकसित करें' },
        { title: 'व्यावहारिक क्रियान्वयन', desc: 'व्यावहारिक समझ और व्यवस्थित क्रियान्वयन का संयोजन' },
      ],
    },
    s04: {
      label: '04 — नेतृत्व', title: 'मिलिए', titleGold: 'विज़नरीज़ से',
      sub: 'दो नेता, पूरक विशेषज्ञता, एक संयुक्त मिशन।',
      f1: {
        label: 'संस्थापक 01', name: 'श्री नवीन जैन',
        role: 'पूर्व संस्थापक एवं MD — ऑल इंडिया ज्ञान दर्शन एजुकेशन ग्रुप',
        stat1l: 'वर्ष शिक्षा', stat2l: 'वर्ष फिल्म',
        bio: 'मध्य प्रदेश में ज्ञान दर्शन एजुकेशन फ्रेंचाइज़ी बनाई और विस्तारित की। 15+ वर्षों से फिल्म सुविधा और प्रोडक्शन समन्वय में गहरी भागीदारी के साथ, वे फिल्म पाठशाला में अतुलनीय ज़मीनी विशेषज्ञता लाते हैं।',
        skills: ['फिल्म प्रोडक्शन', 'लोकेशन इंटेलिजेंस', 'उद्योग समन्वय'],
      },
      f2: {
        label: 'संस्थापक 02', name: 'श्री परमेश्वर पाटीदार',
        role: 'संस्थापक एवं MD — PrintudeAI और Indas Analytics Pvt. Ltd.',
        stat1l: 'वर्ष अनुभव', stat2l: 'कंपनियाँ',
        bio: 'राष्ट्रीय और अंतरराष्ट्रीय अनुभव के साथ एक सिस्टम एक्सपर्ट और बिज़नेस कोच। उद्योगों को टिकाऊ, प्रक्रिया-आधारित विकास मॉडल में बदलते हैं।',
        skills: ['स्केलेबल सिस्टम', 'बिज़नेस कोचिंग', 'प्रक्रिया क्रियान्वयन'],
      },
    },
    s05: {
      label: '05 — हमारा दृष्टिकोण', title1: 'हम पढ़ाते नहीं।', titleGold: 'हम मार्गदर्शन करते हैं।',
      desc: 'कोई झूठे कोर्स नहीं। कोई झूठे वादे नहीं। सिर्फ असली दिशा, असली उद्योग जानकारी, और वास्तविक जुड़ाव।',
      cards: [
        { icon: '✗', title: 'झूठे कोर्स नहीं', desc: 'कोई खाली वादे या नकली प्रमाणपत्र नहीं' },
        { icon: '→', title: 'असली दिशा', desc: 'सच्ची उद्योग अंतर्दृष्टि और मार्गदर्शन' },
        { icon: '◎', title: 'करियर स्पष्टता', desc: 'प्री से पोस्ट प्रोडक्शन की समझ' },
        { icon: '◈', title: 'असली जुड़ाव', desc: 'वास्तविक उद्योग अवसर' },
      ],
      moveLabel: 'एक डिजिटल आंदोलन',
      moveLine1: 'फिल्म पाठशाला सिर्फ एक प्लेटफ़ॉर्म नहीं है —',
      moveBold: 'यह एक आंदोलन है।',
      moveBold2: 'सोशल मीडिया, वीडियो और पॉडकास्ट',
      moveLine3: ' के माध्यम से, हम मध्य प्रदेश के हर कोने में ज्ञान फैला रहे हैं।',
    },
    nat: {
      label: 'राष्ट्रीय प्रभाव', title1: 'योगदान', titleGold: 'भारत के विकास में',
      desc: 'एक प्रणाली-आधारित फिल्म उद्योग सिर्फ कंटेंट नहीं बनाता — यह राष्ट्र के लिए वास्तविक आर्थिक और सामाजिक प्रभाव पैदा करता है।',
      quote: '"जब प्रतिभा सही प्रणाली के साथ काम करती है, तो यह सिर्फ करियर नहीं बनाती… बल्कि उद्योग विकास और राष्ट्रीय प्रगति लाती है।"',
      impact: [
        { title: 'रोजगार सृजन', desc: 'संरचित प्रोडक्शन गतिविधियाँ निरंतर, गुणवत्तापूर्ण रोजगार बनाती हैं' },
        { title: 'स्थानीय प्रतिभा को बढ़ावा', desc: 'MP के स्थानीय कलाकारों, तकनीशियनों और सेवा प्रदाताओं का समर्थन' },
        { title: 'क्षेत्रीय अर्थव्यवस्था', desc: 'मध्य प्रदेश की आर्थिक नींव को मज़बूत करती है' },
        { title: 'पर्यटन और लोकेशन', desc: 'फिल्म शूटिंग स्थलों के माध्यम से क्षेत्रीय पर्यटन को बढ़ावा' },
        { title: 'युवा कार्यबल', desc: 'कुशल, जागरूक और आत्मविश्वासी युवा पीढ़ी तैयार करती है' },
      ],
    },
    s06: {
      label: '06 — हमारा विज़न',
      titlePre: 'मध्य प्रदेश —', titleGold: 'व्यवस्थित। जुड़ा हुआ।', titlePost: 'विकास-उन्मुख।',
      cards: [
        { word: 'व्यवस्थित', desc: 'एक संरचित, प्रणाली-आधारित फिल्म इकोसिस्टम' },
        { word: 'जुड़ा हुआ', desc: 'हर प्रतिभा सही अवसर से जुड़ी' },
        { word: 'विकास-उन्मुख', desc: 'अन्य सफल फिल्म उद्योगों की तरह' },
      ],
      beliefs: [
        '"हम सिर्फ ज्ञान नहीं बाँटते… हम दिशा देते हैं।"',
        '"हम सिर्फ एक प्लेटफ़ॉर्म नहीं बना रहे… हम एक इकोसिस्टम बना रहे हैं।"',
      ],
      finalLabel: '✦ फिल्म इंडस्ट्री MP · फिल्म पाठशाला',
      final1: 'आपका विज़न।', final2: 'सही दिशा।', final3: 'वास्तविक विकास।',
      finalTagline: '✦ मध्य प्रदेश फिल्म इकोसिस्टम',
    },
    footer: { back: 'पोर्टल पर वापस', copy: '© 2026 फिल्म इंडस्ट्री MP · फिल्म पाठशाला · सर्वाधिकार सुरक्षित' },
  },
}

const ICONS = ['◈', '✦', '◎', '❖', '◈', '✦']

export default function FilmPathshala() {
  const [lang, setLang] = useState<'en' | 'hi'>('en')
  const t = CONTENT[lang]
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main className="bg-[#060606] text-[#F5F0E8] overflow-x-hidden" data-lang={lang}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 border-b border-white/5"
        style={{ background: 'rgba(6,6,6,0.85)', backdropFilter: 'blur(16px)' }}>
        <Link href="/" className="flex items-center gap-2 group">
          <span className="h-px w-5 bg-[#C9A84C]/60 group-hover:w-8 transition-all duration-300" />
          <span className="text-[9px] tracking-[0.5em] text-[#C9A84C]/60 uppercase group-hover:text-[#C9A84C] transition-colors">Portal</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="font-display font-bold text-[#F5F0E8]/90 text-sm tracking-[0.25em] uppercase">Film पाठशाला</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase hidden md:block">{t.navMP}</span>
          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-0 border border-[#C9A84C]/40 overflow-hidden hover:border-[#C9A84C] transition-colors duration-300"
            style={{ background: 'rgba(201,168,76,0.08)' }}
          >
            <span className={`px-3 py-1.5 text-[9px] tracking-[0.3em] font-bold uppercase transition-all duration-300 ${lang === 'en' ? 'bg-[#C9A84C] text-black' : 'text-[#C9A84C]/50 hover:text-[#C9A84C]'}`}>EN</span>
            <span className="w-px h-5 bg-[#C9A84C]/20" />
            <span className={`px-3 py-1.5 text-[9px] tracking-[0.3em] font-bold uppercase transition-all duration-300 ${lang === 'hi' ? 'bg-[#C9A84C] text-black' : 'text-[#C9A84C]/50 hover:text-[#C9A84C]'}`}>हि</span>
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src="/herofilm/download (16).jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center scale-110" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.55) 0%, rgba(6,6,6,0.65) 40%, rgba(6,6,6,0.95) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(201,168,76,0.12), transparent 70%)' }} />
        </motion.div>
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#C9A84C]/40"
            style={{ left: `${12 + i * 18}%`, top: `${25 + (i % 2) * 25}%` }}
            animate={{ y: [-8, 8, -8], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }} />
        ))}
        <motion.div className="relative z-10 text-center px-6 max-w-5xl w-full" style={{ opacity: heroOpacity }}>
          <motion.div className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[11px] tracking-[0.65em] text-[#C9A84C] uppercase font-semibold">{t.eyebrow}</span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </motion.div>
          <motion.h1 className="font-display font-bold leading-[0.88] mb-8"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: ease4 }}>
            <span className="block text-6xl md:text-8xl lg:text-[7.5rem] text-white drop-shadow-2xl">Film</span>
            <span className={"block text-7xl md:text-9xl lg:text-[9.5rem] drop-shadow-2xl " + GOLD_CLS} style={GOLD_IMG}>पाठशाला</span>
          </motion.h1>
          <motion.div className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}>
            {t.pills.map((pill, i) => (
              <span key={i} className="px-6 py-2.5 text-xs tracking-[0.3em] uppercase font-bold text-[#C9A84C] border border-[#C9A84C]/70"
                style={{ background: 'rgba(201,168,76,0.15)', backdropFilter: 'blur(8px)' }}>{pill}</span>
            ))}
          </motion.div>
          <motion.div className="relative max-w-xl mx-auto px-7 py-6 text-left"
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }}
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,168,76,0.45)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#C9A84C]/80" />
            <span className="absolute -top-1 right-4 text-6xl font-serif text-[#C9A84C]/20 select-none leading-none">"</span>
            <p className="text-white text-base italic leading-relaxed">{t.quote}</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-bold">{t.founders}</span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
          <span className="text-[9px] tracking-[0.5em] text-white/50 uppercase">{t.scroll}</span>
          <div className="w-px h-8 bg-linear-to-b from-[#C9A84C]/50 to-transparent" />
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <section className="relative py-12 border-y border-[#C9A84C]/12"
        style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0.02) 50%, rgba(201,168,76,0.05) 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ n: 12, s: ' Yrs' }, { n: 15, s: '+' }, { n: 21, s: '+' }, { n: 1, s: ' MP' }].map((s, i) => (
            <motion.div key={i} className="text-center relative" {...fadeUp(i * 0.08)}>
              {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#C9A84C]/15" />}
              <p className={"font-display font-bold text-3xl md:text-4xl " + GOLD_CLS} style={GOLD_IMG}><Counter to={s.n} suffix={s.s} /></p>
              <p className="text-[#F5F0E8]/30 text-[9px] tracking-[0.35em] uppercase mt-1">{t.stats[i]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ INDUSTRY REALITY ══ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/gif/download.gif" alt="" className="w-full h-full object-cover object-center opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.5) 50%, rgba(6,6,6,0.8) 100%)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="flex items-center gap-6 mb-16" {...fadeUp()}>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.s01.label}</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
                {t.s01.title}<br /><span className={GOLD_CLS} style={GOLD_IMG}>{t.s01.titleGold}</span>
              </h2>
              <p className="text-[#F5F0E8]/40 text-sm mt-3 max-w-md leading-relaxed">{t.s01.desc}</p>
            </div>
            <div className="hidden lg:block flex-1 h-px bg-linear-to-r from-[#C9A84C]/20 to-transparent ml-10" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.s01.cards.map((item, i) => (
              <motion.div key={i} className="group relative flex items-start gap-5 p-6 border border-white/6 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }} {...fadeUp(i * 0.1)}
                whileHover={{ y: -3, borderColor: 'rgba(201,168,76,0.35)' }} transition={{ duration: 0.25 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06), transparent)' }} />
                <span className="absolute right-4 bottom-2 font-display font-bold text-5xl text-white/3 select-none">0{i+1}</span>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A84C]/0 group-hover:bg-[#C9A84C] transition-all duration-400" />
                <span className="text-xl shrink-0 relative z-10 mt-0.5 text-[#C9A84C] group-hover:scale-125 transition-transform duration-300 inline-block"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.5))' }}>{ICONS[i]}</span>
                <div className="relative z-10">
                  <p className="text-[#F5F0E8]/90 font-semibold text-sm mb-1.5 group-hover:text-[#C9A84C] transition-colors duration-300">{item.title}</p>
                  <p className="text-[#F5F0E8]/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THE GAP ══ */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.09) 0%, rgba(6,6,6,0) 50%, rgba(201,168,76,0.06) 100%)' }} />
        <div className="absolute inset-0 border-y border-[#C9A84C]/15" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display font-bold text-[18vw] text-white/[0.015] uppercase leading-none whitespace-nowrap">GAP</span>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top left, rgba(201,168,76,0.25), transparent 60%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]/50" />
              <span className="text-[9px] tracking-[0.7em] text-[#C9A84C] uppercase font-semibold">{t.s02.label}</span>
              <div className="h-px w-12 bg-[#C9A84C]/50" />
            </div>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              {t.s02.title1} <span className={GOLD_CLS} style={GOLD_IMG}>{t.s02.title1Gold}</span>
            </h2>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white/25 mt-1">{t.s02.title2}</h2>
            <p className="text-[#F5F0E8]/45 text-sm md:text-base leading-relaxed mt-6 max-w-xl mx-auto">{t.s02.desc}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {t.s02.cards.map((item, i) => (
              <motion.div key={i} className="group relative overflow-hidden border border-white/8 hover:border-[#C9A84C]/50 transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.02)' }} {...fadeUp(i * 0.12)}
                whileHover={{ y: -6 } as any} transition={{ duration: 0.3 }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#C9A84C] group-hover:to-transparent transition-all duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.09), transparent 65%)' }} />
                <span className="absolute bottom-3 right-4 font-display font-bold text-7xl text-white/[0.03] select-none leading-none">0{i+1}</span>
                <div className="relative z-10 p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[#C9A84C] text-3xl group-hover:scale-110 transition-transform duration-300 inline-block"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.5))' }}>{ICONS[i]}</span>
                    <span className="text-[9px] tracking-[0.5em] text-[#C9A84C]/40 font-mono">0{i+1}</span>
                  </div>
                  <p className="font-display font-bold text-xl text-white mb-1 group-hover:text-[#F5F0E8] transition-colors">{item.has}</p>
                  <p className={"text-sm font-semibold italic mb-4 " + GOLD_CLS} style={GOLD_IMG}>{item.gap}</p>
                  <div className="h-px w-full bg-white/6 mb-4 group-hover:bg-[#C9A84C]/20 transition-colors duration-400" />
                  <p className="text-[#F5F0E8]/40 text-xs leading-relaxed group-hover:text-[#F5F0E8]/60 transition-colors duration-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="flex items-center justify-center gap-4 mt-4" {...fadeUp(0.4)}>
            <div className="h-px flex-1 max-w-32 bg-linear-to-r from-transparent to-[#C9A84C]/40" />
            <span className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase italic font-semibold">{t.s02.tagline}</span>
            <div className="h-px flex-1 max-w-32 bg-linear-to-l from-transparent to-[#C9A84C]/40" />
          </motion.div>
        </div>
      </section>

      {/* ══ CORE PHILOSOPHY ══ */}
      <section className="relative py-28 px-6 overflow-hidden border-t border-[#C9A84C]/10">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,6,6,0) 0%, rgba(201,168,76,0.06) 50%, rgba(6,6,6,0) 100%)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, #C9A84C, transparent 60%)' }} />
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span className="font-display font-bold text-[15vw] text-white/[0.02] uppercase leading-none">SYSTEM</span>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="flex items-center gap-4 mb-16" {...fadeUp()}>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-[9px] tracking-[0.7em] text-[#C9A84C] uppercase font-semibold">{t.phil.label}</span>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            <motion.div {...fadeUp()}>
              <h2 className={`font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-8 ${lang === 'hi' ? 'leading-snug' : 'leading-[0.95]'}`}>
                {t.phil.t1}<br /><span className={GOLD_CLS} style={GOLD_IMG}>{t.phil.t2}</span><br />{t.phil.t3}
              </h2>
              <div className="h-px w-full bg-[#C9A84C]/15 mb-8" />
              <p className="text-[#F5F0E8]/65 text-base md:text-lg leading-relaxed mb-3">{t.phil.line1}</p>
              <p className="text-[#F5F0E8]/65 text-base md:text-lg leading-relaxed mb-8">
                {lang === 'en' ? <>but only a <strong className="text-[#C9A84C] text-xl">SYSTEM</strong> helps you sustain and grow in the long run.</> : t.phil.line2}
              </p>
              <div className="relative pl-5 border-l-2 border-[#C9A84C]/50">
                <p className="text-[#F5F0E8]/40 text-sm italic leading-relaxed">{t.phil.italic}</p>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.15)}>
              <p className="text-[9px] tracking-[0.6em] text-[#C9A84C]/60 uppercase mb-6">{t.phil.listLabel}</p>
              <div className="space-y-0">
                {t.phil.list.map((item, i) => (
                  <motion.div key={i} className="group flex items-center gap-5 py-5 border-b border-white/6 hover:border-[#C9A84C]/25 transition-colors duration-300"
                    {...fadeUp(0.15 + i * 0.08)}>
                    <span className="font-mono text-[10px] text-[#C9A84C]/40 shrink-0 group-hover:text-[#C9A84C]/80 transition-colors">0{i+1}</span>
                    <div className="h-px w-4 bg-[#C9A84C]/20 group-hover:w-8 group-hover:bg-[#C9A84C]/50 transition-all duration-300 shrink-0" />
                    <p className="text-[#F5F0E8]/60 text-base group-hover:text-[#F5F0E8]/90 transition-colors duration-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.phil.cards.map((item, i) => (
              <motion.div key={i}
                className={`group relative p-6 border overflow-hidden ${item.gold ? 'border-[#C9A84C]/35' : 'border-white/7'}`}
                style={{ background: item.gold ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)' }}
                {...fadeUp(0.25 + i * 0.08)} whileHover={{ y: -4 } as any} transition={{ duration: 0.3 }}>
                {item.gold && <div className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.08), transparent 70%)' }} />
                <p className={`font-display font-bold text-lg mb-1 relative z-10 ${item.gold ? GOLD_CLS : 'text-[#F5F0E8]/55'}`}
                  style={item.gold ? GOLD_IMG : undefined}>{item.label}</p>
                <p className={`text-sm font-mono mb-4 relative z-10 ${item.gold ? 'text-[#C9A84C]' : 'text-white/30'}`}>{item.sub}</p>
                <div className="h-px bg-white/6 mb-4 relative z-10 group-hover:bg-[#C9A84C]/20 transition-colors duration-300" />
                <p className="text-[#F5F0E8]/35 text-xs leading-relaxed relative z-10 group-hover:text-[#F5F0E8]/55 transition-colors duration-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section className="relative py-28 px-6 overflow-hidden border-t border-[#C9A84C]/10">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07), transparent 65%)' }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display font-bold text-[14vw] text-white/[0.018] uppercase leading-none">MISSION</span>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" {...fadeUp()}>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-[#C9A84C]/50" />
              <span className="text-[9px] tracking-[0.7em] text-[#C9A84C] uppercase font-semibold">{t.s03.label}</span>
              <div className="h-px w-12 bg-[#C9A84C]/50" />
            </div>
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              {t.s03.title1}<br /><span className={GOLD_CLS} style={GOLD_IMG}>{t.s03.titleGold}</span> {t.s03.title2}
            </h2>
            <p className="text-[#F5F0E8]/40 text-base mt-5 max-w-xl mx-auto leading-relaxed">{t.s03.sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {t.s03.pillars.map((item, i) => (
              <motion.div key={i} className="group relative overflow-hidden border border-white/8 hover:border-[#C9A84C]/50 transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.02)' }} {...fadeUp(i * 0.12)}
                whileHover={{ y: -6 } as any} transition={{ duration: 0.3 }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.1), transparent 65%)' }} />
                <span className="absolute bottom-4 right-5 font-display font-bold text-8xl text-white/[0.03] select-none leading-none">0{i+1}</span>
                <div className="relative z-10 p-8">
                  <div className="flex items-center justify-between mb-7">
                    <span className="text-[#C9A84C] text-4xl group-hover:scale-110 transition-transform duration-300 inline-block"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.6))' }}>{ICONS[i]}</span>
                    <span className="text-[8px] tracking-[0.5em] text-[#C9A84C]/30 font-mono">0{i+1}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#F5F0E8] text-xl mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">{item.title}</h3>
                  <div className="h-px bg-white/6 mb-4 group-hover:bg-[#C9A84C]/25 transition-colors duration-400" />
                  <p className="text-[#F5F0E8]/45 text-sm leading-relaxed group-hover:text-[#F5F0E8]/70 transition-colors duration-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div className="relative overflow-hidden border border-[#C9A84C]/20 p-8"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.02))' }} {...fadeUp(0.35)}>
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C]/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C]/40" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[9px] tracking-[0.6em] text-[#C9A84C]/60 uppercase mb-2">{t.s03.bridgeLabel}</p>
                <p className="text-white text-lg font-display font-bold">{t.s03.bridgeTitle}</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                {t.s03.stakeholders.map((label, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/25 text-[#F5F0E8]/70 text-xs hover:border-[#C9A84C]/70 hover:text-[#C9A84C] transition-all duration-300 cursor-default"
                    style={{ background: 'rgba(201,168,76,0.04)' }}>
                    <span className="text-[#C9A84C]">{ICONS[i]}</span>
                    <span className="tracking-wide font-medium">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ WHAT WE DO ══ */}
      <section className="py-24 px-6 border-t border-[#C9A84C]/8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.what.label}</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">
              {t.what.title1}<br />{lang === 'en' ? <>the <span className={GOLD_CLS} style={GOLD_IMG}>{t.what.titleGold}</span></> : <span className={GOLD_CLS} style={GOLD_IMG}>{t.what.titleGold}</span>}
            </h2>
            <p className="text-[#F5F0E8]/35 text-sm mt-4 max-w-lg mx-auto leading-relaxed">{t.what.desc}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.what.cards.map((item, i) => (
              <motion.div key={i} className="group relative p-7 border border-white/7 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }} {...fadeUp(i * 0.08)}
                whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.4)' } as any} transition={{ duration: 0.3 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.07), transparent 70%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-transparent group-hover:bg-[#C9A84C]/40 transition-colors duration-500" />
                <span className="text-[#C9A84C] text-2xl mb-5 block relative z-10"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.4))' }}>{ICONS[i]}</span>
                <h3 className="font-display font-bold text-[#F5F0E8] text-base mb-2 group-hover:text-[#C9A84C] transition-colors duration-300 relative z-10">{item.title}</h3>
                <p className="text-[#F5F0E8]/35 text-xs leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOUNDERS ══ */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-[#C9A84C]/8">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(201,168,76,0.05), transparent 65%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="flex items-end justify-between mb-14 flex-wrap gap-4" {...fadeUp()}>
            <div>
              <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.s04.label}</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl mt-2">
                {t.s04.title} <span className={GOLD_CLS} style={GOLD_IMG}>{t.s04.titleGold}</span>
              </h2>
            </div>
            <p className="text-[#F5F0E8]/30 text-sm max-w-xs text-right hidden md:block">{t.s04.sub}</p>
          </motion.div>
          <div className="space-y-6">
            {/* Founder 1 */}
            <motion.div className="group relative overflow-hidden" {...fadeUp(0.1)}>
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20"
                style={{ background: 'linear-gradient(90deg, #C9A84C 0%, #F5D87A 50%, #C9A84C 100%)' }} />
              <div className="absolute inset-0 border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/50 transition-colors duration-500 z-20 pointer-events-none" />
              <div className="flex flex-col md:flex-row min-h-[260px]">
                <div className="relative md:w-56 shrink-0 overflow-hidden" style={{ background: '#0a0a0a' }}>
                  <img src="/pathashalaexpert/Naveen ji transparent.png" alt={t.s04.f1.name}
                    className="w-full h-full object-cover object-top min-h-[260px] group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: 'contrast(1.05) brightness(0.95)' }} />
                  <div className="absolute inset-0 hidden md:block"
                    style={{ background: 'linear-gradient(90deg, transparent 50%, rgba(6,6,6,0.95) 100%)' }} />
                </div>
                <div className="flex-1 relative p-8 md:p-10" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(6,6,6,0.9) 50%)' }}>
                  <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'repeating-linear-gradient(60deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase font-semibold">{t.s04.f1.label}</span>
                        <div className="h-px flex-1 bg-[#C9A84C]/20" />
                        <span className="text-[#C9A84C] text-xs">✦</span>
                      </div>
                      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 leading-tight">{t.s04.f1.name}</h3>
                      <p className="text-[#C9A84C]/80 text-sm font-medium">{t.s04.f1.role}</p>
                    </div>
                    <p className="text-[#F5F0E8]/55 text-sm leading-relaxed">{t.s04.f1.bio}</p>
                    <div className="flex flex-wrap items-end gap-6">
                      <div className="flex gap-4">
                        {[{ n: '12', l: t.s04.f1.stat1l }, { n: '15+', l: t.s04.f1.stat2l }].map(s => (
                          <div key={s.l}>
                            <p className={"font-display font-bold text-3xl leading-none " + GOLD_CLS} style={GOLD_IMG}>{s.n}</p>
                            <p className="text-[9px] text-[#F5F0E8]/30 uppercase tracking-widest mt-1">{s.l}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-8 w-px bg-[#C9A84C]/15 hidden md:block" />
                      <div className="flex flex-wrap gap-2">
                        {t.s04.f1.skills.map(s => (
                          <span key={s} className="px-3 py-1 text-[10px] border border-[#C9A84C]/20 text-[#F5F0E8]/40 tracking-wide"
                            style={{ background: 'rgba(201,168,76,0.04)' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Founder 2 */}
            <motion.div className="group relative overflow-hidden" {...fadeUp(0.2)}>
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/10 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[2px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, #C9A84C 0%, #F5D87A 50%, #C9A84C 100%)' }} />
              <div className="absolute inset-0 border border-white/8 group-hover:border-[#C9A84C]/40 transition-colors duration-500 z-20 pointer-events-none" />
              <div className="flex flex-col md:flex-row-reverse min-h-[260px]">
                <div className="relative md:w-56 shrink-0 overflow-hidden" style={{ background: '#0a0a0a' }}>
                  <img src="/pathashalaexpert/Indas team (29) (1).png" alt={t.s04.f2.name}
                    className="w-full h-full object-cover object-top min-h-[260px] group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: 'contrast(1.05) brightness(0.92)' }} />
                  <div className="absolute inset-0 hidden md:block"
                    style={{ background: 'linear-gradient(270deg, transparent 50%, rgba(6,6,6,0.95) 100%)' }} />
                </div>
                <div className="flex-1 relative p-8 md:p-10" style={{ background: 'linear-gradient(225deg, rgba(255,255,255,0.03) 0%, rgba(6,6,6,0.9) 60%)' }}>
                  <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'repeating-linear-gradient(-60deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[8px] tracking-[0.6em] text-white/35 group-hover:text-[#C9A84C] uppercase font-semibold transition-colors duration-300">{t.s04.f2.label}</span>
                        <div className="h-px flex-1 bg-white/8 group-hover:bg-[#C9A84C]/20 transition-colors duration-300" />
                        <span className="text-white/20 group-hover:text-[#C9A84C] text-xs transition-colors duration-300">✦</span>
                      </div>
                      <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 leading-tight">{t.s04.f2.name}</h3>
                      <p className="text-[#C9A84C]/80 text-sm font-medium">{t.s04.f2.role}</p>
                    </div>
                    <p className="text-[#F5F0E8]/55 text-sm leading-relaxed">{t.s04.f2.bio}</p>
                    <div className="flex flex-wrap items-end gap-6">
                      <div className="flex gap-4">
                        {[{ n: '21+', l: t.s04.f2.stat1l }, { n: '2', l: t.s04.f2.stat2l }].map(s => (
                          <div key={s.l}>
                            <p className={"font-display font-bold text-3xl leading-none " + GOLD_CLS} style={GOLD_IMG}>{s.n}</p>
                            <p className="text-[9px] text-[#F5F0E8]/30 uppercase tracking-widest mt-1">{s.l}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-8 w-px bg-white/8 hidden md:block" />
                      <div className="flex flex-wrap gap-2">
                        {t.s04.f2.skills.map(s => (
                          <span key={s} className="px-3 py-1 text-[10px] border border-white/8 text-[#F5F0E8]/35 tracking-wide group-hover:border-[#C9A84C]/20 transition-colors duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ APPROACH ══ */}
      <section className="py-24 px-6 border-t border-[#C9A84C]/8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/gif/K7.gif" alt="" className="w-full h-full object-cover object-center opacity-12" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.75) 0%, rgba(6,6,6,0.55) 50%, rgba(6,6,6,0.8) 100%)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">
            <motion.div {...fadeUp()}>
              <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.s05.label}</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-3">
                {t.s05.title1}<br /><span className={GOLD_CLS} style={GOLD_IMG}>{t.s05.titleGold}</span>
              </h2>
              <p className="text-[#F5F0E8]/40 text-sm mt-4 leading-relaxed max-w-md">{t.s05.desc}</p>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-3" {...fadeUp(0.15)}>
              {t.s05.cards.map((item, i) => (
                <motion.div key={i} className="group p-5 border border-white/6 hover:border-[#C9A84C]/35 transition-all duration-400 relative overflow-hidden"
                  whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06), transparent)' }} />
                  <span className="text-[#C9A84C] text-xl block mb-3 relative z-10">{item.icon}</span>
                  <p className="text-[#F5F0E8]/85 font-semibold text-sm mb-1.5 relative z-10 group-hover:text-[#C9A84C] transition-colors">{item.title}</p>
                  <p className="text-[#F5F0E8]/30 text-xs leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div className="relative p-10 text-center overflow-hidden border border-[#C9A84C]/20"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.02))' }} {...fadeUp(0.2)}>
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C]/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C]/40" />
            <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase block mb-4">✦ {t.s05.moveLabel}</span>
            <p className="text-[#F5F0E8]/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.s05.moveLine1}{' '}
              <span className={"font-bold text-xl " + GOLD_CLS} style={GOLD_IMG}>{t.s05.moveBold}</span>
              <br />
              {lang === 'en' ? <>Through <strong className="text-[#F5F0E8]/85">{t.s05.moveBold2}</strong>{t.s05.moveLine3}</> : <><strong className="text-[#F5F0E8]/85">{t.s05.moveBold2}</strong>{t.s05.moveLine3}</>}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ INDIA'S DEVELOPMENT ══ */}
      <section className="py-24 px-6 border-t border-[#C9A84C]/8 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(201,168,76,0.05), transparent 65%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp()}>
              <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.nat.label}</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-3 mb-6">
                {t.nat.title1}<br /><span className={GOLD_CLS} style={GOLD_IMG}>{t.nat.titleGold}</span>
              </h2>
              <p className="text-[#F5F0E8]/40 text-sm leading-relaxed mb-8">{t.nat.desc}</p>
              <motion.div className="relative p-6 border border-[#C9A84C]/20 overflow-hidden" {...fadeUp(0.15)}
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06), transparent)' }}>
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#C9A84C]/40" />
                <p className={"font-display font-bold text-base italic leading-relaxed " + GOLD_CLS} style={GOLD_IMG}>{t.nat.quote}</p>
              </motion.div>
            </motion.div>
            <div className="space-y-3">
              {t.nat.impact.map((item, i) => (
                <motion.div key={i} className="group flex items-start gap-4 p-5 border border-white/6 hover:border-[#C9A84C]/35 transition-all duration-300 relative overflow-hidden"
                  {...fadeUp(0.08 + i * 0.08)} whileHover={{ x: 4 } as any} transition={{ duration: 0.2 }}>
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C] transition-all duration-300" />
                  <span className="text-[#C9A84C] text-base shrink-0 mt-0.5">{ICONS[i]}</span>
                  <div>
                    <p className="text-[#F5F0E8]/80 font-semibold text-sm group-hover:text-[#C9A84C] transition-colors duration-300">{item.title}</p>
                    <p className="text-[#F5F0E8]/30 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VISION ══ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.07), transparent 65%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <span className="text-[8px] tracking-[0.6em] text-[#C9A84C] uppercase">{t.s06.label}</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">
              {t.s06.titlePre}{' '}
              <span className={GOLD_CLS} style={GOLD_IMG}>{t.s06.titleGold}<br />{t.s06.titlePost}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {t.s06.cards.map((v, i) => (
              <motion.div key={i} className="group relative p-8 text-center border border-[#C9A84C]/15 hover:border-[#C9A84C]/50 transition-all duration-400 overflow-hidden"
                style={{ background: 'rgba(201,168,76,0.03)' }} {...fadeUp(i * 0.12)}
                whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C9A84C]/0 to-transparent group-hover:via-[#C9A84C]/60 transition-all duration-500" />
                <span className="text-[#C9A84C] text-2xl block mb-4">✔</span>
                <p className="font-display font-bold text-xl text-[#F5F0E8] mb-2 group-hover:text-[#C9A84C] transition-colors">{v.word}</p>
                <p className="text-[#F5F0E8]/30 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center space-y-4 mb-14" {...fadeUp(0.2)}>
            {t.s06.beliefs.map((q, i) => (
              <p key={i} className={"text-lg md:text-xl italic font-light " + GOLD_CLS} style={GOLD_IMG}>{q}</p>
            ))}
          </motion.div>
          <motion.div className="relative py-16 px-10 text-center overflow-hidden border border-[#C9A84C]/30"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.02))' }} {...fadeUp(0.3)}>
            <div className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #F5D87A, #C9A84C, transparent)' }} />
            <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]/50" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]/50" />
            <div className="absolute inset-0 opacity-15"
              style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.35), transparent 60%)' }} />
            <span className="text-[9px] tracking-[0.6em] text-[#C9A84C] uppercase block mb-6 relative z-10">{t.s06.finalLabel}</span>
            <h3 className="font-display font-bold text-4xl md:text-6xl leading-tight text-[#F5F0E8] relative z-10">
              {t.s06.final1}<br />
              <span className={GOLD_CLS} style={GOLD_IMG}>{t.s06.final2}</span><br />
              {t.s06.final3}
            </h3>
            <p className="text-[#F5F0E8]/25 text-sm tracking-widest mt-6 relative z-10">{t.s06.finalTagline}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#C9A84C]/10 py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors">
          <span className="h-px w-5 bg-current" />
          <span className="text-[9px] tracking-[0.4em] uppercase">← {t.footer.back}</span>
        </Link>
        <p className="text-[8px] tracking-[0.4em] text-white/12 uppercase">{t.footer.copy}</p>
        <div className="w-24" />
      </footer>

    </main>
  )
}
