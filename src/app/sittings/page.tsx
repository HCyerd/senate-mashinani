"use client";

import React from 'react';
import { 
  MapPin, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Activity,
  Camera
} from 'lucide-react';
import Image from 'next/image';

const MASHINANI_SESSIONS = [
  {
    number: 5,
    ordinal: "5th",
    county: "Kilifi County",
    region: "Coastal Region",
    period: "September 21 - 25, 2026",
    status: "Upcoming",
    color: "from-amber-600 to-amber-900",
    accentColor: "bg-amber-500",
    overview: "The 5th Mashinani Sitting focuses on Blue Economy development, coastal land tenure rights, coconut sub-sector revival, and maritime security.",
    keyLegislation: ["Coast Development Authority Reform Bill", "Blue Economy Empowerment Framework", "Beach Management Bill"],
    oversight: ["Malindi Airport expansion land compensation inspection", "Kilifi County Referral Hospital Oxygen Plant review"],
    activities: ["Artisanal Fishermen Maritime Baraza", "Coastal Squatter Land Settlement Hearing"],
    impact: "Expected to establish a national legislative roadmap for coastal blue economy funding, squatter regularisation, and robust maritime security protocols.",
    participants: "Senators, Coastal Leadership, Artisanal Fishermen, Local Residents.",
    image: '/sessions_images/kilifi.png',
  },
  {
    number: 4,
    ordinal: "4th",
    county: "Busia County",
    region: "Western Region",
    period: "October 6 - 10, 2025",
    status: "Concluded",
    color: "from-[#006A44] to-emerald-900",
    accentColor: "bg-[#006A44]",
    overview: "Centered on cross-border trade facilitation, Lake Victoria blue economy development, sugar sub-sector revival, and healthcare devolution.",
    keyLegislation: ["Cross-Border Trade Harmonization Bill", "County Health Facilities Support Bill"],
    oversight: ["One-Stop Border Post (OSBP) operational inspection", "Busia County Referral Hospital upgrading audit"],
    activities: ["Border Traders & Artisanal Fishermen Public Hearing", "Sugarcane Farmers Joint Forum"],
    impact: "Accelerated legislative interventions on cross-border tariff structures and expedited the settlement of sugar factory arrears for local farmers.",
    participants: "Senators, Cross-Border Traders, Sugarcane Farmers, Busia County Assembly.",
    image: '/sessions_images/busia.jpeg',
  },
  {
    number: 3,
    ordinal: "3rd",
    county: "Turkana County",
    region: "Rift Valley Region",
    period: "September 25 - 29, 2023",
    status: "Concluded",
    color: "from-[#A81C26] to-red-950",
    accentColor: "bg-[#A81C26]",
    overview: "Prioritized border security oversight, pastoralist livestock insurance, oil exploitation royalties, and drought management in marginalized areas.",
    keyLegislation: ["Pastoralist Livestock Development Bill", "County Boundary Delimitation Framework"],
    oversight: ["Lokichar Oil Fields community benefit share inspection", "Turkana West refugee integration review"],
    activities: ["Cross-border Peace Baraza at Nadapal", "Pastoralist Women Empowerment Baraza"],
    impact: "Resulted in a unanimous Senate directive for the immediate disbursement of pending drought emergency funds to 12 pastoralist counties.",
    participants: "Senators, Pastoralist Communities, Oil Extraction Stakeholders, Security Agencies.",
    image: '/sessions_images/turkana.jpeg',
  },
  {
    number: 2,
    ordinal: "2nd",
    county: "Kitui County",
    region: "Eastern Region",
    period: "September 16 - 20, 2019",
    status: "Concluded",
    color: "from-[#D4AF37] to-yellow-950",
    accentColor: "bg-[#D4AF37]",
    overview: "Focused on Arid and Semi-Arid Lands (ASAL) water infrastructure, coal mining environmental impacts, and rural health challenges.",
    keyLegislation: ["Equalization Fund Administration Bill", "Water Resources Management Amendment"],
    oversight: ["Fact-finding inspection of Mui Basin Coal mining rights", "Umaa Dam stalled project audit"],
    activities: ["Kitui Textile Centre (KICOTEC) artisan baraza", "ASAL climate resilience summit"],
    impact: "Spurred the National Treasury to release withheld conditional grants for ASAL water harvesting schemes following Senate pressure.",
    participants: "Senators, Kitui County Executive, Environmental Activists, Local Artisans.",
    image: '/sessions_images/kitui_session.jpg',
  },
  {
    number: 1,
    ordinal: "1st",
    county: "Uasin Gishu County",
    region: "Rift Valley Region",
    period: "September 24 - 28, 2018",
    status: "Concluded",
    color: "from-slate-700 to-slate-900",
    accentColor: "bg-slate-600",
    overview: "The inaugural Senate Mashinani sitting outside Nairobi. It established the procedural and logistical framework for hosting plenary and committee sittings across devolved counties.",
    keyLegislation: ["County Allocation of Revenue Bill (2018)", "Food Security Bill", "Local Public Participation Guidelines"],
    oversight: ["Inspected Moi Teaching & Referral Hospital (MTRH) infrastructure", "Audited Uasin Gishu County maize farmer subsidies"],
    activities: ["Farmer Grievance Baraza with North Rift Agricultural Lobby", "Youth Unemployment Baraza"],
    impact: "Led to direct parliamentary intervention on NCPB maize payment arrears, securing long-overdue payments for over 20,000 farmers.",
    participants: "Senators, North Rift Farmers, MTRH Administration, Uasin Gishu Residents.",
    image: '/sessions_images/uasingishu.jpeg',
  }
];

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const ImagePlaceholder = ({ label, colorClass }: { label: string, colorClass: string }) => (
  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${colorClass} opacity-80`}>
    <Camera className="w-12 h-12 text-white/50 mb-3" />
    <span className="text-white/70 font-semibold tracking-wider text-sm uppercase px-4 text-center">
      {label}
    </span>
  </div>
);

export default function MashinaniImpactPage() {
  return (
    <div className="min-h-screen bg-[#01004a] text-slate-200 selection:bg-[#0458f4] selection:text-white pb-24 font-sans">
      
      {/* HERO SECTION - FOCUS ON IMPACT */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
        {/* Heraldic Glows */}
        <Image
          src="/sessions_images/chambers.jpg"
          alt="Heraldic Glow"
          fill
          className="absolute inset-0 object-cover  "
        />
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-[#D4AF37] uppercase">
              Devolution & Grassroots Oversight
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl bg-red-500/10 backdrop-blur-2xl p-4 rounded-xl font-black tracking-tighter text-white drop-shadow-lg">
            Impact of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0458f4] via-blue-400 to-[#011a48]">Senate Mashinani</span>
          </h1>
          
          <p className="text-lg sm:text-xl bg-red-500/10 backdrop-blur-2xl p-4 rounded-xl font-serif font-extrabold text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            A comprehensive retrospective of the legislative, economic, and social impact driven by relocating the Senate to the counties — from the upcoming 5th session in Kilifi to the inaugural sitting in Uasin Gishu.
          </p>
        </div>
      </section>

      {/* QUICK NAVIGATION STRIP */}
      <section className="sticky top-0 z-40 bg-[#050A08]/90 backdrop-blur-lg border-y border-slate-800/50 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0 mr-2">Timeline:</span>
          {MASHINANI_SESSIONS.map((session) => (
            <a
              key={session.number}
              href={`#${slugify(session.county)}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 hover:border-[#D4AF37] hover:bg-slate-800 transition-all group shrink-0"
            >
              <span className="text-xs font-semibold text-slate-300 group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                {session.ordinal} • {session.county.replace(' County', '')}
              </span>
            </a>
          ))}
        </div>
      </section>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {MASHINANI_SESSIONS.map((session) => (
          <div 
            key={session.number} 
            id={slugify(session.county)} 
            className="group scroll-mt-32"
          >
            {/* Session Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-white bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 uppercase tracking-wider shadow-sm">
                    {session.ordinal} Session
                  </span>
                  <span className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${
                    session.status === 'Upcoming' 
                      ? 'bg-amber-900/30 text-amber-400 border-amber-800/50' 
                      : 'bg-[#006A44]/20 text-emerald-400 border-[#006A44]/40'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> {session.status}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {session.county}
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> {session.region}
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <Calendar className="w-4 h-4 text-[#006A44]" /> {session.period}
                </div>
              </div>
            </div>

            {/* BENTO BOX GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Media & Overview (Spans 5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Hero Image Card with Native HTML Image + Placeholder Fallback */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 group-hover:shadow-2xl transition-all duration-500">
                  {/* <ImagePlaceholder label={`${session.county} Archives`} colorClass={session.color} /> */}
                  
                  {/* Using standard img tag to prevent Next.js image component errors in dynamic environments, with object-cover to fit perfectly */}
                  <img 
                    src={session.image} 
                    alt={`${session.county} Main Event Cover`} 
                    className="absolute inset-0 w-full h-full object-contain z-10 border-0  group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => {
                       // Hide image if it fails to load so the placeholder shows through
                       (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
                  <div className="absolute bottom-0 left-0 p-8 z-30">
                    <div className="text-6xl sm:text-7xl font-black text-white/40 tracking-tighter mb-2">
                      #{session.number.toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Overview Card */}
                <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#A81C26]" /> Overview
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-base">{session.overview}</p>
                </div>
              </div>

              {}
              {/* Right Column: Data, Actions & Impact (Spans 7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Main Impact Highlight (Spans 2 cols inside the sub-grid) */}
                <div className="sm:col-span-2 bg-gradient-to-br from-[#0B130F] to-slate-900 p-8 rounded-3xl shadow-lg border border-[#D4AF37]/20 relative overflow-hidden group-hover:border-[#D4AF37]/50 transition-colors">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <TrendingUp className="w-32 h-32 text-[#D4AF37]" />
                  </div>
                  <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 backdrop-blur-md">
                        <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
                        Legislative & Grassroots Impact
                      </h3>
                      <p className="text-base text-slate-200 leading-relaxed font-medium">
                        {session.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Legislation Processed */}
                <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-800 hover:border-[#006A44]/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#006A44]/10 flex items-center justify-center mb-5 border border-[#006A44]/30">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-4">
                    Legislation Processed
                  </h3>
                  <ul className="space-y-4">
                    {session.keyLegislation.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                          <span className={`w-1.5 h-1.5 rounded-full ${session.accentColor}`} />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Oversight & Site Inspections */}
                <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-800 hover:border-[#A81C26]/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#A81C26]/10 flex items-center justify-center mb-5 border border-[#A81C26]/30">
                    <CheckCircle2 className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-4">
                    Oversight Actions
                  </h3>
                  <ul className="space-y-4">
                    {session.oversight.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A81C26]" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Activities Documented (Spans 2 cols) */}
                <div className="sm:col-span-2 bg-[#006A44]/10 p-6 sm:p-8 rounded-3xl shadow-inner border border-[#006A44]/20">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#D4AF37]" /> Public Engagement Activities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {session.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-900/50 px-4 py-3 rounded-xl border border-slate-800/80">
                        <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 leading-relaxed">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Participants */}
                <div className="sm:col-span-2 flex items-start gap-3 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                  <Users className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-1">Participants</h4>
                    <p className="text-sm text-slate-500">{session.participants}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}