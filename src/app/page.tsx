'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Landmark,
  Radio,
  FileText,
  Users,
  Award,
  Search,
  Calendar,
  ChevronRight,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Shield,
  Lightbulb,
  Download,
  Check,
  MapPin,
  Sparkles,
  ArrowRight,
  Info,
  CalendarCheck,
  Play
} from 'lucide-react';

interface Edition {
  id: string;
  name: string;
  county: string;
  edition: string;
  date: string;
  region: string;
  assembly: string;
  hostSenator: string;
  status: string;
  image: string;
  summary: string;
  highlights: string[];
  keyCommittees: string[];
  hansardRecord: string;
}

interface Bill {
  id: string;
  title: string;
  description: string;
  county: string;
  committee: string;
  status: string;
  statusType: 'success' | 'info' | 'warning' | 'purple' | string;
  keywords: string[];
  fullBrief: string;
}

interface OrderPaperItem {
  id: string;
  dayKey: string;
  dayLabel: string;
  dateStr: string;
  time: string;
  venue: string;
  category: string;
  title: string;
  description: string;
  mover?: string;
  keyParticipants?: string;
  type: string;
  status: string;
}

interface Faq {
  id: number;
  q: string;
  a: React.ReactNode;
}

const HOST_EDITIONS: Edition[] = [
  {
    id: 'kilifi',
    name: 'Kilifi County',
    county: 'Kilifi',
    edition: '5th Edition',
    date: 'September 21–25, 2026',
    region: 'Coast Region',
    assembly: 'Kilifi County Assembly Chambers, Malindi',
    hostSenator: 'Sen. Stewart Madzayo, EGH, MP (Senate Minority Leader)',
    status: 'Upcoming',
    image: '/sessions_images/kilifi.jpeg',
    summary: 'Approved by Senate Motion on May 6, 2026. Convening to address Coast blue economy financing, salt mining royalties to indigenous host communities, and historical land injustice title adjudications.',
    highlights: [
      'Inquiry into artisanal maritime fisherfolk access corridors and cold storage along the Indian Ocean coastline.',
      'Enforcement of community royalty shares and environmental reclamation from Magarini large-scale salt harvesting companies.',
      'Public hearings on squatter resettlement schemes and title deed delays under the National Land Commission (NLC).',
      'Joint capacity benchmarking between Senate Legal Counsel and Kilifi County Assembly legislative drafters.'
    ],
    keyCommittees: ['Lands, Environment & Natural Resources', 'Energy & Mining', 'Trade & Tourism', 'CPAC'],
    hansardRecord: 'Senate Resolution of 6th May 2026 / Notice of Motion by Senate Business Committee (SBC)'
  },
  {
    id: 'busia',
    name: 'Busia County',
    county: 'Busia',
    edition: '4th Edition',
    date: 'October 6–10, 2025',
    region: 'Western Kenya',
    assembly: 'Busia County Assembly Chambers',
    hostSenator: 'Sen. Okiya Omtatah Okoiti',
    status: 'Concluded',
    image: '/sessions_images/busia.jpeg',
    summary: 'Convened pursuant to a motion moved by Majority Leader Sen. Aaron Cheruiyot, E.G.H., member for Kericho County. Addressed border congestion at Malaba/Busia OSBPs, Lake Victoria blue economy protection, and on-site CPAC audit hearings.',
    highlights: [
      'Decongestion of the Malaba and Busia One-Stop Border Posts (OSBP) and reduction of non-tariff barriers with Uganda.',
      'Bilateral security protocols protecting artisanal Lake Victoria fisherfolk from cross-border territorial harassment.',
      'On-site CPAC interrogation of Busia County Executive over stalled markets and dispensary medical inventory gaps.',
      'Inspection and upgrade oversight of the Alupe University Teaching and Referral Hospital.'
    ],
    keyCommittees: ['County Public Accounts (CPAC)', 'Agriculture, Livestock & Fisheries', 'National Security & Defense'],
    hansardRecord: 'Senate Mashinani Plenary Hansard Sitting Nos. 61–65 (Busia Assembly Chamber)'
  },
  {
    id: 'turkana',
    name: 'Turkana County',
    county: 'Turkana (Lodwar)',
    edition: '3rd Edition',
    date: 'September 25–29, 2023',
    region: 'North Rift / Arid Frontier',
    assembly: 'Turkana County Assembly, Lodwar',
    hostSenator: 'Sen. James Lomenen Ekomwa',
    status: 'Concluded',
      image: '/sessions_images/turkana.jpeg',
    summary: 'Convened concurrently with the Tobong’u Lore Cultural Festival. Hosted by Speaker Rt. Hon. Christopher Nakuleu and Speaker Amason Jeffah Kingi; interrogated oil revenue sharing and dryland water access.',
    highlights: [
      'Strict statutory enforcement of the 20% county government and 5% host community shares under Project Oil Kenya.',
      'Interrogation and forensic audit of 8 non-functional mega water boreholes in Turkana West and Central sub-counties.',
      'Cross-border peaceful grazing compacts between Turkana pastoralists, Karamoja (Uganda), and South Sudan.',
      'Joint technical symposium between Senate Hansard reporters and Turkana County Assembly Hansard personnel.'
    ],
    keyCommittees: ['Energy, Roads & Transportation', 'Finance & Budget', 'Devolution & Intergovernmental Relations'],
    hansardRecord: 'Senate Mashinani Plenary Hansard Vol. IV (Lodwar Assembly Chamber)'
  },
  {
    id: 'kitui',
    name: 'Kitui County',
    county: 'Kitui',
    edition: '2nd Edition',
    date: 'September 16–20, 2019',
    region: 'Eastern Kenya',
    assembly: 'Kitui County Assembly Hall',
    hostSenator: 'Sen. Enoch Kiio Wambua',
    status: 'Concluded',
    image: '/sessions_images/kitui_session.jpg',
    summary: 'Heard critical citizen petitions on Mui Basin coal exploration land rights, evaluated local manufacturing at KICOTEC, and initiated the nationwide Mung Beans (Ndengu) Bill.',
    highlights: [
      'Senate Agriculture Committee stakeholder hearings directly originating The Mung Beans (Ndengu) Bill.',
      'Environmental and land compensation hearings safeguarding local families across the Mui Coal Basin.',
      'Apparel value-addition benchmarking at the Kitui County Textile Centre (KICOTEC) garment manufacturing plant.',
      'Capacity development and procedural Standing Orders peer-review for Kitui County Assembly MCAs.'
    ],
    keyCommittees: ['Agriculture, Livestock & Fisheries', 'Environment, Land & Natural Resources', 'Trade & Industrialization'],
    hansardRecord: 'Senate Hansard Vol. II, Part 3 (Kitui Assembly Special Sitting)'
  },
  {
    id: 'uasin-gishu',
    name: 'Uasin Gishu County',
    county: 'Uasin-Gishu (Eldoret)',
    edition: '1st Inaugural Launch',
    date: 'September 24–28, 2018',
    region: 'North Rift Breadbasket',
    assembly: 'Eldoret County Assembly Chambers',
    hostSenator: 'Prof. Margaret Jepkoech Kamar',
    status: 'Concluded',
    image: '/sessions_images/uasingishu.jpeg',
    summary: 'The historic trailblazer. The first time in Kenya’s history that Parliament sat outside Nairobi under Article 126(1), directly tackling the national maize payment crisis and athlete welfare.',
    highlights: [
      'First historic implementation of Article 126(1) of the Constitution of Kenya outside Nairobi.',
      'Parliamentary summons securing prompt payments for grain supplies delivered to the National Cereals & Produce Board (NCPB).',
      'Policy recommendations establishing price caps on government-subsidized planting and top-dressing fertilizers.',
      'Special public hearings on world-class athlete social safety nets, anti-doping education, and post-career medical cover.'
    ],
    keyCommittees: ['Agriculture, Livestock & Fisheries', 'Labour & Social Welfare', 'Finance & Budget'],
    hansardRecord: 'Historic Inaugural Mashinani Hansard Record (Eldoret County Assembly)'
  }
];

const DEVOLUTION_BILLS: Bill[] = [
  {
    id: 'b1',
    title: 'The Mung Beans (Ndengu) Bill',
    description: 'Framework for regulation, grading, pricing, and export promotion of pulses',
    county: 'Kitui County',
    committee: 'Agriculture, Livestock & Fisheries',
    status: 'Passed by Senate / Referred to NA',
    statusType: 'success',
    keywords: ['mung beans', 'ndengu', 'kitui', 'agriculture', 'trade', 'value addition'],
    fullBrief: 'Originating directly from stakeholder hearings at the 2nd Senate Mashinani in Kitui, this legislation creates an institutional framework to regulate the production, processing, marketing, and pricing of green grams, protecting arid smallholders from broker exploitation.'
  },
  {
    id: 'b2',
    title: 'County Allocation of Revenue Bill (CARA)',
    description: 'Equitable share allocation to border, arid, and agricultural counties',
    county: 'All 47 Counties',
    committee: 'Standing Committee on Finance & Budget',
    status: 'Annual Statutory Enactment',
    statusType: 'info',
    keywords: ['county allocation', 'revenue', 'cara', 'equitable share', 'devolution funds', 'finance'],
    fullBrief: 'Determines the equitable division of revenue raised nationally between the 47 county governments. Grassroots sittings allow senators to audit how delay in disbursements disrupts county healthcare, roads, and ECDE programs on the ground.'
  },
  {
    id: 'b3',
    title: 'Lake Victoria Fisheries & Maritime Protection Petition',
    description: 'Safeguarding artisanal fisherfolk and cross-border fish landing sites',
    county: 'Busia County',
    committee: 'Agriculture & National Cohesion',
    status: 'Committee Report Tabled',
    statusType: 'warning',
    keywords: ['lake victoria', 'blue economy', 'fisheries', 'busia', 'malaba', 'border trade', 'security'],
    fullBrief: 'A joint petition by Busia and Lake Victoria basin fisherfolk requesting formal bilateral enforcement of fishing rights with Uganda, safety infrastructure at landing sites, and subsidies for modern fiber fishing gear.'
  }
];

const ORDER_PAPER_ITEMS: OrderPaperItem[] = [
  // DAY TWO
  {
    id: 'op1',
    dayKey: 'day2',
    dayLabel: 'Sun 20 Sep',
    dateStr: 'Sun 20 Sep 2026',
    time: '02:00 PM',
    venue: 'Malindi Women\'s Prison',
    category: 'Outreach',
    title: 'KEWOSA Visit to Malindi Women\'s Prison',
    description: 'Kenya Women Senators\' Association (KEWOSA) visit and outreach to the Malindi Women\'s Prison facility.',
    type: 'Committee',
    status: 'Completed'
  },
  {
    id: 'op2',
    dayKey: 'day2',
    dayLabel: 'Sun 20 Sep',
    dateStr: 'Sun 20 Sep 2026',
    time: '03:00 PM',
    venue: 'Town Secondary School, Malindi',
    category: 'Protocol & Sports',
    title: 'Football Match: Senate vs Kilifi County Assembly',
    description: 'Friendly football match engaging Senators and Kilifi County Assembly Members to build rapport ahead of the sittings.',
    type: 'Protocol',
    status: 'Completed'
  },

  // DAY THREE
  {
    id: 'op3',
    dayKey: 'day3',
    dayLabel: 'Mon 21 Sep',
    dateStr: 'Mon 21 Sep 2026',
    time: '08:30 AM',
    venue: 'Malindi and Ganze Sub-Counties',
    category: 'Inspection Visit',
    title: 'Finance & Roads Committees Joint Inspection',
    description: 'Joint inspection visit to inspect projects funded by the Equalization Fund in Malindi and Ganze Sub-Counties.',
    mover: 'Finance & Budget / Roads & Transportation',
    type: 'Inspection',
    status: 'Completed'
  },
  {
    id: 'op4',
    dayKey: 'day3',
    dayLabel: 'Mon 21 Sep',
    dateStr: 'Mon 21 Sep 2026',
    time: '09:00 AM',
    venue: 'Malindi and Marafa Hospitals',
    category: 'Inspection Visit',
    title: 'Health & CPAC Joint Inspection of Healthcare Facilities',
    description: 'Joint inspection visit to Malindi Sub-County Hospital and Marafa Sub-County Hospital to assess the provision of healthcare services.',
    mover: 'Health / CPAC',
    type: 'Inspection',
    status: 'Completed'
  },
  {
    id: 'op5',
    dayKey: 'day3',
    dayLabel: 'Mon 21 Sep',
    dateStr: 'Mon 21 Sep 2026',
    time: '09:00 AM',
    venue: 'Meeting Room 2, Ground Floor, New Assembly Building',
    category: 'Committee Inquiry',
    title: 'Lands & Environment Committee Meeting on Mining',
    description: 'Meeting with the Ministry of Environment, Ministry of Mining and Blue Economy, and Mining Companies on environmental obligations and impact assessments.',
    mover: 'Land, Environment & Natural Resources',
    type: 'Committee',
    status: 'Completed'
  },
  {
    id: 'op6',
    dayKey: 'day3',
    dayLabel: 'Mon 21 Sep',
    dateStr: 'Mon 21 Sep 2026',
    time: '01:00 PM',
    venue: 'Magarini Sub-County',
    category: 'Inspection Visit',
    title: 'Inspection of Salt Mining & Sand Quarries',
    description: 'Inspection visits to Krystalline Salt Limited (Marereni) and Mjana Heri sand quarries to assess environmental audit compliance.',
    mover: 'Land, Environment & Natural Resources',
    type: 'Inspection',
    status: 'Completed'
  },
  {
    id: 'op7',
    dayKey: 'day3',
    dayLabel: 'Mon 21 Sep',
    dateStr: 'Mon 21 Sep 2026',
    time: '02:00 PM',
    venue: 'Tent 1, New Assembly Building Grounds',
    category: 'Committee Inquiry',
    title: 'CPAC Meeting on Outstanding Pending Bills',
    description: 'Meeting with the Suppliers\' Association of Kilifi County and other affected vendors to deliberate on outstanding pending bills.',
    mover: 'County Public Accounts Committee',
    type: 'Committee',
    status: 'Completed'
  },

  // DAY FOUR
  {
    id: 'op8',
    dayKey: 'day4',
    dayLabel: 'Tue 22 Sep',
    dateStr: 'Tue 22 Sep 2026',
    time: '07:30 AM',
    venue: 'Kilifi Central Fish Landing Site',
    category: 'Inspection Visit',
    title: 'Blue Economy & Fisheries Joint Inspection',
    description: 'Joint inspection of cold storage, fish banda, and solar projects; stakeholder engagement with beach management units.',
    mover: 'Agriculture / Energy / Lands',
    type: 'Inspection',
    status: 'Completed'
  },
  {
    id: 'op9',
    dayKey: 'day4',
    dayLabel: 'Tue 22 Sep',
    dateStr: 'Tue 22 Sep 2026',
    time: '08:30 AM',
    venue: 'Meeting Room 3, New Assembly Building',
    category: 'Committee Inquiry',
    title: 'Finance & Budget: Kilifi Pending Bills',
    description: 'Meeting with the Kilifi County Executive to deliberate on the status of pending bills.',
    mover: 'Standing Committee on Finance and Budget',
    type: 'Committee',
    status: 'Completed'
  },
  {
    id: 'op10',
    dayKey: 'day4',
    dayLabel: 'Tue 22 Sep',
    dateStr: 'Tue 22 Sep 2026',
    time: '09:00 AM',
    venue: 'Malindi Sub-County',
    category: 'Inspection Visit',
    title: 'Education Committee ECDE Inspection',
    description: 'Inspection of Sabaki, Malindi Central, and Sir Ali Bin Salim ECDE Centres to verify Auditor General recommendations.',
    mover: 'Standing Committee on Education',
    type: 'Inspection',
    status: 'Completed'
  },
  {
    id: 'op11',
    dayKey: 'day4',
    dayLabel: 'Tue 22 Sep',
    dateStr: 'Tue 22 Sep 2026',
    time: '11:30 AM',
    venue: 'Meeting Room 3, New Assembly Building',
    category: 'Committee Inquiry',
    title: 'National Security Meeting with Governor',
    description: 'Deliberation on the prevailing security situation, emerging threats, and disaster management with the Governor and County Commissioner.',
    mover: 'National Security, Defence & Foreign Relations',
    type: 'Committee',
    status: 'Completed'
  },
  {
    id: 'op12',
    dayKey: 'day4',
    dayLabel: 'Tue 22 Sep',
    dateStr: 'Tue 22 Sep 2026',
    time: '02:30 PM',
    venue: 'Kilifi County Assembly Chamber',
    category: 'Chamber Plenary',
    title: 'Senate Plenary Sitting',
    description: 'Consideration of Bills, Motions, Petitions and Statements.',
    mover: 'Speaker of the Senate',
    type: 'Plenary',
    status: 'Completed' // Evaluated as completed given current time context
  },

  // DAY FIVE
  {
    id: 'op13',
    dayKey: 'day5',
    dayLabel: 'Wed 23 Sep',
    dateStr: 'Wed 23 Sep 2026',
    time: '09:30 AM',
    venue: 'Kilifi County Assembly Chamber',
    category: 'Chamber Plenary',
    title: 'Senate Plenary: Responses to Questions by CSs',
    description: 'Responses to Questions by Cabinet Secretaries for ICT, Youth Affairs, Education, and Mining & Blue Economy.',
    mover: 'Speaker of the Senate',
    type: 'Plenary',
    status: 'Completed'
  },
  {
    id: 'op14',
    dayKey: 'day5',
    dayLabel: 'Wed 23 Sep',
    dateStr: 'Wed 23 Sep 2026',
    time: '02:30 PM',
    venue: 'Kilifi County Assembly Chamber',
    category: 'Chamber Plenary',
    title: 'Senate Plenary Sitting',
    description: 'Consideration of Bills, Motions, Petitions and Statements.',
    mover: 'Speaker of the Senate',
    type: 'Plenary',
    status: 'Completed'
  },

  // DAY SIX
  {
    id: 'op15',
    dayKey: 'day6',
    dayLabel: 'Thu 24 Sep',
    dateStr: 'Thu 24 Sep 2026',
    time: '08:00 AM',
    venue: 'Tezo Cashew Processing Plant',
    category: 'Inspection Visit',
    title: 'Agro-processing & Labour Inspection',
    description: 'Joint visit to assess workplace safety standards, labour practices, and value addition at the Tezo Cashew Processing Plant.',
    mover: 'Agriculture / Labour & Social Welfare',
    type: 'Inspection',
    status: 'Ongoing'
  },
  {
    id: 'op16',
    dayKey: 'day6',
    dayLabel: 'Thu 24 Sep',
    dateStr: 'Thu 24 Sep 2026',
    time: '09:00 AM',
    venue: 'Malindi Marine National Park and Reserve',
    category: 'Inspection Visit',
    title: 'Tourism & Trade Inspection Visit',
    description: 'Inspection of Malindi Marine National Park and Reserve and the Mambrui Sand Dunes with the County Assembly Committee.',
    mover: 'Trade, Industrialization & Tourism',
    type: 'Inspection',
    status: 'Ongoing'
  },
  {
    id: 'op17',
    dayKey: 'day6',
    dayLabel: 'Thu 24 Sep',
    dateStr: 'Thu 24 Sep 2026',
    time: '11:30 AM',
    venue: 'Tent 1, New Assembly Building Grounds',
    category: 'Committee Inquiry',
    title: 'Education Meeting with Governor',
    description: 'Meeting with the Governor of Kilifi County to assess the Auditor General\'s Report on ECDE provision.',
    mover: 'Standing Committee on Education',
    type: 'Committee',
    status: 'Ongoing'
  },
  {
    id: 'op18',
    dayKey: 'day6',
    dayLabel: 'Thu 24 Sep',
    dateStr: 'Thu 24 Sep 2026',
    time: '02:30 PM',
    venue: 'Kilifi County Assembly Chamber',
    category: 'Chamber Plenary',
    title: 'Senate Plenary Sitting',
    description: 'Consideration of Bills, Motions, Petitions and Statements.',
    mover: 'Speaker of the Senate',
    type: 'Plenary',
    status: 'Ongoing'
  },

  // DAY SEVEN
  {
    id: 'op19',
    dayKey: 'day7',
    dayLabel: 'Fri 25 Sep',
    dateStr: 'Fri 25 Sep 2026',
    time: '09:00 AM',
    venue: 'Meeting Room 2, New Assembly Building',
    category: 'Committee Inquiry',
    title: 'Health Meeting with Governor',
    description: 'Deliberations on healthcare provision and findings from the Malindi and Marafa hospital oversight visits.',
    mover: 'Standing Committee on Health',
    type: 'Committee',
    status: 'Upcoming'
  },
  {
    id: 'op20',
    dayKey: 'day7',
    dayLabel: 'Fri 25 Sep',
    dateStr: 'Fri 25 Sep 2026',
    time: '10:00 AM',
    venue: 'Tana River County',
    category: 'Committee Inquiry',
    title: 'CPAC Meeting: Tana River Suppliers',
    description: 'Meeting with the Suppliers\' Association of Tana River County to deliberate on outstanding pending bills.',
    mover: 'County Public Accounts Committee',
    type: 'Committee',
    status: 'Upcoming'
  },

  // DAY EIGHT
  {
    id: 'op21',
    dayKey: 'day8',
    dayLabel: 'Sat 26 Sep',
    dateStr: 'Sat 26 Sep 2026',
    time: '10:00 AM',
    venue: 'Tana River County',
    category: 'Inspection Visit',
    title: 'CPAC Tana River Projects Inspection',
    description: 'Inspection visits to ongoing development projects by the Tana River County Government.',
    mover: 'County Public Accounts Committee',
    type: 'Inspection',
    status: 'Upcoming'
  }
];

const faqs: Faq[] = [
  {
    id: 1,
    q: "1. What is the legal basis for Senate Mashinani?",
    a: (
      <>
        The program is anchored in <strong>Article 126(1)</strong> of the Constitution of Kenya, which states that a sitting of either House of Parliament may be held at any place within Kenya and commence at any time the House appoints.<br /><br />It also supports the Senate&apos;s core constitutional mandate under <strong>Article 96</strong> to represent and protect the interests of counties and their governments.
      </>
    )
  },
  {
    id: 2,
    q: "2. What are the main objectives of the initiative?",
    a: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        <div className="card p-3.5">
          <span className="font-bold text-[var(--primary)] text-xs uppercase block mb-1">📢 Enhancing Public Awareness</span>
          <span className="text-xs text-[var(--muted)]">Educating citizens on the specific roles, functions, and legislative processes of the Senate.</span>
        </div>
        <div className="card p-3.5">
          <span className="font-bold text-[var(--accent)] text-xs uppercase block mb-1">🏛️ Promoting Devolution</span>
          <span className="text-xs text-[var(--muted)]">Bringing parliamentary business closer to grassroots populations to better understand local challenges and successes.</span>
        </div>
        <div className="card p-3.5">
          <span className="font-bold text-[var(--gold)] text-xs uppercase block mb-1">🤝 Strengthening Partnerships</span>
          <span className="text-xs text-[var(--muted)]">Fostering direct working relationships between national lawmakers and county governments.</span>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const [selectedEditionTab, setSelectedEditionTab] = useState<string>('all');
  const [billSearchQuery, setBillSearchQuery] = useState<string>('');

  // Default active tab to Tue 22 Sep (day4) based on current real-world time context mapped to the new schedule
  const [activeDayFilter, setActiveDayFilter] = useState<string>('day6');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');

  const [activeEditionModal, setActiveEditionModal] = useState<Edition | null>(null);
  const [activeBillModal, setActiveBillModal] = useState<Bill | null>(null);
  const [liveStreamModalOpen, setLiveStreamModalOpen] = useState<boolean>(false);

  const hansardQuotes = [
    `The Hon. Senators brings House to Kilifi to deliberate on our shared coastal heritage.`,
    `"Our artisanal fisherfolk along the Malindi coastline deserve world-class cold storage and secure landing corridors." — Sen. Stewart Madzayo`,
    `"Salt mining companies in Magarini must remit equitable royalties directly to host community trusts." — Committee on Natural Resources`,
  ];
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % hansardQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const playCivicTone = (frequency = 440, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        ctx = new AudioContextClass();
        audioCtxRef.current = ctx;
      }
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback prevented.", e);
    }
  };

  const filteredBills = useMemo(() => {
    if (!billSearchQuery.trim()) return DEVOLUTION_BILLS;
    const q = billSearchQuery.toLowerCase();
    return DEVOLUTION_BILLS.filter((b) =>
      b.title.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.county.toLowerCase().includes(q) ||
      b.committee.toLowerCase().includes(q) ||
      b.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [billSearchQuery]);

  const filteredEditions = useMemo(() => {
    if (selectedEditionTab === 'all') return HOST_EDITIONS;
    return HOST_EDITIONS.filter((e) => e.id === selectedEditionTab);
  }, [selectedEditionTab]);

  const filteredProgramSessions = useMemo(() => {
    return ORDER_PAPER_ITEMS.filter((item) => {
      const matchDay = activeDayFilter === 'all' || item.dayKey === activeDayFilter;
      const matchType = activeTypeFilter === 'all' || item.type === activeTypeFilter;
      return matchDay && matchType;
    });
  }, [activeDayFilter, activeTypeFilter]);

  const downloadHansardFile = () => {
    playCivicTone(523.25, 'sine', 0.2); 
    const hansardContent = `THE PARLIAMENT OF KENYA... (Content omitted for brevity)`;
    const blob = new Blob([hansardContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Official_Kilifi_Senate_Mashinani_Programme_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--primary)] selection:text-white transition-colors duration-300 pb-10">
      
      {/* Kenya Flag Ribbon using globals.css class */}
      <div className="kenya-stripe w-full" />

      {/* Hero Section using globals.css hero-gradient */}
      <section className="relative hero-gradient text-white overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <img
            src="/sessions_images/senate.jpg"
            alt="Senate Chamber in session"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x800/020617/ffffff?text=Senate+Chamber'; }}
            className="w-full h-full object-cover object-center opacity-95 filter saturate-150 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-[var(--primary)]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[var(--gold)]">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-ping" />
                Article 126(1) Resolution · Democracy Beyond Nairobi
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Taking Parliament <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-light)] via-[var(--gold)] to-white">
                  To The Grassroots 
                </span>
              </h1>
              <h5 className="text-lg italic sm:text-xl lg:text-2xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--gold)] to-[var(--primary-light)] font-serif">
                Devolution In Action 
              </h5>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed font-semibold">
                Senate Mashinani relocates the sovereign plenary and committees sittings to host County Assemblies. Interrogating devolution expenditure, receiving citizen petitions, and conducting live oversight where Kenyans live and work.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#editions"
                  onClick={() => playCivicTone(440, 'sine', 0.1)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-[var(--primary)] text-white border border-white/20 backdrop-blur-md transition-all"
                >
                  <MapPin className="w-4 h-4 text-[var(--gold)]" />
                  Explore Host Counties
                </a>
              </div>

              {/* Key Quantitative Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">47</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">Counties Represented</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--gold)]">5</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">Historic Sittings</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-light)]">100%</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">Binding Hansard Power</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <div className="relative card p-6 overflow-hidden backdrop-blur-md bg-[var(--card)]/80">
                
                <div className="flex items-center justify-between w-full pb-4 border-b border-[var(--card-border)]">
                  <div className="flex items-center w-full gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                      Live Sitting Assembly
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 text-[10px] font-extrabold uppercase rounded shadow animate-pulse">
                        5th Edition
                      </span>
                </div>

                <div className="w-full h-full mt-4 space-y-4">
                  <div 
                    className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer border border-[var(--card-border)] bg-black"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    {!isVideoPlaying ? (
                      <>
                        <img
                          src="/sessions_images/kilifi.png"
                          alt="Kilifi Coastal County Session Thumbnail"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                          <div className="w-16 h-1 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <Play className="w-8 h-8 ml-1 fill-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <iframe 
                        className="w-full h-full absolute inset-0"
                        src="https://www.youtube.com/embed/fSL3XTkAMfw?si=vkaqpblMK0x-rGP5" 
                        title="Parliament of Kenya" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">Host Assembly</span>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Kilifi County Assembly</h3>
                        <p className="text-xs text-[var(--muted)]">Blue Economy, Salt Mining Royalties & Land Rights</p>
                      </div>
                      <span className="px-2.5 py-1 bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 text-[10px] font-extrabold uppercase rounded shadow animate-pulse">
                        Ongoing
                      </span>
                    </div>
                  </div>

                  <div className="bg-[var(--background)] rounded-xl p-4 border border-[var(--card-border)] space-y-3 text-xs text-[var(--foreground)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="font-semibold flex items-center gap-1.5 text-[var(--muted)] shrink-0">
                        <Users className="w-3.5 h-3.5 text-[var(--gold)]" /> Host Senator:
                      </span>
                      <span className="font-medium text-left sm:text-right">Sen. Stewart Madzayo, EGH, MP</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="font-semibold flex items-center gap-1.5 text-[var(--muted)] shrink-0">
                        <FileText className="w-3.5 h-3.5 text-[var(--primary)]" /> House Mandate:
                      </span>
                      <span className="font-medium text-left sm:text-right">Adopted Senate Motion (6th May 2026)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="bg-[var(--card)] text-[var(--foreground)] border-y border-[var(--card-border)] py-3 px-4 relative z-10 transition-colors duration-300">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .fade-edges {
            mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
          }
        `}</style>
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs font-medium overflow-hidden">
          <div className="flex items-center gap-1.5 bg-[var(--gold)] text-slate-950 px-2.5 py-1 rounded font-bold uppercase tracking-wider shrink-0 shadow-sm z-20">
            <Radio className="w-3.5 h-3.5" />
            Senate Dispatch
          </div>
          
          <div className="flex-1 overflow-hidden relative flex items-center fade-edges">
            <div className="animate-marquee flex gap-8 whitespace-nowrap text-[var(--muted)]">
              {/* First Set of Content aligned with Sep 22, 2026 events in Kilifi */}
              <div className="flex gap-8 items-center px-4">
                <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  KILIFI MASHINANI: Day 2 officially concludes after rigorous Chamber debate on Coastal Blue Economy & Maritime Corridors Motion.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Kilifi County Assembly formally suspends its regular legislative business to host the 5th Senate Mashinani Edition.
                </span>
                <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  Lands & Environment Committee set to visit Magarini tomorrow to investigate salt mining royalties and aquifer contamination.
                </span>
                 <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Senators conduct joint oversight visits at Kilifi Central Fish Landing Site, demanding modernized cold storage facilities.
                </span>
              </div>
              {/* Duplicated Set for Seamless Infinite Scroll */}
              <div className="flex gap-8 items-center px-4" aria-hidden="true">
                 <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  KILIFI MASHINANI: Day 2 officially concludes after rigorous Chamber debate on Coastal Blue Economy & Maritime Corridors Motion.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Kilifi County Assembly formally suspends its regular legislative business to host the 5th Senate Mashinani Edition.
                </span>
                <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  Lands & Environment Committee set to visit Magarini tomorrow to investigate salt mining royalties and aquifer contamination.
                </span>
                 <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Senators conduct joint oversight visits at Kilifi Central Fish Landing Site, demanding modernized cold storage facilities.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="py-20 bg-[var(--background)] w-full transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20">
              Devolution In Real Action
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-4 transition-colors">
              Demystifying Parliament for All Kenyans
            </h2>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-3 rounded-full" />
            <p className="text-base sm:text-lg text-[var(--muted)] mt-4 leading-relaxed transition-colors">
              Senate Mashinani is Kenya&apos;s celebrated democratic innovation, globally recognized for dismantling the geographic distance between national legislators and grassroots citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-[var(--muted)] leading-relaxed text-sm sm:text-base transition-colors">
              <h3 className="text-2xl font-bold text-[var(--foreground)] transition-colors">
                The Constitutional Anchor
              </h3>
              <p>
                Under <strong>Article 126(1)</strong> of the Constitution of Kenya, sittings of either House of Parliament may be held at any place within Kenya as the House determines. Together with <strong>Article 96</strong>, which obligates the Senate to protect county interests and county governments, Senate Mashinani translates constitutional theory into living practice.
              </p>
              <div className="card p-4 border-l-4 border-l-[var(--primary)] text-xs sm:text-sm text-[var(--muted)] italic transition-colors shadow-sm">
                &ldquo;The Senate plays the critical interlinkage role between the National and County levels of government. There is need to enhance interaction between the Senate and County Governments, bringing the Senate closer to the Counties and the general public.&rdquo;
                <div className="font-bold text-[var(--foreground)] mt-2 not-italic">— Sen. Aaron Cheruiyot, E.G.H., member for Kericho County, Majority Leader of the Senate</div>
              </div>
            </div>

            <div>
              <div className="flex items-center w-full h-full card overflow-hidden shadow-sm">            
                <img
                  src="/sessions_images/chambers.jpg"
                  alt="Host Counties Selection"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/0f172a/ffffff?text=Senate+Chamber'; }}
                  className="w-full h-auto object-cover transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="py-20 bg-[var(--card)]/50 border-t border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20">
              Strategic Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-4 transition-colors">
              The 4 Core Pillars of Senate Mashinani
            </h2>
            <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-3 rounded-full" />
            <p className="text-base text-[var(--muted)] mt-4 transition-colors">
              Codified by the Parliament of Kenya and recognized in international legislative governance forums as best practice for public accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 shadow-sm hover:shadow-xl hover:border-[var(--primary)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  Promote Senate Mandate
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed transition-colors">
                  Educating citizens on the Senate&apos;s distinct constitutional mission: safeguarding revenue allocations, passing devolution laws, and conducting national oversight.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--primary)] flex items-center justify-between transition-colors">
                <span>Article 96 Mandate</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            <div className="card p-6 shadow-sm hover:shadow-xl hover:border-[var(--accent)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  Public Participation
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed transition-colors">
                  Highlighting direct channels under Article 118 for local residents, fisherfolk, farmers, women, and youth to petition standing committees in person.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--accent)] flex items-center justify-between transition-colors">
                <span>Article 118 Lawmaking</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            <div className="card p-6 shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                  Intergovernmental Synergy
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed transition-colors">
                  Deepening functional collaboration between national legislators, County Governors, County Executives, and regional socio-economic development blocs.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--gold)] flex items-center justify-between transition-colors">
                <span>County Executive Link</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            <div className="card p-6 shadow-sm hover:shadow-xl hover:border-[var(--primary-light)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)]/10 text-[var(--primary-light)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary-light)] transition-colors">
                  County Assembly Capacity
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed transition-colors">
                  Empowering Members of County Assemblies (MCAs), Hansard reporters, and legal drafters through peer benchmarking and parliamentary masterclasses.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--primary-light)] flex items-center justify-between transition-colors">
                <span>Knowledge Transfer</span>
                <Check className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="editions" className="py-20 bg-[var(--background)] relative transition-colors duration-300 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-3.5 py-1.5 rounded-full transition-colors">
                Parliamentary Sitting Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-4 transition-colors">
                Host County Sittings
              </h2>
              <p className="text-[var(--muted)] text-base mt-2 max-w-xl transition-colors">
                Verified records of all Senate Mashinani sittings held in accordance with Article 126(1) and the Senate Resolution of March 8, 2023.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 p-1.5 card transition-colors">
              <button
                onClick={() => setSelectedEditionTab('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedEditionTab === 'all' 
                  ? 'bg-[var(--primary)] text-white shadow' 
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                All Sittings (5)
              </button>
              {HOST_EDITIONS.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEditionTab(ed.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    selectedEditionTab === ed.id 
                    ? 'bg-[var(--primary)] text-white shadow' 
                    : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {ed.county.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditions.map((ed) => (
              <div
                key={ed.id}
                className="card overflow-hidden hover:border-[var(--primary)] transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="relative h-52 overflow-hidden bg-[var(--card)]">
                  <img
                    src={ed.image}
                    alt={ed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[var(--primary)] text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow">
                      {ed.edition}
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-[var(--gold)] text-[11px] font-semibold px-2.5 py-1 rounded border border-white/10">
                    {ed.date}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between transition-colors">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {ed.name}
                      </h3>
                      <span className="text-[11px] text-[var(--foreground)] font-semibold">{ed.region}</span>
                    </div>
                    <p className="text-xs text-[var(--gold)] font-bold mt-1 mb-2">
                      Host: {ed.hostSenator}
                    </p>
                    <p className="text-[var(--muted)] text-xs leading-relaxed mb-4 transition-colors">
                      {ed.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--card-border)] space-y-2 transition-colors">
                    <div className="text-[11px] text-[var(--muted)] flex items-center justify-between transition-colors">
                      <span className="truncate max-w-[200px]" title={ed.assembly}>{ed.assembly}</span>
                      <button
                        onClick={() => {
                          playCivicTone(587.33, 'triangle', 0.15);
                          setActiveEditionModal(ed);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold flex items-center gap-1 shrink-0 transition-colors"
                      >
                        Full Record <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="order-paper" className="py-20 bg-[var(--card)]/50 border-y border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/20 inline-flex items-center gap-2 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                  Official Kilifi Sitting Schedule
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-2 transition-colors">
                Kilifi County Assembly Plenary & Committee Timetable
              </h2>
              <p className="text-[var(--muted)] text-base mt-2 max-w-3xl transition-colors">
                Full 5-day official itinerary (September 21–25, 2026) in Malindi, Magarini, and Watamu pursuant to Article 126(1) and the Senate Resolution of May 6, 2026.
              </p>
            </div>
          </div>

          <div className="card p-4 shadow-sm mb-8 space-y-3 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5 transition-colors">
                <Calendar className="w-4 h-4 text-[var(--gold)]" /> Select Sitting Day:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: 'All Days' },
                  { key: 'day2', label: 'Sun 20 Sep' },
                  { key: 'day3', label: 'Mon 21 Sep' },
                  { key: 'day4', label: 'Tue 22 Sep' }, 
                  { key: 'day5', label: 'Wed 23 Sep' },
                  { key: 'day6', label: 'Thu 24 Sep' },
                  { key: 'day7', label: 'Fri 25 Sep' },
                  { key: 'day8', label: 'Sat 26 Sep' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveDayFilter(tab.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeDayFilter === tab.key
                        ? 'bg-[var(--primary)] text-white shadow'
                        : 'bg-transparent text-[var(--muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 card shadow-sm overflow-hidden transition-colors duration-300">
              <div className="p-6 border-b border-[var(--card-border)] flex items-center justify-between bg-[var(--background)] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)] text-[var(--primary)] flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] text-base transition-colors">Verified Kilifi Order Paper</h3>
                    <p className="text-xs text-[var(--muted)] transition-colors">Kilifi County Assembly Chambers, Malindi</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--primary)] bg-[var(--gold)] px-3 py-1 rounded-full transition-colors">
                  {filteredProgramSessions.length} Scheduled
                </span>
              </div>

              <div className="divide-y divide-[var(--card-border)] max-h-[760px] overflow-y-auto transition-colors">
                {filteredProgramSessions.length === 0 ? (
                  <div className="p-8 text-center text-[var(--muted)] text-xs transition-colors">
                    No sessions match the selected day and session type filter.
                  </div>
                ) : (
                  filteredProgramSessions.map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 transition-colors flex items-start gap-4 ${
                        item.status === 'Completed'
                        ? 'bg-[var(--background)]/50 opacity-70'
                        : item.status === 'Ongoing' 
                        ? 'bg-[var(--gold)]/5 border-l-4 border-[var(--gold)]' 
                        : 'hover:bg-[var(--background)]'
                      }`}
                    >
                      <div className="shrink-0 space-y-1 text-center">
                        <span className="text-[10px] font-mono font-bold text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded block whitespace-nowrap transition-colors border border-[var(--card-border)]">
                          {item.time}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[var(--gold)] text-[var(--primary)] border border-[var(--primary)]/20 block transition-colors">
                          {item.dayLabel}
                        </span>
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <h4 className="text-sm font-bold text-[var(--foreground)] transition-colors">{item.title}</h4>
                        <p className="text-xs text-[var(--muted)] leading-relaxed transition-colors">{item.description}</p>
                        
                        {item.mover && (
                          <div className="text-[11px] text-[var(--muted)] bg-[var(--background)] p-2 rounded border border-[var(--card-border)] transition-colors">
                            <strong className="text-[var(--foreground)]">Mover / Chair:</strong> {item.mover}
                          </div>
                        )}
                      </div>

                      <span className={`text-xs font-bold shrink-0 px-2 py-1 rounded transition-colors border ${
                        item.status === 'Completed' ? 'text-white border-[var(--card-border)] bg-green-700' :
                        item.status === 'Ongoing' ? 'text-white border-[var(--accent)] bg-[var(--accent)] animate-pulse' :
                        'text-white border-[var(--primary)]/30 bg-[var(--primary)]'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="card shadow-xl overflow-hidden text-[var(--foreground)] transition-colors">
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                  <img
                    src="/sessions_images/kilifi.jpeg"
                    alt="Kilifi County Chamber"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                  <div className="absolute bottom-3 left-4 right-4 bg-black/85 backdrop-blur-md p-2.5 rounded-lg border border-slate-800">
                    <p className="text-xs text-[var(--gold)] font-mono italic">
                      {hansardQuotes[quoteIndex]}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[var(--foreground)] text-base transition-colors">Senate Plenary Mashinani</h4>
                      <p className="text-xs text-[var(--muted)] transition-colors">Broadcasting live from Kilifi County Assembly Chambers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
    
      {}
      {activeEditionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 transition-colors">
            <button
              onClick={() => setActiveEditionModal(null)}
              className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-xs uppercase font-bold text-[#D4AF37]">
                  {activeEditionModal.status === 'Upcoming' ? 'Official Proclamation' : 'Official Parliamentary Hansard'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white transition-colors">
                {activeEditionModal.name} ({activeEditionModal.edition})
              </h3>
              <div className="pb-2 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 transition-colors">
                <p><strong>Sitting Dates:</strong> {activeEditionModal.date}</p>
                <p><strong>Chamber Venue:</strong> {activeEditionModal.assembly}</p>
                <p><strong>Host Senator:</strong> {activeEditionModal.hostSenator}</p>
                <p className="text-blue-600 dark:text-blue-400 font-mono text-[11px] transition-colors">{activeEditionModal.hansardRecord}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-colors">
                  Substantive Inquiries & Grassroots Outcomes:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 transition-colors">
                  {activeEditionModal.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5 transition-colors">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 transition-colors">
                  Participating Senate Standing Committees:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeEditionModal.keyCommittees.map((c, i) => (
                    <span key={i} className="text-xs bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end transition-colors">
                <button
                  onClick={() => setActiveEditionModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     

    </div>
  );
}