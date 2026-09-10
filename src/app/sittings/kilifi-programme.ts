export type ProgrammeItem = {
  number?: number;
  time: string;
  title: string;
  description?: string;
  venue: string;
};

export type ProgrammeDay = {
  date: string;
  items: ProgrammeItem[];
};

export const kilifiProgramme: ProgrammeDay[] = [
  {
    date: 'Saturday, 19th September 2026',
    items: [{ time: 'All day', title: 'Arrivals and hotel check-in', description: 'Arrival in Malindi town, Kilifi County, and check-in at respective hotels.', venue: 'Malindi town' }],
  },
  {
    date: 'Sunday, 20th September 2026',
    items: [
      { number: 1, time: '9:00 a.m. - 2:00 p.m.', title: 'Preparatory activities and arrangements', description: 'Secretariat preparations for the upcoming week.', venue: 'Kilifi County Assembly' },
      { number: 2, time: '2:00 p.m. - 4:30 p.m.', title: 'KEWOSA visit to Mtangani Women\'s Prison', description: 'Kenya Women Senators\' Association visit in Malindi town.', venue: 'Mtangani Women\'s Prison' },
      { number: 3, time: '2:00 p.m. - 4:00 p.m.', title: 'Football match', description: 'Senate vs Kilifi County Assembly.', venue: 'Town Secondary School, Malindi' },
      { number: 4, time: '5:00 p.m. - 6:00 p.m.', title: 'Briefing for Senate officers and county staff', description: 'Briefing of all Senate officers and designated County Assembly staff.', venue: 'Kilifi County Assembly, Senators\' Tent' },
      { number: 5, time: '5:30 p.m. - 8:00 p.m.', title: 'KEWOSA coastal women engagement', description: 'Dinner-setting engagement with coastal women caucuses and community leaders.', venue: 'To be confirmed' },
      { number: 6, time: '6:00 p.m. - 7:00 p.m.', title: 'Legislative and procedural briefing', description: 'Secretariat briefing.', venue: 'Kilifi County Assembly Board Room' },
    ],
  },
  {
    date: 'Monday, 21st September 2026',
    items: [
      { number: 7, time: '8:30 a.m. - 4:00 p.m.', title: 'Staff exchange', description: 'Exchange between Senate directorates/departments and their County Assembly counterparts.', venue: 'Directorates and Departments offices' },
      { number: 8, time: '8:30 a.m.', title: 'Equalization Fund projects inspection', description: 'Finance and Budget and Roads, Transportation and Housing Committees inspect projects in Ganze Sub-County.', venue: 'Inspection visit' },
      { number: 9, time: '9:00 a.m.', title: 'Health services joint oversight visit', description: 'Health and County Public Investments and Special Funds Committees assess healthcare at Malindi and Marafa Sub-County Hospitals.', venue: 'Inspection visit' },
      { number: 10, time: '9:00 a.m.', title: 'Environmental audits of coastal mining companies', description: 'Land, Environment and Natural Resources Committee meets environment and mining ministries and mining companies.', venue: 'Designated Assembly Library, New Assembly Building' },
      { number: 11, time: '10:30 a.m. - 11:30 a.m.', title: 'Senate and Kilifi County Executive leadership meeting', venue: 'Office of the Governor, Kilifi Town' },
      { number: 12, time: '12:30 p.m. - 3:30 p.m.', title: 'KEWOSA school outreach', description: 'Outreach to Gede Primary School and Gede Special School.', venue: 'Gede Primary School and Gede Special School' },
      { number: 13, time: '1:00 p.m.', title: 'Mining, quarry and Mnarani Jetty inspections', description: 'Land Committee visits Krystalline Salt Limited and Mjana Heri sand quarries, and follows up on land ownership of Mnarani Jetty.', venue: 'Inspection visits' },
      { time: '1:00 p.m. - 2:00 p.m.', title: 'Lunch', venue: 'Catering Tents' },
      { number: 14, time: '2:00 p.m. - 3:00 p.m.', title: 'Senate and Kilifi County Assembly leadership meeting', venue: 'Kilifi County Assembly Chamber, Malindi Town' },
      { number: 15, time: '7:30 p.m. - 9:30 p.m.', title: 'Welcome dinner', description: 'Hosted by Sen. (Rtd) Justice Stewart Madzayo, CBS, MP.', venue: 'Venue to be communicated' },
    ],
  },
  {
    date: 'Tuesday, 22nd September 2026',
    items: [
      { number: 16, time: '8:30 a.m. - 4:00 p.m.', title: 'Staff exchange', description: 'Exchange between directorates and departments.', venue: 'Directorates and Departments offices' },
      { number: 17, time: '7:30 a.m.', title: 'Blue economy facilities inspection and stakeholder engagement', description: 'Agriculture, Energy, and Land Committees inspect cold storage, fish banda, gear shed, solar project and waste digester; engage beach management units, traders and women\'s groups; and discuss sustainability.', venue: 'Inspection visit' },
      { number: 18, time: '8:30 a.m. - 11:00 a.m.', title: 'KEWOSA visit to Malindi Sub-County Hospital', venue: 'Malindi Sub-County Hospital' },
      { number: 19, time: '8:30 a.m.', title: 'Pending bills meeting', description: 'Finance and Budget Committee meets the Kilifi County Executive.', venue: 'Malindi Municipal Social Hall, First Floor' },
      { number: 20, time: '8:30 a.m.', title: 'Infrastructure projects meeting', description: 'Roads, Transportation and Housing Committee meets the Cabinet Secretary, Ministry of Roads and Transportation.', venue: 'Tent 1, New Assembly Building Grounds' },
      { number: 21, time: '8:30 a.m.', title: 'Social protection programmes meeting', description: 'Labour and Social Welfare Committee meets national and county social-protection officers and Older Persons\' Associations.', venue: 'Tent 2, New Assembly Building Grounds' },
      { number: 22, time: '8:30 a.m.', title: 'Health resolutions implementation meeting', description: 'Health Committee meets Governors of Taita/Taveta, Kwale, Mombasa and Lamu Counties.', venue: 'Designated Assembly Library, New Assembly Building' },
      { number: 23, time: '9:00 a.m.', title: 'ECDE centres oversight visit', description: 'Education Committee visits Sabaki, Malindi Central and Sir Ali Bin Salim ECDE centres.', venue: 'Inspection visit' },
      { number: 24, time: '9:00 a.m.', title: 'Kilifi County ICT assessment', description: 'ICT Committee assesses digital transformation, ICT policy and technology-enabled service delivery.', venue: 'Kilifi County Headquarters' },
      { number: 25, time: '9:00 a.m.', title: 'County development projects inspection', description: 'County Public Accounts Committee visits the proposed County Headquarters and Referral Hospital outpatient block.', venue: 'Inspection visit' },
      { number: 26, time: '9:00 a.m.', title: 'Trade and tourism site visits', description: 'Trade, Industrialization and Tourism Committee visits the CAIP at Sabaki and a shipbuilding company at Old Ferry Ramp, Kilifi Creek.', venue: 'Inspection visit' },
      { number: 27, time: '10:00 a.m.', title: 'Coastal cohesion town hall', description: 'National Cohesion Committee meets NCIC, national administration, community elders and the public on inter-community relations and election preparedness.', venue: 'Malindi Municipal Social Hall, First Floor' },
      { number: 28, time: '10:00 a.m. - 11:00 a.m.', title: 'Speaker\'s Panel meeting', venue: 'Board Room, Kilifi County Assembly' },
      { number: 29, time: '11:00 a.m. - 12:30 p.m.', title: 'Senate Business Committee meeting', venue: 'Board Room, Kilifi County Assembly' },
      { number: 30, time: '11:30 a.m.', title: 'Security and disaster management meeting', description: 'National Security Committee meets the Governor and County Commissioner on security, crime prevention, firefighting and disaster readiness.', venue: 'Tent 2, New Assembly Building Grounds' },
      { number: 31, time: '11:30 a.m.', title: 'Tana River county entities resolutions meeting', description: 'County Public Investments and Special Funds Committee meets the Tana River County Executive.', venue: 'Tent 1, New Assembly Building Grounds' },
      { number: 32, time: '11:30 a.m.', title: 'Delegated legislation experience-sharing meeting', description: 'Committee meets Kilifi County officials and the County Assembly Committee on delegated legislation, statutory instruments and public participation.', venue: 'Designated Assembly Library, New Assembly Building' },
      { time: '12:30 p.m. - 2:00 p.m.', title: 'Lunch', venue: 'Catering Tents' },
      { number: 33, time: '2:30 p.m. - 6:30 p.m.', title: 'Senate plenary', venue: 'Kilifi County Assembly Chamber' },
      { number: 34, time: '7:30 p.m. - 9:30 p.m.', title: 'Dinner hosted by the Speaker of the Senate', venue: 'Venue to be communicated' },
    ],
  },
  {
    date: 'Wednesday, 23rd September 2026',
    items: [
      { number: 35, time: '8:30 a.m. - 4:00 p.m.', title: 'Staff exchange', description: 'Exchange between directorates and departments.', venue: 'Directorates and Departments offices' },
      { number: 36, time: '9:30 a.m. - 1:00 p.m.', title: 'Senate plenary', venue: 'Kilifi County Assembly Chamber' },
      { time: '12:30 p.m. - 2:00 p.m.', title: 'Lunch', venue: 'Catering Tent' },
      { number: 37, time: '2:30 p.m. - 6:30 p.m.', title: 'Senate plenary', venue: 'Kilifi County Assembly Chamber' },
    ],
  },
  {
    date: 'Thursday, 24th September 2026',
    items: [
      { number: 38, time: '8:30 a.m. - 4:00 p.m.', title: 'Staff exchange', description: 'Exchange between directorates and departments.', venue: 'Directorates and Departments offices' },
      { number: 39, time: '8:00 a.m.', title: 'Tezo Cashew Processing Plant inspection', description: 'Agriculture, Livestock and Fisheries and Labour and Social Welfare Committees assess workplace safety, labour practices, welfare, value addition and agro-processing.', venue: 'Inspection visit' },
      { number: 40, time: '8:30 a.m.', title: 'Justice, legal affairs and human rights meeting', description: 'Committee meets the Kilifi County Assembly Justice and Legal Affairs Committee and KNCHR.', venue: 'Kilifi County Assembly Committee Room' },
      { time: '8:30 a.m.', title: 'Ganda Ward land petition meeting', description: 'Land Committee meets the County Government, petitioners and claimant on reported threats, intimidation, harassment and eviction.', venue: 'Designated Assembly Library, New Assembly Building' },
      { number: 41, time: '8:30 a.m.', title: 'Water services delivery meeting', description: 'County Public Investments and Special Funds Committee meets Coast Water Works Development Agency and water service providers.', venue: 'Tent 2, New Assembly Building Grounds' },
      { number: 42, time: '8:30 a.m.', title: 'Municipal governance meeting and oversight visit', description: 'Devolution and Intergovernmental Relations Committee meets its County Assembly counterpart and visits Malindi Municipal Board Offices.', venue: 'Malindi Municipal Social Hall, First Floor' },
      { number: 43, time: '9:00 a.m.', title: 'Huduma Centre digital services visit', description: 'ICT Committee evaluates ICT-enabled public service delivery and integrated digital government services.', venue: 'Huduma Centre, Malindi' },
      { number: 44, time: '9:00 a.m.', title: 'Marine park and sand dunes visit', description: 'Trade, Industrialization and Tourism Committee visits Malindi Marine National Park and Reserve and Mambrui Sand Dunes.', venue: 'Inspection visit' },
      { number: 45, time: '11:30 a.m.', title: 'ECDE audit recommendations meeting', description: 'Education Committee meets the Governor, Kilifi County.', venue: 'Tent 1, New Assembly Building Grounds' },
      { number: 46, time: '11:30 a.m.', title: 'Energy infrastructure meeting', description: 'Energy Committee meets Kilifi County energy, land and housing officials and the County Assembly counterpart committee.', venue: 'Tent 2, New Assembly Building Grounds' },
      { number: 47, time: '11:30 a.m.', title: 'Unplanned urban development meeting', description: 'Land Committee meets the Governor, Mombasa County, on the statement sought by Sen. Mohammed Faki, CBS, MP.', venue: 'Designated Assembly Library, New Assembly Building' },
      { time: '12:30 p.m. - 2:00 p.m.', title: 'Lunch', venue: 'Catering Tents' },
      { number: 48, time: '2:30 p.m. - 6:30 p.m.', title: 'Senate plenary', venue: 'Kilifi County Assembly Chamber' },
      { number: 49, time: '6:30 p.m. - 8:00 p.m.', title: 'Parliamentary staff debriefing', venue: 'Kilifi County Assembly premises' },
    ],
  },
  {
    date: 'Friday, 25th September 2026',
    items: [
      { number: 50, time: '9:00 a.m.', title: 'Healthcare provision meeting', description: 'Health Committee meets the Governor, Kilifi County and the County Assembly Health Services Committee on preliminary oversight findings.', venue: 'Designated Assembly Library, New Assembly Building' },
      { number: 51, time: '9:00 a.m. - 4:00 p.m.', title: 'Closure and handover of Assembly premises', venue: 'Kilifi County Assembly' },
    ],
  },
  {
    date: 'Saturday, 26th September 2026',
    items: [{ time: 'All day', title: 'Departures and hotel check-out', description: 'Departures from Kilifi County and check-out of respective hotels.', venue: 'Kilifi County' }],
  },
];