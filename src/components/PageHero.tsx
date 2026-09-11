import Image from 'next/image';
import { ImagePlaceholder } from './ImagePlaceholder';

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  showImage?: boolean;
  imageLabel?: string;
}

/** Dark Kenya-flag-themed hero banner shared across interior pages, matching the landing page style. */
export function PageHero({ badge, title, description, showImage = true, imageLabel }: PageHeroProps) {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-slate-950" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          {badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
        <div className="w-16 h-1 bg-[#A81C26] mx-auto mb-5 rounded-full" />
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>

      {showImage && (
        <div className="relative z-10 ">
          <Image src="/sessions_images/vss.jpeg" alt={imageLabel ?? 'Add hero image'} className=" rounded-2xl w-full" width={1920} height={220} />
        </div>
      )}
    </section>
  );
}
