
import { ExternalLink, Tag, Calendar } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

const newsItems = [
  {
    title: 'Fifth Sitting of the Senate Outside Nairobi Set for Kilifi County',
    date: 'September 20\u201325, 2026',
    category: 'Upcoming Event',
    summary:
      'The Senate has released the official programme for its Fifth Sitting outside Nairobi, to be held in Kilifi County from 20th to 25th September 2026. The week opens with a Senate vs Kilifi County Assembly football match and a legislative briefing, followed by plenary sittings, over 30 committee inspection visits, and public engagements across Malindi, Ganze, and Magarini sub-counties.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: 'Committees to Inspect Equalization Fund Projects and Coastal Mining Audits in Kilifi',
    date: 'Monday, 21 September 2026',
    category: 'Upcoming Event',
    summary:
      'On Day Two of the Kilifi sitting, the Roads and Finance & Budget committees inspect Equalization Fund projects in Malindi and Ganze sub-counties, the Health Committee assesses Malindi and Marafa Sub-County Hospitals jointly with the County Public Investments Committee, and the Land, Environment and Natural Resources Committee meets Ministry and mining-company officials on environmental audits of coastal mining companies.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: 'Blue Economy and ICT Oversight Visits Ahead of First Kilifi Plenary',
    date: 'Tuesday, 22 September 2026',
    category: 'Upcoming Event',
    summary:
      'Day Three combines committee oversight with the first Senate Plenary in Kilifi. The Agriculture and Energy committees jointly inspect the Kilifi Central Fish Landing Site with KEMFSED officials, the Education Committee reviews ECDE centres in Malindi, the ICT Committee assesses digital transformation at the Kilifi County Headquarters, and the Health Committee meets the Governors of Taita/Taveta, Kwale, Mombasa, and Lamu counties. The Senate Business Committee and Speaker\u2019s Panel meet ahead of Plenary from 2:30 p.m. to 6:30 p.m.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: 'Town Hall on National Cohesion and 2027 Election Preparedness in Malindi',
    date: 'Tuesday, 22 September 2026',
    category: 'Upcoming Event',
    summary:
      'The Standing Committee on National Cohesion, Equal Opportunity and Regional Integration holds a town hall at the Cleopatra Theatre Hall, Malindi, with the National Cohesion and Integration Commission, national administration officers, community elders, and members of the public to discuss inter-community relations and preparedness for peaceful 2027 General Elections in the Coastal region.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: 'Cashew Processing Plant and Municipal Governance Reviews Precede Final Kilifi Plenary',
    date: 'Thursday, 24 September 2026',
    category: 'Upcoming Event',
    summary:
      'On Day Five, the Agriculture and Labour & Social Welfare committees jointly inspect the Tezo Cashew Processing Plant to assess workplace safety and value addition, the Devolution Committee reviews governance at the Malindi Municipal Board Offices, the Finance Committee meets the County Executive on pending bills, and the Trade Committee visits the Malindi Marine National Park and Mambrui Sand Dunes ahead of the final Plenary sitting from 2:30 p.m. to 6:30 p.m.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: 'Kilifi Sitting Concludes with Health Committee Review and Governor Engagement',
    date: 'Friday, 25 September 2026',
    category: 'Upcoming Event',
    summary:
      'The Fifth Sitting outside Nairobi closes with the Standing Committee on Health meeting the Governor of Kilifi County and the County Assembly\u2019s Health Services Committee to deliberate on healthcare provision and the preliminary findings of the week\u2019s oversight visits, followed by departures and check-out from respective hotels.',
    source: 'Clerk of the Senate',
    link: 'https://parliament.go.ke/the-senate',
  },
  {
    title: '4th Senate Mashinani Concludes in Busia County',
    date: 'October 10, 2025',
    category: 'Session Update',
    summary:
      "The Senate concluded its 4th Mashinani session held in Busia County from October 7–10, 2025. Key resolutions included rejecting the extension of the County Pension Task Force and fast-tracking land title deeds for Martin Luther Primary School. The session also addressed cross-border trade, water sector management, and county fiscal accountability.",
    source: 'Parliament of Kenya',
    link: 'https://www.parliament.go.ke/node/22145',
  },
  {
    title: 'Senate in Busia County — Issue No. 80',
    date: 'June 2025',
    category: 'Senate Weekly',
    summary:
      "The Senate Weekly (Issue No. 80) covered Busia County's selection as the 4th Mashinani host — describing it as being 'on the cusp of another first' as the county prepared to host the Senate for its historic session.",
    source: 'Senate Weekly',
    link: 'https://www.parliament.go.ke/sites/default/files/2026-06/SENATE%20WEEKLY%20%20ISSUE%2080.pdf',
  },
  {
    title: 'CS Wahome Assures Senate of Measures to Secure Martin Luther Primary School Land',
    date: 'August 2026',
    category: 'County Affairs',
    summary:
      "Following a petition raised during the Busia Mashinani session, the Cabinet Secretary assured the Senate that measures are in place to secure land and fast-track title deeds for Martin Luther Primary School — a direct outcome of community engagement during the Mashinani proceedings.",
    source: 'Parliament of Kenya',
    link: 'https://parliament.go.ke/node/26205',
  },
  {
    title: 'Senate Committee Rejects Further Extension of County Pension Task Force',
    date: 'August 2026',
    category: 'Legislation',
    summary:
      'The Senate Committee responsible for devolution rejected a proposal to further extend the mandate of the County Pension Task Force, demanding immediate resolution of outstanding county pension liabilities for retired county government workers.',
    source: 'Parliament of Kenya',
    link: 'https://parliament.go.ke/node/26202',
  },
  {
    title: '"Thank You Turkana County for Memorable Senate Mashinani"',
    date: 'March 2024',
    category: 'Session Update',
    summary:
      'Senate Speaker Rt. Hon. Amason Kingi issued a formal statement of appreciation to Turkana County following the conclusion of the 3rd Mashinani session, describing it as one of the most transformative and culturally immersive sessions in the history of the initiative.',
    source: 'Senate Weekly Issue No. 13',
    link: 'https://www.parliament.go.ke/sites/default/files/2024-03/The%20Senate%20Weekly%20-%20Issue%20No.%2013.pdf',
  },
  {
    title: 'Senate Heads to Turkana County for 3rd Mashinani',
    date: 'August 2023',
    category: 'Session Update',
    summary:
      'The Senate announced its 3rd Mashinani session would be hosted in Turkana County — marking the first time the Senate would sit in one of Kenya\'s most remote and historically marginalised counties. The move was described as a historic step in operationalising the Constitution\'s equity principles.',
    source: 'Senate Weekly Issue No. 1',
    link: 'https://www.parliament.go.ke/sites/default/files/2023-08/The%20Senate%20Weekly%20-%20Issue%20No.%201_0.pdf',
  },
  {
    title: 'Mung Beans Bill: From Kitui Fields to National Law',
    date: 'September 2022',
    category: 'Legislation',
    summary:
      'The Mung Beans Bill (Senate Bill No. 13 of 2022), sponsored by Sen. Enoch Wambua, was conceptualised during the 1st Mashinani session in Kitui County and subsequently passed by both Houses of Parliament, providing the first dedicated regulatory framework for Kenya\'s mung bean sector.',
    source: 'Parliament of Kenya',
    link: 'https://parliament.go.ke/the-senate/house-business/bills',
  },
  {
    title: 'Senate Formalises Mashinani in Standing Order 265A',
    date: 'June 2022',
    category: 'Policy',
    summary:
      "The Senate adopted Standing Order 265A, formally and permanently enshrining the Mashinani initiative into the Senate's procedural rules. The standing order mandates that the Senate must hold at least one sitting outside Nairobi per calendar year, guaranteeing the programme's continuation regardless of changes in leadership.",
    source: 'Parliament of Kenya',
    link: 'https://parliament.go.ke/the-senate/standing-orders',
  },
  {
    title: 'POPVOX Foundation Profiles Senate Mashinani as Global Best Practice',
    date: '2024',
    category: 'International Recognition',
    summary:
      'The POPVOX Foundation included the Senate Mashinani initiative in its CLSP (Civic Legislature Support Programme) resources, citing it as an exemplary model of decentralised legislative engagement worthy of global study and replication.',
    source: 'POPVOX Foundation',
    link: 'https://www.popvox.org/clsp-resources/senate-mashinani',
  },
  {
    title: 'Water Sector Trust Fund Seeks Water Act Amendment to Expand Mandate',
    date: 'August 2026',
    category: 'Legislation',
    summary:
      'The Senate is examining a proposed amendment to the Water Act that would expand the mandate of the Water Sector Trust Fund to better serve county-level water infrastructure projects, particularly in ASAL regions.',
    source: 'Parliament of Kenya',
    link: 'https://parliament.go.ke/node/26197',
  },
];

const categories = ['All', 'Upcoming Event', 'Session Update', 'Legislation', 'Policy', 'County Affairs', 'Senate Weekly', 'International Recognition'];

export default function NewsPage() {
  return (
    <div>
      <PageHero
        badge="Updates"
        title="News & Events"
        description="The latest developments, legislation, and announcements from the Kenya Senate and the Mashinani initiative."
        showImage={false}
      />

      {/* Category Filters (static display) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                i === 0
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'text-[var(--muted)] border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--primary)] cursor-pointer'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.title} className="card overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
              <ImagePlaceholder variant="light" label={item.category} className="aspect-[16/9] w-full" />
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full">
                    <Tag size={10} /> {item.category}
                  </span>
                  <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                    <Calendar size={10} /> {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.summary}</p>
              </div>
              <div className="px-6 pb-5 flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">Source: {item.source}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline"
                >
                  Read <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Senate E-Newsletter</h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            Stay updated on Senate business, Mashinani announcements, and legislative developments through the official Parliament of Kenya newsletter.
          </p>
          <a
            href="https://parliament.go.ke/the-senate/e-newsletter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Subscribe to E-Newsletter <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
