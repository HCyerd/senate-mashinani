import Link from 'next/link';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t border-[var(--card-border)] mt-24">
      <div className="kenya-stripe" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-16 h-9 rounded-lg flex items-center justify-center">
                <Image src="/parliament_emblem.png" alt="Senate Logo" width={35} height={24}  className="rounded-sm" />
                 
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--foreground)]">Senate Mashinani</p>
                <p className="text-xs text-[var(--muted)]">Parliament of Kenya</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Bringing Parliament to the people — decentralized democracy in action across Kenya&apos;s 47 counties.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/ParliamentKE/" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors text-xs font-medium border border-[var(--card-border)] px-2 py-1 rounded hover:border-[var(--primary)]">
                Facebook
              </a>
              <a href="https://twitter.com/Senate_KE" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors text-xs font-medium border border-[var(--card-border)] px-2 py-1 rounded hover:border-[var(--primary)]">
                X / Twitter
              </a>
              <a href="https://www.youtube.com/channel/UCXuseB7juWB7DIgTJcwtHFQ" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors text-xs font-medium border border-[var(--card-border)] px-2 py-1 rounded hover:border-[var(--accent)]">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {[
                { href: '/about', label: 'About the Senate' },
                { href: '/sessions', label: 'Mashinani Sittings' },
                { href: '/senators', label: 'Senate Leadership' },
                { href: '/programs', label: 'Internships & Attachments' },
                { href: '/benchmarking', label: 'Benchmarking Visits' },
                { href: '/news', label: 'News & Events' },
                { href: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--primary)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Senate Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {[
                { href: 'https://parliament.go.ke/the-senate/house-business/bills', label: 'Senate Bills' },
                { href: 'https://parliament.go.ke/the-senate/house-business/order-paper', label: 'Order Paper' },
                { href: 'https://parliament.go.ke/the-senate/standing-orders', label: 'Standing Orders' },
                { href: 'https://parliament.go.ke/the-senate/committees', label: 'Committees' },
                { href: 'https://parliament.go.ke/the-senate/senators', label: 'Senators List' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
                    {link.label} <ExternalLink size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-[var(--primary)]" />
                <span>(254-2) 2221291 / 2848000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-[var(--primary)]" />
                <a href="mailto:clerk.senate@parliament.go.ke" className="hover:text-[var(--primary)] transition-colors">
                  clerk.senate@parliament.go.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Parliament of Kenya. All rights reserved.</p>
          <a href="https://parliament.go.ke" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
            parliament.go.ke <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
