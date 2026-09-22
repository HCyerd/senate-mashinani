'use client';

import { useState, useEffect } from 'react';
import { Tv, Radio, ExternalLink, PlayCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {Youtube} from './Youtube';

// Parliament of Kenya official YouTube channel — @ParliamentofKenyaChannel
const CHANNEL_ID = 'UCXuseB7juWB7DIgTJcwtHFQ';
const CHANNEL_URL = 'https://www.youtube.com/channel/UCXuseB7juWB7DIgTJcwtHFQ';
const HANDLE     = 'Parliament of Kenya';
// Uploads playlist: replace leading "UC" → "UU" to get the auto-generated uploads playlist
const UPLOADS_PLAYLIST = 'UUXuseB7juWB7DIgTJcwtHFQ';

type Mode = 'live' | 'latest';
type VideoInfo = { id: string; title: string; thumbnail: string };
type ApiResponse = { videos: VideoInfo[]; liveVideoId: string | null };

// Module-level cache — both cards share one fetch, TTL matches server cache
let _cached: ApiResponse | null = null;
let _cacheExpiry = 0;

async function fetchParliamentData(): Promise<ApiResponse> {
  if (_cached && Date.now() < _cacheExpiry) return _cached;
  try {
    const res = await fetch('/api/parliament-videos');
    const data = await res.json() as ApiResponse;
    _cached = { videos: data.videos ?? [], liveVideoId: data.liveVideoId ?? null };
    _cacheExpiry = Date.now() + 60 * 1000; // 1 minute client-side TTL
    return _cached;
  } catch {
    return { videos: [], liveVideoId: null };
  }
}

function YoutubeEmbed({
  title,
  accentClass,
  activeTabColor,
  liveLabel,
  latestLabel,
}: {
  title: string;
  accentClass: string;
  activeTabColor: string;
  liveLabel: string;
  latestLabel: string;
}) {
  const { lang } = useLanguage();
  const t = (en: string, sw: string) => lang === 'en' ? en : sw;

  const [mode, setMode] = useState<Mode>('live');
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo | null>(null);
  const [latestVideos, setLatestVideos] = useState<VideoInfo[]>([]);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Clear selected video when switching tabs
  useEffect(() => { setSelectedVideo(null); }, [mode]);

  // Fetch recent videos + live stream status from the Parliament channel
  useEffect(() => {
    fetchParliamentData().then((data) => {
      setLatestVideos(data.videos);
      setLiveVideoId(data.liveVideoId);
      setDataLoaded(true);
    });
  }, []);

  const liveSrc = liveVideoId
    ? `https://www.youtube.com/embed/${liveVideoId}?autoplay=0&rel=0&modestbranding=1`
    : null;
  const selectedSrc = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div>
      {/* Mode toggle tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800 dark:bg-gray-900">
        <button
          onClick={() => setMode('live')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
            mode === 'live'
              ? 'text-white border-red-500 bg-gray-700/60'
              : 'text-gray-400 border-transparent hover:text-gray-200'
          }`}
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              mode === 'live' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'
            }`}
          />
          {liveLabel}
        </button>
        <button
          onClick={() => setMode('latest')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
            mode === 'latest'
              ? `text-white ${activeTabColor} bg-gray-700/60`
              : 'text-gray-400 border-transparent hover:text-gray-200'
          }`}
        >
          <PlayCircle size={13} />
          {latestLabel}
        </button>
      </div>

      {/* Content area */}
      <div className="aspect-video bg-black relative overflow-hidden">

        {mode === 'live' ? (
          /* ── Live Stream tab ── */
          liveSrc ? (
            /* Parliament is currently live — embed the actual video ID */
            <iframe
              src={liveSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          ) : dataLoaded ? (
            /* Not currently live */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-900 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
                <Tv size={28} className="text-gray-500" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {t('Not Currently Live', 'Haipo Moja kwa Moja Sasa Hivi')}
                </p>
                <p className="text-gray-400 text-xs mt-1 max-w-xs">
                  {t(
                    'Parliament is not in session. Sitting days: Mon – Thu (National Assembly), Tue – Thu (Senate), 2:30 PM EAT.',
                    'Bunge halifanyi kikao. Siku za vikao: Juma.–Alhamisi (Bunge la Taifa), Jumanne–Alhamisi (Seneti), saa 8:30 usiku EAT.'
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <a
                  href={`${CHANNEL_URL}/live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                >
                  <Youtube /> {t('Watch on YouTube', 'Tazama kwenye YouTube')}
                </a>
                <button
                  onClick={() => setMode('latest')}
                  className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                >
                  <PlayCircle size={13} /> {t('Recent Videos', 'Video za Hivi Karibuni')}
                </button>
              </div>
            </div>
          ) : (
            /* Loading */
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="w-8 h-8 border-2 border-kenya-green border-t-transparent rounded-full animate-spin" />
            </div>
          )
        ) : selectedVideo && selectedSrc ? (
          /* ── Playing a selected video ── */
          <>
            <iframe
              src={selectedSrc}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 left-8 z-20 flex items-center gap-1 bg-black/70 hover:bg-black/90 text-white text-xs px-2.5 py-1.5 rounded-full transition-colors"
            >
              ← {t('Back', 'Rudi')}
            </button>
          </>
        ) : (
          /* ── Latest Videos tab: scrollable grid of thumbnails ── */
          <div className="w-full h-full overflow-y-auto bg-gray-950 scrollbar-thin">
            {latestVideos.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <Youtube size={40} className="text-red-500 opacity-70" />
                <span className="text-gray-400 text-xs">
                  {t('Loading recent videos…', 'Inapakia video za hivi karibuni…')}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-px bg-gray-800">
                {latestVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="group relative block text-left bg-black overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.includes('hqdefault'))
                            img.src = img.src.replace('hqdefault', 'sddefault');
                        }}
                      />
                      {/* Hover scrim */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-150" />
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 bg-red-600/80 group-hover:bg-red-500 rounded-full flex items-center justify-center scale-90 group-hover:scale-110 transition-all duration-150 shadow-lg">
                          <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Title strip */}
                    <div className="bg-gray-900 group-hover:bg-gray-800 transition-colors px-2 py-1.5">
                      <p className="text-gray-200 text-[10px] leading-snug line-clamp-2 font-medium">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Accent stripe */}
        <div className={`absolute inset-y-0 left-0 w-1 ${accentClass} z-10 pointer-events-none`} />
      </div>
    </div>
  );
}

export default function LiveStreamSection() {
  const { lang } = useLanguage();
  const t = (en: string, sw: string) => lang === 'en' ? en : sw;
  return (
    <section className="py-10 bg-gray-900 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-1.5 bg-kenya-gold rounded-full" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-white">
            {t('Watch Parliament Live', 'Tazama Bunge Moja kwa Moja')}
          </h2>
          <span className="ml-2 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
            LIVE
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-5 pl-3">
          Live stream plays when Parliament is in session. Switch to{' '}
          <span className="text-kenya-gold font-medium">{t('Latest Videos', 'Video za Hivi Karibuni')}</span> {t('to browse recent recordings from', 'kutazama rekodi za hivi karibuni kutoka')}{' '}
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-kenya-gold hover:underline">{HANDLE}</a>.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* National Assembly */}
          <div className="bg-gray-800 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
            <div className="bg-kenya-green px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Tv size={16} /> {t('National Assembly', 'Bunge la Taifa')}
              </h3>
              <a
                href={`${CHANNEL_URL}/live`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs transition-colors"
              >
                <Youtube size={13} /> {t('Open in YouTube', 'Fungua YouTube')}
                <ExternalLink size={11} />
              </a>
            </div>

            <YoutubeEmbed
              title="National Assembly of Kenya — Live Stream / Latest Videos"
              accentClass="bg-kenya-green"
              activeTabColor="border-kenya-green"
              liveLabel={t('Live Stream', 'Matangazo ya Moja kwa Moja')}
              latestLabel={t('Latest Videos', 'Video za Hivi Karibuni')}
            />

            <div className="px-4 py-2.5 bg-gray-800/80 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                <span className="text-green-400 font-semibold">● </span>
                {t('Sitting days: Mon – Thu, 2:30 PM EAT', 'Siku za Vikao: Juma.–Alhamisi, 2:30 PM EAT')}
              </p>
              <a
                href="https://www.parliament.go.ke/the-national-assembly/live-proceedings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-kenya-gold hover:underline flex items-center gap-1"
              >
                {t('More Info', 'Maelezo Zaidi')} <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Senate */}
          <div className="bg-gray-800 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
            <div className="bg-kenya-red px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Radio size={16} /> {t('Senate', 'Seneti')}
              </h3>
              <a
                href={`${CHANNEL_URL}/live`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs transition-colors"
              >
                <Youtube size={13} /> {t('Open in YouTube', 'Fungua YouTube')}
                <ExternalLink size={11} />
              </a>
            </div>

            <YoutubeEmbed
              title="Senate of Kenya — Live Stream / Latest Videos"
              accentClass="bg-kenya-red"
              activeTabColor="border-kenya-red"
              liveLabel={t('Live Stream', 'Matangazo ya Moja kwa Moja')}
              latestLabel={t('Latest Videos', 'Video za Hivi Karibuni')}
            />

            <div className="px-4 py-2.5 bg-gray-800/80 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                <span className="text-red-400 font-semibold">● </span>
                {t('Sitting days: Tue – Thu, 2:30 PM EAT', 'Siku za Vikao: Jumanne–Alhamisi, 2:30 PM EAT')}
              </p>
              <a
                href="https://www.parliament.go.ke/the-senate/live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-kenya-gold hover:underline flex items-center gap-1"
              >
                {t('More Info', 'Maelezo Zaidi')} <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* Channel credit */}
        <p className="mt-4 text-center text-xs text-gray-500">
          {t('All content sourced from the', 'Maudhui yote kutoka')}{' '}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-kenya-gold hover:underline inline-flex items-center gap-1"
          >
            <Youtube size={12} />
            {t('Parliament of Kenya Official YouTube Channel', 'Chaneli Rasmi ya YouTube ya Bunge la Kenya')}
            <ExternalLink size={11} />
          </a>
          . {t('Live stream available on active sitting days', 'Matangazo ya moja kwa moja yanapatikana siku za vikao')}.
        </p>
      </div>
    </section>
  );
}
