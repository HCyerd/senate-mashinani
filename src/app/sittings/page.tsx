import Link from 'next/link';
import { MapPin, Calendar, FileText, CheckCircle2, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, Wallet, HelpCircle, Camera, Users } from 'lucide-react';
import { sessions } from './sessions';
import { mashinaniFaqs } from '@/data/mashinaniFaqs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

const slugify = (county: string) => county.toLowerCase().replace(/\s+/g, '-');

export default function SessionsPage() {
  return (
    <div>
      {/* Header */}
      {/* Header / Hero Section */}
  <section className="relative py-32 px-4 bg-slate-950 overflow-hidden">
    {/* Background Image & Overlays */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2000&q=80"
        alt="Parliament History"
        className="w-full h-full object-cover object-center opacity-25 filter saturate-150"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-[#006A44]/30" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-6">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        Historical Archive
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
        Mashinani Sittings
      </h1>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        A comprehensive record of every official Senate Mashinani sitting — tracking legislative impact, grassroots barazas, and devolution oversight from the inaugural Eldoret sitting to the upcoming session in Kilifi.
      </p>
    </div>
  </section>

  {/* Quick Navigation Strip */}
  <section className="bg-slate-900 border-b border-slate-800 py-6 overflow-x-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
      {sessions.map((session) => {
        const cover = session.images?.[0];
        return (
          <a
            key={session.number}
            href={`#${slugify(session.county)}`}
            className="flex items-center gap-3 pr-4 pl-2 py-2 rounded-full bg-slate-800/60 border border-slate-700 hover:border-emerald-500 hover:bg-slate-800 transition-colors group shrink-0"
          >
            <span className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-600 shrink-0">
              {cover ? (
                <img src={cover.src} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-400">
                  <Camera className="w-4 h-4" />
                </span>
              )}
            </span>
            <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
              {session.ordinal} · {session.county.replace(' County', '')}
            </span>
          </a>
        );
      })}
    </div>
  </section>

  {/* Main Sessions Timeline */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
    {sessions.map((session) => {
      const cover = session.images?.[0];
      const gallery = session.images && session.images.length > 0 ? session.images : null;
      return (
      <div key={session.number} id={slugify(session.county)} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200/60 transition-all hover:shadow-2xl scroll-mt-24">
        
        {/* Session Card Header */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${session.color}`}>
          {cover ? (
            <img src={cover.src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          ) : (
            <div className="absolute inset-0 opacity-40">
              <ImagePlaceholder variant="dark" label="" className="w-full h-full border-0" />
            </div>
          )}
          <div className={`absolute inset-0 bg-gradient-to-r ${session.color} opacity-80`} />
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6 p-8 sm:p-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider shadow-sm">
                  {session.ordinal} Session
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full ${session.status === 'Upcoming' ? 'bg-amber-400 text-slate-900' : 'bg-black/20 text-white/80'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> {session.status}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{session.county}</h2>
              
              <div className="flex flex-wrap gap-5 mt-4 text-sm text-white/90 font-medium">
                <span className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-amber-300" /> {session.region}
                </span>
                <span className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Calendar className="w-4 h-4 text-emerald-300" /> {session.period}
                </span>
              </div>
            </div>
            <div className="text-7xl sm:text-8xl font-black text-white/10 tracking-tighter">
              {session.number.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Session Card Body */}
        <div className="p-8 sm:p-10 space-y-10">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A81C26]" /> Overview
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">{session.overview}</p>
          </div>

          {/* Images Grid */}
          <div>
            <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#A81C26]" /> From the Sitting
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery ? (
                gallery.map((img, idx) => (
                  <figure key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80" />
                    <figcaption className="absolute inset-x-0 bottom-0 text-white text-xs font-medium p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))
              ) : (
                ['Plenary chamber', 'Committee site visit', 'Public engagement', 'County leadership'].map((label) => (
                  <ImagePlaceholder
                    key={label}
                    variant="light"
                    label={`Add ${session.county} ${label.toLowerCase()} photo`}
                    className="aspect-[4/3] rounded-2xl"
                  />
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Key Legislation */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" /> Key Legislation
              </h3>
              <ul className="space-y-3">
                {session.keyLegislation.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-3 leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full ${session.accentColor} flex-shrink-0 mt-2`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Oversight Actions */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A81C26]" /> Oversight Actions
              </h3>
              <ul className="space-y-3">
                {session.oversight.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start gap-3 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006A44] flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Documented Activities */}
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4">
              Activities Documented
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {session.activities.map((activity, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start gap-3 leading-relaxed">
                  <span className={`w-1.5 h-1.5 rounded-full ${session.accentColor} flex-shrink-0 mt-2`} />
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-3">
              Legislative & Grassroots Impact
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              {session.impact}
            </p>
          </div>

          {/* Participants */}
          {session.participants && (
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A81C26]" /> Who Took Part
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{session.participants}</p>
            </div>
          )}

          {/* Successes & Challenges */}
          {(session.successes || session.challenges) && (
            <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              {session.successes && (
                <div>
                  <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Successes
                  </h3>
                  <ul className="space-y-3">
                    {session.successes.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-3 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {session.challenges && (
                <div>
                  <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" /> Challenges
                  </h3>
                  <ul className="space-y-3">
                    {session.challenges.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-3 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Recommendations */}
          {session.recommendations && (
            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-xs font-bold text-[#006A44] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Key Recommendations
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {session.recommendations.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-3 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions Footer */}
          {session.county === 'Kilifi County' && (
            <div className="pt-6">
              <a href="/sittings/kilifi-programme" className="inline-flex items-center gap-2 text-sm font-bold text-[#006A44] hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-lg">
                View detailed Kilifi programme <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
      );
    })}
  </div>

  {/* FAQ Section */}
  <section className="bg-white border-y border-slate-200 py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-5 border border-emerald-100">
          <HelpCircle className="w-6 h-6 text-[#006A44]" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">Common Questions</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">Frequently Asked Questions</h2>
        <div className="w-16 h-1 bg-[#A81C26] mx-auto mt-3 rounded-full" />
        <p className="text-slate-600 mt-4 text-base max-w-lg mx-auto">
          Answers drawn from the Senate&apos;s official Directorate of Legislative and Procedural Services.
        </p>
      </div>
      <FaqAccordion items={mashinaniFaqs} />
    </div>
  </section>

  {/* Footer CTA */}
  <section className="py-16 bg-gradient-to-r from-emerald-950 via-[#006A44] to-slate-950 text-white text-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold">Next Mashinani Session</h2>
      <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mt-3">
        The 5th Senate Mashinani is officially scheduled for Kilifi County from 21st to 25th September 2026. Follow official Parliament channels for live broadcasts and updates.
      </p>
      <a
        href="https://parliament.go.ke/the-senate"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#A81C26] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5"
      >
        Parliament of Kenya Official Site <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </section>
  
</div>
  );
}

