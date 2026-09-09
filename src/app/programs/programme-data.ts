import type { LucideIcon } from 'lucide-react';
import { BookOpenCheck, Building2, FileText, Globe2, GraduationCap, School } from 'lucide-react';

export type Programme = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  intro: string;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  sections: Array<{ title: string; items: string[] }>;
  steps?: Array<{ title: string; description: string }>;
  contact?: string;
};

export const programmeEntries: Programme[] = [
  {
    slug: 'internships-attachments', title: 'Attachment & Internship Programs', category: 'Capacity Development', icon: GraduationCap, iconColor: 'text-blue-600', iconBackground: 'bg-blue-500/10',
    summary: 'Structured, hands-on exposure to Parliament and devolved governance for graduates and continuing students.',
    intro: 'The Senate Liaison Office coordinates the Internship and Attachment Programs as part of its Capacity Development mandate, one of the office\'s three strategic pillars.',
    sections: [
      { title: 'Programme options', items: ['The Internship Program hosts 10 university and diploma graduates for 6 months, selected through a competitive Senate Training Committee interview process.', 'The Attachment Program hosts undergraduate and diploma students for 3 months. Intake is guided by directorate staffing needs and Senate Liaison Office recommendations.'] },
      { title: 'Programme structure', items: ['Onboarding support, including badges, lunch, stipend, agreement forms, log books, and the Constitution of Kenya.', 'Coordinated communication, daily attendance, and monthly progress and welfare meetings.', 'Lectures, stakeholder visits, research assignments, exit meetings, recommendation letters, and an official interns\' graduation ceremony.', 'An alumni network with continued engagement for two years after the internship.'] },
      { title: 'Outcomes', items: ['Stakeholder study tours and comprehensive exposure to legislative work.', 'Intern-authored papers, networking opportunities, and career-development lectures.'] },
    ],
  },
  {
    slug: 'high-school-attachment', title: 'Voluntary Service Scheme', category: 'High School Attachment', icon: School, iconColor: 'text-amber-600', iconBackground: 'bg-amber-500/10',
    summary: 'A two-week attachment that gives high school students practical exposure to the Senate of Kenya.',
    intro: 'The Voluntary Service Scheme / High School Attachment Program gives students a structured opportunity to learn, observe, and gain practical exposure within the Senate.',
    sections: [
      { title: 'What students experience', items: ['Understand the roles and functions of the Senate.', 'Interact with Senators and key departments.', 'Gain practical experience in parliamentary processes and governance.', 'Tour Parliament buildings and observe live proceedings in both chambers.', 'Join mentorship sessions and courtesy calls with senior officials.'] },
      { title: 'How the programme works', items: ['Schools submit an official request letter through the Office of the Clerk of the Senate.', 'Students are attached to Senate directorates and departments through intentional learning placements.', 'The programme includes interactive sessions, educational tours, mid-programme reviews, and an official closing session for feedback.'] },
      { title: 'Impact and eligibility', items: ['Builds understanding of legislation, democracy, and devolved governance.', 'Fosters career awareness, leadership, discipline, and civic responsibility.', 'All public and private high school students are eligible.'] },
    ],
  },
  {
    slug: 'public-petitions', title: 'Public Petitions to the Senate', category: 'Civic Engagement', icon: FileText, iconColor: 'text-red-600', iconBackground: 'bg-red-500/10',
    summary: 'Guidance for citizens on raising matters within the Senate\'s constitutional mandate.',
    intro: 'Every person has the right under Article 119 of the Constitution to petition Parliament on matters within its authority, including making, amending, or repealing laws.',
    sections: [
      { title: 'What is a petition?', items: ['A petition is a written request asking the Senate to consider a matter within its constitutional mandate and take appropriate action.', 'Petitions must be written in English or Kiswahili and use clear, respectful, and appropriate language.'] },
      { title: 'What to include', items: ['Title: PETITION TO THE SENATE OF THE REPUBLIC OF KENYA.', 'Petitioners: names, identification numbers, addresses, and signatures.', 'A clear subject matter and background explaining what happened, who is affected, and why the Senate should consider it.', 'Previous efforts taken to address the matter, including any response received from the relevant authority.', 'The status of the matter, including whether it is pending before a court or another body.', 'Grounds for the petition and a clear prayer stating what action the Senate should take.'] },
      { title: 'Possible remedies', items: ['Investigate the matter.', 'Engage the relevant State department or county government.', 'Recommend appropriate remedial measures.', 'Take another action within its constitutional mandate to address the matter.'] },
    ],
    steps: [
      { title: 'Prepare the petition', description: 'Use the Senate-required format and include all supporting information.' },
      { title: 'Submit to the Clerk', description: 'Deliver the written petition directly to the Clerk of the Senate.' },
      { title: 'Or work through a Senator', description: 'A Senator may present the petition with the Speaker\'s consent.' },
      { title: 'Senate consideration', description: 'The Clerk checks the petition before it is presented and referred to the relevant standing committee.' },
      { title: 'Receive a response', description: 'The relevant committee responds through a report within 60 calendar days from the reading of the prayer.' },
    ],
  },
  {
    slug: 'equitable-revenue-sharing', title: 'Equitable Sharing of Revenue', category: 'County Governance', icon: Building2, iconColor: 'text-[var(--primary)]', iconBackground: 'bg-[var(--primary)]/10',
    summary: 'How Kenya\'s equitable share is allocated among county governments and how it has grown under devolution.',
    intro: 'The Senate supports public access to information on the equitable sharing of revenue among county governments, a core feature of Kenya\'s devolved system of government.',
    sections: [
      { title: 'Fourth Generation Formula (2025/2026 - 2029/2030)', items: ['Approved in June 2025 for the current five-year allocation cycle.', 'Population Index: 45% weight, using the 2019 Census.', 'Basic Equal Share Index: 35% weight.', 'Poverty Index: 12% weight, using the 2022 KNBS report.', 'Geographical Size Index: 8% weight.', 'A dedicated KSh 4.46 billion Special Affirmative Allocation supports 12 historically marginalized counties.'] },
      { title: 'How the formula has evolved', items: ['First Generation Formula (2013/2014 - 2016/2017): population 45%, basic equal share 25%, poverty 20%, land area 8%, and fiscal responsibility 2%.', 'Second Generation Formula (2017/2018 - 2019/2020): population 45%, basic equal share 26%, poverty 18%, land area 8%, fiscal responsibility 2%, and development factor 1%.', 'Third Generation Formula (2020/2021 - 2024/2025): approved in September 2020, ensuring no county lost its 2019/2020 baseline allocation.'] },
      { title: 'Growth in county revenue', items: ['The equitable share grew from KSh 190 billion in 2013/2014 to the KSh 458.94 billion recommended by the Commission on Revenue Allocation for 2026/2027.', 'This represents an increase of approximately 141%.', 'The 2026/2027 recommendation is approximately 23.9% of the most recent audited and approved national revenue of KSh 1,920.4 billion for 2021/2022.', 'This is above the constitutional minimum of 15% set out in Article 203(2) of the Constitution.'] },
    ],
  },
  {
    slug: 'county-legislation-tracker', title: 'County Legislation Tracker', category: 'Digital Civic Access', icon: BookOpenCheck, iconColor: 'text-teal-600', iconBackground: 'bg-teal-500/10',
    summary: 'A public platform for monitoring county bills and legislative processes across Kenya.',
    intro: 'The County Legislation Tracker is a web-based platform developed by the Senate with support from the Westminster Foundation for Democracy to provide transparent, up-to-date county legislative information in line with the Access to Information Act, 2016.',
    sections: [
      { title: 'What the platform provides', items: ['Detailed records of county bills and their progress through legislative stages.', 'A way for citizens to understand how proposed laws may affect their communities.', 'A tool for Senators to follow bills across county governments.'] },
      { title: 'Features and benefits', items: ['Real-time updates and detailed bill information.', 'Tools to track specific legislation and engage with legislative information.', 'Educational resources and future petition functionality.'] },
      { title: 'Get started', items: ['Visit slo-countybills.go.ke to review and monitor county bills relevant to your interests.', 'Share feedback through the Senate Liaison Office communication channels.'] },
    ],
    contact: 'https://slo-countybills.go.ke',
  },
  {
    slug: 'local-benchmarking', title: 'Local Benchmarking Visits', category: 'Knowledge Exchange', icon: Building2, iconColor: 'text-[var(--primary)]', iconBackground: 'bg-[var(--primary)]/10',
    summary: 'Tailored Senate engagements for local delegations seeking practical institutional learning.',
    intro: 'The Senate Liaison Office coordinates local benchmarking visits so delegations have a well-planned, informative, and productive engagement with the Senate.',
    sections: [
      { title: 'What a visit may include', items: ['Departmental engagements with relevant Senate offices and directorates.', 'Parliamentary orientation on institutional practices and procedures.', 'A Parliament tour, coordinated protocol and access, and knowledge exchange.'] },
      { title: 'Why benchmark at the Senate?', items: ['Gain exposure to parliamentary procedures, practices, and institutional operations.', 'Engage with Senators and Senate staff for practical insights.', 'Explore approaches that can strengthen your organisation and build institutional connections.', 'Receive a programme tailored around your delegation\'s objectives and areas of interest.'] },
    ],
    steps: [
      { title: 'Submit a request', description: 'Send an introductory letter to the Clerk of the Senate requesting a benchmarking opportunity.' },
      { title: 'Request review', description: 'The request is reviewed and forwarded to the Senate Liaison Office.' },
      { title: 'Programme development', description: 'The office coordinates with relevant departments and develops the visit programme.' },
      { title: 'Confirmation and facilitation', description: 'The delegation receives programme and logistics information for the confirmed visit.' },
      { title: 'Visit and feedback', description: 'The delegation undertakes the programme and provides feedback for continuous improvement.' },
    ],
  },
  {
    slug: 'international-benchmarking', title: 'International Benchmarking Visits', category: 'Global Engagement', icon: Globe2, iconColor: 'text-sky-600', iconBackground: 'bg-sky-500/10',
    summary: 'Coordinated Senate benchmarking opportunities for international delegations and institutions.',
    intro: 'The Senate Liaison Office is the main coordination department for international delegations and institutions seeking benchmarking opportunities with the Senate of Kenya.',
    sections: [
      { title: 'Core functions', items: ['Receive and process requests from international delegations.', 'Liaise with Senate directorates and departments, schedule visits, and prepare official communication, logistics notes, and study-visit programmes.', 'Coordinate security, protocol, transport, catering, and public communications.'] },
      { title: 'Facilitating study visits', items: ['Organise meetings with relevant directorates and guided tours of Parliament, including the Speaker\'s gallery.', 'Support practical study visits and county-level benchmarking activities.', 'Work with embassies, the Ministry of Foreign Affairs, and other institutions to provide smooth facilitation for guests.', 'Gather feedback from delegations to improve future engagements.'] },
      { title: 'Value of international visits', items: ['Learn from parliamentary practices, procedures, and institutional models in other jurisdictions.', 'Exchange experiences with Senators, parliamentary officials, and relevant institutions.', 'Build professional and institutional networks with international counterparts.'] },
    ],
  },
  {
    slug: 'public-participation', title: 'Public Participation', category: 'Civic Engagement', icon: FileText, iconColor: 'text-red-600', iconBackground: 'bg-red-500/10',
    summary: 'Clear guidance for citizens and stakeholders to make their views heard in Senate business.',
    intro: 'Public participation lets citizens and stakeholders share views, concerns, and recommendations on decisions, laws, policies, and other matters that affect them. It is a constitutional right under Article 118.',
    sections: [
      { title: 'Ways to participate', items: ['Submit a written memorandum.', 'Attend a Committee public hearing.', 'Give your views on a Bill or petition.', 'Engage with your Senator.'] },
      { title: 'What to include in a memorandum', items: ['The Bill or matter title, your name or organisation, and relevant background.', 'Your position: support, oppose, or amend, with specific clauses or issues.', 'Reasons, evidence, recommended amendments or actions, a conclusion, and contact details.', 'If representing a community or organisation, clearly state the basis of that representation.'] },
      { title: 'Submission channels', items: ['Email: clerk.senate@parliament.go.ke.', 'Hand delivery: Office of the Clerk of the Senate, Main Parliament Buildings, Nairobi.', 'Post: P.O. Box 41842-00100, Nairobi.', 'Always check the relevant public-participation notice for its committee email address and deadline.'] },
    ],
    steps: [
      { title: 'Find the Bill or matter', description: 'Read the Bill and check the Senate public-participation notice.' },
      { title: 'Share your views', description: 'Identify the issue or clause, explain your concern, and state what you propose to change and why.' },
      { title: 'Submit on time', description: 'Follow the deadline and submission instructions in the public-participation notice.' },
    ],
  },
];

export function getProgramme(slug: string) {
  return programmeEntries.find((programme) => programme.slug === slug);
}