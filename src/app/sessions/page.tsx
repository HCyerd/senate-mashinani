import Link from 'next/link';
import { MapPin, Calendar, FileText, CheckCircle2, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, Wallet, HelpCircle, Camera } from 'lucide-react';
import Image from 'next/image';
import { sessions } from './sessions';
import { mashinaniFaqs } from '@/data/mashinaniFaqs';
import { FaqAccordion } from '@/components/FaqAccordion';

export default function SessionsPage() {
  return (
    <div>
      {/* Header */}
      <section className=" py-36 px-4" style={{ backgroundImage: "url('/history.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#F4C300] uppercase tracking-widest mb-3">History</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Mashinani Sittings</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            A comprehensive record of every Senate Mashinani sittings — from the inaugural Uasin Gishu County Sitting in 2018 to the latest in Busia County, 2025.
          </p> */}
        {/* </div> */}
      </section>

      {/* Sessions */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {sessions.map((session) => (
          <div key={session.number} className="card overflow-hidden">
            {/* Session Header */}
            <div className={`bg-gradient-to-r ${session.color} p-7`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-white/80 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                      {session.ordinal} Session
                    </span>
                    <span className="text-xs font-medium text-white/60 flex items-center gap-1">
                      <CheckCircle2 size={12} /> {session.status}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{session.county}</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} /> {session.region}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> {session.period}
                    </span>
                  </div>
                </div>
                <div className="text-5xl font-black text-white/10">{session.number.toString().padStart(2, '0')}</div>
              </div>
            </div>

            {/* Session Body */}
            <div className="p-7 space-y-7">
              <div>
                <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3">Overview</h3>
                <p className="text-[var(--muted)] leading-relaxed text-sm">{session.overview}</p>
              </div>

              {session.images && (
                <div>
                  <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Camera size={14} /> From the Sitting
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {session.images.map((img) => (
                      <figure key={img.src} className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--card-border)]">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-[11px] leading-snug p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                {/* Legislation */}
                <div>
                  <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <FileText size={14} /> Key Legislation
                  </h3>
                  <ul className="space-y-2">
                    {session.keyLegislation.map((item) => (
                      <li key={item} className="text-xs text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full ${session.accentColor} flex-shrink-0 mt-1.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Oversight */}
                <div>
                  <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Oversight Actions
                  </h3>
                  <ul className="space-y-2">
                    {session.oversight.map((item) => (
                      <li key={item} className="text-xs text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[var(--card-border)] pt-5">
                <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3">Activities documented</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-3">
                  {session.activities.map((activity) => (
                    <li key={activity} className="text-sm text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full ${session.accentColor} flex-shrink-0 mt-2`} />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {session.county === 'Kilifi County' && (
                <Link href="/sessions/kilifi-programme" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--accent)]">
                  View detailed Kilifi programme <ExternalLink size={14} />
                </Link>
              )}

              <div className="border-t border-[var(--card-border)] pt-5">
                <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-2">Impact</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{session.impact}</p>
              </div>

              {(session.successes || session.challenges) && (
                <div className="border-t border-[var(--card-border)] pt-5 grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {session.successes && (
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <TrendingUp size={14} /> Successes
                      </h3>
                      <ul className="space-y-2">
                        {session.successes.map((item) => (
                          <li key={item} className="text-xs text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {session.challenges && (
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Challenges
                      </h3>
                      <ul className="space-y-2">
                        {session.challenges.map((item) => (
                          <li key={item} className="text-xs text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {session.recommendations && (
                <div className="border-t border-[var(--card-border)] pt-5">
                  <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Lightbulb size={14} /> Recommendations
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-2">
                    {session.recommendations.map((item) => (
                      <li key={item} className="text-xs text-[var(--muted)] flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* {session.expenditure && (
                <div className="border-t border-[var(--card-border)] pt-5">
                  <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Wallet size={14} /> Expenditure
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <span className="text-xl font-bold text-[var(--foreground)]">{session.expenditure.total}</span>
                    <span className="text-xs text-[var(--muted)]">total procured cost of the sitting</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{session.expenditure.note}</p>
                </div>
              )} */}

              {session.youtubeLink && (
                <a
                  href={session.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Watch Senate Proceedings <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={20} className="text-[var(--primary)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Frequently Asked Questions</h2>
            <p className="text-[var(--muted)] mt-3 text-sm max-w-lg mx-auto">
              Answers drawn from the Senate&apos;s official Mashinani briefing notes.
            </p>
          </div>
          <FaqAccordion items={mashinaniFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Next Mashinani Session</h2>
          <p className="text-[var(--muted)] mb-6 text-sm max-w-lg mx-auto">
            The 5th Senate Mashinani is scheduled for Kilifi County from 21st to 25th September 2026. Follow official Parliament channels for the final programme and updates.
          </p>
          <a
            href="https://parliament.go.ke/the-senate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Parliament of Kenya <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

