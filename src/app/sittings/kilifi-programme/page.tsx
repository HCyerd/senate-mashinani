import Link from 'next/link';
import { ArrowLeft, CalendarDays, Camera, Clock3, MapPin } from 'lucide-react';
import { kilifiProgramme } from '../kilifi-programme';

export const metadata = {
  title: 'Kilifi Programme | Senate Mashinani',
  description: 'Detailed programme for the fifth Senate Mashinani sitting in Kilifi County, 19th to 26th September 2026.',
};

export default function KilifiProgrammePage() {
  return (
    <div>
      <section className="relative bg-slate-950 border-b border-white/10 px-4 py-16 text-white sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-slate-950" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link href="/sittings" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
            <ArrowLeft size={16} /> All Mashinani sittings
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-amber-300">Fifth sitting outside Nairobi</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Kilifi County Programme</h1>
          <div className="mt-5 w-16 h-1 bg-[#A81C26] rounded-full" />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> 19th - 26th September 2026</span>
            <span className="inline-flex items-center gap-2"><MapPin size={16} /> Kilifi County</span>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-300">Programme as at 28th August 2026. This schedule is planned and remains subject to official updates.</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 border-l-4 border-[#CE1126] bg-[var(--card)] p-5 text-sm leading-relaxed text-[var(--muted)] shadow-sm">
          Each programme item includes a reserved image space for official photography, site-visit images, or event documentation once available.
        </div>

        <div className="space-y-12">
          {kilifiProgramme.map((day) => (
            <section key={day.date}>
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--card-border)]" />
                <h2 className="shrink-0 text-center font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">{day.date}</h2>
                <div className="h-px flex-1 bg-[var(--card-border)]" />
              </div>
              <div className="space-y-4">
                {day.items.map((item, index) => (
                  <article key={`${item.number ?? 'event'}-${index}`} className="grid overflow-hidden border border-[var(--card-border)] bg-[var(--card)] shadow-sm md:grid-cols-[minmax(0,1fr)_240px]">
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {item.number && <span className="flex h-8 min-w-8 items-center justify-center bg-[var(--primary)] px-2 text-sm font-bold text-white">{item.number}</span>}
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]"><Clock3 size={15} /> {item.time}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-[var(--foreground)]">{item.title}</h3>
                      {item.description && <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>}
                      <p className="mt-4 inline-flex items-start gap-2 text-sm font-medium text-[var(--foreground)]"><MapPin size={16} className="mt-0.5 shrink-0 text-[#CE1126]" /> {item.venue}</p>
                    </div>
                    <div className="flex min-h-40 flex-col items-center justify-center gap-2 border-t border-dashed border-[var(--card-border)] bg-[var(--background)] p-6 text-center md:min-h-full md:border-t-0 md:border-l">
                      <Camera size={24} className="text-[var(--primary)]" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Image placeholder</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}