import Link from 'next/link';
import {
  MapPin, Users, Calendar, ArrowRight, ChevronRight,
  Building2, Scale, Globe, Shield, BookOpen, Mic2,
} from 'lucide-react';
import Image from 'next/image';

const stats = [
  { value: '67', label: 'Senators', icon: Users },
  { value: '47', label: 'Counties', icon: MapPin },
  { value: '4', label: 'Sessions Held', icon: Calendar },
  { value: '2018', label: 'Year Established', icon: Building2 },
];

const sessions = [

  {
    number: '1st',
    county: 'Uasin Gishu County',
    year: '24–28 Sep 2018',
    highlight: 'The first Senate plenary and committee sittings held away from Nairobi, with public participation and inspection of national and county government projects.',
    color: 'bg-teal-700',
    region: 'Rift Valley',
    img: '/sessions_images/uasin_gishu_session.jpg',
  },
    {
    number: '2nd',
    county: 'Kitui County',
    year: '16–20 Sep 2019',
    highlight: 'Three plenary sittings, committee business, public invitations, broadcasting, and county-assembly capacity building documented in the official planning report.',
    color: 'bg-blue-600',
    region: 'Eastern Kenya',
    img: '/sessions_images/kitui_session.jpg',
  },
  {
    number: '3rd',
    county: 'Turkana County',
    year: '25–29 Sep 2023',
    highlight: 'Four plenary sittings and nine committees covered irrigation, energy, border security, community land, county accounts, and public awareness.',
    color: 'bg-amber-600',
    region: 'Northern Kenya',
    img: '/sessions_images/turkana_session.jpg',
  },
  {
    number: '4th',
    county: 'Busia County',
    year: '6–10 Oct 2025',
    highlight: 'Four plenary sittings, a constitutional-amendment town hall, public submissions, fisheries and border inspections, and county oversight.',
    color: 'bg-blue-600',
    region: 'Western Kenya',
    img: '/sessions_images/busia_session.jpg',
  },
];

const principles = [
  {
    icon: Scale,
    title: 'County Oversight',
    desc: 'Senators conduct on-the-ground audits of devolved funds, exposing white elephant projects invisible from Nairobi boardrooms.',
  },
  {
    icon: Globe,
    title: 'Inclusive Lawmaking',
    desc: 'Legislation is crafted from lived realities — directly inspired by what Senators witness in the field, yielding empirically grounded policy.',
  },
  {
    icon: Shield,
    title: 'Accountability',
    desc: 'Physical presence bypasses bureaucratic delays in OAG and COB reports, enabling immediate corrective action on devolved fund misuse.',
  },
  {
    icon: BookOpen,
    title: 'Capacity Building',
    desc: 'County Assembly Members (MCAs) absorb best practices through direct interaction with national parliamentarians and legal drafters.',
  },
  {
    icon: Mic2,
    title: 'Public Participation',
    desc: 'Citizens engage their Senators in their own communities — petitioning, presenting memoranda, and debating issues affecting their daily lives.',
  },
  {
    icon: Users,
    title: 'Community Identity',
    desc: "Marginalised regions gain national recognition. The periphery is affirmed as equally vital to the republic as the capital, Nairobi.",
  },
];

const news = [
  {
    title: '4th Senate Mashinani concludes in Busia County',
    date: '6–10 October 2025',
    summary: 'The Busia sitting combined plenary business with a town hall on the Constitution of Kenya (Amendment) Bill, public submissions, fisheries oversight, and a Malaba border-post follow-up.',
    tag: 'Session Update',
  },
  {
    title: 'Senators adopt Standing Order 265A — Mashinani formalised',
    date: 'Article 126(1)',
    summary: 'The Constitution permits either House of Parliament to sit at any place within Kenya, the legal basis used for the Senate’s county sittings.',
    tag: 'Policy',
  },
  {
    title: 'Mung Beans Bill becomes law after Kitui session',
    date: '16–20 September 2019',
    summary: 'Kitui’s official planning report records the plenary, committee, public-invitation, broadcasting, logistics, and county-assembly coordination behind the second sitting.',
    tag: 'Legislation',
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#081730] text-white">
        <Image
          src="/senate_sitting.jpg"
          alt="Senators gathered during a Senate Mashinani sitting"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,23,48,0.98)_0%,rgba(8,23,48,0.82)_42%,rgba(8,23,48,0.2)_100%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#F3B664]">
              <span className="h-px w-10 bg-[#F3B664]" /> Senate at the grassroots
            </p>
            <h1 className="max-w-xl font-serif text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Devolution in action. <br /> <p className="mt-4 text-lg font-semibold">Taking leadership to the grassroots.</p>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Senate Mashinani brings Kenya&apos;s upper house beyond Nairobi, turning devolution into a public, lived practice across the country&apos;s 47 counties.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/sessions/kilifi-programme" className="inline-flex items-center gap-2 bg-[#F3B664] px-5 py-3 text-sm font-bold text-[#081730] transition-transform hover:-translate-y-0.5 hover:bg-[#ffd08d]">
                Explore the sessions <ArrowRight size={16} />
              </Link>
              <Link href="/faq" className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10">
                Read the FAQs <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,#000_0%,#000_33%,#CE1126_33%,#CE1126_66%,#006600_66%)]" />
      </section>

    <section id="about" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              What is <span className="text-blue-900">Senate Mashinani?</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                &quot;Senate Mashinani&quot; translates to &quot;Senate at the Grassroots.&quot; It is a landmark initiative where the entire Kenyan Senate temporarily relocates from the capital city, Nairobi, to conduct its sittings in one of the country&apos;s 47 counties.
              </p>
              <p>
                Grounded in Article 126 (1) of the Kenyan Constitution, which allows either house of Parliament to hold sessions outside Nairobi, this initiative is a powerful demonstration of the Senate&apos;s commitment to devolution.
              </p>
              <ul className="space-y-4 mt-6">
                {[
                  "Plenary and Committee sittings held locally",
                  "Direct engagement with citizens on regional issues",
                  "Assessment of local county infrastructure and assemblies",
                  "Promotion of transparency and democratic innovation"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-700 flex-shrink-0">
                      <Scale className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square  bg-slate-100 rounded-3xl overflow-hidden relative shadow-2xl border border-gray-100">
              {/* Placeholder for an image of the Senate in session */}
              <div className="  flex flex-col justify-center items-center text-white  text-center">
                <Image src="/sessions_images/turkana_plenary_chamber.jpg" alt="Senate Mashinani Session" layout="fill" objectFit="cover" className="bg-white" />
                {/* <h3 className="text-2xl font-bold mb-2">Connecting Lawmakers</h3>
                <p className="text-emerald-100 bg-blue-900 p-2 rounded-lg border border-blue-800 z-10">Meeting the people where they are.</p> */}
              </div>
            </div>
            
            {/* Decorative stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Public Participation</p>
                  <p className="text-xl font-bold text-slate-900">Direct Citizen Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[var(--foreground)]">{stat.value}</p>
              <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is Mashinani */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3 ">The Initiative</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-6 leading-tight font-serif ">
              Devolution in Action
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              The Senate Mashinani initiative, formally codified in Standing Order 265A, mandates the Senate to hold at least one sitting outside Nairobi per calendar year. It operationalises Kenya&apos;s 2010 Constitution&apos;s transformative devolution framework by physically relocating the nation&apos;s upper legislative chamber to a host county.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              When 67 Senators, along with clerks, Hansard reporters, IT specialists, security staff, and support personnel descend on a county, they bypass delayed audit reports and witness first-hand the gaps between documented expenditures and physical reality.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:gap-3 transition-all"
            >
              Learn more about the Senate <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {principles.slice(0, 4).map((p) => (
              <div key={p.title} className="card p-5 hover:border-[var(--primary)] transition-colors">
                <p.icon size={22} className="text-[var(--primary)] mb-3" />
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">{p.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
    <section id="sessions" className="py-24  relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 "></div>
              <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">Historical Record</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] leading-tight">
              Past Mashinani Plenaries
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-[var(--foreground)] font-bold hover:text-[var(--primary)] transition-colors group mt-4 md:mt-0">
            View full archive
            <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sessions.map((session) => (
            <div key={session.number} className="group rounded-3xl overflow-hidden bg-white text-[var(--foreground)] shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#0F2C59]/30 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <Image
                  src={session.img}
                  alt={`${session.county} Senate Mashinani session`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="z-0 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className={`absolute top-4 left-4 z-20 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide backdrop-blur-md shadow-sm ${session.color ? 'bg-[#F3B664] text-[#081730]' : 'bg-white/90 text-[#0F2C59]'}`}>
                  {session.number} Mashinani
                </div>
                <div className="absolute bottom-4 right-4 z-20 bg-[#0F2C59] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {session.year}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">{session.county}</h3>
                <p className="text-[#F3B664] font-bold text-xs mb-4 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {session.region}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  {session.highlight}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <span className="text-[#0F2C59] text-sm font-bold flex items-center group-hover:text-[#F3B664] transition-colors">
                    {/* Read Report <ArrowRight className="w-4 h-4 ml-2" /> */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Key Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Why It Matters</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">Core Objectives</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div key={p.title} className="card p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                <p.icon size={20} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-2">Latest</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">News &amp; Updates</h2>
            </div>
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:gap-3 transition-all"
            >
              All news <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.title} className="card p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{item.date}</span>
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="hero-gradient rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Have Questions About Senate Mashinani?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Find answers on the constitutional basis for Mashinani sittings, how host counties are chosen, and the impact of past sessions.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#F4C300] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200"
          >
            View FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

