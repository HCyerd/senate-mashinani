'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Landmark,
  Radio,
  FileText,
  Send,
  Play,
  Users,
  Award,
  Search,
  Calendar,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Shield,
  Lightbulb,
  Download,
  Tv,
  MessageCircle,
  Check,
  Mail,
  Phone,
  MapPin,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Info,
  CalendarCheck
} from 'lucide-react';

interface HostEdition {
  id: string;
  name: string;
  county: string;
  edition: string;
  date: string;
  region: string;
  assembly: string;
  hostSenator: string;
  status: 'Concluded' | 'Upcoming' | 'In Session';
  image: string;
  summary: string;
  highlights: string[];
  keyCommittees: string[];
  hansardRecord: string;
}

interface DevolutionBill {
  id: string;
  title: string;
  description: string;
  county: string;
  committee: string;
  status: string;
  statusType: 'success' | 'warning' | 'info' | 'purple';
  keywords: string[];
  fullBrief: string;
}

interface OrderPaperSession {
  id: string;
  dayKey: 'day1' | 'day2' | 'day3' | 'day4' | 'day5';
  dayLabel: string;
  dateStr: string;
  time: string;
  venue: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  mover?: string;
  keyParticipants?: string;
  type: 'Plenary' | 'Committee' | 'Baraza' | 'Inspection' | 'Protocol';
  status: 'Concluded' | 'In Progress' | 'Upcoming';
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  county: string;
  tag?: string;
}

const HOST_EDITIONS: HostEdition[] = [
  {
    id: 'kilifi',
    name: 'Kilifi County',
    county: 'Kilifi',
    edition: '5th Edition',
    date: 'September 21–25, 2026',
    region: 'Coast Region',
    assembly: 'Kilifi County Assembly Chambers, Malindi',
    hostSenator: 'Sen. Stewart Madzayo, CBS (Senate Minority Leader)',
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
    summary: 'Convened pursuant to a motion moved by Majority Leader Sen. Aaron Cheruiyot. Addressed border congestion at Malaba/Busia OSBPs, Lake Victoria blue economy protection, and on-site CPAC audit hearings.',
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
    county: 'Uasin Gishu (Eldoret)',
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

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Seeing CPAC grill county officials on-site in Busia restored our faith in devolution oversight.',
    author: 'Patrick Barasa',
    role: 'Nambale Trader',
    county: 'Busia County',
    tag: 'Verified Participant'
  },
  {
    id: 't2',
    quote: 'The Kitui session led straight to the Mung Beans Bill, protecting pulse farmers from exploitative middlemen.',
    author: 'Mary Mutua',
    role: 'Mwingi Smallholder Farmer',
    county: 'Kitui County',
    tag: 'Petitioner'
  },
  {
    id: 't3',
    quote: 'Directly addressing the Senate on the NCPB maize arrears crisis right here in Eldoret was a turning point for farmers.',
    author: 'Jackson Kiptoo',
    role: 'North Rift Grain Farmer',
    county: 'Uasin Gishu County',
    tag: 'Baraza Speaker'
  }
];

const DEVOLUTION_BILLS: DevolutionBill[] = [
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
  },
  {
    id: 'b4',
    title: 'Petroleum Exploration & Local Royalties Oversight',
    description: 'Enforcing the 20% county & 5% local community royalty share in extractives',
    county: 'Turkana County',
    committee: 'Energy & Natural Resources',
    status: 'Cabinet Secretary Inquiries',
    statusType: 'purple',
    keywords: ['community land', 'tullow oil', 'royalties', 'turkana', 'minerals', 'extractives'],
    fullBrief: 'Direct inquiry into the Petroleum Act compliance, demanding that Turkana County receive its 20% statutory royalty share and local community trusts receive their 5% entitlement from the Project Oil Kenya venture.'
  },
  {
    id: 'b5',
    title: 'Maize Pricing & Subsidized Fertilizer Directives',
    description: 'Securing prompt payments for grain deliveries and subsidized agricultural inputs',
    county: 'Uasin Gishu County',
    committee: 'Agriculture & Trade Committee',
    status: 'Executive Directives Enacted',
    statusType: 'success',
    keywords: ['maize', 'ncpb', 'uasin gishu', 'fertilizer', 'agricultural subsidy', 'grain farmers'],
    fullBrief: 'The inaugural Eldoret sitting resulted in landmark parliamentary resolutions ensuring the immediate release of NCPB farmer arrears and capping subsidized fertiliser prices at national depots.'
  }
];

const ORDER_PAPER_ITEMS: OrderPaperSession[] = [
  {
    id: 'op1',
    dayKey: 'day1',
    dayLabel: 'Day 1',
    dateStr: 'Mon 21 Sep 2026',
    time: '08:30 AM',
    venue: 'Malindi Airport & Chamber Forecourt',
    category: 'Ceremonial & Protocol',
    categoryColor: 'text-amber-800 bg-amber-100 border-amber-200',
    title: 'Arrival of Senate Mace & Ceremonial Reception',
    description: 'Official reception of the Senate Mace and the Speaker’s procession, formally establishing the host assembly as the sovereign precinct of the Senate.',
    keyParticipants: 'Speaker Amason Kingi, Governor Gideon Mung\'aro, Speaker Teddy Mwambire',
    type: 'Protocol',
    status: 'Upcoming'
  },
  {
    id: 'op2',
    dayKey: 'day2',
    dayLabel: 'Day 2',
    dateStr: 'Tue 22 Sep 2026',
    time: '09:00 AM',
    venue: 'Kilifi Assembly Chambers',
    category: 'Chamber Plenary',
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200',
    title: 'Sitting No. 01: Official Inaugural Addresses',
    description: 'Special inaugural addresses on the state of devolution in the Coast Region, intergovernmental relations, and the official opening of the 5th Mashinani.',
    mover: 'Speaker of the Senate, Hon. Amason Jeffah Kingi',
    type: 'Plenary',
    status: 'Upcoming'
  },
  {
    id: 'op3',
    dayKey: 'day2',
    dayLabel: 'Day 2',
    dateStr: 'Tue 22 Sep 2026',
    time: '02:30 PM',
    venue: 'Kilifi Assembly Chambers',
    category: 'Chamber Debate',
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200',
    title: 'Coastal Blue Economy & Maritime Safety Corridors Motion',
    description: 'Debate on a motion seeking the allocation of funds for cold storage facilities at landing sites and strict demarcation of artisanal fisherfolk corridors.',
    mover: 'Senate Minority Leader, Sen. Stewart Madzayo',
    type: 'Plenary',
    status: 'Upcoming'
  },
  {
    id: 'op4',
    dayKey: 'day3',
    dayLabel: 'Day 3',
    dateStr: 'Wed 23 Sep 2026',
    time: '09:00 AM',
    venue: 'Magarini Sub-County Hall',
    category: 'Committee Inquiry',
    categoryColor: 'text-purple-800 bg-purple-100 border-purple-200',
    title: 'Salt Mining Royalties & Aquifer Protection Hearings',
    description: 'On-site public hearings into environmental degradation, freshwater aquifer contamination, and unpaid community royalties by large-scale salt harvesting firms.',
    mover: 'Standing Committee on Lands, Environment & Natural Resources',
    type: 'Committee',
    status: 'Upcoming'
  },
  {
    id: 'op5',
    dayKey: 'day3',
    dayLabel: 'Day 3',
    dateStr: 'Wed 23 Sep 2026',
    time: '09:30 AM',
    venue: 'Kilifi County Referral Hospital',
    category: 'Forensic Audit / Inspection',
    categoryColor: 'text-red-800 bg-red-100 border-red-200',
    title: 'CPAC Audit of Devolved Healthcare',
    description: 'Direct interrogation of the County Executive regarding stalled infrastructure projects, pending bills, and the Auditor General’s report on health expenditure.',
    mover: 'County Public Accounts Committee (CPAC)',
    type: 'Inspection',
    status: 'Upcoming'
  },
  {
    id: 'op6',
    dayKey: 'day4',
    dayLabel: 'Day 4',
    dateStr: 'Thu 24 Sep 2026',
    time: '02:30 PM',
    venue: 'Malindi Municipal Stadium',
    category: 'Grassroots Baraza',
    categoryColor: 'text-kenya-gold bg-amber-50 border-amber-200',
    title: 'Sauti ya Mashinani: Open-Air Citizen Baraza',
    description: 'Mass public participation forum allowing coastal residents, community-based organizations, and fisherfolk to pose unscripted questions directly to all 67 Senators and the Governor.',
    keyParticipants: 'All Senators, Governor of Kilifi, Local Ward Representatives',
    type: 'Baraza',
    status: 'Upcoming'
  },
  {
    id: 'op7',
    dayKey: 'day5',
    dayLabel: 'Day 5',
    dateStr: 'Fri 25 Sep 2026',
    time: '09:00 AM',
    venue: 'Kilifi Assembly Chambers',
    category: 'Chamber Plenary',
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200',
    title: 'Adoption of Kilifi Resolutions & Adjournment',
    description: 'Tabling of committee reports from the week’s inquiries, adoption of the final Kilifi Communiqué, and formal motion of adjournment sine die for the Senate Mashinani sitting.',
    mover: 'Senate Majority Leader, Sen. Aaron Cheruiyot',
    type: 'Plenary',
    status: 'Upcoming'
  }
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What constitutional provision empowers the Senate to sit outside Nairobi?',
    answer: 'Article 126(1) of the Constitution of Kenya explicitly states: "A sitting of either House may be held at any place within Kenya and may commence at any time as the House may determine." Furthermore, a Senate resolution adopted on March 8, 2023, establishes that Senators shall hold plenary and committee sittings in the counties for one week in September each year.'
  },
  {
    question: 'Are laws and motions passed during Senate Mashinani legally binding?',
    answer: 'Yes, 100%. Senate Mashinani is an official, sovereign sitting of the Senate of Kenya. The official ceremonial Mace is transported under security to the host assembly chamber, and all proceedings are published in the official parliamentary Hansard. All votes, summons, and legislative readings carry full legal force.'
  },
  {
    question: 'How are host County Assemblies assessed and selected?',
    answer: 'The process begins with the Senate Directorate of Legislative and Procedural Services preparing a list that balances regional equity. The Senate Business Committee (SBC) recommends candidate counties, after which the Clerk of the Senate deploys a technical assessment team to evaluate chamber seating, acoustics, Hansard digital recording systems, security, and public baraza venues.'
  },
  {
    question: 'Can ordinary citizens attend the sessions and table petitions?',
    answer: 'Yes. The public galleries in the host assembly are opened to the public, committee public hearings allow direct testimony, and open-air Citizen Barazas (Town Halls) in public grounds give ordinary citizens direct access to Senators and Governors. Petitions can also be submitted electronically.'
  }
];

export default function App() {
  // Navigation & audio states
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Filter & Search states
  const [selectedEditionTab, setSelectedEditionTab] = useState<string>('all');
  const [billSearchQuery, setBillSearchQuery] = useState<string>('');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Kilifi Program interactive filter states
  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');

  // Modals state
  const [activeEditionModal, setActiveEditionModal] = useState<HostEdition | null>(null);
  const [activeBillModal, setActiveBillModal] = useState<DevolutionBill | null>(null);
  const [liveStreamModalOpen, setLiveStreamModalOpen] = useState<boolean>(false);

  // Live chamber quote cycler
  const hansardQuotes = [
    `The Hon. Senators brings House to Kilifi to deliberate on our shared coastal heritage.`,
    `"Our artisanal fisherfolk along the Malindi coastline deserve world-class cold storage and secure landing corridors." — Sen. Stewart Madzayo`,
    `"Salt mining companies in Magarini must remit equitable royalties directly to host community trusts." — Committee on Natural Resources`,
    `"Devolution oversight must ensure county health facilities like Kilifi County Hospital are fully resourced." — Majority Leader`
  ];
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Interactive Grassroots Sentiment Poll state
  const [pollVotes, setPollVotes] = useState<number[]>([1440, 1063, 617, 308]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const pollLabels = [
    'Healthcare & County Medicine Supplies',
    'Agriculture, Subsidies & Lake Fisheries',
    'Water Boreholes, Dams & Pastoral Security',
    'Youth & Women Devolution Enterprise Funds'
  ];

  // Citizen Petition Form state
  const [petitionerName, setPetitionerName] = useState<string>('');
  const [petitionerContact, setPetitionerContact] = useState<string>('');
  const [petitionerCounty, setPetitionerCounty] = useState<string>('Busia');
  const [petitionerCommittee, setPetitionerCommittee] = useState<string>('County Public Accounts (CPAC)');
  const [petitionTitle, setPetitionTitle] = useState<string>('');
  const [petitionBody, setPetitionBody] = useState<string>('');
  const [submissionSuccessRef, setSubmissionSuccessRef] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const playCivicTone = (frequency = 440, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
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
    } catch {
      // Graceful fallback if browser policies block audio
    }
  };

  const toggleSound = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (next) {
      setTimeout(() => playCivicTone(587.33, 'sine', 0.2), 50); // D5
    }
  };

  const handleVote = (index: number) => {
    if (hasVoted) return;
    playCivicTone(659.25, 'triangle', 0.18); // E5
    const updated = [...pollVotes];
    updated[index] += 1;
    setPollVotes(updated);
    setHasVoted(true);
  };

  const totalVotes = useMemo(() => pollVotes.reduce((acc, curr) => acc + curr, 0), [pollVotes]);

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

  const handlePetitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCivicTone(783.99, 'triangle', 0.25); // G5
    const randomRef = `SEN-MSH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionSuccessRef(randomRef);

    // Add immediate citizen entry to live feed
    const newEntry: Testimonial = {
      id: Date.now().toString(),
      quote: petitionTitle,
      author: petitionerName,
      role: `Citizen Petitioner (${petitionerCounty})`,
      county: `${petitionerCounty} County`,
      tag: 'New Filing'
    };
    setTestimonials((prev) => [newEntry, ...prev]);

    // Reset fields
    setPetitionerName('');
    setPetitionerContact('');
    setPetitionTitle('');
    setPetitionBody('');
  };

  const downloadHansardFile = () => {
    playCivicTone(523.25, 'sine', 0.2); // C5
    const hansardContent = `THE PARLIAMENT OF KENYA
THE SENATE OF THE REPUBLIC OF KENYA
FIFTH SENATE MASHINANI OFFICIAL SITTING RECORD & COMPLETE PROGRAMME
HOST ASSEMBLY: KILIFI COUNTY ASSEMBLY CHAMBERS, MALINDI
OFFICIAL ONLINE REPOSITORY: https://www.parliament.go.ke/

Speaker of the Senate: Rt. Hon. Amason Jeffah Kingi, EGH
Speaker of Kilifi County Assembly: Rt. Hon. Teddy Mwambire
Governor of Kilifi County: H.E. Gideon Maitha Mung'aro, OGW
Host Senator: Sen. Stewart Madzayo, CBS (Senate Minority Leader)
Senate Majority Leader: Sen. Aaron Cheruiyot, EGH
Clerk of the Senate: Mr. Jeremiah Nyegenye, CBS

CONSTITUTIONAL & STATUTORY AUTHORITY:
Convened pursuant to Article 126(1) and Article 96 of the Constitution of Kenya,
Senate Resolution of 8th March 2023, Senate Motion of 6th May 2026,
and Kilifi County Assembly Resolution of 9th June 2026.

COMPLETE 5-DAY PLENARY & COMMITTEE TIMETABLE (21ST - 25TH SEPTEMBER 2026):

[DAY 1: MONDAY, 21ST SEPTEMBER 2026]
• 08:30 - 10:30 AM | Malindi Airport & Chamber Gates | Arrival of Senate Mace & Ceremonial Reception.
• 11:00 AM - 01:00 PM | Committee Rooms | Joint Senate & Kilifi Assembly Hansard / e-Parliament Sync.
• 02:30 - 05:00 PM | Assembly Forecourt | Intergovernmental Leadership Briefing & Joint Press Conference.

[DAY 2: TUESDAY, 22ND SEPTEMBER 2026]
• 09:00 AM - 12:30 PM | Assembly Chambers | Plenary Sitting No. 01: Official Inaugural Addresses by Speaker Amason Kingi, Speaker Teddy Mwambire & Governor Gideon Mung'aro.
• 02:30 - 06:00 PM | Assembly Chambers | Plenary Sitting No. 02: Coastal Blue Economy, Landing Beaches & Maritime Safety Corridors Motion.

[DAY 3: WEDNESDAY, 23RD SEPTEMBER 2026]
• 09:00 AM - 01:00 PM | Magarini Sub-County Hall & Gongoni | Lands & Environment Committee Inquiry on Salt Mining Royalties and Aquifer Protection.
• 09:30 AM - 01:30 PM | Kilifi County Referral Hospital | CPAC Forensic Audit into Devolved Healthcare & Pending Bills.
• 02:30 - 05:30 PM | Watamu Beach & Malindi Wharf | Agriculture & Fisheries Committee Public Hearing with Beach Management Units (BMUs).

[DAY 4: THURSDAY, 24TH SEPTEMBER 2026]
• 09:00 AM - 01:00 PM | Assembly Chambers | Plenary Sitting No. 03: Coastal Squatter Resettlement Schemes, NLC Title Deeds & County Governments Laws Amendment Bill.
• 02:30 - 06:00 PM | Malindi Municipal Stadium | Grand Open-Air Citizen Baraza (Sauti ya Mashinani) with All 67 Senators.

[DAY 5: FRIDAY, 25TH SEPTEMBER 2026]
• 09:00 AM - 12:30 PM | Assembly Chambers | Plenary Sitting No. 04: Chamber Adoption of Kilifi Resolutions Communiqué & Motion for Adjournment outside Nairobi.
• 01:30 - 03:00 PM | Assembly Forecourt | Valedictory Press Conference & Ceremonial Handover of the Mace for Nairobi Return.

OFFICIAL RECORD SOURCED VIA SENATE MASHINANI VERIFIED PORTAL.`;

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Kenya Flag Ribbon */}
      <div className="h-2 w-full bg-gradient-to-r from-black via-[#A81C26] via-white to-[#0656ea]" />

      {/* Floating Sound Toggle */}
      <button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-slate-900 text-white shadow-2xl border border-slate-700 hover:bg-slate-800 hover:scale-110 transition-all flex items-center justify-center group"
        title="Toggle civic chimes"
      >
        {audioEnabled ? (
          <Volume2 className="w-5 h-5 text-blue-400" />
        ) : (
          <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-white" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/sessions_images/kilifi.jpeg"
            alt="Senate Chamber in session"
            className="w-full h-full object-cover object-center opacity-25 filter saturate-150 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Article 126(1) Resolution · Democracy Beyond Nairobi
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Taking Parliament <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-200 to-blue-200">
                  To The Grassroots
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Senate Mashinani relocates the sovereign plenary and standing committees of the Senate of Kenya directly into host County Assemblies. Interrogating devolution expenditure, receiving citizen petitions, and conducting live oversight where Kenyans live and work.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    playCivicTone(587.33, 'sine', 0.2);
                    setLiveStreamModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-950/50 transform hover:-translate-y-0.5 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Plenary Live
                </button>

                <a
                  href="#editions"
                  onClick={() => playCivicTone(440, 'sine', 0.1)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Explore Host Counties
                </a>

                <a
                  href="#bills"
                  onClick={() => playCivicTone(440, 'sine', 0.1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Devolution Bills</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Key Quantitative Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">47</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Counties Represented</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">4</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Historic Sittings</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Binding Hansard Power</p>
                </div>
              </div>
            </div>

            {/* Spotlight Assembly Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-900/95 to-slate-900/90 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Next Sitting Assembly
                    </span>
                  </div>
                  <span className="text-xs text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                    5th Edition · Sept 2026
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden group">
                    <img
                      src="/sessions_images/kilifi.jpeg"
                      alt="Kilifi Coastal County"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Host Assembly</span>
                        <h3 className="text-lg font-bold text-white">Kilifi County Assembly</h3>
                        <p className="text-xs text-slate-300">Blue Economy, Salt Mining Royalties & Land Rights</p>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase rounded shadow">
                        Upcoming
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5 text-slate-400">
                        <Users className="w-3.5 h-3.5 text-amber-400" /> Host Senator:
                      </span>
                      <span className="text-white font-medium">Sen. Stewart Madzayo, CBS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5 text-slate-400">
                        <FileText className="w-3.5 h-3.5 text-blue-400" /> House Mandate:
                      </span>
                      <span className="text-white font-medium">Adopted Senate Motion (6th May 2026)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-1.5 text-slate-400">
                        <Shield className="w-3.5 h-3.5 text-blue-400" /> Key Focus:
                      </span>
                      <span className="text-white font-medium">Coastal Blue Economy & Salt Royalties</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => setActiveEditionModal(HOST_EDITIONS[0])}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition text-center shadow"
                    >
                      View Kilifi Sitting Brief
                    </button>
                    <button
                      onClick={() => setActiveEditionModal(HOST_EDITIONS[1])}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-semibold flex items-center justify-center transition"
                      title="Inspect Busia 4th Edition"
                    >
                      <Info className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Senate Dispatch Marquee */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white border-y border-blue-900/60 py-3 px-4 relative z-10">
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
          <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-1 rounded font-bold uppercase tracking-wider shrink-0 shadow-sm z-20">
            <Radio className="w-3.5 h-3.5 text-slate-950" />
            Senate Dispatch
          </div>
          
          <div className="flex-1 overflow-hidden relative flex items-center fade-edges">
            <div className="animate-marquee flex gap-8 whitespace-nowrap text-slate-300">
              {/* First Set of Content */}
              <div className="flex gap-8 items-center px-4">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Senate Resolution of March 8, 2023 mandates annual grassroots sittings under Article 126(1).
                </span>
                <span className="flex items-center gap-2 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  County Public Accounts Committee (CPAC) interrogates devolved audit reports on-site in Busia.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Clerk of the Senate technical inspection audits assembly chambers for Hansard transmission.
                </span>
              </div>
              {/* Duplicated Set for Seamless Infinite Scroll */}
              <div className="flex gap-8 items-center px-4" aria-hidden="true">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Senate Resolution of March 8, 2023 mandates annual grassroots sittings under Article 126(1).
                </span>
                <span className="flex items-center gap-2 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  County Public Accounts Committee (CPAC) interrogates devolved audit reports on-site in Busia.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Clerk of the Senate technical inspection audits assembly chambers for Hansard transmission.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Devolution In Real Action
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Demystifying Parliament for All Kenyans
            </h2>
            <div className="w-16 h-1 bg-[#A81C26] mx-auto mt-3 rounded-full" />
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Senate Mashinani is Kenya&apos;s celebrated democratic innovation, globally recognized for dismantling the geographic distance between national legislators and grassroots citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <h3 className="text-2xl font-bold text-slate-900">
                The Constitutional Anchor
              </h3>
              <p>
                Under <strong>Article 126(1)</strong> of the Constitution of Kenya, sittings of either House of Parliament may be held at any place within Kenya as the House determines. Together with <strong>Article 96</strong>, which obligates the Senate to protect county interests and county governments, Senate Mashinani translates constitutional theory into living practice.
              </p>
              <p>
                Instead of requiring citizens to travel hundreds of kilometers to Nairobi, the Speaker of the Senate, the ceremonial Mace, all 67 Senators, the Clerk of the Senate, Hansard reporters, and standing committees relocate to a host County Assembly for a full working week.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-600 text-xs sm:text-sm text-slate-700 italic">
                &ldquo;The Senate plays the critical interlinkage role between the National and County levels of government. There is need to enhance interaction between the Senate and County Governments, bringing the Senate closer to the Counties and the general public.&rdquo;
                <div className="font-bold text-slate-900 mt-2 not-italic">— Sen. Aaron Cheruiyot, Majority Leader of the Senate</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 border border-slate-700 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">How Host Counties Are Selected</h4>
                  <p className="text-xs text-slate-400">Strict technical readiness & regional rotation</p>
                </div>
              </div>

              <ol className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white">Directorate Recommendation:</strong> The Senate Directorate of Legislative & Procedural Services identifies prospective counties ensuring equitable rotation across former provinces.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-white">Senate Business Committee (SBC) Approval:</strong> Chaired by the Speaker, the SBC selects candidate assemblies and formal House motions are tabled.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white">Clerk&apos;s Technical Audit:</strong> A multi-disciplinary team led by the Clerk of the Senate audits chamber capacity, digital Hansard recording, acoustics, security, and open-air baraza venues.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="pillars" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full">
              Strategic Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              The 4 Core Pillars of Senate Mashinani
            </h2>
            <div className="w-16 h-1 bg-[#A81C26] mx-auto mt-3 rounded-full" />
            <p className="text-base text-slate-600 mt-4">
              Codified by the Parliament of Kenya and recognized in international legislative governance forums as best practice for public accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  Promote Senate Mandate
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Educating citizens on the Senate&apos;s distinct constitutional mission: safeguarding revenue allocations, passing devolution laws, and conducting national oversight.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-blue-700 flex items-center justify-between">
                <span>Article 96 Mandate</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#A81C26] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-[#A81C26]" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#A81C26] transition-colors">
                  Public Participation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Highlighting direct channels under Article 118 for local residents, fisherfolk, farmers, women, and youth to petition standing committees in person.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-[#A81C26] flex items-center justify-between">
                <span>Article 118 Lawmaking</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                  Intergovernmental Synergy
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deepening functional collaboration between national legislators, County Governors, County Executives, and regional socio-economic development blocs.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-amber-800 flex items-center justify-between">
                <span>County Executive Link</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-800 transition-colors">
                  County Assembly Capacity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Empowering Members of County Assemblies (MCAs), Hansard reporters, and legal drafters through peer benchmarking and parliamentary masterclasses.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-blue-700 flex items-center justify-between">
                <span>Knowledge Transfer</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Host County Editions Section */}
      <section id="editions" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800 px-3.5 py-1.5 rounded-full">
                Parliamentary Sitting Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
                Host County Sittings
              </h2>
              <p className="text-slate-400 text-base mt-2 max-w-xl">
                Verified records of all Senate Mashinani sittings held in accordance with Article 126(1) and the Senate Resolution of March 8, 2023.
              </p>
            </div>

            {/* Edition Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-800 rounded-xl border border-slate-700">
              <button
                onClick={() => {
                  playCivicTone(440, 'sine', 0.1);
                  setSelectedEditionTab('all');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                  selectedEditionTab === 'all' ? 'bg-[#0656ea] text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                All Sittings (5)
              </button>
              {HOST_EDITIONS.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => {
                    playCivicTone(440, 'sine', 0.1);
                    setSelectedEditionTab(ed.id);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    selectedEditionTab === ed.id ? 'bg-[#0656ea] text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {ed.county.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Host Editions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditions.map((ed) => (
              <div
                key={ed.id}
                className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-400 transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={ed.image}
                    alt={ed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-blue-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow">
                      {ed.edition}
                    </span>
                    {ed.status === 'Upcoming' && (
                      <span className="bg-amber-500 text-slate-950 font-extrabold text-xs px-2 py-1 rounded-md shadow flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" /> Upcoming
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded border border-slate-700">
                    {ed.date}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {ed.name}
                      </h3>
                      <span className="text-[11px] text-blue-400 font-semibold">{ed.region}</span>
                    </div>
                    <p className="text-xs text-amber-400 font-medium mt-1 mb-2">
                      Host: {ed.hostSenator}
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      {ed.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-700 space-y-2">
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{ed.assembly}</span>
                      <button
                        onClick={() => {
                          playCivicTone(587.33, 'triangle', 0.15);
                          setActiveEditionModal(ed);
                        }}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 shrink-0"
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
      <section id="bills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                Grassroots Impact In Law
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Devolution Bills & Petitions Tracker
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Explore key statutes and legislative petitions born directly from citizen barazas and committee inquiries in host counties.
              </p>
            </div>

            {/* Bills Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={billSearchQuery}
                onChange={(e) => setBillSearchQuery(e.target.value)}
                placeholder="Search bills, counties, keywords..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none w-72"
              />
            </div>
          </div>

          {/* Bills Table */}
          <div className="overflow-x-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-100/80 text-slate-900 font-bold text-xs uppercase border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Bill / Legislative Measure</th>
                  <th className="px-6 py-4">Origin Sitting</th>
                  <th className="px-6 py-4">Responsible Committee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No devolution bills found matching &ldquo;{billSearchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredBills.map((b) => (
                    <tr key={b.id} className="hover:bg-white transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {b.title}
                        <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                          {b.description}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded bg-slate-200/80 text-slate-800 font-bold text-xs">
                          {b.county}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {b.committee}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          b.statusType === 'success' ? 'bg-blue-100 text-blue-800' :
                          b.statusType === 'warning' ? 'bg-amber-100 text-amber-800' :
                          b.statusType === 'info' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            playCivicTone(523.25, 'sine', 0.15);
                            setActiveBillModal(b);
                          }}
                          className="text-blue-700 hover:text-blue-900 font-bold text-xs hover:underline"
                        >
                          View Brief
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Order Paper & Live Chamber Business Section */}
      <section id="order-paper" className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Official Data Link */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-100 px-3.5 py-1.5 rounded-full border border-red-200 inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  Official Kilifi Sitting Schedule
                </span>
                <a
                  href="https://www.parliament.go.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-800 bg-blue-100 hover:bg-blue-200 border border-blue-300 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                  <span>Verified Source:  https://www.parliament.go.ke/</span>
                </a>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                Kilifi County Assembly Plenary & Committee Timetable
              </h2>
              <p className="text-slate-600 text-base mt-2 max-w-3xl">
                Full 5-day official itinerary (September 21–25, 2026) in Malindi, Magarini, and Watamu pursuant to Article 126(1) and the Senate Resolution of May 6, 2026.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={downloadHansardFile}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-sm"
              >
                <Download className="w-4 h-4 text-blue-700" />
                Download Full 5-Day PDF/Text
              </button>
              {/* <button
                onClick={() => {
                  playCivicTone(587.33, 'triangle', 0.2);
                  setLiveStreamModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition shadow-md"
              >
                <Tv className="w-4 h-4" /> Watch Plenary Feed
              </button> */}
            </div>
          </div>

          {/* Interactive Day Tabs & Category Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-700" /> Select Sitting Day:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: 'All 5 Days (11 Events)' },
                  { key: 'day1', label: 'Day 1: Mon 21 Sep' },
                  { key: 'day2', label: 'Day 2: Tue 22 Sep' },
                  { key: 'day3', label: 'Day 3: Wed 23 Sep' },
                  { key: 'day4', label: 'Day 4: Thu 24 Sep' },
                  { key: 'day5', label: 'Day 5: Fri 25 Sep' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      playCivicTone(440, 'sine', 0.1);
                      setActiveDayFilter(tab.key);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      activeDayFilter === tab.key
                        ? 'bg-[#0656ea] text-white shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-500" /> Filter By Session Type:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: 'All Sessions' },
                  { key: 'Plenary', label: 'Chamber Plenary' },
                  { key: 'Committee', label: 'Committee Inquiries' },
                  { key: 'Baraza', label: 'Grassroots Baraza' },
                  { key: 'Inspection', label: 'Hospital/Site Inspection' },
                  { key: 'Protocol', label: 'Protocol & Staff Sync' },
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => {
                      playCivicTone(440, 'sine', 0.1);
                      setActiveTypeFilter(type.key);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                      activeTypeFilter === type.key
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Order Paper Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Verified Kilifi Order Paper</h3>
                    <p className="text-xs text-slate-500">Kilifi County Assembly Chambers, Malindi & Grassroots Venues</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                  {filteredProgramSessions.length} Scheduled Sessions
                </span>
              </div>

              <div className="divide-y divide-slate-100 max-h-[760px] overflow-y-auto">
                {filteredProgramSessions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No sessions match the selected day and session type filter.
                  </div>
                ) : (
                  filteredProgramSessions.map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 transition-colors flex items-start gap-4 ${
                        item.status === 'In Progress' ? 'bg-amber-50/40 border-l-4 border-amber-500' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="shrink-0 space-y-1 text-center">
                        <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded block whitespace-nowrap">
                          {item.time}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 block">
                          {item.dayLabel}
                        </span>
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.categoryColor}`}>
                            {item.category}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-500" /> {item.venue}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                        {item.mover && (
                          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                            <strong>Mover / Chair:</strong> {item.mover}
                          </div>
                        )}

                        {item.keyParticipants && (
                          <div className="text-[11px] text-slate-500">
                            <strong>Key Participants:</strong> {item.keyParticipants}
                          </div>
                        )}
                      </div>

                      <span className="text-xs font-bold shrink-0 text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        {item.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <span>Convening September 21–25, 2026. Official source: senate-mashinani.vercel.app</span>
                <a
                  href="https://www.parliament.go.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1"
                >
                  Live Web Page <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Live Broadcast Simulation Player */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white">
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
                  <img
                    src="/sessions_images/kilifi.jpeg"
                    alt="Kilifi County Chamber"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

                  {/* <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" /> Live Feed
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-medium text-slate-300">
                      Kilifi Chamber Camera 1
                    </span>
                  </div> */}

                  {/* <button
                    onClick={() => {
                      playCivicTone(587.33, 'sine', 0.2);
                      setLiveStreamModalOpen(true);
                    }}
                    className="relative z-10 w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition transform"
                    aria-label="Play broadcast"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button> */}

                  <div className="absolute bottom-3 left-4 right-4 bg-black/85 backdrop-blur-md p-2.5 rounded-lg border border-slate-800">
                    <p className="text-xs text-amber-300 font-mono italic">
                      {hansardQuotes[quoteIndex]}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">Senate Plenary Mashinani</h4>
                      <p className="text-xs text-slate-400">Broadcasting live from Kilifi County Assembly Chambers</p>
                    </div>
                    {/* <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800">
                      <Users className="w-3.5 h-3.5" /> 24,180 Watching
                    </div> */}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    {/* <button
                      onClick={() => {
                        playCivicTone(440, 'sine', 0.1);
                        setQuoteIndex((prev) => (prev + 1) % hansardQuotes.length);
                      }}
                      className="text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-4 h-4 text-blue-400" /> Next Hansard Caption
                    </button>
                    <button
                      onClick={() => setLiveStreamModalOpen(true)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition font-semibold"
                    >
                      <Tv className="w-4 h-4" /> Fullscreen Stream
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Civic Fact Callout */}
              <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-800/40 text-blue-400 shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-blue-300 text-sm">Kilifi Sitting Landmark</h5>
                  <p className="text-slate-300 mt-1 leading-relaxed">
                    On June 9, 2026, the County Assembly of Kilifi resolved to suspend its own plenary sittings from September 21–25, 2026, handing over its chamber to host the 5th Senate Mashinani pursuant to Article 126(1) of the Constitution!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="petition" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Sauti ya Mashinani · Citizen Action
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Direct Public Participation Portal
            </h2>
            <div className="w-16 h-1 bg-[#A81C26] mx-auto mt-3 rounded-full" />
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Article 118 of the Constitution mandates public involvement in all legislative business. Submit your memorandum directly to the relevant Senate Standing Committee.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Memorandum Submission Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-xl text-slate-900">File a Citizen Memorandum</h3>
                  <p className="text-xs text-slate-500 mt-1">Catalogued directly for the Senate Clerk & Standing Committees</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handlePetitionSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={petitionerName}
                      onChange={(e) => setPetitionerName(e.target.value)}
                      placeholder="e.g. Christine Wangari"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={petitionerContact}
                      onChange={(e) => setPetitionerContact(e.target.value)}
                      placeholder="07XX XXX XXX or name@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      County of Origin *
                    </label>
                    <select
                      value={petitionerCounty}
                      onChange={(e) => setPetitionerCounty(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition"
                    >
                      <option value="Busia">Busia (Host County)</option>
                      <option value="Turkana">Turkana</option>
                      <option value="Kitui">Kitui</option>
                      <option value="Uasin Gishu">Uasin Gishu</option>
                      <option value="Nairobi">Nairobi</option>
                      <option value="Mombasa">Mombasa</option>
                      <option value="Kisumu">Kisumu</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Machakos">Machakos</option>
                      <option value="Kakamega">Kakamega</option>
                      <option value="Kilifi">Kilifi</option>
                      <option value="Garissa">Garissa</option>
                      <option value="Other">Other (47 Counties)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Target Senate Committee *
                    </label>
                    <select
                      value={petitionerCommittee}
                      onChange={(e) => setPetitionerCommittee(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition"
                    >
                      <option value="County Public Accounts (CPAC)">County Public Accounts (CPAC)</option>
                      <option value="Agriculture, Livestock & Fisheries">Agriculture, Livestock & Fisheries</option>
                      <option value="Devolution & Intergovernmental Relations">Devolution & Intergovernmental Relations</option>
                      <option value="Health">Health Services & County Dispensaries</option>
                      <option value="Finance & Budget">Finance, Budget & Equalisation</option>
                      <option value="Lands, Environment & Natural Resources">Lands, Environment & Natural Resources</option>
                      <option value="Trade, Industrialization & Tourism">Trade, Industrialization & Tourism</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Memorandum Title / Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={petitionTitle}
                    onChange={(e) => setPetitionTitle(e.target.value)}
                    placeholder="e.g. Allocation of modern cold storage for Port Victoria fisherfolk"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Statement & Prayer to the Senate *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={petitionBody}
                    onChange={(e) => setPetitionBody(e.target.value)}
                    placeholder="Describe the grassroots challenge, the impact on residents, and the exact policy or budgetary intervention you request the Senate to take..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-blue-600" /> Official parliamentary filing
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#0656ea] hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    Submit to Senate
                  </button>
                </div>
              </form>

              {/* Submission Confirmation Box */}
              {submissionSuccessRef && (
                <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-300 text-blue-900 flex items-start gap-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Memorandum Logged Successfully!</h4>
                    <p className="text-xs text-blue-800 mt-1">
                      Your petition has been assigned official tracking reference <strong>#{submissionSuccessRef}</strong>. It will be tabulated for the Senate Standing Committee review.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Civic Sentiment Poll & Testimonial Feed */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Poll Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Live Grassroots Pulse
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  What is the #1 devolution priority the Senate should inspect during host visits?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click to log your vote into the grassroots index.
                </p>

                <div className="mt-6 space-y-3">
                  {pollLabels.map((label, idx) => {
                    const count = pollVotes[idx];
                    const pct = Math.round((count / totalVotes) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <button
                          disabled={hasVoted}
                          onClick={() => handleVote(idx)}
                          className={`w-full p-3 rounded-xl border text-left transition flex justify-between items-center text-xs ${
                            hasVoted
                              ? 'bg-slate-800/60 border-slate-700 text-slate-300 cursor-default'
                              : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200 hover:border-blue-500'
                          }`}
                        >
                          <span className="font-medium pr-2">{label}</span>
                          <span className="font-bold text-blue-400">{pct}%</span>
                        </button>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              idx === 0 ? 'bg-blue-500' :
                              idx === 1 ? 'bg-amber-400' :
                              idx === 2 ? 'bg-blue-400' : 'bg-purple-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {hasVoted && (
                  <div className="mt-4 p-2.5 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-300 text-xs text-center font-medium">
                    Thank you! Your vote is logged into the Senate Grassroots Sentiment Index.
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Total Verified Votes: {totalVotes.toLocaleString()}</span>
                  <span className="text-blue-400 font-semibold">Updated Real-Time</span>
                </div>
              </div>

              {/* Real Citizen Feed */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#A81C26]" />
                  Voices from Grassroots Sittings
                </h4>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {testimonials.map((t) => (
                    <div key={t.id} className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs shadow-sm">
                      <p className="text-slate-700 italic">&ldquo;{t.quote}&rdquo;</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                        <span>— {t.author}, {t.role}</span>
                        {t.tag && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            {t.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Civic Education
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-[#A81C26] mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white"
                >
                  <button
                    onClick={() => {
                      playCivicTone(440, 'sine', 0.1);
                      setActiveFaqIndex(isOpen ? null : index);
                    }}
                    className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 py-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-gradient-to-r from-blue-950 via-[#0656ea] to-slate-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Stay Connected to the Grassroots Senate
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Receive instant notifications when the Senate selects its next host county, get Hansard digests, and receive invitations to open public barazas.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              playCivicTone(783.99, 'triangle', 0.2);
              setNewsletterSubscribed(true);
            }}
            className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-5 py-3.5 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1 shadow"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#A81C26] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5"
            >
              Subscribe Free
            </button>
          </form>

          {newsletterSubscribed && (
            <p className="text-xs text-amber-300 font-bold mt-4 animate-in fade-in">
              ✓ Subscribed! You will receive official Senate Mashinani dispatches.
            </p>
          )}

          <p className="text-xs text-slate-300 mt-3">
            Parliament of Kenya · Directorate of Media & Public Relations.
          </p>
        </div>
      </section>

      {}


      {/* Modal: County Edition Details */}
      {activeEditionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveEditionModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs uppercase font-bold text-amber-400">
                  {activeEditionModal.status === 'Upcoming' ? 'Official Proclamation' : 'Official Parliamentary Hansard'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {activeEditionModal.name} ({activeEditionModal.edition})
              </h3>
              <div className="pb-2 border-b border-slate-700 text-xs text-slate-300 space-y-1">
                <p><strong>Sitting Dates:</strong> {activeEditionModal.date}</p>
                <p><strong>Chamber Venue:</strong> {activeEditionModal.assembly}</p>
                <p><strong>Host Senator:</strong> {activeEditionModal.hostSenator}</p>
                <p className="text-blue-400 font-mono text-[11px]">{activeEditionModal.hansardRecord}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Substantive Inquiries & Grassroots Outcomes:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {activeEditionModal.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-400 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Participating Senate Standing Committees:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeEditionModal.keyCommittees.map((c, i) => (
                    <span key={i} className="text-xs bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveEditionModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {activeBillModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveBillModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-xs uppercase font-bold text-blue-400">
                  {activeBillModal.county}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {activeBillModal.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-3">
                {activeBillModal.fullBrief}
              </p>

              <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-1 text-xs">
                <div className="text-slate-400"><strong>Sponsoring Committee:</strong> {activeBillModal.committee}</div>
                <div className="text-slate-400"><strong>Current Stage:</strong> {activeBillModal.status}</div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveBillModal(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Close Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {liveStreamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold text-white text-sm">
                  The Parliament of Kenya · Senate Live Chamber Broadcast
                </span>
                <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded font-mono">
                  LIVE FEED
                </span>
              </div>
              <button
                onClick={() => setLiveStreamModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/live_stream?channel=UC4wE7XjC7k3fC0p9X0N9L6g"
                title="Parliament of Kenya Live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Broadcasting under Article 118 Public Participation mandate</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadHansardFile}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  Extract Hansard
                </button>
                <button
                  onClick={() => setLiveStreamModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#0656ea] text-white font-bold hover:bg-blue-800"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}