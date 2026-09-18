"use client";

import React, { useState, useEffect } from 'react';
import { 
    Landmark, 
    History, 
    Users, 
    Scale, 
    ChevronDown, 
    Gavel,
    ShieldCheck,
    Globe,
    ExternalLink,
    Target,
    Eye,
    Network,
    Award,
    BookOpen,
    Briefcase,
    Sun,
    Moon
} from 'lucide-react';
import Image from 'next/image';

type TabProps = {
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: (id: string) => void;
};

type LeaderProps = {
    name: string;
    role: string;
    description: string;
    image: string;
    themeColor: string;
};

// Colors are mapped dynamically to CSS variables for smooth theme toggling
const THEME = {
    primary: 'bg-[var(--primary)]',
    primaryText: 'text-[var(--primary-text)]', 
    secondary: 'bg-[var(--secondary)]',
    secondaryText: 'text-[var(--secondary)]',
    accentGreen: 'text-[var(--accent-green)]',
    accentRed: 'text-[var(--accent-red)]',
    bgCard: 'bg-[var(--card)]',
    borderLight: 'border-[var(--card-border)]',
    textBody: 'text-[var(--muted-foreground)]'
};

const SENATE_LEADERS: LeaderProps[] = [
    {
        name: "Rt. Hon. Amason Kingi",
        role: "Speaker of the Senate",
        description: "Serving as the Speaker since September 2022. Ex-officio member elected by the Senators. Presides over the sittings of the Senate.",
        image: "/senators_images/Amason_Jeffah_Kingi_Senator.png",
        themeColor: "bg-[#252864]"
    },
    {
        name: "Hon. Kathuri Murungi",
        role: "Deputy Speaker",
        description: "Assists the Speaker in presiding over the sittings of the Senate and ensuring orderly conduct of House business.",
        image: "/senators_images/Murungi_Kathuri_Senator.jpg",
        themeColor: "bg-[#15008b]"
    },
    {
        name: "Mr. Jeremiah M. Nyegenye",
        role: "Clerk of the Senate",
        description: "The chief administrative officer of the Senate and Secretary of the Parliamentary Service Commission, serving since 2013.",
        image: "/CoS.jpg",
        themeColor: "bg-[#C4122C]"
    },
    {
        name: "Sen. Aaron Cheruiyot",
        role: "Senate Majority Leader",
        description: "Lead speaker for the majority party in the Senate. Directs the legislative agenda of the majority coalition on the floor.",
        image: "/senators_images/Aaron_Kipkirui_Cheruiyot_Senator.jpg",
        themeColor: "bg-[#C9B25A]"
    },
    {
        name: "Sen. Stewart Madzayo",
        role: "Senate Minority Leader",
        description: "Leader of the minority coalition in the Senate. Crucial in providing checks, balances, and alternative legislative policies.",
        image: "/senators_images/Justice_Stewart_Madzayo_Senator.jpg",
        themeColor: "bg-[#252864]"
    }
];

const TabButton: React.FC<TabProps> = ({ id, label, icon, isActive, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 outline-none whitespace-nowrap rounded-t-xl
            ${isActive 
                ? 'border-[var(--secondary)] text-[var(--primary-text)] bg-[var(--card)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]' 
                : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]'
            }`}
    >
        <span className={`${isActive ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'}`}>{icon}</span>
        {label}
    </button>
);

const SectionHeading: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-10 text-center md:text-left">
        <h2 className={`text-3xl md:text-4xl font-extrabold ${THEME.primaryText} mb-3 relative inline-block transition-colors duration-300`}>
            {title}
            <div className={`absolute -bottom-2 left-0 w-1/3 h-1.5 ${THEME.secondary} rounded-full`}></div>
        </h2>
        {subtitle && <p className={`${THEME.textBody} mt-5 text-lg max-w-3xl leading-relaxed transition-colors duration-300`}>{subtitle}</p>}
    </div>
);

export default function AboutSenate() {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [expandedRole, setExpandedRole] = useState<number | null>(0);
    const [isDark, setIsDark] = useState<boolean>(false);

    // CSS Variables for dynamic styling
    const themeStyles = `
        .senate-app {
            --background: #F9FAFB;
            --foreground: #0f172a;
            --card: #ffffff;
            --card-border: #e2e8f0;
            --muted: #64748b;
            --muted-foreground: #475569;
            --primary: #252864;
            --primary-foreground: #ffffff;
            --primary-text: #252864;
            --secondary: #C9B25A;
            --secondary-text: #C9B25A;
            --accent-green: #15008b;
            --accent-red: #C4122C;
            --hover-overlay: rgba(0,0,0,0.05);
        }
        .senate-app.dark-theme {
            --background: #020617;
            --foreground: #f8fafc;
            --card: #0f172a;
            --card-border: #1e293b;
            --muted: #94a3b8;
            --muted-foreground: #cbd5e1;
            --primary: #15173e; 
            --primary-foreground: #ffffff;
            --primary-text: #ffffff;
            --secondary: #C9B25A;
            --secondary-text: #d4c178;
            --accent-green: #00b359;
            --accent-red: #e62240;
            --hover-overlay: rgba(255,255,255,0.05);
        }
    `;

    const roles = [
        {
            title: "Representing Counties",
            icon: <Globe className={THEME.primaryText} />,
            desc: "The primary mandate of the Senate is to represent the counties and serve to protect the interests of the counties and their governments. It is a vital organ for devolution."
        },
        {
            title: "Law-making",
            icon: <Gavel className={THEME.primaryText} />,
            desc: "Participates in the law-making function of Parliament by considering, debating, and approving Bills concerning counties."
        },
        {
            title: "Revenue Allocation",
            icon: <Scale className={THEME.primaryText} />,
            desc: "Determines the allocation of national revenue among counties, as provided in Article 217, and exercises oversight over national revenue allocated to the county governments."
        },
        {
            title: "Oversight & Impeachment",
            icon: <ShieldCheck className={THEME.primaryText} />,
            desc: "Participates in the oversight of State officers. Has powers to determine any resolution to remove the President, Deputy President, County Governors, and Deputy Governors from office."
        }
    ];

    return (
        <div className={`senate-app min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[var(--secondary)] selection:text-[var(--primary-foreground)] transition-colors duration-300 ${isDark ? 'dark-theme' : ''}`}>
            <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
            
            {}
            <div className={`relative bg-[#252864] overflow-hidden shadow-xl`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C9B25A] via-transparent to-transparent"></div>
                
                {/* Theme Toggle Button positioned in top right */}
                <div className="absolute top-6 right-6 z-20">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-[#C9B25A] transition-all duration-300 flex items-center justify-center shadow-lg"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C9B25A]/40 text-[#C9B25A] text-sm font-bold mb-6 uppercase tracking-widest backdrop-blur-sm shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#C9B25A] animate-pulse"></span>
                            Jamhuri ya Kenya
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                            The Senate of the <br className="hidden md:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9B25A] to-[#E3CE7B]">Republic of Kenya</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mb-8 leading-relaxed font-light">
                            Bunge la Seneti la Kenya. The Parliament of Kenya, established to protect devolution, represent counties, and uphold the constitutional rule of law.
                        </p>
                    </div>
                    
                    <div className="flex-shrink-0 relative group">
                            {/* <div className="absolute inset-0 bg-[#C9B25A] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="w-64 h-64 md:w-80 md:h-80 relative bg-[var(--card)] rounded-full p-6 shadow-2xl flex items-center justify-center border-4 border-[#C9B25A]/80 z-10 hover:scale-105 transition-all duration-500 ease-out"> */}
                             <img 
                                src="parliament_emblem.png" 
                                alt="Parliament of Kenya Emblem" 
                                className="w-full h-auto object-contain drop-shadow-xl"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement?.insertAdjacentHTML('beforeend', '<div class="text-6xl text-[#252864]">🏛️</div>');
                                }}
                            />
                        {/* </div> */}
                    </div>
                </div>
                
                {/* Decorative Kenyan Flag bottom trim */}
                <div className="h-3 w-full flex shadow-inner">
                    <div className="w-1/3 bg-black"></div>
                    <div className="w-1/3 bg-[#C4122C]"></div>
                    <div className="w-1/3 bg-[#15008b]"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className={`flex overflow-x-auto no-scrollbar border-b ${THEME.borderLight} transition-colors duration-300`}>
                    <TabButton 
                        id="overview" 
                        label="Overview & Role" 
                        icon={<Landmark size={20} />} 
                        isActive={activeTab === 'overview'} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="history" 
                        label="History" 
                        icon={<History size={20} />} 
                        isActive={activeTab === 'history'} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="leadership" 
                        label="Leadership" 
                        icon={<Users size={20} />} 
                        isActive={activeTab === 'leadership'} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="committees" 
                        label="Committees" 
                        icon={<Network size={20} />} 
                        isActive={activeTab === 'committees'} 
                        onClick={setActiveTab} 
                    />
                    <TabButton 
                        id="symbols" 
                        label="Symbols & Traditions" 
                        icon={<Award size={20} />} 
                        isActive={activeTab === 'symbols'} 
                        onClick={setActiveTab} 
                    />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
                
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className={`${THEME.bgCard} p-8 rounded-3xl shadow-sm border ${THEME.borderLight} border-t-4 border-t-[var(--secondary)] hover:shadow-md transition-all duration-300 group`}>
                                <div className="h-12 w-12 bg-[var(--secondary)]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--secondary)] group-hover:text-[var(--primary-foreground)] transition-colors duration-500">
                                    <Target className="text-[var(--secondary)] group-hover:text-[var(--primary-foreground)] transition-colors duration-500" size={28} />
                                </div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} mb-4 transition-colors duration-300`}>Our Vision</h3>
                                <p className={`${THEME.textBody} leading-relaxed text-lg transition-colors duration-300`}>
                                    To be a responsive and independent Senate that protects the legacy of devolution and promotes the equitable, sustainable development of all counties in Kenya.
                                </p>
                            </div>
                            <div className={`${THEME.bgCard} p-8 rounded-3xl shadow-sm border ${THEME.borderLight} border-t-4 border-t-[var(--primary)] hover:shadow-md transition-all duration-300 group`}>
                                <div className="h-12 w-12 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors duration-500">
                                    <Eye className="text-[var(--primary-text)] group-hover:text-[var(--primary-foreground)] transition-colors duration-500" size={28} />
                                </div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} mb-4 transition-colors duration-300`}>Our Mission</h3>
                                <p className={`${THEME.textBody} leading-relaxed text-lg transition-colors duration-300`}>
                                    To serve the people of Kenya by diligently exercising our legislative, oversight, and representational authority to ensure the enduring success of devolution.
                                </p>
                            </div>
                        </div>

                        <SectionHeading 
                            title="Mandate and Powers" 
                            subtitle="The Senate serves as the crucial link between the National Government and the 47 County Governments, ensuring equitable development across the republic."
                        />

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-4">
                                {roles.map((role, idx) => (
                                    <div 
                                        key={idx}
                                        className={`${THEME.bgCard} border rounded-2xl overflow-hidden transition-all duration-300 ${expandedRole === idx ? 'shadow-md border-[var(--secondary)]' : `${THEME.borderLight} hover:border-[var(--muted)]`}`}
                                    >
                                        <button 
                                            onClick={() => setExpandedRole(expandedRole === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-lg transition-colors duration-300 ${expandedRole === idx ? 'bg-[var(--secondary)]/20' : 'bg-[var(--hover-overlay)]'}`}>
                                                    {role.icon}
                                                </div>
                                                <h3 className={`font-bold text-lg transition-colors duration-300 ${expandedRole === idx ? THEME.primaryText : 'text-[var(--foreground)]'}`}>
                                                    {role.title}
                                                </h3>
                                            </div>
                                            <ChevronDown className={`transition-transform duration-300 ${expandedRole === idx ? 'rotate-180 text-[var(--secondary)]' : 'text-[var(--muted)]'}`} />
                                        </button>
                                        <div 
                                            className={`transition-all duration-500 ease-in-out ${expandedRole === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                                        >
                                            <p className={`p-5 pt-0 ${THEME.textBody} border-t ${THEME.borderLight} bg-[var(--hover-overlay)] transition-colors duration-300`}>
                                                {role.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className={`${THEME.bgCard} rounded-3xl p-8 border ${THEME.borderLight} shadow-sm flex flex-col justify-center relative overflow-hidden transition-colors duration-300`}>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--hover-overlay)] rounded-bl-full -z-10 transition-colors duration-300"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--secondary)]/5 rounded-tr-full -z-10 transition-colors duration-300"></div>
                                
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} mb-6 flex items-center gap-3 transition-colors duration-300`}>
                                    <Users className="text-[var(--secondary)]" />
                                    Composition (67 Members)
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-[#252864] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-blue-900/20">47</div>
                                        <div>
                                            <h4 className="font-bold text-[var(--foreground)] text-lg transition-colors duration-300">Elected Senators</h4>
                                            <p className="text-[var(--muted-foreground)] text-sm transition-colors duration-300">One elected from each of the 47 counties</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-[#C9B25A] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-yellow-700/20">16</div>
                                        <div>
                                            <h4 className="font-bold text-[var(--foreground)] text-lg transition-colors duration-300">Women Representatives</h4>
                                            <p className="text-[var(--muted-foreground)] text-sm transition-colors duration-300">Nominated by political parties proportionally</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-[#15008b] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-green-900/20">2</div>
                                        <div>
                                            <h4 className="font-bold text-[var(--foreground)] text-lg transition-colors duration-300">Youth Representatives</h4>
                                            <p className="text-[var(--muted-foreground)] text-sm transition-colors duration-300">One male, one female</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-[#C4122C] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-red-900/20">2</div>
                                        <div>
                                            <h4 className="font-bold text-[var(--foreground)] text-lg transition-colors duration-300">PLWD Representatives</h4>
                                            <p className="text-[var(--muted-foreground)] text-sm transition-colors duration-300">Persons with disabilities (One male, one female)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <SectionHeading 
                            title="A Brief History" 
                            subtitle="The evolution of the Kenyan Senate reflects the nation's journey towards decentralization and robust democratic governance."
                        />
                        
                        <div className="relative border-l-4 border-[var(--secondary)] ml-4 md:ml-8 pl-8 py-4 space-y-12">
                            
                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-[#252864] rounded-full -left-[45px] top-1 border-4 border-[var(--background)] shadow-sm flex items-center justify-center transition-colors duration-300"></div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} transition-colors duration-300`}>1963 - Independence Senate</h3>
                                <p className={`mt-3 ${THEME.textBody} leading-relaxed ${THEME.bgCard} p-5 rounded-2xl border ${THEME.borderLight} shadow-sm transition-colors duration-300`}>
                                    Kenya's first constitution at independence established a bicameral legislature. The Senate was established primarily to protect the interests of the newly created regions (Majimbo system). It consisted of 41 Senators representing districts and one representing Nairobi.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-[#C4122C] rounded-full -left-[45px] top-1 border-4 border-[var(--background)] shadow-sm transition-colors duration-300"></div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} transition-colors duration-300`}>1966 - Abolition</h3>
                                <p className={`mt-3 ${THEME.textBody} leading-relaxed ${THEME.bgCard} p-5 rounded-2xl border ${THEME.borderLight} shadow-sm transition-colors duration-300`}>
                                    The Majimbo system faced strong opposition from the central government. In 1966, the Senate was abolished through a constitutional amendment, and its members were absorbed into a newly formed unicameral National Assembly. Kenya remained unicameral for over four decades.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-[#15008b] rounded-full -left-[45px] top-1 border-4 border-[var(--background)] shadow-sm transition-colors duration-300"></div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} transition-colors duration-300`}>2010 - Rebirth in the New Constitution</h3>
                                <p className={`mt-3 ${THEME.textBody} leading-relaxed ${THEME.bgCard} p-5 rounded-2xl border ${THEME.borderLight} shadow-sm transition-colors duration-300`}>
                                    The promulgation of the Constitution of Kenya 2010 reintroduced a bicameral Parliament. The new Senate was reborn with a specific mandate to serve as the pillar of devolution, protecting the 47 newly established County Governments and ensuring resources are shared equitably.
                                </p>
                            </div>
                             
                             <div className="relative">
                                <div className="absolute w-6 h-6 bg-[#C9B25A] rounded-full -left-[45px] top-1 border-4 border-[var(--background)] shadow-sm transition-colors duration-300"></div>
                                <h3 className={`text-2xl font-bold ${THEME.primaryText} transition-colors duration-300`}>2013 - 11th Parliament Convenes</h3>
                                <p className={`mt-3 ${THEME.textBody} leading-relaxed ${THEME.bgCard} p-5 rounded-2xl border ${THEME.borderLight} shadow-sm transition-colors duration-300`}>
                                    Following the 2013 general elections, the modern Senate officially convened, marking the operationalization of the devolved government system in Kenya.
                                </p>
                            </div>

                        </div>
                    </div>
                )}

                {activeTab === 'leadership' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <SectionHeading 
                            title="Senate Leadership" 
                            subtitle="The leaders tasked with guiding the legislative agenda, ensuring order, and managing the administration of the Senate."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {SENATE_LEADERS.map((leader, index) => (
                                <div key={index} className={`${THEME.bgCard} rounded-3xl overflow-hidden shadow-sm border ${THEME.borderLight} hover:shadow-xl transition-all duration-300 group flex flex-col h-full`}>
                                    <div className={`h-24 ${leader.themeColor} relative`}>
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                                    </div>
                                    <div className="px-6 pb-6 pt-0 relative flex-grow flex flex-col items-center text-center">
                                        <div className={`w-28 h-28 mx-auto -mt-14 mb-4 rounded-full border-4 border-[var(--card)] shadow-lg overflow-hidden bg-[var(--hover-overlay)] z-10 group-hover:scale-105 transition-all duration-300`}>
                                             <img 
                                                src={leader.image} 
                                                alt={leader.name} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=334155&color=fff&size=256`;
                                                }}
                                            />
                                        </div>
                                        <h3 className={`text-xl font-bold text-[var(--foreground)] mb-1 transition-colors duration-300`}>{leader.name}</h3>
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${leader.themeColor} text-white shadow-sm`}>
                                            {leader.role}
                                        </div>
                                        <p className={`${THEME.textBody} text-sm leading-relaxed mt-2 transition-colors duration-300`}>
                                            {leader.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'committees' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <SectionHeading 
                            title="The Engine Room of the Senate" 
                            subtitle="Committees are the core structural mechanisms where detailed legislative work, public participation, investigations, and oversight take place."
                        />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                            <div className="bg-[#252864] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700"></div>
                                <Briefcase size={40} className="mb-6 text-[#C9B25A]" />
                                <h3 className="text-2xl font-bold mb-4">Standing Committees</h3>
                                <p className="text-blue-100 leading-relaxed text-sm">
                                    Permanent committees responsible for considering bills, investigating matters of public interest, and overseeing specific government ministries and departments related to devolved functions.
                                </p>
                            </div>
                            
                            <div className="bg-[#15008b] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700"></div>
                                <Target size={40} className="mb-6 text-[#C9B25A]" />
                                <h3 className="text-2xl font-bold mb-4">Select & Ad-hoc</h3>
                                <p className="text-green-50 leading-relaxed text-sm">
                                    Specialized committees established for a limited time to address specific, pressing issues or to investigate particular matters, such as impeachments or emergency national crises.
                                </p>
                            </div>
                            
                            <div className="bg-[#C4122C] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-150 transition-transform duration-700"></div>
                                <BookOpen size={40} className="mb-6 text-[#C9B25A]" />
                                <h3 className="text-2xl font-bold mb-4">Sessional Committees</h3>
                                <p className="text-red-50 leading-relaxed text-sm">
                                    Committees appointed at the beginning of each parliamentary session, handling administrative, procedural, and internal matters of the Senate such as House Business and Public Accounts.
                                </p>
                            </div>
                        </div>

                        <div className={`${THEME.bgCard} rounded-3xl border ${THEME.borderLight} p-8 shadow-sm transition-colors duration-300`}>
                            <h3 className={`text-xl font-bold ${THEME.primaryText} mb-6 border-b ${THEME.borderLight} pb-4 transition-colors duration-300`}>Key Oversight Committees</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "County Public Accounts and Investments Committee (CPAIC)",
                                    "Committee on Devolution and Intergovernmental Relations",
                                    "Committee on National Security, Defence and Foreign Relations",
                                    "Committee on Finance and Budget",
                                    "Committee on Health",
                                    "Committee on Justice, Legal Affairs and Human Rights",
                                    "Committee on Agriculture, Livestock and Fisheries",
                                    "Committee on Education"
                                ].map((committee, idx) => (
                                    <div key={idx} className={`flex items-center gap-3 p-4 bg-[var(--hover-overlay)] rounded-xl hover:bg-[var(--card-border)] transition-all border border-transparent cursor-default duration-300`}>
                                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--secondary)] flex-shrink-0"></div>
                                        <span className="font-medium text-[var(--foreground)] text-sm md:text-base transition-colors duration-300">{committee}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'symbols' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <SectionHeading 
                            title="Symbols of Authority" 
                            subtitle="The traditions, emblems, and artifacts that embody the power, dignity, and historical continuity of the Senate."
                        />

                        <div className="mt-12 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1 w-full relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-3xl transform rotate-3 scale-105 transition-colors duration-300"></div>
                                <div className={`${THEME.bgCard} p-8 rounded-3xl border ${THEME.borderLight} shadow-xl relative z-10 flex flex-col items-center justify-center min-h-[400px] overflow-hidden transition-colors duration-300`}>
                                    
                                    {/* CSS Illustrated Mace */}
                                    <div >
                                        {/* Mace Head */}
                                        <Image
                                            src="/mace.png"
                                            alt="Senate Mace"
                                            width={1200}
                                            height={400}
                                            className="object-contain"
                                        />
                                        
                                        {/* Mace Base */}
                                        {/* <div className="w-10 h-14 md:w-12 md:h-16 bg-gradient-to-br from-[#C9B25A] to-[#998132] rounded-lg absolute -right-2 shadow-lg z-10 border-l border-white/30"></div> */}
                                    </div>
                                    
                                    <h3 className={`text-3xl font-extrabold ${THEME.primaryText} mb-2 mt-4 text-center transition-colors duration-300`}>The Senate Mace</h3>
                                    <p className="text-center text-[var(--secondary)] font-bold tracking-widest uppercase text-sm mb-2">Symbol of Constitutional Authority</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className={`${THEME.bgCard} p-6 rounded-2xl border-l-4 border-[var(--primary)] shadow-sm hover:shadow-md transition-all duration-300`}>
                                    <h4 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2 transition-colors duration-300">
                                        <Award className="text-[var(--primary-text)] transition-colors duration-300" size={20} /> Supreme Authority
                                    </h4>
                                    <p className={`${THEME.textBody} leading-relaxed transition-colors duration-300`}>
                                        The Mace is the physical symbol of the authority of the Senate and the Speaker. The Senate cannot sit, and official business cannot be transacted, unless the Mace is present and placed on the central Table.
                                    </p>
                                </div>
                                <div className={`${THEME.bgCard} p-6 rounded-2xl border-l-4 border-[var(--secondary)] shadow-sm hover:shadow-md transition-all duration-300`}>
                                    <h4 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2 transition-colors duration-300">
                                        <Eye className="text-[var(--secondary)]" size={20} /> Design & Craftsmanship
                                    </h4>
                                    <p className={`${THEME.textBody} leading-relaxed transition-colors duration-300`}>
                                        Traditionally crafted from silver, gold plating, and precious elements. It intricately features the Coat of Arms and traditional carvings representing Kenya's agricultural wealth, natural heritage, and national unity.
                                    </p>
                                </div>
                                <div className={`${THEME.bgCard} p-6 rounded-2xl border-l-4 border-[#15008b] shadow-sm hover:shadow-md transition-all duration-300`}>
                                    <h4 className="text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2 transition-colors duration-300">
                                        <ShieldCheck className="text-[#15008b]" size={20} /> The Procession
                                    </h4>
                                    <p className={`${THEME.textBody} leading-relaxed transition-colors duration-300`}>
                                        The Mace is carried into the Chamber by the Serjeant-at-Arms, preceding the Speaker. This solemn daily procession marks the official commencement and conclusion of parliamentary sittings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className={`bg-[#252864] pt-12 pb-8 mt-12 border-t-4 border-[#C9B25A]`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center">
                                <img src="parliament_emblem.png" alt="Emblem" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Senate of Kenya</h3>
                                <p className="text-blue-200 text-sm">Parliament Buildings, Nairobi</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="text-blue-200 hover:text-[#C9B25A] transition-colors flex items-center gap-1 text-sm font-medium">
                                <ExternalLink size={16} /> Official Website
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-blue-900/50 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-blue-300 text-sm">
                        <p>&copy; {new Date().getFullYear()} The Senate, Parliament of Kenya. All rights reserved.</p>
                        <p className="mt-2 md:mt-0">Designed for Devolution.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}