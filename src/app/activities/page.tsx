import Link from 'next/link';
import { GraduationCap, BookOpen, School, CheckCircle2, Users, FileText, Building2, Globe2, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

const capacityPrograms = [
  {
    icon: GraduationCap,
    title: 'Internship Program',
    duration: '6 months',
    audience: 'University & diploma graduates',
    description:
      'Hosts 10 graduates for a 6-month period, selected through a competitive interview process conducted by the Senate Training Committee.',
    href: '/programs/internships-attachments',
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    title: 'Attachment Program',
    duration: '3 months',
    audience: 'Continuing undergraduate & diploma students',
    description:
      'Hosts a variable number of students for 3 months, with intake guided by the staffing needs of individual directorates and Senate Liaison Office recommendations.',
    href: '/programs/internships-attachments',
    color: 'text-teal-600',
    bg: 'bg-teal-500/10',
  },
  {
    icon: School,
    title: 'Voluntary Service Scheme',
    duration: '2 weeks',
    audience: 'High school students',
    description:
      'Short-term attachments giving high school students structured exposure to the roles, functions, and processes of the Senate.',
    href: '/programs/high-school-attachment',
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    icon: FileText,
    title: 'Public Petitions to the Senate',
    duration: 'Civic right',
    audience: 'Citizens & stakeholders',
    description: 'Learn how to prepare and submit a petition asking the Senate to take action on a matter within its mandate.',
    href: '/programs/public-petitions',
    color: 'text-red-600',
    bg: 'bg-red-500/10',
  },
  {
    icon: Building2,
    title: 'Equitable Sharing of Revenue',
    duration: 'County governance',
    audience: 'Citizens, counties & stakeholders',
    description: 'Explore the revenue-sharing formula for county governments and the growth of the equitable share under devolution.',
    href: '/programs/equitable-revenue-sharing',
    color: 'text-[var(--primary)]',
    bg: 'bg-[var(--primary)]/10',
  },
  {
    icon: BookOpen,
    title: 'County Legislation Tracker',
    duration: 'Online platform',
    audience: 'Citizens, county representatives & Senators',
    description: 'Monitor county bills and follow their progress through the legislative process across Kenya.',
    href: '/programs/county-legislation-tracker',
    color: 'text-teal-600',
    bg: 'bg-teal-500/10',
  },
  {
    icon: Building2,
    title: 'Local Benchmarking Visits',
    duration: 'Tailored visits',
    audience: 'Local institutions & delegations',
    description: 'Learn from parliamentary practice, exchange institutional experience, and strengthen service delivery.',
    href: '/programs/local-benchmarking',
    color: 'text-[var(--primary)]',
    bg: 'bg-[var(--primary)]/10',
  },
  {
    icon: Globe2,
    title: 'International Benchmarking',
    duration: 'Coordinated visits',
    audience: 'International delegations & institutions',
    description: 'Structured opportunities for global knowledge exchange with the Senate of Kenya.',
    href: '/programs/international-benchmarking',
    color: 'text-sky-600',
    bg: 'bg-sky-500/10',
  },
  {
    icon: FileText,
    title: 'Public Participation',
    duration: 'Civic engagement',
    audience: 'Citizens & stakeholders',
    description: 'Make your views heard in Senate laws, policies, and matters that affect you.',
    href: '/programs/public-participation',
    color: 'text-red-600',
    bg: 'bg-red-500/10',
  },
];

const structure = [
  'Onboarding support: badges, lunch, stipend, and documentation (agreement forms, log books, Constitution of Kenya).',
  'Daily attendance and monthly progress/welfare meetings.',
  'Exposure to devolution through lectures and stakeholder visits (COG, IGRTC, County Assemblies, CRA, among others).',
  'Research assignments on topical issues.',
  'Exit meetings, recommendation letters, and an official graduation ceremony.',
  'Established alumni network with continuous engagement for 2 years after completion.',
];

const vssHighlights = [
  'Understand the roles and functions of the Senate.',
  'Interact with Senators and key departments.',
  'Gain practical experience in parliamentary processes and governance.',
  'Tour Parliament buildings and observe live proceedings in both chambers.',
  'Participate in mentorship sessions and courtesy calls with senior officials.',
];

const impact = [
  'Enhances understanding of legislation, democracy, and devolved governance.',
  'Builds career awareness and parliamentary exposure.',
  'Fosters leadership, discipline, and civic responsibility.',
  'Strengthens the pipeline of young Kenyans equipped to engage with public institutions.',
];

export default function ProgramsPage() {
  return (
    <div>
      <PageHero
        badge="Capacity Development"
        title="Senate Liaison Office Programmes"
        description="Explore learning, civic engagement, and institutional exchange programmes coordinated by the Senate Liaison Office under the Office of the Clerk of the Senate."
        imageLabel="Add programmes cohort image"
      />

      {/* Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Pathways</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Explore Our Programmes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {capacityPrograms.map((program) => (
            <Link key={program.title} href={program.href} className="card p-7 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className={`w-12 h-12 rounded-lg ${program.bg} flex items-center justify-center mb-5`}>
                <program.icon size={22} className={program.color} />
              </div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[var(--foreground)]">{program.title}</h3>
                <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                  {program.duration}
                </span>
              </div>
              <p className="text-xs font-medium text-[var(--muted)] mb-4">{program.audience}</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{program.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Program Structure */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Internship &amp; Attachment</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">Standard Program Structure</h2>
            <ul className="space-y-4">
              {structure.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <CheckCircle2 size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Voluntary Service Scheme</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">High School Attachment</h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              A structured two-week attachment giving high school students an opportunity to learn, observe, and gain practical exposure within the Senate of Kenya. All public and private high school students are eligible to apply through an official request letter to the Office of the Clerk of the Senate.
            </p>
            <ul className="space-y-3">
              {vssHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Outcomes</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Programme Impact</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impact.map((item, i) => (
            <div key={i} className="card p-5 flex items-start gap-3">
              <Users size={18} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--muted)] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
            <FileText size={20} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">How to Apply</h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            Interested applicants and institutions should write to the Office of the Clerk of the Senate. Internship openings are advertised publicly and selected through the Senate Training Committee&apos;s competitive process.
          </p>
          <a
            href="mailto:clerk.senate@parliament.go.ke"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            clerk.senate@parliament.go.ke
          </a>
        </div>
      </section>
    </div>
  );
}
