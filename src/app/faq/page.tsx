import Link from 'next/link';
import { ArrowRight, HelpCircle, Mail } from 'lucide-react';
import { mashinaniFaqs } from '@/data/mashinaniFaqs';
import { FaqAccordion } from '@/components/FaqAccordion';

export default function FaqPage() {
  return (
    <div>
      {/* Header */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#F4C300] uppercase tracking-widest mb-3">Senate Mashinani</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Frequently Asked Questions</h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Answers drawn directly from the Senate&apos;s official Senate Mashinani briefing document &mdash; covering the constitutional basis, county selection, and impact of sittings held outside Nairobi.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={22} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Your Questions, Answered</h2>
        </div>
        <FaqAccordion items={mashinaniFaqs} />
      </section>

      {/* CTA */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Still have a question?</h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            Learn how to submit your views on a Bill, engage your Senator, or reach the Office of the Clerk of the Senate directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programs/public-participation"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Public Participation Guide <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:clerk.senate@parliament.go.ke"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--card-border)] text-[var(--foreground)] font-medium rounded-lg text-sm hover:bg-[var(--card-border)] transition-colors"
            >
              <Mail size={16} /> clerk.senate@parliament.go.ke
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
