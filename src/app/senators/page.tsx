import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';

const leadership = [
  {
    role: 'Speaker of the Senate',
    name: 'Rt. Hon. Amason Jeffah Kingi, EGH, MP',
    description:
      'The Speaker presides over Senate sittings, maintains order in the chamber, and is responsible for the administration of the Senate. The Speaker is an ex officio member and does not vote except in the case of a tie.',
    link: 'https://parliament.go.ke/the-senate/speaker',
    initials: 'AJK',
    color: 'bg-blue-700',
    image: '/senators_images/Amason_Jeffah_Kingi_Senator.jpg',
  },
  {
    role: 'Deputy Speaker of the Senate',
    name: 'Sen. Kathuri Murungi, MGH, MP',
    description:
      'The Deputy Speaker deputises for the Speaker and presides over Senate sittings in the Speaker\'s absence. Also a member of the Senate Business Committee.',
    link: 'https://parliament.go.ke/the-senate/deputy-speaker-senate',
    initials: 'KM',
    color: 'bg-teal-700',
    image: '/senators_images/Murungi_Kathuri_Senator.jpg',
  },
  {
    role: 'Senate Majority Leader',
    name: 'Sen. Aaron Cheruiyot Kipkirui, EGH, MP',
    description:
      'The Majority Leader organises the business of the ruling coalition in the Senate, coordinates the government legislative agenda, and leads floor debate for the majority side.',
    link: 'https://parliament.go.ke/the-senate/senate-majority-leader',
    initials: 'ACK',
    color: 'bg-blue-700',
    image: '/senators_images/Aaron_Kipkirui_Cheruiyot_Senator.jpg',
  },
  {
    role: 'Senate Minority Leader',
    name: 'Sen. Justice (Rtd.) Stewart Madzayo, EGH, MP',
    description:
      'The Minority Leader leads the opposition in the Senate, coordinates the minority legislative position, and ensures robust accountability debate on government business.',
    link: 'https://parliament.go.ke/the-senate/senate-minority-leader',
    initials: 'SM',
    color: 'bg-amber-700',
    image: '/senators_images/Justice_Stewart_Madzayo_Senator.jpg',
  },
  {
    role: 'Senate Majority Whip',
    name: 'Sen. David Wakoli Wafula, CBS, MP',
    description:
      'The Majority Whip ensures party discipline, attendance, and cohesion for majority coalition votes. Coordinates with the Majority Leader on chamber management.',
    link: 'https://parliament.go.ke/the-senate/senate-majority-whip',
    initials: 'DWW',
    color: 'bg-cyan-700',
    image: '/senators_images/David_Wakoli_Wafula_Senator.jpg',
  },
  {
    role: 'Senate Minority Whip',
    name: 'Sen. Olekina Ledama, CBS, MP',
    description:
      'The Minority Whip manages attendance and voting discipline for the opposition, ensuring minority senators are present for critical votes.',
    link: 'https://parliament.go.ke/the-senate/senate-minority-whip',
    initials: 'OL',
    color: 'bg-purple-700',
    image: '/senators_images/Olekina_Ledama_Senator.jpg',
  },
  {
    role: 'Clerk of the Senate',
    name: 'Mr. Jeremiah M. Nyegenye, CBS',
    description:
      'The Clerk is the principal administrative officer of the Senate. Responsible for drafting Senate documents, advising on procedure, managing Senate records, and coordinating the logistics of all Senate business including Mashinani sittings.',
    link: 'https://parliament.go.ke/the-senate/clerk',
    initials: 'JMN',
    color: 'bg-gray-700',
    image: '/CoS.jpg',
  },
];

const committees = [
  'Senate Business Committee',
  'Committee on Finance and Budget',
  'Committee on Devolution and Intergovernmental Relations',
  'Committee on Agriculture, Livestock and Fisheries',
  'Committee on Health',
  'Committee on Education',
  'Committee on National Security, Defence and Foreign Relations',
  'Committee on Legal Affairs and Human Rights',
  'Committee on Labour and Social Welfare',
  'Committee on Energy and Natural Resources',
  'Committee on Lands, Environment and Natural Resources',
  'Committee on Tourism and Wildlife',
  'Committee on Roads and Transportation',
  'Committee on Information and Communication Technology',
  'Committee on Public Accounts',
  'Committee on County Public Accounts and Investments',
];

export default function SenatorsPage() {
  return (
    <div>
      <PageHero
        badge="People"
        title="Senate Leadership"
        description="The Senate is led by experienced legislators who champion devolution, county rights, and the principles of the 2010 Constitution."
        showImage={false}
      />

      {/* House Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">House Leadership</p>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Key Office Bearers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership.map((person) => (
            <div key={person.name} className="card p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full ${person.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  <Image src={person.image} alt={person.name} width={56} height={56} className="rounded-full" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--primary)] mb-0.5">{person.role}</p>
                  <h3 className="font-bold text-[var(--foreground)] text-sm leading-snug">{person.name}</h3>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{person.description}</p>
              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] hover:underline"
              >
                View profile <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Senate Committees */}
      <section className="bg-[var(--card)] border-y border-[var(--card-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Committees</p>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Senate Committees</h2>
            <p className="text-[var(--muted)] mt-3 text-sm max-w-lg mx-auto">
              Senate Committees are the engine rooms of legislative work — scrutinising Bills, conducting oversight, and producing detailed reports on matters affecting county governments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {committees.map((committee) => (
              <div key={committee} className="card p-4 text-center hover:border-[var(--primary)] transition-colors">
                <p className="text-xs text-[var(--muted)] leading-relaxed">{committee}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://parliament.go.ke/the-senate/committees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
            >
              View all committees on Parliament website <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* All Senators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="card p-8 sm:p-12 max-w-2xl mx-auto">
          <p className="text-4xl font-black text-[var(--primary)] mb-2">47</p>
          <p className="text-lg font-bold text-[var(--foreground)] mb-3">County Elected Senators</p>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
            Each of Kenya&apos;s 47 counties elects one Senator. Together with 16 nominated women, 2 youth representatives, 2 PWD representatives, and the Speaker, the Senate totals 67 members.
          </p>
          <a
            href="https://parliament.go.ke/the-senate/senators"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Full Senators List <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
