'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, Sun, Search, User, LayoutGrid, 
  X, ChevronRight, Building2, Award, Users, BookOpen, 
  Scale, Mic, TrendingUp, Handshake, Megaphone, 
  Banknote, Briefcase, ShieldAlert, FolderOpen, UserX
} from 'lucide-react';

// --- TYPES & INTERFACES ---
type CategoryType = 'ALL' | 'CLERK' | 'DEPUTY_CLERK' | 'LEGISLATIVE' | 'SUPPORT';

interface Officer {
  id: string;
  name: string;
  honour: string;
  role: string;
  category: string;
  chamber: string;
  image: string;
  description: string;
}

interface Directorate {
  id: string;
  title: string;
  head: string;
  category: string;
  iconName: string; // Used to map to Lucide icons
  summary: string;
  mandate: string;
  keyFunctions: string[];
}

// --- MOCK DATA ---
const OFFICERS_DATA: Officer[] = [
  {
    id: 'c-senate',
    name: 'Mr. Jeremiah M. Nyegenye',
    honour: 'CBS',
    role: 'Clerk of the Senate & Secretary, PSC',
    category: 'CLERK',
    chamber: 'Senate of Kenya',
    image: '/CoS.jpg',
    description: 'The Chief Executive Officer of the Senate, principal advisor on parliamentary procedure to the Speaker, and Secretary to the Parliamentary Service Commission (PSC). He holds both Bachelor and Master of Laws degrees from the University of Nairobi.'
  },
  // {
  //   id: 'c-assembly',
  //   name: 'Mr. Samuel Njoroge',
  //   honour: 'CBS',
  //   role: 'Clerk of the National Assembly',
  //   category: 'CLERK',
  //   chamber: 'National Assembly',
  //   image: '/CoN.jpg',
  //   description: 'The Chief Executive Officer of the National Assembly and chief custodian of all Assembly records, bills, and constitutional procedural proceedings.'
  // },
  {
    id: 'dc-senate-leg',
    name: 'Ms. Eunice Gichangi',
    honour: 'MBS',
    role: 'Deputy Clerk (Legislative & Procedural Services)',
    category: 'DEPUTY_CLERK',
    chamber: 'Senate of Kenya',
    image: '/Ms._Eunice_Gichangi.jpg',
    description: 'Oversees the preparation of Order Papers, Motions, Legislative Bills tracking, Table Office operations, and Chamber proceedings management.'
  },
  {
    id: 'dc-senate-admin',
    name: 'Mr. Mohamed Ali Mohamed',
    honour: 'MBS',
    role: 'Deputy Clerk (Administrative & Committee Services)',
    category: 'DEPUTY_CLERK',
    chamber: 'Senate of Kenya',
    image: '/mba.jpg',
    description: 'Coordinates Senate Standing and Select Committees, administrative operations, public outreach initiatives, and infrastructure logisitics.'
  },
  // {
  //   id: 'dc-assembly-leg',
  //   name: 'Mr. Jeremiah Ndombi',
  //   honour: 'CBS',
  //   role: 'Deputy Clerk of the National Assembly',
  //   category: 'DEPUTY_CLERK',
  //   chamber: 'National Assembly',
  //   image: '/Mr._Jeremiah_Ndombi.jpg',
  //   description: 'Supports the administration of legislative operations, committee oversight activities, and House management services.'
  // },
//   {
//     id: 'serjeant-senate',
//     name: 'Chief Serjeant-at-Arms',
//     honour: 'OGW',
//     role: 'Serjeant-at-Arms of the Senate',
//     category: 'DEPUTY_CLERK',
//     chamber: 'Senate of Kenya',
//     image: '/Serjeant-at-Arms.jpg',
//     description: 'Custodian of the Senate Mace, responsible for security operations, chamber decorum, ceremonial duties, and protection of Senators.'
//   }
];

const DIRECTORATES_DATA: Directorate[] = [
  {
    id: 'dir-leg-proc',
    title: 'Legislative and Procedural',
    head: 'Director, Legislative Services',
    category: 'LEGISLATIVE',
    iconName: 'BookOpen',
    summary: 'Manages Chamber business, Order Papers, Votes and Proceedings, and procedural advice to the Speaker.',
    mandate: 'Responsible for the core legislative pipeline of the Senate. Compiles the daily Order Paper, records official Votes and Proceedings, manages Table Office operations, tracks Senate Bills, and advises Senators on Standing Orders.',
    keyFunctions: [
      'Preparation and publication of daily Chamber Order Papers.',
      'Production of official Votes and Proceedings records.',
      'Processing of Private Members Bills and Government Bills.',
      'Procedural guidance to the Speaker, Chairpersons, and Members.'
    ]
  },
  {
    id: 'dir-committees',
    title: 'Committees',
    head: 'Director, Committee Services',
    category: 'LEGISLATIVE',
    iconName: 'Users',
    summary: 'Coordinates Standing, Sectoral, and Select Committees of the Senate for county oversight.',
    mandate: 'Facilitates the oversight and investigative role of the Senate through its Standing and Select Committees. Manages public petitions, public hearings in counties (Senate Mashinani), and committee report drafting.',
    keyFunctions: [
      'Secretariat and technical support to 20+ Standing & Sectoral Committees.',
      'Coordination of public participation and stakeholder hearings.',
      'Facilitation of Senate Mashinani county committee sittings.',
      'Drafting of comprehensive oversight and investigation reports.'
    ]
  },
  {
    id: 'dir-legal',
    title: 'Legal Services',
    head: 'Director, Legal Services / Legal Counsel',
    category: 'LEGISLATIVE',
    iconName: 'Scale',
    summary: 'Provides legal counsel, bill drafting, litigation representation, and statutory reviews.',
    mandate: 'Acts as the primary legal advisor to the Senate, Speaker, Committees, and Parliamentary Service Commission. Drafts legislative bills and amendments, represents Senate in court, and reviews statutory instruments.',
    keyFunctions: [
      'Drafting of Senate Bills, Amendments, and Motions.',
      'Litigation representation in inter-governmental and constitutional suits.',
      'Legal vetting of Statutory Instruments and Regulations.',
      'Legal advisory to Senate Committees during public inquiries.'
    ]
  },
  {
    id: 'dir-hansard',
    title: 'Hansard Department',
    head: 'Editor-in-Chief, Hansard',
    category: 'SUPPORT',
    iconName: 'Mic',
    summary: 'Official verbatim reporting, audio recording, indexing, and publication of Senate proceedings.',
    mandate: 'Produces the official verbatim report (Hansard) of all sittings of the Senate Chamber and Committee proceedings. Ensures permanent archival indexing of parliamentary debates and decisions.',
    keyFunctions: [
      'Real-time verbatim recording of Senate Chamber debates.',
      'Editing, indexing, and publishing of daily Hansard reports.',
      'Audio-visual archiving of committee public hearings.',
      'Provision of official transcripts for judicial and public reference.'
    ]
  },
  {
    id: 'dir-budget',
    title: 'The Parliamentary Budget Office',
    head: 'Director, Parliamentary Budget Office',
    category: 'LEGISLATIVE',
    iconName: 'TrendingUp',
    summary: 'Provides professional, independent, and objective analysis on national budget, economy, and financial matters.',
    mandate: 'A non-partisan professional office that provides the Senate and its committees with objective, timely and non-partisan analysis of the national budget, the economy and financial matters relating to national and county governments.',
    keyFunctions: [
      'Macroeconomic and fiscal policy analysis.',
      'Budget analysis and costing of proposed legislation.',
      'Preparation of budget options and briefs for Committees.',
      'Monitoring implementation of the national and county budgets.'
    ]
  },
  {
    id: 'dir-liaison',
    title: 'Liaison Office',
    head: 'Director, Inter-governmental & Liaison Services',
    category: 'SUPPORT',
    iconName: 'Handshake',
    summary: 'Manages inter-parliamentary relations, protocol, and inter-governmental coordination.',
    mandate: 'Facilitates seamless coordination between the Senate and other arms of Government, County Governments, regional parliaments, and international bodies. Handles diplomatic protocol for visiting dignitaries.',
    keyFunctions: [
      'Coordination of Senate participation in regional assemblies (EALA, PAP).',
      'Management of diplomatic protocol and international delegations.',
      'Liaison between the Senate and the Council of Governors (CoG).',
      'Facilitation of Senators\' official local and international travel.'
    ]
  },
  {
    id: 'dir-public-comm',
    title: 'Public Communication & Media Relations',
    head: 'Director, Media Relations & Public Affairs',
    category: 'SUPPORT',
    iconName: 'Megaphone',
    summary: 'Drives civic education, public outreach, media relations, broadcasting, and Senate Mashinani.',
    mandate: 'Enhances public understanding of the Senate mandate and county devolution. Manages media relations, digital channels, civic education programs, and public access during Senate Mashinani sittings.',
    keyFunctions: [
      'Media accreditation and parliamentary press corps relations.',
      'Management of Senate digital platforms and live broadcasts.',
      'Public education campaigns on devolution and Senate role.',
      'Corporate communications and crisis management.'
    ]
  },
  {
    id: 'dir-finance',
    title: 'Finance & Accounting Services',
    head: 'Director, Finance & Accounting',
    category: 'SUPPORT',
    iconName: 'Banknote',
    summary: 'Manages Senate financial budgeting, Senator emoluments, fiscal reporting, and auditing.',
    mandate: 'Ensures prudent financial management, budgeting, and accounting for all Senate operations and Parliamentary Service Commission allocations in accordance with the Public Finance Management (PFM) Act.',
    keyFunctions: [
      'Preparation of annual Senate financial budget estimates.',
      'Management of Senator and staff emoluments and claims.',
      'Financial reporting and internal audit compliance.',
      'Procurement financial vetting and fiscal controls.'
    ]
  },
  {
    id: 'dir-admin-hr',
    title: 'Administrative & Human Resource Services',
    head: 'Director, Human Resources & Admin',
    category: 'SUPPORT',
    iconName: 'Briefcase',
    summary: 'Oversees staff recruitment, training, logistics, capacity building, and administrative infrastructure.',
    mandate: 'Manages human capital development, staff welfare, administrative logistics, office allocation, and capacity-building programs to support the legislative functions of the Senate.',
    keyFunctions: [
      'Recruitment, deployment, and performance management of technical staff.',
      'Staff capacity building and continuous professional development.',
      'Management of Senate physical infrastructure and office allocations.',
      'Transport, travel logistics, and general administrative services.'
    ]
  },
  {
    id: 'dir-security',
    title: 'Serjeant at Arms',
    head: 'Chief Serjeant-at-Arms',
    category: 'SUPPORT',
    iconName: 'ShieldAlert',
    summary: 'Maintains physical security, chamber decorum, custody of the Mace, and safety operations.',
    mandate: 'Responsible for maintaining order and decorum within the Senate precincts, safeguarding the Speaker and Senators, enforcing security protocols, and managing ceremonial proceedings.',
    keyFunctions: [
      'Custody and protection of the ceremonial Senate Mace.',
      'Enforcement of order and decorum inside the Senate Chamber.',
      'Security screening and safety of Senate premises.',
      'Ceremonial escorts during State Openings and official sittings.'
    ]
  }
];

// --- HELPER TO RENDER LUCIDE ICONS DYNAMICALLY ---
const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Mic': return <Mic className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Handshake': return <Handshake className={className} />;
    case 'Megaphone': return <Megaphone className={className} />;
    case 'Banknote': return <Banknote className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    default: return <FolderOpen className={className} />;
  }
};


export default function SenateOfficersPage(): React.ReactElement | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'clerks' | 'directorates'>('clerks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('ALL');
  const [selectedDirectorate, setSelectedDirectorate] = useState<Directorate | null>(null);

  useEffect(() => {
    setMounted(true);
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [darkMode, mounted]);

  const filteredOfficers = useMemo(() => {
    return OFFICERS_DATA.filter(officer => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = officer.name.toLowerCase().includes(searchLower) ||
          officer.role.toLowerCase().includes(searchLower) ||
          officer.honour.toLowerCase().includes(searchLower) ||
          officer.description.toLowerCase().includes(searchLower);
      
      const matchesCat = categoryFilter === 'ALL' || officer.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, categoryFilter]);

  const filteredDirectorates = useMemo(() => {
    return DIRECTORATES_DATA.filter(dir => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = dir.title.toLowerCase().includes(searchLower) ||
          dir.head.toLowerCase().includes(searchLower) ||
          dir.summary.toLowerCase().includes(searchLower) ||
          dir.mandate.toLowerCase().includes(searchLower);
      
      const matchesCat = categoryFilter === 'ALL' || dir.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, categoryFilter]);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Floating Theme Switcher Button */}
      {/* <button 
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle Theme" 
        className={`fixed top-6 right-6 z-50 p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 
          ${darkMode ? 'bg-slate-900 text-[#C7A537] border-slate-800' : 'bg-white text-[#2E3A8C] border-slate-200'}`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Branding & Logo */}
        <header className="flex flex-col items-center justify-center mb-10 text-center space-y-3">
            <img src="parliament_emblem.png" alt="Parliament of Kenya Emblem" className="w-32 md:w-36 h-auto drop-shadow-xl mb-1" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#C7A537] dark:text-[#C7A537] px-3.5 py-1 rounded-full bg-[#2E3A8C]/10 dark:bg-[#2E3A8C]/30 border border-[#2E3A8C]/20 dark:border-[#C7A537]/30">
                Parliament of Kenya &bull; Parliamentary Service
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#2E3A8C] dark:text-[#C7A537]">
                Senate Administrative Officers
            </h1>
            <p className="max-w-3xl text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
                Comprehensive directory of the Clerk of the Senate, Deputy Clerks, and specialized technical Directorates facilitating the legislative, oversight, and representation mandate of the Senate.
            </p>
        </header>

        {/* Navigation Section Tabs */}
        <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/70 dark:border-slate-800 shadow-inner flex-wrap justify-center gap-1">
                <button 
                  onClick={() => setActiveTab('clerks')} 
                  className={`flex items-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300
                    ${activeTab === 'clerks' ? 'bg-[#2E3A8C] text-white shadow-md dark:bg-[#C7A537] dark:text-[#2E3A8C]' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                    <User className="w-4 h-4 mr-2" /> Clerk Of the Senate & Deputies
                </button>
                <button 
                  onClick={() => setActiveTab('directorates')} 
                  className={`flex items-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300
                    ${activeTab === 'directorates' ? 'bg-[#2E3A8C] text-white shadow-md dark:bg-[#C7A537] dark:text-[#2E3A8C]' : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                    <LayoutGrid className="w-4 h-4 mr-2" /> Senate Directorates
                </button>
            </div>
        </div>

        {/* SEARCH AND FILTER CONTROLS BAR */}
        <div className="mb-10 p-5 rounded-3xl border bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="relative md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2E3A8C] dark:text-[#C7A537] mb-1.5">
                        Search Officer, Role, or Directorate
                    </label>
                      <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search by name, title, honours (e.g. CBS), or mandate..." 
                              className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl outline-none border transition-all duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 focus:border-[#2E3A8C] dark:focus:border-[#C7A537] focus:ring-2 focus:ring-[#C7A537]/30" 
                          />
                      </div>
                  </div>
                  <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2E3A8C] dark:text-[#C7A537] mb-1.5">
                          Filter Category
                      </label>
                      <select 
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value as CategoryType)}
                          className="w-full pl-4 pr-10 py-3 text-sm rounded-2xl outline-none border transition-all duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 focus:border-[#2E3A8C] dark:focus:border-[#C7A537] focus:ring-2 focus:ring-[#C7A537]/30 cursor-pointer"
                      >
                          <option value="ALL">All Categories</option>
                          <option value="CLERK">Clerks of the Chambers</option>
                          <option value="DEPUTY_CLERK">Deputy Clerks</option>
                          <option value="LEGISLATIVE">Legislative & Legal Directorates</option>
                          <option value="SUPPORT">Administrative & Support Directorates</option>
                      </select>
                </div>
            </div>
        </div>
        
        {/* SECTION 1: CLERKS & DEPUTY CLERKS VIEW */}
        {activeTab === 'clerks' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-3">
                  <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2E3A8C] dark:text-[#C7A537] block mb-1">
                          Executive Administrative Leadership
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#2E3A8C] dark:text-white">
                          Clerk of the Senate & Deputies
                      </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-sm text-right">
                      The Chief Executive Officers and principal procedural advisors of the Senate.
                  </p>
              </div>

              {filteredOfficers.length === 0 ? (
                <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
                    <UserX className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Officers Found</h4>
                    <p className="text-xs text-slate-500">Try adjusting your search criteria or category filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOfficers.map(officer => (
                      <div key={officer.id} className="group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#2E3A8C] dark:hover:border-[#C7A537] shadow-xl hover:shadow-2xl flex flex-col justify-between">
                          <div className="h-2 w-full bg-gradient-to-r from-[#2E3A8C] via-[#C7A537] to-[#2E3A8C]"></div>
                          <div className="p-6">
                              <div className="flex items-center justify-between gap-2 mb-4">
                                  <span className="flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#2E3A8C]/10 text-[#2E3A8C] dark:bg-[#C7A537]/20 dark:text-[#C7A537] border border-[#2E3A8C]/20 dark:border-[#C7A537]/30">
                                      <Building2 className="w-3 h-3 mr-1" /> {officer.chamber}
                                  </span>
                                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-[#C7A537] border border-amber-500/30 flex items-center gap-1">
                                      <Award className="w-3 h-3" /> {officer.honour}
                                  </span>
                              </div>

                              <div className="flex items-start gap-4 mb-4">
                                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-slate-200 dark:border-slate-800 shadow-md">
                                      <img src={officer.image} alt={officer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                  </div>
                                  <div className="min-w-0">
                                      <span className="text-[11px] font-extrabold uppercase tracking-wider block text-[#2E3A8C] dark:text-[#C7A537] mb-1">
                                          {officer.role}
                                      </span>
                                      <h3 className="text-lg font-black leading-tight text-slate-900 dark:text-white mb-1">
                                          {officer.name}
                                      </h3>
                                  </div>
                              </div>

                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t pt-4 border-slate-100 dark:border-slate-800">
                                  {officer.description}
                              </p>
                          </div>
                      </div>
                    ))}
                </div>
              )}
          </section>
        )}

        {/* SECTION 2: SENATE DIRECTORATES VIEW */}
        {activeTab === 'directorates' && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-3">
                  <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2E3A8C] dark:text-[#C7A537] block mb-1">
                          Technical & Procedural Wings
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#2E3A8C] dark:text-white">
                          Senate Directorates
                      </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-sm text-right">
                      Specialized departments providing legal, procedural, committee, research, and technical support.
                  </p>
              </div>

              {filteredDirectorates.length === 0 ? (
                <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
                    <FolderOpen className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Directorates Found</h4>
                    <p className="text-xs text-slate-500">Try adjusting your search query or dropdown filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDirectorates.map(dir => (
                      <div 
                        key={dir.id}
                        onClick={() => setSelectedDirectorate(dir)} 
                        className="group cursor-pointer relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#2E3A8C] dark:hover:border-[#C7A537] shadow-xl hover:shadow-2xl p-6 flex flex-col justify-between"
                      >
                          <div>
                              <div className="flex items-center justify-between mb-4">
                                  <div className="w-12 h-12 rounded-2xl bg-[#2E3A8C]/10 dark:bg-[#2E3A8C]/30 text-[#2E3A8C] dark:text-[#C7A537] flex items-center justify-center text-xl font-bold group-hover:bg-[#2E3A8C] group-hover:text-white dark:group-hover:bg-[#C7A537] dark:group-hover:text-[#2E3A8C] transition-colors duration-300">
                                      {renderIcon(dir.iconName)}
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                      {dir.category}
                                  </span>
                              </div>

                              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-[#2E3A8C] dark:group-hover:text-[#C7A537] transition-colors">
                                  {dir.title}
                              </h3>

                              <p className="text-xs font-bold text-[#C7A537] dark:text-[#C7A537] mb-3 flex items-center gap-1">
                                  <Users className="w-3 h-3" /> Headed by: {dir.head}
                              </p>

                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                  {dir.summary}
                              </p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#2E3A8C] dark:text-[#C7A537]">
                              <span>Explore Full Mandate</span>
                              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                      </div>
                    ))}
                </div>
              )}
          </section>
        )}

      </main>
      
      {/* DIRECTORATE DETAIL MODAL */}
      {selectedDirectorate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <button 
                  onClick={() => setSelectedDirectorate(null)} 
                  className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#2E3A8C] text-white dark:bg-[#C7A537] dark:text-[#2E3A8C] flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {renderIcon(selectedDirectorate.iconName, "w-8 h-8")}
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2E3A8C] dark:text-[#C7A537]">
                            Senate Directorate Deep-Dive
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                            {selectedDirectorate.title}
                        </h2>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Directorate Leadership</h4>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedDirectorate.head}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Core Mandate & Constitutional Scope</h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {selectedDirectorate.mandate}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Key Technical Functions</h4>
                        <ul className="space-y-2.5">
                            {selectedDirectorate.keyFunctions.map((fn, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C7A537] flex-shrink-0 mt-1.5"></div>
                                    <span>{fn}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
                    <button 
                      onClick={() => setSelectedDirectorate(null)} 
                      className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#2E3A8C] text-white dark:bg-[#C7A537] dark:text-[#2E3A8C] hover:opacity-90 transition-opacity"
                    >
                        Close Overview
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}