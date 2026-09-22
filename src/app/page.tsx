'use client';

import React, { useState, useMemo, useRef } from 'react';
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
import Image from 'next/image';

const HOST_EDITIONS = [
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

const DEVOLUTION_BILLS = [
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

const ORDER_PAPER_ITEMS = [
  {
    id: 'op1',
    dayKey: 'day1',
    dayLabel: 'Day 1',
    dateStr: 'Mon 21 Sep 2026',
    time: '08:30 AM',
    venue: 'Malindi Airport & Chamber Forecourt',
    category: 'Ceremonial & Protocol',
    categoryColor: 'text-amber-800 bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-900/40 dark:border-amber-700',
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
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-700',
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
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-700',
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
    categoryColor: 'text-purple-800 bg-purple-100 border-purple-200 dark:text-purple-300 dark:bg-purple-900/40 dark:border-purple-700',
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
    categoryColor: 'text-red-800 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/40 dark:border-red-700',
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
    categoryColor: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-900/40 dark:border-amber-700',
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
    categoryColor: 'text-blue-800 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-700',
    title: 'Adoption of Kilifi Resolutions & Adjournment',
    description: 'Tabling of committee reports from the week’s inquiries, adoption of the final Kilifi Communiqué, and formal motion of adjournment sine die for the Senate Mashinani sitting.',
    mover: 'Senate Majority Leader, Sen. Aaron Cheruiyot, E.G.H., member for Kericho County',
    type: 'Plenary',
    status: 'Upcoming'
  }
];

const faqs = [
  {
    id: 1,
    q: "1. What is the legal basis for Senate Mashinani?",
    a: (
      <>
        The program is anchored in <strong>Article 126(1)</strong> of the Constitution of Kenya, which states that a sitting of either House of Parliament may be held at any place within Kenya and commence at any time the House appoints.<br /><br />It also supports the Senate's core constitutional mandate under <strong>Article 96</strong> to represent and protect the interests of counties and their governments.
      </>
    )
  },
  {
    id: 2,
    q: "2. What are the main objectives of the initiative?",
    a: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <span className="font-bold text-[#006A44] dark:text-emerald-400 text-xs uppercase block mb-1">📢 Enhancing Public Awareness</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">Educating citizens on the specific roles, functions, and legislative processes of the Senate.</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <span className="font-bold text-[#C8102E] dark:text-red-400 text-xs uppercase block mb-1">🏛️ Promoting Devolution</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">Bringing parliamentary business closer to grassroots populations to better understand local challenges and successes.</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <span className="font-bold text-[#D4AF37] dark:text-amber-400 text-xs uppercase block mb-1">🤝 Strengthening Partnerships</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">Fostering direct working relationships between national lawmakers and county governments.</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
          <span className="font-bold text-blue-700 dark:text-blue-400 text-xs uppercase block mb-1">💡 Institutional Exchange</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">Providing a platform for county assembly staff to exchange knowledge and best practices with parliamentary officers.</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    q: "3. How can I contact the Senate?",
    a: (
      <>
        For official inquiries regarding upcoming schedules or public participation opportunities, you can contact the Clerk of the Senate at <strong>Email:</strong> <i> <a href="mailto:clerk@senate.go.ke" className="text-blue-600 dark:text-blue-400 hover:underline">clerk@senate.go.ke</a></i> or <strong>Telephone:</strong> <i><a href="tel:+25422221291" className="text-blue-600 dark:text-blue-400 hover:underline">+254 (2) 2221291</a> or <a href="tel:+25422848000" className="text-blue-600 dark:text-blue-400 hover:underline">+254 (2) 2848000</a></i>
      </>
    )
  },
  {
    id: 4,
    q: "4. Which counties have hosted Senate Mashinani sessions?",
    a: (
      <>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mt-1 transition-colors">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase tracking-wider transition-colors">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Host County</th>
                <th className="p-3">Dates / Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 transition-colors">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="p-2.5 font-bold text-[#006A44] dark:text-emerald-400">2018</td><td className="p-2.5 font-semibold text-slate-900 dark:text-slate-200">Uasin Gishu County</td><td className="p-2.5 text-slate-600 dark:text-slate-400">September 2018</td></tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="p-2.5 font-bold text-[#006A44] dark:text-emerald-400">2019</td><td className="p-2.5 font-semibold text-slate-900 dark:text-slate-200">Kitui County</td><td className="p-2.5 text-slate-600 dark:text-slate-400">September 2019</td></tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="p-2.5 font-bold text-[#006A44] dark:text-emerald-400">2023</td><td className="p-2.5 font-semibold text-slate-900 dark:text-slate-200">Turkana County</td><td className="p-2.5 text-slate-600 dark:text-slate-400">September 2023</td></tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="p-2.5 font-bold text-[#006A44] dark:text-emerald-400">2025</td><td className="p-2.5 font-semibold text-slate-900 dark:text-slate-200">Busia County</td><td className="p-2.5 text-slate-600 dark:text-slate-400">October 2025</td></tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">2026</td><td className="p-2.5 font-semibold text-amber-600 dark:text-amber-400">Kilifi County</td><td className="p-2.5 text-amber-600 dark:text-amber-400">September 21–25, 2026</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-2.5 transition-colors">Note: Sessions were suspended in 2020 and 2021 due to the COVID-19 pandemic.</p>
      </>
    )
  },
  {
    id: 5,
    q: "5. Can the general public participate in the proceedings?",
    a: (
      <>
        <strong>Yes.</strong> Residents and local stakeholders can attend physical sittings and public hearings held at designated local venues (such as county assembly chambers or municipal halls).<br /><br />Proceedings are also broadcast live via digital platforms, including the <strong>Parliament of Kenya YouTube Channel</strong>, allowing citizens across the country to follow and submit petitions or memoranda.
      </>
    )
  }
];

export default function App() {
  // Navigation & audio states
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Video state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Filter & Search states
  const [selectedEditionTab, setSelectedEditionTab] = useState('all');
  const [billSearchQuery, setBillSearchQuery] = useState('');

  // Kilifi Program interactive filter states
  const [activeDayFilter, setActiveDayFilter] = useState('all');
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');

  // Modals state
  const [activeEditionModal, setActiveEditionModal] = useState(null);
  const [activeBillModal, setActiveBillModal] = useState(null);
  const [liveStreamModalOpen, setLiveStreamModalOpen] = useState(false);

  // Live chamber quote cycler
  const hansardQuotes = [
    `The Hon. Senators brings House to Kilifi to deliberate on our shared coastal heritage.`,
    `"Our artisanal fisherfolk along the Malindi coastline deserve world-class cold storage and secure landing corridors." — Sen. Stewart Madzayo`,
    `"Salt mining companies in Magarini must remit equitable royalties directly to host community trusts." — Committee on Natural Resources`,
    `"Devolution oversight must ensure county health facilities like Kilifi County Hospital are fully resourced." — Majority Leader`
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  const playCivicTone = (frequency = 440, type = 'sine', duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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
    playCivicTone(523.25, 'sine', 0.2); // C5
    const hansardContent = `THE PARLIAMENT OF KENYA
THE SENATE OF THE REPUBLIC OF KENYA
FIFTH SENATE MASHINANI OFFICIAL SITTING RECORD & COMPLETE PROGRAMME
HOST ASSEMBLY: KILIFI COUNTY ASSEMBLY CHAMBERS, MALINDI
OFFICIAL ONLINE REPOSITORY: https://www.parliament.go.ke/

Speaker of the Senate: Rt. Hon. Amason Jeffah Kingi, EGH
Speaker of Kilifi County Assembly: Rt. Hon. Teddy Mwambire
Governor of Kilifi County: H.E. Gideon Maitha Mung'aro, OGW
Host Senator: Sen. Stewart Madzayo, EGH, MP (Senate Minority Leader)
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--primary)] selection:text-white transition-colors duration-300">
      
      {/* Kenya Flag Ribbon */}
      <div className="h-2 w-full bg-gradient-to-r from-black via-[#A81C26] via-white to-[#0656ea]" />

      {/* Hero Section */}
      <section className="relative bg-[#020617] text-white overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <img
            src="/sessions_images/senate.jpg"
            alt="Senate Chamber in session"
            className="w-full h-full object-cover object-center opacity-95 filter saturate-150 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-[var(--primary)]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[var(--gold)]">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-ping" />
                Article 126(1) Resolution · Democracy Beyond Nairobi
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Taking Parliament <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[var(--gold)] to-blue-200">
                  To The Grassroots 
                </span>
              </h1>
              <h5 className="text-lg italic sm:text-xl lg:text-2xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-[var(--gold)] to-blue-400 font-serif">
                Devolution In Action 
              </h5>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed font-semibold">
                Senate Mashinani relocates the sovereign plenary and committees sittings to host County Assemblies. Interrogating devolution expenditure, receiving citizen petitions, and conducting live oversight where Kenyans live and work.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#editions"
                  onClick={() => playCivicTone(440, 'sine', 0.1)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all"
                >
                  <MapPin className="w-4 h-4 text-[var(--gold)]" />
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
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--gold)]">4</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Historic Sittings</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5">Binding Hansard Power</p>
              </div>
            </div>
          </div>

          {/* Spotlight Assembly Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-gradient-to-b from-slate-900/95 to-slate-900/90 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Live Sitting Assembly
                  </span>
                </div>
                <span className="text-xs text-[var(--gold)] bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800">
                  Ongoing · 5th Edition
                </span>
              </div>

              <div className="mt-4 space-y-4">
                
                {/* VIDEO PLAYER COMPONENT */}
                <div 
                  className="relative h-48 sm:h-56 rounded-2xl overflow-hidden group cursor-pointer border border-slate-700/80 shadow-inner bg-black"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {!isVideoPlaying ? (
                    <>
                      <Image
                        src="/sessions_images/kilifi.png"
                        alt="Kilifi Coastal County Session Thumbnail"
                        width={640}
                        height={360}
                        
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-500 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-0">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 ml-1 fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <iframe 
                      className="w-full h-full absolute inset-0"
                      src="https://www.youtube.com/embed/JUB87VKMCbQ?si=8_EpGnV5lnZIxeD-&autoplay=1" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  )}
                </div>

                {/* DECORATIONS BELOW THE IFRAME */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">Host Assembly</span>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">Kilifi County Assembly</h3>
                      <p className="text-xs text-slate-300">Blue Economy, Salt Mining Royalties & Land Rights</p>
                    </div>
                    <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-extrabold uppercase rounded shadow animate-pulse">
                      Ongoing
                    </span>
                  </div>
                </div>

                {/* INFO LIST */}
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 space-y-3 text-xs text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-400 shrink-0">
                      <Users className="w-3.5 h-3.5 text-[var(--gold)]" /> Host Senator:
                    </span>
                    <span className="text-white font-medium text-left sm:text-right">Sen. Stewart Madzayo, EGH, MP</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-400 shrink-0">
                      <FileText className="w-3.5 h-3.5 text-blue-400" /> House Mandate:
                    </span>
                    <span className="text-white font-medium text-left sm:text-right">Adopted Senate Motion (6th May 2026)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="font-semibold flex items-center gap-1.5 text-slate-400 shrink-0">
                      <Shield className="w-3.5 h-3.5 text-blue-400" /> Key Focus:
                    </span>
                    <span className="text-white font-medium text-left sm:text-right">Coastal Blue Economy & Salt Royalties</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveEditionModal(HOST_EDITIONS[0])}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-yellow-600 hover:from-yellow-400 hover:to-[var(--gold)] text-slate-950 font-bold text-xs uppercase tracking-wider transition text-center shadow"
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
            <Radio className="w-3.5 h-3.5 text-slate-950" />
            Senate Dispatch
          </div>
          
          <div className="flex-1 overflow-hidden relative flex items-center fade-edges">
            <div className="animate-marquee flex gap-8 whitespace-nowrap text-[var(--muted)]">
              {/* First Set of Content */}
              <div className="flex gap-8 items-center px-4">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Senate Resolution of March 8, 2023 mandates annual grassroots sittings under Article 126(1).
                </span>
                <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  County Public Accounts Committee (CPAC) interrogates devolved audit reports on-site in Busia.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Clerk of the Senate technical inspection audits assembly chambers for Hansard transmission.
                </span>
              </div>
              {/* Duplicated Set for Seamless Infinite Scroll */}
              <div className="flex gap-8 items-center px-4" aria-hidden="true">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Senate Resolution of March 8, 2023 mandates annual grassroots sittings under Article 126(1).
                </span>
                <span className="flex items-center gap-2 text-[var(--foreground)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  County Public Accounts Committee (CPAC) interrogates devolved audit reports on-site in Busia.
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  Clerk of the Senate technical inspection audits assembly chambers for Hansard transmission.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
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
              <p>
                Instead of requiring citizens to travel hundreds of kilometers to Nairobi, the Speaker of the Senate, the ceremonial Mace, all 67 Senators, the Clerk of the Senate, Hansard reporters, and standing committees relocate to a host County Assembly for a full working week.
              </p>
              <div className="p-4 bg-[var(--card)] rounded-xl border-l-4 border-[var(--primary)] text-xs sm:text-sm text-[var(--muted)] italic transition-colors shadow-sm">
                &ldquo;The Senate plays the critical interlinkage role between the National and County levels of government. There is need to enhance interaction between the Senate and County Governments, bringing the Senate closer to the Counties and the general public.&rdquo;
                <div className="font-bold text-[var(--foreground)] mt-2 not-italic">— Sen. Aaron Cheruiyot, E.G.H., member for Kericho County, Majority Leader of the Senate</div>
              </div>
            </div>

            <div>
              <div className="flex items-center w-full h-full">            
                <img
                  src="/sessions_images/chambers.jpg"
                  alt="Host Counties Selection"
                  width={800}
                  height={400}
                  className="rounded-xl border border-[var(--card-border)] shadow-sm transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="py-20 bg-[var(--card)] border-t border-[var(--card-border)] transition-colors duration-300">
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
            
            {/* Pillar 1 */}
            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-xl hover:border-[var(--primary)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6 text-[var(--primary)]" />
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

            {/* Pillar 2 */}
            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-xl hover:border-[var(--accent)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-[var(--accent)]" />
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

            {/* Pillar 3 */}
            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-[var(--gold)]" />
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

            {/* Pillar 4 */}
            <div className="bg-[var(--background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm hover:shadow-xl hover:border-[var(--primary)] transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  County Assembly Capacity
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed transition-colors">
                  Empowering Members of County Assemblies (MCAs), Hansard reporters, and legal drafters through peer benchmarking and parliamentary masterclasses.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--card-border)] text-[11px] font-bold text-[var(--primary)] flex items-center justify-between transition-colors">
                <span>Knowledge Transfer</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Host County Editions Section */}
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

            {/* Edition Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--card)] rounded-xl border border-[var(--card-border)] transition-colors">
              <button
                onClick={() => {
                  playCivicTone(440, 'sine', 0.1);
                  setSelectedEditionTab('all');
                }}
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
                  onClick={() => {
                    playCivicTone(440, 'sine', 0.1);
                    setSelectedEditionTab(ed.id);
                  }}
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

          {/* Grid of Host Editions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEditions.map((ed) => (
              <div
                key={ed.id}
                className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl overflow-hidden hover:border-[var(--primary)] transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={ed.image}
                    alt={ed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[var(--primary)] text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow">
                      {ed.edition}
                    </span>
                    {ed.status === 'Upcoming' && (
                      <span className="bg-[var(--gold)] text-slate-950 font-extrabold text-xs px-2 py-1 rounded-md shadow flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" /> Upcoming
                      </span>
                    )}
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
                      <span className="text-[11px] text-[var(--primary)] font-semibold">{ed.region}</span>
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
                      <span className="truncate max-w-[200px]">{ed.assembly}</span>
                      <button
                        onClick={() => {
                          playCivicTone(587.33, 'triangle', 0.15);
                          setActiveEditionModal(ed);
                        }}
                        className="text-[var(--primary)] hover:text-[var(--primary-light)] font-bold flex items-center gap-1 shrink-0 transition-colors"
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

      {/* Bills Tracker Section */}
      <section id="bills" className="py-20 bg-[var(--card)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full border border-[var(--primary)]/20 transition-colors">
                Grassroots Impact In Law
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-4 transition-colors">
                Devolution Bills & Petitions Tracker
              </h2>
              <p className="text-[var(--muted)] text-sm sm:text-base mt-2 transition-colors">
                Explore key statutes and legislative petitions born directly from citizen barazas and committee inquiries in host counties.
              </p>
            </div>

            {/* Bills Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-3" />
              <input
                type="text"
                value={billSearchQuery}
                onChange={(e) => setBillSearchQuery(e.target.value)}
                placeholder="Search bills, counties, keywords..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] text-xs focus:ring-2 focus:ring-[var(--primary)] focus:outline-none w-72 transition-colors"
              />
            </div>
          </div>

          {/* Bills Table */}
          <div className="overflow-x-auto bg-[var(--background)] rounded-2xl border border-[var(--card-border)] shadow-sm transition-colors">
            <table className="w-full text-left text-xs sm:text-sm text-[var(--muted)]">
              <thead className="bg-[var(--card)] text-[var(--foreground)] font-bold text-xs uppercase border-b border-[var(--card-border)] transition-colors">
                <tr>
                  <th className="px-6 py-4">Bill / Legislative Measure</th>
                  <th className="px-6 py-4">Origin Sitting</th>
                  <th className="px-6 py-4">Responsible Committee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--card-border)] transition-colors">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                      No devolution bills found matching &ldquo;{billSearchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredBills.map((b) => (
                    <tr key={b.id} className="hover:bg-[var(--card)] transition-colors">
                      <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                        {b.title}
                        <span className="block text-[11px] font-normal text-[var(--muted)] mt-0.5">
                          {b.description}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded bg-[var(--card-border)] text-[var(--foreground)] font-bold text-xs">
                          {b.county}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--muted)]">
                        {b.committee}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          b.statusType === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                          b.statusType === 'warning' ? 'bg-amber-500/10 text-amber-600' :
                          b.statusType === 'info' ? 'bg-blue-500/10 text-blue-600' :
                          'bg-purple-500/10 text-purple-600'
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
                          className="text-[var(--primary)] hover:text-[var(--primary-light)] font-bold text-xs hover:underline transition-colors"
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
      <section id="order-paper" className="py-20 bg-[var(--background)] border-y border-[var(--card-border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Official Data Link */}
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

          {/* Interactive Day Tabs & Category Filter */}
          <div className="bg-[var(--card)] p-4 rounded-2xl border border-[var(--card-border)] shadow-sm mb-8 space-y-3 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5 transition-colors">
                <Calendar className="w-4 h-4 text-[var(--primary)]" /> Select Sitting Day:
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
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeDayFilter === tab.key
                        ? 'bg-[var(--primary)] text-white shadow'
                        : 'bg-[var(--background)] text-[var(--muted)] hover:bg-[var(--card-border)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[var(--card-border)] text-xs transition-colors">
              <span className="font-semibold text-[var(--muted)] flex items-center gap-1.5 transition-colors">
                <Search className="w-3.5 h-3.5 text-[var(--gold)]" /> Filter By Session Type:
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
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      activeTypeFilter === type.key
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'bg-[var(--background)] text-[var(--muted)] hover:bg-[var(--card-border)] border border-[var(--card-border)]'
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
            <div className="lg:col-span-7 bg-[var(--card)] rounded-2xl border border-[var(--card-border)] shadow-sm overflow-hidden transition-colors duration-300">
              <div className="p-6 border-b border-[var(--card-border)] flex items-center justify-between bg-[var(--background)]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] text-base transition-colors">Verified Kilifi Order Paper</h3>
                    <p className="text-xs text-[var(--muted)] transition-colors">Kilifi County Assembly Chambers, Malindi & Grassroots Venues</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full transition-colors">
                  {filteredProgramSessions.length} Scheduled Sessions
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
                        item.status === 'In Progress' 
                        ? 'bg-[var(--gold)]/10 border-l-4 border-[var(--gold)]' 
                        : 'hover:bg-[var(--background)]'
                      }`}
                    >
                      <div className="shrink-0 space-y-1 text-center">
                        <span className="text-[10px] font-mono font-bold text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded block whitespace-nowrap transition-colors">
                          {item.time}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 block transition-colors">
                          {item.dayLabel}
                        </span>
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.categoryColor}`}>
                            {item.category}
                          </span>
                          <span className="text-[10px] font-semibold text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded flex items-center gap-1 transition-colors">
                            <MapPin className="w-3 h-3 text-[var(--accent)]" /> {item.venue}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-[var(--foreground)] transition-colors">{item.title}</h4>
                        <p className="text-xs text-[var(--muted)] leading-relaxed transition-colors">{item.description}</p>

                        {item.mover && (
                          <div className="text-[11px] text-[var(--muted)] bg-[var(--background)] p-2 rounded border border-[var(--card-border)] transition-colors">
                            <strong className="text-[var(--foreground)]">Mover / Chair:</strong> {item.mover}
                          </div>
                        )}

                        {item.keyParticipants && (
                          <div className="text-[11px] text-[var(--muted)] transition-colors">
                            <strong className="text-[var(--foreground)]">Key Participants:</strong> {item.keyParticipants}
                          </div>
                        )}
                      </div>

                      <span className="text-xs font-bold shrink-0 text-[var(--muted)] bg-[var(--background)] px-2 py-1 rounded transition-colors">
                        {item.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-[var(--background)] border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--muted)] gap-2 transition-colors">
                <span>Convening September 21–25, 2026. Official source: senate-mashinani.vercel.app</span>
                <a
                  href="https://www.parliament.go.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:text-[var(--primary-light)] font-bold inline-flex items-center gap-1 transition-colors"
                >
                  Live Web Page <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Live Broadcast Simulation Player */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--card)] rounded-2xl border border-[var(--card-border)] shadow-xl overflow-hidden text-[var(--foreground)] transition-colors">
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

              {/* Civic Fact Callout */}
              <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-4 flex items-start gap-3 transition-colors">
                <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0 transition-colors">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-[var(--primary)] text-sm transition-colors">Kilifi Sitting Landmark</h5>
                  <p className="text-[var(--muted)] mt-1 leading-relaxed transition-colors">
                    On June 9, 2026, the County Assembly of Kilifi resolved to suspend its own plenary sittings from September 21–25, 2026, handing over its chamber to host the 5th Senate Mashinani pursuant to Article 126(1) of the Constitution!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

     {/* FAQ SECTION */}
      <section id="faqs" className="bg-[var(--background)] border-t border-[var(--card-border)] py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#006A44] bg-[#006A44]/10 px-3.5 py-1.5 rounded-full border border-[#006A44]/20 transition-colors">
              Parliamentary Information Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] mt-3 transition-colors">Frequently Asked Questions (FAQs)</h2>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-3 rounded-full"></div>

            <div className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--card-border)] shadow-sm mt-6 text-left border-l-4 border-l-[#006A44] transition-colors">
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors">
                <strong className="text-[var(--foreground)] font-bold">Senate Mashinani</strong> is an initiative by the Parliament of Kenya that relocates the entire Senate—including its plenary and committee sittings—from the traditional Parliament Buildings in Nairobi to one of the 47 counties for a week-long grassroots engagement.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-[var(--card)] rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-sm transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-bold text-[var(--foreground)] text-sm sm:text-base flex items-center justify-between hover:bg-[var(--card-border)]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#006A44] text-lg font-black shrink-0 ml-3">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--card-border)] pt-4 bg-[var(--background)]/50 transition-colors">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal: County Edition Details */}
      {activeEditionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-[var(--foreground)] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 transition-colors">
            <button
              onClick={() => setActiveEditionModal(null)}
              className="absolute top-5 right-5 text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded-lg hover:bg-[var(--card-border)] transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
                <span className="text-xs uppercase font-bold text-[var(--gold)]">
                  {activeEditionModal.status === 'Upcoming' ? 'Official Proclamation' : 'Official Parliamentary Hansard'}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)] transition-colors">
                {activeEditionModal.name} ({activeEditionModal.edition})
              </h3>
              <div className="pb-2 border-b border-[var(--card-border)] text-xs text-[var(--muted)] space-y-1 transition-colors">
                <p><strong>Sitting Dates:</strong> {activeEditionModal.date}</p>
                <p><strong>Chamber Venue:</strong> {activeEditionModal.assembly}</p>
                <p><strong>Host Senator:</strong> {activeEditionModal.hostSenator}</p>
                <p className="text-[var(--primary)] font-mono text-[11px] transition-colors">{activeEditionModal.hansardRecord}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] transition-colors">
                  Substantive Inquiries & Grassroots Outcomes:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted)] transition-colors">
                  {activeEditionModal.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--primary)] font-bold mt-0.5 transition-colors">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5 transition-colors">
                  Participating Senate Standing Committees:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeEditionModal.keyCommittees.map((c, i) => (
                    <span key={i} className="text-xs bg-[var(--background)] px-2.5 py-1 rounded border border-[var(--card-border)] text-[var(--muted)] transition-colors">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[var(--card-border)] flex justify-end transition-colors">
                <button
                  onClick={() => setActiveEditionModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-[var(--card-border)] hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--card)] font-bold text-xs transition-colors"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Bill Brief Details */}
      {activeBillModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl max-w-xl w-full p-6 sm:p-8 text-[var(--foreground)] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 transition-colors">
            <button
              onClick={() => setActiveBillModal(null)}
              className="absolute top-5 right-5 text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded-lg hover:bg-[var(--card-border)] transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] transition-colors" />
                <span className="text-xs uppercase font-bold text-[var(--primary)] transition-colors">
                  {activeBillModal.county}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[var(--foreground)] transition-colors">
                {activeBillModal.title}
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed border-t border-[var(--card-border)] pt-3 transition-colors">
                {activeBillModal.fullBrief}
              </p>

              <div className="bg-[var(--background)] rounded-xl p-3.5 border border-[var(--card-border)] space-y-1 text-xs transition-colors">
                <div className="text-[var(--muted)]"><strong className="text-[var(--foreground)]">Sponsoring Committee:</strong> {activeBillModal.committee}</div>
                <div className="text-[var(--muted)]"><strong className="text-[var(--foreground)]">Current Stage:</strong> {activeBillModal.status}</div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveBillModal(null)}
                  className="px-5 py-2 rounded-xl bg-[var(--card-border)] hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--card)] font-bold text-xs transition-colors"
                >
                  Close Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Live Stream Preview */}
      {liveStreamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 transition-colors">
            <div className="p-4 bg-[var(--background)] border-b border-[var(--card-border)] flex justify-between items-center transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold text-[var(--foreground)] text-sm transition-colors">
                  The Parliament of Kenya · Senate Live Chamber Broadcast
                </span>
                <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-2 py-0.5 rounded font-mono transition-colors">
                  LIVE FEED
                </span>
              </div>
              <button
                onClick={() => setLiveStreamModalOpen(false)}
                className="text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded-lg hover:bg-[var(--card-border)] transition"
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

            <div className="p-4 bg-[var(--background)] border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs transition-colors">
              <div className="flex items-center gap-2 text-[var(--muted)] transition-colors">
                <Info className="w-4 h-4 text-[var(--primary)]" />
                <span>Broadcasting under Article 118 Public Participation mandate</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadHansardFile}
                  className="px-3 py-1.5 rounded-lg bg-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--card)] flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--gold)]" />
                  Extract Hansard
                </button>
                <button
                  onClick={() => setLiveStreamModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white font-bold hover:bg-[var(--primary-light)] transition-colors"
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