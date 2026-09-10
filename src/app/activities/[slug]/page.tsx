import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { getProgramme, programmeEntries } from '../programme-data';

type ProgrammePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programmeEntries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProgrammePageProps): Promise<Metadata> {
  const programme = getProgramme((await params).slug);
  return { title: programme ? `${programme.title} | Senate Mashinani` : 'Programme | Senate Mashinani' };
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const programme = getProgramme((await params).slug);
  if (!programme) notFound();
  const Icon = programme.icon;

  return (
    <div>
      <section className="hero-gradient px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F4C300]">{programme.category}</p>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl">{programme.title}</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/75">{programme.intro}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-lg ${programme.iconBackground}`}><Icon size={26} className={programme.iconColor} /></div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">The Senate Liaison Office coordinates this programme under the Office of the Clerk of the Senate.</p>
            <a href="mailto:clerk.senate@parliament.go.ke" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"><Mail size={16} /> Contact the Clerk of the Senate</a>
          </aside>
          <div className="space-y-10">
            {programme.sections.map((section) => <div key={section.title}><h2 className="mb-5 text-2xl font-bold text-[var(--foreground)]">{section.title}</h2><ul className="space-y-3">{section.items.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--muted)]"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--primary)]" />{item}</li>)}</ul></div>)}
          </div>
        </div>
      </section>
      {programme.steps && <section className="border-y border-[var(--card-border)] bg-[var(--card)] py-16"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--primary)]">Getting started</p><h2 className="mb-8 text-3xl font-bold text-[var(--foreground)]">How it works</h2><div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">{programme.steps.map((step, index) => <div key={step.title} className="card p-5"><p className="mb-3 text-sm font-bold text-[var(--primary)]">0{index + 1}</p><h3 className="mb-2 text-sm font-bold text-[var(--foreground)]">{step.title}</h3><p className="text-xs leading-relaxed text-[var(--muted)]">{step.description}</p></div>)}</div></div></section>}
      <section className="mx-auto flex max-w-6xl justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8"><Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"><ArrowLeft size={16} /> All programmes</Link>{programme.contact && <a href={programme.contact} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline">Open County Legislation Tracker <ArrowUpRight size={16} /></a>}</section>
    </div>
  );
}