import Link from 'next/link';
import { Scale, Users, BookOpen, Building2, ChevronRight } from 'lucide-react';

const roles = [
  {
    icon: Scale,
    title: 'Law-Making',
    description:
      'The Senate considers, debates, and approves Bills concerning county governments. It passes Bills that affect the functions, powers, elections, finances, and governance of the 47 county governments.',
  },
  {
    icon: Users,
    title: 'Revenue Allocation',
    description:
      'The Senate determines, by resolution, the basis for allocating among the counties the share of national revenue annually allocated to the county level of government under Article 217 of the Constitution.',
  },
  {
    icon: Building2,
    title: 'Oversight',
    description:
      'The Senate exercises oversight over national revenue allocated to county governments, ensuring funds are properly utilised and holding county executives accountable through committee interrogations and Mashinani audits.',
  },
  {
    icon: BookOpen,
    title: 'Impeachment',
    description:
      'The Senate plays a pivotal role in the impeachment of the President, Deputy President, Governors, and the Senate Speaker/Deputy Speaker — safeguarding constitutional governance.',
  },
];

const membership = [
  { category: 'County Senators', count: '47', note: 'One elected senator per county constituency' },
  { category: 'Nominated Women', count: '16', note: 'Nominated by political parties per Article 90' },
  { category: 'Youth Representatives', count: '2', note: 'One man and one woman' },
  { category: 'PWD Representatives', count: '2', note: 'One man and one woman' },
  { category: 'The Speaker', count: '1', note: 'Ex officio member' },
];

const timeline = [
  { year: '1963', event: 'First Senate established at Kenya\'s independence, comprising elected and nominated members.' },
  { year: '1966', event: 'Senate abolished and merged with the National Assembly under single-chamber parliament.' },
  { year: '2010', event: 'The new Constitution of Kenya re-establishes the Senate as the upper chamber to protect devolution and county interests.' },
  { year: '2013', event: 'First sitting of the reconstituted 12th Senate under the 2010 constitutional framework.' },
  { year: '2022', event: 'Standing Order 265A formally codified: Senate mandated to hold at least one sitting outside Nairobi annually.' },
  { year: '2022', event: '1st Senate Mashinani held in Kitui County — the Mung Beans Bill is passed.' },
  { year: '2025', event: '4th Senate Mashinani completed in Busia County, October 2025.' },
  { year: '2026', event: '5th Senate Mashinani to be held in Kilifi County, September 2026.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#F4C300] uppercase tracking-widest mb-3">About</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">The Kenya Senate</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            The Senate is the upper chamber of Kenya&apos;s bicameral Parliament, established under Article 93 of the 2010 Constitution to represent the counties and protect the interests of devolved governance.
          </p>
        </div>
      </section>

      {/* Historical Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">History</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Historical Background</h2>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              Prior to independence, legislation in Kenya was wholly enacted in the United Kingdom and conveyed in the form of royal instructions — Orders-in-Council. At independence in 1963, Kenya established its first bicameral Parliament including a Senate. However, in 1966, the Senate was abolished and merged into a unicameral National Assembly.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-5">
              The transformative 2010 Constitution of Kenya re-established the Senate as the upper chamber of a reconstituted bicameral Parliament. Unlike the pre-1966 Senate, the modern Senate has a clear and robust mandate: to represent and protect the interests of the 47 county governments created by the devolution framework.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Under Article 96, the Senate serves to protect county interests, participate in law-making for counties, determine the allocation of national revenue among counties, and exercise oversight over devolved funds.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Key Milestones</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--card-border)]" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10">
                      {item.year.slice(-2)}
                    </div>
                    <div className="card p-4 flex-1">
                      <p className="text-xs font-bold text-[var(--primary)] mb-1">{item.year}</p>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Mandate</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Roles &amp; Functions</h2>
            <p className="text-[var(--muted)] mt-3 max-w-xl mx-auto text-sm">
              Article 96 of the Constitution provides the Senate&apos;s core functions within the constitutional framework.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.title} className="card p-7 hover:border-[var(--primary)] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <role.icon size={20} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">{role.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Composition</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Senate Membership</h2>
          <p className="text-[var(--muted)] mt-3 text-sm max-w-lg mx-auto">
            Under Article 98 of the Constitution, the Senate consists of 67 members representing a diverse cross-section of Kenyan society.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {membership.map((m) => (
            <div key={m.category} className="card p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--foreground)]">{m.category}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{m.note}</p>
              </div>
              <span className="text-2xl font-bold text-[var(--primary)]">{m.count}</span>
            </div>
          ))}
          <div className="card p-5 flex items-center justify-between gap-4 border-[var(--primary)]">
            <p className="font-bold text-[var(--foreground)]">Total Members</p>
            <span className="text-2xl font-bold text-[var(--primary)]">67</span>
          </div>
        </div>
      </section>

      {/* Constitutional Basis */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Legal Basis</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Constitutional Foundation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { article: 'Art. 93', desc: 'Establishment of Parliament' },
              { article: 'Art. 96', desc: 'Role of the Senate' },
              { article: 'Art. 98', desc: 'Membership of the Senate' },
              { article: 'Art. 110–113', desc: 'Bills concerning county governments' },
              { article: 'Art. 217', desc: 'Revenue sharing formula' },
              { article: 'Art. 256', desc: 'Constitutional amendments' },
            ].map((item) => (
              <div key={item.article} className="card p-4">
                <p className="font-bold text-[var(--primary)] mb-1">{item.article}</p>
                <p className="text-[var(--muted)] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/sessions"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:gap-3 transition-all"
            >
              Explore Mashinani Plenaries <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
