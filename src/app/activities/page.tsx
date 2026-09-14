import { 
  GraduationCap, 
  BookOpen, 
  School, 
  CheckCircle2, 
  Users, 
  FileText, 
  Building2, 
  Globe2, 
  ArrowRight,
  Download,
  Landmark,
  ShieldCheck
} from 'lucide-react';

const capacityPrograms = [
  {
    icon: GraduationCap,
    title: 'Internship Program',
    duration: '6 months',
    audience: 'University & diploma graduates',
    description: 'Hosts 10 graduates for a 6-month period, selected through a competitive interview process conducted by the Senate Training Committee.',
    href: '/programs/internships-attachments',
    color: 'text-red-800',
    bg: 'bg-red-50',
    border: 'border-red-100'
  },
  {
    icon: BookOpen,
    title: 'Attachment Program',
    duration: '3 months',
    audience: 'Continuing undergraduate & diploma students',
    description: 'Hosts a variable number of students for 3 months, with intake guided by the staffing needs of individual directorates and Senate Liaison Office recommendations.',
    href: '/programs/internships-attachments',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    icon: School,
    title: 'Voluntary Service Scheme',
    duration: '2 weeks',
    audience: 'High school students',
    description: 'Short-term attachments giving high school students structured exposure to the roles, functions, and processes of the Senate.',
    href: '/programs/high-school-attachment',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  {
    icon: FileText,
    title: 'Public Petitions to the Senate',
    duration: 'Civic right',
    audience: 'Citizens & stakeholders',
    description: 'Learn how to prepare and submit a petition asking the Senate to take action on a matter within its mandate.',
    href: '/programs/public-petitions',
    color: 'text-red-800',
    bg: 'bg-red-50',
    border: 'border-red-100'
  },
  {
    icon: Landmark,
    title: 'Equitable Sharing of Revenue',
    duration: 'County governance',
    audience: 'Citizens, counties & stakeholders',
    description: 'Explore the revenue-sharing formula for county governments and the growth of the equitable share under devolution.',
    href: '/programs/equitable-revenue-sharing',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    icon: BookOpen,
    title: 'County Legislation Tracker',
    duration: 'Online platform',
    audience: 'Citizens, county representatives & Senators',
    description: 'Monitor county bills and follow their progress through the legislative process across Kenya.',
    href: '/programs/county-legislation-tracker',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  {
    icon: Building2,
    title: 'Local Benchmarking Visits',
    duration: 'Tailored visits',
    audience: 'Local institutions & delegations',
    description: 'Learn from parliamentary practice, exchange institutional experience, and strengthen service delivery.',
    href: '/programs/local-benchmarking',
    color: 'text-red-800',
    bg: 'bg-red-50',
    border: 'border-red-100'
  },
  {
    icon: Globe2,
    title: 'International Benchmarking',
    duration: 'Coordinated visits',
    audience: 'International delegations & institutions',
    description: 'Structured opportunities for global knowledge exchange with the Senate of Kenya.',
    href: '/programs/international-benchmarking',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    icon: Users,
    title: 'Public Participation',
    duration: 'Civic engagement',
    audience: 'Citizens & stakeholders',
    description: 'Make your views heard in Senate laws, policies, and matters that affect you.',
    href: '/programs/public-participation',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
];

const structure = [
  'Onboarding support: badges, lunch, stipend, and documentation (agreement forms, log books, Constitution of Kenya).',
  'Daily attendance and monthly progress/welfare meetings.',
  'Exposure to devolution through lectures and stakeholder visits (COG, IGRTC, County Assemblies, CRA, among others).',
  'Research assignments on topical issues.',
  'Exit meetings, recommendation letters, and an official graduation ceremony.',
  'Established alumni network with continuous engagement for 2 years after completion.',
];

const vssHighlights = [
  'Understand the roles and functions of the Senate.',
  'Interact with Senators and key departments.',
  'Gain practical experience in parliamentary processes and governance.',
  'Tour Parliament buildings and observe live proceedings in both chambers.',
  'Participate in mentorship sessions and courtesy calls with senior officials.',
];

const impact = [
  'Enhances understanding of legislation, democracy, and devolved governance.',
  'Builds career awareness and parliamentary exposure.',
  'Fosters leadership, discipline, and civic responsibility.',
  'Strengthens the pipeline of young Kenyans equipped to engage with public institutions.',
];

export default function ProgramsPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* Official Senate Document Notice Banner */}
      {/* <div className="bg-red-950 text-white py-2.5 px-4 border-b-[3px] border-amber-500 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-medium text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-400" />
            <span className="text-red-200 tracking-wide uppercase text-[11px] font-bold">Official Record:</span>
          </div>
          <a 
            href="#" 
            className="flex items-center gap-2 text-white hover:text-amber-300 transition-colors underline decoration-red-600 hover:decoration-amber-300 underline-offset-4"
          >
            UPDATED SENATORS LIST - PRECEDENCE as at 9th February, 2026.pdf
            <Download size={14} />
          </a>
        </div>
      </div> */}

      {}
      {/* Custom Hero with reduced height and text overlay */}
      <div className="relative w-full min-h-[340px] flex items-center justify-center overflow-hidden bg-slate-900 border-b border-red-900/20">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/sessions_images/vss.jpeg')" }} 
        />
        {/* Theme Overlay (Deep Maroon/Red overlay for readability and branding) */}
        <div className="absolute inset-0 z-10 " />
        
        {/* Foreground Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <span className="inline-flex items-center justify-center py-1.5 px-4 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-5 border border-amber-500/30 shadow-sm">
            Capacity Development
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md tracking-tight">
            PUBLIC OUTREACH ACTIVITIES
          </h1>
          <p className="text-base md:text-lg  bg-blue-500/70 rounded-xl p-2  text-white text-xs font-bold tracking-widest uppercase mb-5 border border-amber-500/30 shadow-sm max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-medium">
            Explore learning, civic engagement, and institutional exchange programmes coordinated by the Senate Liaison Office under the Office of the Clerk of the Senate.
          </p>
        </div>
      </div>

      {}
      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-red-800 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-red-800/30"></span>
            Pathways
            <span className="w-8 h-0.5 bg-red-800/30"></span>
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Explore Our Programmes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {capacityPrograms.map((program) => (
            <a 
              key={program.title} 
              href={program.href} 
              className={`bg-white border ${program.border} p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${program.bg.replace('bg-', 'bg-').replace('50', '500')}`} />
              
              <div className={`w-14 h-14 rounded-full ${program.bg} flex items-center justify-center mb-6 ring-4 ring-white shadow-sm`}>
                <program.icon size={26} className={program.color} />
              </div>
              
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{program.title}</h3>
              </div>
              
              <span className={`inline-block text-xs font-bold uppercase tracking-wider ${program.color} ${program.bg} px-3 py-1 rounded-full mb-4`}>
                {program.duration}
              </span>
              
              <p className="text-sm font-semibold text-slate-700 mb-3 border-l-2 border-slate-200 pl-3">{program.audience}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{program.description}</p>
              
              <span className={`mt-auto inline-flex items-center gap-2 text-sm font-bold ${program.color}`}>
                Learn more 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Program Structure & High School Attachment */}
      <section className="bg-white border-y border-slate-200 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-50/50 via-white to-white opacity-60 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <GraduationCap className="text-red-800" size={20} />
              </div>
              <p className="text-sm font-bold text-red-800 uppercase tracking-widest">Internship &amp; Attachment</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">Standard Program Structure</h2>
            <ul className="space-y-5">
              {structure.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-600 group">
                  <div className="mt-0.5 bg-white rounded-full p-1 shadow-sm border border-slate-100 group-hover:border-red-200 transition-colors">
                    <CheckCircle2 size={18} className="text-red-700" />
                  </div>
                  <span className="text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <School className="text-amber-700" size={20} />
              </div>
              <p className="text-sm font-bold text-amber-700 uppercase tracking-widest">Voluntary Service Scheme</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">High School Attachment</h2>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              A structured two-week attachment giving high school students an opportunity to learn, observe, and gain practical exposure within the Senate of Kenya. All public and private high school students are eligible to apply through an official request letter to the Office of the Clerk of the Senate.
            </p>
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Key Highlights:</h4>
            <ul className="space-y-4">
              {vssHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2 shadow-sm" />
                  <span className="text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {}
      {/* Impact Section */}
      <section className="bg-red-950 py-24 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">Outcomes</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Programme Impact</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map((item, i) => (
              <div key={i} className="bg-red-900/50 hover:bg-red-900 border border-red-800/60 p-8 rounded-xl flex flex-col items-center text-center transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-950 flex items-center justify-center mb-6 shadow-inner border border-red-800/80">
                  <Users size={22} className="text-amber-400" />
                </div>
                <p className="text-sm text-red-50/90 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      {/* CTA */}
      <section className="py-24 bg-amber-50/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-6 border border-amber-100">
            <FileText size={28} className="text-amber-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Ready to Apply?</h2>
          <p className="text-slate-600 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Interested applicants and institutions should write to the Office of the Clerk of the Senate. Internship openings are advertised publicly and selected through the Senate Training Committee&apos;s competitive process.
          </p>
          <a
            href="mailto:clerk.senate@parliament.go.ke"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-900 text-white font-bold rounded-xl text-lg hover:bg-red-800 hover:shadow-lg hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-red-200"
          >
            clerk.senate@parliament.go.ke
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}