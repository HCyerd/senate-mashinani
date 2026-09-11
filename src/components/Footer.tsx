import Link from 'next/link';
import { Mail, Phone, ExternalLink, Landmark, MapPin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
   <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1 */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="">
                  <Image src="/parliament_emblem.png" alt="Senate Mashinani Logo"  width={72} height={72} />
                </div>
                <div>
                  <span className="font-extrabold text-lg text-white tracking-wide">SENATE MASHINANI</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">The Parliament of Kenya</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pr-6">
                Senate Mashinani is an initiative of the Senate of the Republic of Kenya under Articles 96 & 126(1) of the Constitution, promoting transparency, devolution oversight, citizen engagement, and decentralised governance.
              </p>
              {}
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-xs text-slate-400">Official Channels:</span>
                <a
                  href="https://twitter.com/senate_ke"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 rounded-lg hover:text-white hover:bg-slate-800 transition"
                  aria-label="Senate Kenya on Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/senatekenya"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 rounded-lg hover:text-white hover:bg-slate-800 transition"
                  aria-label="Senate Kenya on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/parliamentofkenya"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 rounded-lg hover:text-white hover:bg-slate-800 transition"
                  aria-label="Parliament of Kenya on YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#about" className="hover:text-emerald-400 transition">About Senate Mashinani</a></li>
                <li><a href="#pillars" className="hover:text-emerald-400 transition">The 4 Strategic Pillars</a></li>
                <li><a href="#editions" className="hover:text-emerald-400 transition">Host Counties Archive</a></li>
                <li><a href="#bills" className="hover:text-emerald-400 transition">Devolution Bills Tracker</a></li>
                <li><a href="#order-paper" className="hover:text-emerald-400 transition">Order Paper & Broadcast</a></li>
                <li><a href="#petition" className="hover:text-emerald-400 transition">Sauti ya Mashinani Portal</a></li>
              </ul>
            </div>

            {/* Col 3: Host Counties */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Host Counties</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Busia County (4th Edition)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Turkana County (3rd Edition)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Kitui County (2nd Edition)</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Uasin Gishu (Inaugural)</li>
                <li className="pt-2 text-[11px] text-amber-300 font-semibold">Next County Selection in Progress</li>
              </ul>
            </div>

            {/* Col 4: Official Contacts */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Parliament Offices</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Parliament Buildings, Parliament Road, P.O. Box 41842-00100, Nairobi, Kenya</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+254 (020) 2221291 / 2848000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>clerk.senate@parliament.go.ke</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 The Senate of Kenya. Republic of Kenya. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-slate-300 cursor-pointer">Senate Standing Orders</span>
              <span className="hover:text-slate-300 cursor-pointer">Official Hansard Archives</span>
              <span className="hover:text-slate-300 cursor-pointer">Public Participation Policy</span>
            </div>
          </div>
        </div>
      </footer>
  );
}
