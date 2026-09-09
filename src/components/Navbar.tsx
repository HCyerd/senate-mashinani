'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/senators', label: 'Leadership' },
  { href: '/news', label: 'News' },
  { href: '/faq', label: 'FAQ' },
];

const programLinks = [
  { href: '/programs', label: 'All Programmes' },
  { href: '/programs/internships-attachments', label: 'Internships & Attachments' },
  { href: '/programs/high-school-attachment', label: 'High School Attachment' },
  { href: '/programs/county-legislation-tracker', label: 'County Legislation Tracker' },
  { href: '/benchmarking', label: 'Benchmarking Visits' },
  { href: '/programs/local-benchmarking', label: 'Local Benchmarking Visits' },
  { href: '/programs/international-benchmarking', label: 'International Benchmarking Visits' },
  { href: '/programs/public-participation', label: 'Public Participation' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const programsActive = pathname.startsWith('/programs') || pathname === '/benchmarking';

  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50 border-b border-[var(--card-border)]">
      <div className="kenya-stripe" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/parliament_emblem.png" alt="Senate Logo" width={50} height={20}  className="rounded-sm" />
            </div>
            <div className="hidden sm:block">
              <Image src="/senate_mashinani.png" alt="Senate Logo" width={110} height={30} style={{ objectFit: 'contain' }} className="rounded-sm" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setProgramsOpen(!programsOpen)}
                aria-expanded={programsOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  programsActive ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]'
                }`}
              >
                Programs <ChevronDown size={15} className={`transition-transform ${programsOpen ? 'rotate-180' : ''}`} />
              </button>
              {programsOpen && (
                <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-2 shadow-lg">
                  {programLinks.map((link) => (
                    <Link key={link.href} href={link.href} role="menuitem" onClick={() => setProgramsOpen(false)} className={`block rounded-md px-3 py-2 text-sm transition-colors ${pathname === link.href ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:bg-[var(--card-border)] hover:text-[var(--foreground)]'}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  pathname === link.href
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="lg:hidden p-2 rounded-md text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--card-border)] bg-[var(--card)] px-4 py-3 space-y-1">
          <div>
            <button type="button" onClick={() => setProgramsOpen(!programsOpen)} aria-expanded={programsOpen} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${programsActive ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:bg-[var(--card-border)] hover:text-[var(--foreground)]'}`}>
              Programs <ChevronDown size={16} className={`transition-transform ${programsOpen ? 'rotate-180' : ''}`} />
            </button>
            {programsOpen && <div className="ml-3 mt-1 space-y-1 border-l border-[var(--card-border)] pl-2">
              {programLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => { setMenuOpen(false); setProgramsOpen(false); }} className={`block rounded-md px-3 py-2 text-sm transition-colors ${pathname === link.href ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:bg-[var(--card-border)] hover:text-[var(--foreground)]'}`}>{link.label}</Link>)}
            </div>}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
