import { Globe, Users, Building2, ShieldCheck, MessageSquare, Handshake, ClipboardList, Mail } from 'lucide-react';

const localSteps = [
  { step: '01', title: 'Submit a Request', desc: 'Send an introductory letter to the Clerk of the Senate requesting a benchmarking opportunity.' },
  { step: '02', title: 'Request Review', desc: 'The request is reviewed and forwarded to the Senate Liaison Office (SLO).' },
  { step: '03', title: 'Programme Development', desc: 'The SLO coordinates with relevant Senate departments and develops the visit programme.' },
  { step: '04', title: 'Confirmation & Facilitation', desc: 'The visit is confirmed and the delegation receives the programme and logistics information.' },
  { step: '05', title: 'Visit & Feedback', desc: 'The delegation undertakes the programme and provides feedback to support continuous improvement.' },
];

const localIncludes = [
  { icon: Building2, title: 'Departmental Engagements', desc: 'Meet relevant Senate offices and directorates.' },
  { icon: Globe, title: 'Parliamentary Orientation', desc: 'Gain an understanding of parliamentary institutional practices and procedures.' },
  { icon: Users, title: 'Parliament Tour', desc: 'Experience key facilities and parliamentary spaces, including the Speaker\u2019s gallery.' },
  { icon: ShieldCheck, title: 'Protocol & Access', desc: 'Coordinated access, security, and visitor arrangements.' },
  { icon: Handshake, title: 'Knowledge Exchange', desc: 'Share experiences and explore practical institutional lessons.' },
];

const whyBenchmark = [
  'Gain exposure to Parliament procedures, practices, and institutional operations.',
  'Engage with Senators and Senate staff to gain practical insights.',
  'Explore approaches that can inform your own institution\u2019s practices.',
  'Build institutional connections for knowledge sharing and peer learning.',
  'Receive a tailored programme structured around your delegation\u2019s objectives and areas of interest.',
];

const internationalFunctions = [
  'Receiving and processing requests from international delegations.',
  'Liaising with relevant Senate directorates and departments.',
  'Scheduling and confirming benchmarking visits.',
  'Planning and preparing official communication, logistics notes, and study-visit programmes.',
  'Coordinating with key departments: security, protocol, transport, catering, and public communications.',
];

const internationalValue = [
  'Exposure to parliamentary practices, procedures, and institutional models from other jurisdictions.',
  'Opportunities for knowledge exchange and learning from international parliamentary institutions.',
  'Engagement with Senators, parliamentary officials, and relevant institutions to exchange experiences and best practices.',
  'Opportunities to establish and strengthen professional and institutional networks with international counterparts.',
];

export default function BenchmarkingPage() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#F4C300] uppercase tracking-widest mb-3">Knowledge Exchange</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Benchmarking Visits</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Learning from Parliament. Sharing institutional practice. Strengthening service delivery. The Senate Liaison Office (SLO) coordinates local and international delegations seeking to learn from the Senate of Kenya.
          </p>
        </div>
      </section>

      {/* Local Visits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Local Visits</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">How Benchmarking Visits Work</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {localSteps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h3>
                  <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localIncludes.map((item) => (
              <div key={item.title} className="card p-5">
                <item.icon size={20} className="text-[var(--primary)] mb-3" />
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Benchmark */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Why Benchmark Here?</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Value of Benchmarking at the Senate</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyBenchmark.map((item) => (
              <div key={item} className="card p-5 flex items-start gap-3">
                <Handshake size={18} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Visits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">International Visits</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Facilitating International Delegations</h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              The SLO serves as the main coordination department for international delegations and institutions seeking benchmarking opportunities with the Senate of Kenya, working closely with embassies, the Ministry of Foreign Affairs, and other institutions to ensure proper protocol, security, and smooth facilitation.
            </p>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <ClipboardList size={14} /> Core Functions
            </h3>
            <ul className="space-y-2">
              {internationalFunctions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card bg-slate-900 dark:bg-blue-950/40 text-white border-transparent dark:border-blue-900/50 p-8">
            <h3 className="text-xl font-bold tracking-tight mb-6">Value of International Benchmarking</h3>
            <ul className="space-y-4">
              {internationalValue.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Globe size={18} className="text-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={20} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Ready to Engage With the Senate?</h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            The SLO collects feedback from delegations on exit to support continuous improvement of the programme and looks forward to your engagement.
          </p>
          <a
            href="mailto:clerk.senate@parliament.go.ke"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            <Mail size={14} /> clerk.senate@parliament.go.ke
          </a>
        </div>
      </section>
    </div>
  );
}
