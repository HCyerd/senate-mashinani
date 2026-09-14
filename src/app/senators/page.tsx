'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, Search, MapPin, ChevronDown, User, Crown, ShieldCheck, Star, Award } from 'lucide-react';

// Interfaces
interface Leader {
  id: string;
  role: string;
  name: string;
  title: string;
  countyOrSeat: string;
  party: string;
  partyColor: string;
  category: 'Presiding' | 'Majority' | 'Minority';
  image: string;
  description: string;
  honour?: string;
}

interface Senator {
  id: number;
  name: string;
  county: string;
  party: string;
  partyColor: string;
  type: 'Elected' | 'Nominated (Women)' | 'Nominated (Youth)' | 'Nominated (PWD)';
  image: string;
  honour?: string;
}

// 13th Parliament House Leadership Data with National Honours (EGH, MGH, CBS, etc.)
const HOUSE_LEADERSHIP: Leader[] = [
  {
    id: 'spk-1',
    role: 'Speaker of the Senate',
    name: 'Rt. Hon. Amason Jeffah Kingi',
    honour: 'EGH',
    title: 'Head of the Senate & Presiding Officer',
    countyOrSeat: 'Ex-Officio Member',
    party: 'PAA / Independent Speaker',
    partyColor: 'bg-amber-500',
    category: 'Presiding',
    image: '/senators_images/Amason_Jeffah_Kingi_Senator.jpg',
    description: 'Presides over Senate proceedings, maintains order, and protects the rights and privileges of Senators.'
  },
  {
    id: 'dspk-1',
    role: 'Deputy Speaker of the Senate',
    name: 'Sen. Kathuri Murungi',
    honour: 'MGH',
    title: 'Deputy Presiding Officer',
    countyOrSeat: 'Meru County',
    party: 'UDA',
    partyColor: 'bg-yellow-500',
    category: 'Presiding',
    image: '/senators_images/Murungi_Kathuri_Senator.jpg',
    description: 'Presides over house sittings in the absence of the Speaker and chairs the Committee of the Whole House.'
  },
  {
    id: 'maj-lead',
    role: 'Senate Majority Leader',
    name: 'Sen. Aaron Kipkirui Cheruiyot',
    honour: 'EGH',
    title: 'Leader of Majority Party',
    countyOrSeat: 'Kericho County',
    party: 'UDA',
    partyColor: 'bg-yellow-500',
    category: 'Majority',
    image: '/senators_images/Aaron_Kipkirui_Cheruiyot_Senator.jpg',
    description: 'Leads Government business in the Senate and coordinates legislative priority policies.'
  },
  {
    id: 'min-lead',
    role: 'Senate Minority Leader',
    name: 'Sen. Justice (Rtd.) Stewart Mwachiru Shadrack Madzayo',
    honour: 'EGH',
    title: 'Leader of Minority Party / Opposition',
    countyOrSeat: 'Kilifi County',
    party: 'ODM',
    partyColor: 'bg-orange-500',
    category: 'Minority',
    image: '/senators_images/Justice_Stewart_Madzayo_Senator.jpg',
    description: 'Leads the Minority party coalition and articulates alternative legislative positions and oversight.'
  },
  {
    id: 'maj-whip',
    role: 'Majority Whip',
    name: 'Sen. (Dr.) Boni Khalwale',
    honour: 'CBS',
    title: 'Chief Majority Whip',
    countyOrSeat: 'Kakamega County',
    party: 'UDA',
    partyColor: 'bg-yellow-500',
    category: 'Majority',
    image: '/senators_images/Khalwale_Boni_Senator.jpg',
    description: 'Manages party discipline, attendance, and mobilizes Majority members during critical votes.'
  },
  {
    id: 'min-whip',
    role: 'Minority Whip',
    name: 'Sen. Ledama Olekina',
    honour: 'CBS',
    title: 'Chief Minority Whip',
    countyOrSeat: 'Narok County',
    party: 'ODM',
    partyColor: 'bg-orange-500',
    category: 'Minority',
    image: '/senators_images/Olekina_Ledama_Senator.jpg',
    description: 'Ensures Minority party attendance, organizes voting strategy, and manages committee assignments.'
  },
  {
    id: 'dep-maj-lead',
    role: 'Deputy Majority Leader',
    name: 'Sen. Tabitha Karanja Keroche',
    honour: 'MGH',
    title: 'Deputy Leader of Government Business',
    countyOrSeat: 'Nakuru County',
    party: 'UDA',
    partyColor: 'bg-yellow-500',
    category: 'Majority',
    image: '/senators_images/Keroche_Tabitha_Karanja_Senator.jpg',
    description: 'Assists the Majority Leader in steering Government legislative priorities.'
  },
  {
    id: 'dep-min-lead',
    role: 'Deputy Minority Leader',
    name: 'Sen. Enoch Kiio Wambua',
    honour: 'CBS',
    title: 'Deputy Leader of Minority Party',
    countyOrSeat: 'Kitui County',
    party: 'WDM-K',
    partyColor: 'bg-blue-400',
    category: 'Minority',
    image: '/senators_images/Wambua_Enoch_Kiio_Senator.jpg',
    description: 'Supports Minority coalition leadership and floor strategy execution.'
  },
  {
    id: 'dep-maj-whip',
    role: 'Deputy Majority Whip',
    name: 'Sen. (Dr.) Steve Lelegwe Ltumbesi',
    honour: 'CBS',
    title: 'Deputy Whip (Majority)',
    countyOrSeat: 'Samburu County',
    party: 'UDA',
    partyColor: 'bg-yellow-500',
    category: 'Majority',
    image: '/senators_images/Lelegwe_Steve_Ltumbesi_Senator.jpg',
    description: 'Assists the Chief Majority Whip with floor attendance and division voting.'
  },
  {
    id: 'dep-min-whip',
    role: 'Deputy Minority Whip',
    name: 'Sen. Eddy Oketch',
    honour: '',
    title: 'Deputy Whip (Minority)',
    countyOrSeat: 'Migori County',
    party: 'ODM',
    partyColor: 'bg-orange-500',
    category: 'Minority',
    image: '/senators_images/Oketch_Eddy_Gicheru_Senator.jpg',
    description: 'Assists the Chief Minority Whip in organizing legislative actions and coalition unity.'
  }
];

// Complete dataset for the 13th Parliament of Kenya Senators with National Honours and Titles
const SENATORS_DATA: Senator[] = [
  // --- ELECTED SENATORS (47 COUNTIES) ---
  { id: 1, name: 'Mohamed Faki Mwinyihaji', honour: 'CBS', county: 'Mombasa', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Faki_Mohamed_Mwinyihaji_Senator.jpg' },
  { id: 2, name: 'Issa Juma Boy', honour: 'CBS', county: 'Kwale', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Boy_Issa_Juma_Senator.jpg' },
  { id: 3, name: 'Justice (Rtd.) Stewart Mwachiru Shadrack Madzayo', honour: 'EGH', county: 'Kilifi', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Justice_Stewart_Madzayo_Senator.jpg' },
  { id: 4, name: 'Danson Buya Mungatana', honour: 'MGH', county: 'Tana River', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Mungatana_Danson_Buya_Senator.jpg' },
  { id: 5, name: 'Joseph Githuku Kamau', honour: '', county: 'Lamu', party: 'Jubilee', partyColor: 'bg-red-600', type: 'Elected', image: '/senators_images/Kamau_Joseph_Githuku_Senator.jpg' },
  { id: 6, name: 'Johnes Mwashushe Mwaruma', honour: 'CBS', county: 'Taita Taveta', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Mwaruma_Johnes_M_Senator.jpg' },
  { id: 7, name: 'Abdul Mohammed Haji', honour: 'CBS', county: 'Garissa', party: 'Jubilee', partyColor: 'bg-red-600', type: 'Elected', image: '/senators_images/Haji_Abdul_Mohammed_Senator.jpg' },
  { id: 8, name: 'Abass Sheikh Mohamed', honour: 'CBS', county: 'Wajir', party: 'UDM', partyColor: 'bg-yellow-600', type: 'Elected', image: '/senators_images/Mohamed_Abass_Sheikh_Senator.jpg' },
  { id: 9, name: '(Capt.) Ali Ibrahim Roba', honour: 'EGH', county: 'Mandera', party: 'UDM', partyColor: 'bg-yellow-600', type: 'Elected', image: '/senators_images/Roba_Ali_Ibrahim_Senator.jpg' },
  { id: 10, name: 'Mohamed Said Chute', honour: 'CBS', county: 'Marsabit', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Chute_Mohamed_Said_Senator.jpg' },
  { id: 11, name: 'Fatuma Adan Dullo', honour: 'CBS', county: 'Isiolo', party: 'Jubilee', partyColor: 'bg-red-600', type: 'Elected', image: '/senators_images/Dullo_Fatuma_Adan_Senator.jpg' },
  { id: 12, name: 'Kathuri Murungi', honour: 'MGH', county: 'Meru', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Murungi_Kathuri_Senator.jpg' },
  { id: 13, name: 'Mwenda Gataya Mo Fire', honour: 'CBS', county: 'Tharaka Nithi', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Gataya_Mo_Fire_Senator.jpg' },
  { id: 14, name: 'Alexander Munyi Mundigi', honour: '', county: 'Embu', party: 'DP', partyColor: 'bg-green-600', type: 'Elected', image: '/senators_images/Munyi_Alexander_Mundigi_Senator.jpg' },
  { id: 15, name: 'Enoch Kiio Wambua', honour: 'CBS', county: 'Kitui', party: 'WDM-K', partyColor: 'bg-blue-400', type: 'Elected', image: '/senators_images/Wambua_Enoch_Kiio_Senator.jpg' },
  { id: 16, name: 'Agnes Kavindu Muthama', honour: '', county: 'Machakos', party: 'WDM-K', partyColor: 'bg-blue-400', type: 'Elected', image: '/senators_images/Muthama_Agnes_Kavindu_Mbuku_Senator.jpg' },
  { id: 17, name: 'Daniel Kitonga Maanzo', honour: 'EBS', county: 'Makueni', party: 'WDM-K', partyColor: 'bg-blue-400', type: 'Elected', image: '/senators_images/Maanzo_Daniel_Kitonga_Senator.jpg' },
  { id: 18, name: 'John Muhia Methu', honour: '', county: 'Nyandarua', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Methu_John_Muhia_Senator.jpg' },
  { id: 19, name: 'Wahome Wamatinga', honour: 'CBS', county: 'Nyeri', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Wamatinga_Wahome_Senator.jpg' },
  { id: 20, name: 'James Kamau Murango', honour: '', county: 'Kirinyaga', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Murango_James_Kamau_Senator.jpg' },
  { id: 21, name: 'Joe Nyutu', honour: '', county: "Murang'a", party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Joe_Nyutu_Senator.jpg' },
  { id: 22, name: 'Paul Karungo Thangwa', honour: '', county: 'Kiambu', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Karungo_Paul_Thangwa_Senator.jpg' },
  { id: 23, name: 'James Lomenen Ekomwa', honour: 'CBS', county: 'Turkana', party: 'Jubilee', partyColor: 'bg-red-600', type: 'Elected', image: '/senators_images/Ekomwa_James_Lomenen_Senator.jpg' },
  { id: 24, name: '(Rev.) Julius Murgor Recha', honour: 'CBS', county: 'West Pokot', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Recha_Julius_Murgor_Senator.jpg' },
  { id: 25, name: '(Dr.) Steve Lelegwe Ltumbesi', honour: 'CBS', county: 'Samburu', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Lelegwe_Steve_Ltumbesi_Senator.jpg' },
  { id: 26, name: 'Allan Kiprotich Chesang', honour: 'CBS', county: 'Trans Nzoia', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Chesang_Allan_Kiprotich_Senator.jpg' },
  { id: 27, name: 'Jackson Kiplagat Mandago', honour: 'EGH', county: 'Uasin Gishu', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Kiplagat_Jackson_Mandago_Senator.jpg' },
  { id: 28, name: 'William Kisang', honour: 'CBS', county: 'Elgeyo Marakwet', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Kisang_William_Kipkemoi_Senator.jpg' },
  { id: 29, name: 'Samson Kiprotich Cherarkey', honour: '', county: 'Nandi', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Cherarkey_Samson_K_Senator.jpg' },
  { id: 30, name: 'Cheburet Kiprono Chemitei', honour: '', county: 'Baringo', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Kiprono_Chemitei_Senator.jpg' },
  { id: 31, name: 'John Kinyua Nderitu', honour: '', county: 'Laikipia', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Nderitu_John_Kinyua_Senator.jpg' },
  { id: 32, name: 'Tabitha Karanja Keroche', honour: 'MGH', county: 'Nakuru', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Keroche_Tabitha_Karanja_Senator.jpg' },
  { id: 33, name: 'Ledama Olekina', honour: 'CBS', county: 'Narok', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Olekina_Ledama_Senator.jpg' },
  { id: 34, name: 'Lenku Ole Kanar Seki', honour: '', county: 'Kajiado', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Seki_Lenku_Ole_Kanar_Senator.jpg' },
  { id: 35, name: 'Aaron Kipkirui Cheruiyot', honour: 'EGH', county: 'Kericho', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Aaron_Kipkirui_Cheruiyot_Senator.jpg' },
  { id: 36, name: 'Wakili Kiprotich Sigei Hillary', honour: 'CBS', county: 'Bomet', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Hillary_Kiprotich_Sigei_Senator.jpg' },
  { id: 37, name: '(Dr.) Boni Khalwale', honour: 'CBS', county: 'Kakamega', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Elected', image: '/senators_images/Khalwale_Boni_Senator.jpg' },
  { id: 38, name: 'Godfrey Atieno Osotsi', honour: 'CBS', county: 'Vihiga', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Osotsi_Godfrey_Atieno_Senator.jpg' },
  { id: 39, name: 'David Wafula Wakoli', honour: 'CBS', county: 'Bungoma', party: 'Ford - K', partyColor: 'bg-green-500', type: 'Elected', image: '/senators_images/David_Wakoli_Wafula_Senator.jpg' },
  { id: 40, name: 'Andrew Omtatah Okoiti', honour: '', county: 'Busia', party: 'NRA', partyColor: 'bg-blue-600', type: 'Elected', image: '/senators_images/Okoiti_Andrew_Omtatah_Senator.jpg' },
  { id: 41, name: '(Dr.) Oburu Oginga', honour: 'MGH', county: 'Siaya', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Oginga_Oburu_Senator.jpg' },
  { id: 42, name: '(Prof.) Tom Odhiambo Ojienda', honour: 'SC', county: 'Kisumu', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Tom_Odhiambo_Ojienda_Senator.jpg' },
  { id: 43, name: 'Moses Otieno Kajwang', honour: 'CBS', county: 'Homa Bay', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Moses_Otieno_Kajwang_Senator.jpg' },
  { id: 44, name: 'Eddy Gicheru Oketch', honour: '', county: 'Migori', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Oketch_Eddy_Gicheru_Senator.jpg' },
  { id: 45, name: 'Richard Momoima Onyonka', honour: '', county: 'Kisii', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Onyonka_Richard_Momoima_Senator.jpg' },
  { id: 46, name: "Erick Okong'o Mogeni", honour: 'SC, CBS', county: 'Nyamira', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Mogeni_Erick_Okongo_Senator.jpg' },
  { id: 47, name: 'Edwin Watenya Sifuna', honour: 'CBS', county: 'Nairobi', party: 'ODM', partyColor: 'bg-orange-500', type: 'Elected', image: '/senators_images/Sifuna_Edwin_Watenya_Senator.jpg' },

  // --- NOMINATED SENATORS (20 MEMBERS) ---
  { id: 48, name: 'Veronica Maina', honour: 'CBS', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Veronica_Waheti_Nduati_Senator.jpg' },
  { id: 49, name: 'Esther Okenyuri Anyieni', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Essy_Okenyuri_Nyaituga_Anyieni_Senator.jpg' },
  { id: 50, name: 'Miraj Abdillahi Abdulrahman', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Miraj_Abdillahi_Abdulrahman_Senator.jpg' },
  { id: 51, name: 'Consolata Nabwire Wakwabubi', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Consolata_Nabwire_Wakwabubi_Senator.jpg' },
  { id: 52, name: 'Joyce Chepkoech Korir', honour: 'CBS', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Joyce_Chepkoech_Korir_Senator.jpg' },
  { id: 53, name: 'Karen Njeri Nyamu', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Nyamu_Karen_Njeri_Senator.jpg' },
  { id: 54, name: 'Peris Pesi Tobiko', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Pesi_Peris_Tobiko_Senator.jpg' },
  { id: 55, name: 'Maureen Tabitha Mutinda', honour: 'CBS', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Women)', image: '/senators_images/Tabitha_Mutinda_Senator.jpg' },
  { id: 56, name: 'Catherine Muyeka Mumma', honour: 'CBS', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (Women)', image: '/senators_images/Catherine_Muyeka_Mumma_Senator.jpg' },
  { id: 57, name: 'Beatrice Akinyi Ogolla', honour: '', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (Women)', image: '/senators_images/Beatrice_Akinyi_Ogolla_Senator.jpg' },
  { id: 58, name: 'Hamida Ali Kibwana', honour: '', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (Women)', image: '/senators_images/Hamida_Ali_Kibwana_Senator.jpg' },
  { id: 59, name: 'Betty Batuli Montet', honour: '', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (Women)', image: '/senators_images/Betty_Batuli_Montet_Senator.jpg' },
  { id: 60, name: 'Beth Kalunda Syengo', honour: '', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (Women)', image: '/senators_images/Beth_Kalunda_Syengo_Senator.jpg' },
  { id: 61, name: '(Prof.) Margaret Jepkoech Kamar', honour: 'EGH', county: 'Nominated', party: 'Jubilee', partyColor: 'bg-red-600', type: 'Nominated (Women)', image: '/senators_images/Margaret_Jepkoech_Kamar_Senator.jpg' },
  { id: 62, name: 'Mariam Sheikh Omar', honour: '', county: 'Nominated', party: 'UDM', partyColor: 'bg-yellow-600', type: 'Nominated (Women)', image: '/senators_images/Omar_Mariam_Sheikh_Senator.jpg' },
  { id: 63, name: 'Shakila Abdalla Mohamed', honour: '', county: 'Nominated', party: 'WDM-K', partyColor: 'bg-blue-400', type: 'Nominated (Women)', image: '/senators_images/Abdalla_Shakilla_Mohamed_Senator.jpg' },

  // Youth Representation (2)
  { id: 64, name: 'Raphael Chimera Mwinzagu', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Youth)', image: '/senators_images/Chimera_Raphael_Mwinzago_Senator.jpg' },
  { id: 65, name: 'Hezena M. Lemaletian', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (Youth)', image: '/senators_images/Hezena_M._Lemaletian_Senator.jpg' },

  // Persons With Disabilities Representation (2)
  { id: 66, name: 'George Mungai Mbugua', honour: '', county: 'Nominated', party: 'UDA', partyColor: 'bg-yellow-500', type: 'Nominated (PWD)', image: '/senators_images/George_Mungai_Mbugua_Senator.jpg' },
  { id: 67, name: 'Crystal Kegehi Asige', honour: '', county: 'Nominated', party: 'ODM', partyColor: 'bg-orange-500', type: 'Nominated (PWD)', image: '/senators_images/Crystal_Asige_Senator.jpg' }
];

export default function SenatorsPage(): React.ReactElement | null {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedParty, setSelectedParty] = useState<string>('All');
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [leadershipCategory, setLeadershipCategory] = useState<string>('All');
  const [mounted, setMounted] = useState<boolean>(false);

  // Prevent hydration mismatch for Next.js SSR
  useEffect(() => {
    setMounted(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode, mounted]);

  // Extract unique parties, counties, and types for dropdown filters
  const parties = useMemo(() => ['All', ...Array.from(new Set(SENATORS_DATA.map(s => s.party)))].sort(), []);
  const counties = useMemo(() => ['All', ...Array.from(new Set(SENATORS_DATA.map(s => s.county)))].sort(), []);
  const types = useMemo(() => ['All', ...Array.from(new Set(SENATORS_DATA.map(s => s.type)))], []);

  // Filtered House Leadership calculation
  const filteredLeadership = useMemo(() => {
    if (leadershipCategory === 'All') return HOUSE_LEADERSHIP;
    return HOUSE_LEADERSHIP.filter(l => l.category === leadershipCategory);
  }, [leadershipCategory]);

  // Filtered Senators data calculation
  const filteredSenators = useMemo(() => {
    return SENATORS_DATA.filter((senator) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = senator.name.toLowerCase().includes(searchLower) || 
                            senator.county.toLowerCase().includes(searchLower) ||
                            (senator.honour && senator.honour.toLowerCase().includes(searchLower));
      const matchesParty = selectedParty === 'All' || senator.party === selectedParty;
      const matchesCounty = selectedCounty === 'All' || senator.county === selectedCounty;
      const matchesType = selectedType === 'All' || senator.type === selectedType;
      
      return matchesSearch && matchesParty && matchesCounty && matchesType;
    });
  }, [searchTerm, selectedParty, selectedCounty, selectedType]);

  // Theme color mappings derived from parliament_emblem.png
  const themeColors = {
    primaryText: darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]',
    primaryBg: darkMode ? 'bg-[#2E3A8C]/20' : 'bg-[#2E3A8C]/10',
    primaryBorder: darkMode ? 'border-[#C7A537]/50' : 'border-[#2E3A8C]/30',
    accentHover: darkMode ? 'hover:bg-[#C7A537]/80 hover:text-[#2E3A8C]' : 'hover:bg-[#2E3A8C] hover:text-white',
    buttonBg: darkMode ? 'bg-[#C7A537] text-[#2E3A8C]' : 'bg-[#2E3A8C] text-white',
    cardBorderHover: darkMode ? 'hover:border-[#C7A537]' : 'hover:border-[#2E3A8C]'
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans
      ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Floating Theme Switcher */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95
          ${darkMode ? 'bg-[#2E3A8C] text-[#C7A537] shadow-[#2E3A8C]/20' : 'bg-white text-[#2E3A8C] shadow-slate-200'}`}
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Branding (Emblem & Title) */}
        <div className="flex flex-col items-center justify-center mb-12 text-center space-y-4">
          <img 
            src="parliament_emblem.png" 
            alt="Parliament of Kenya Emblem" 
            className="w-32 md:w-36 h-auto drop-shadow-xl mb-2"
          />
          <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight uppercase ${themeColors.primaryText}`}>
            The Senate
          </h1>
          <p className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase
            ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            13th Parliament of Kenya &bull; House Leadership & Members
          </p>
        </div>

        {/* ========================================== */}
        {/* SECTION 1: HOUSE LEADERSHIP & OFFICE BEARERS */}
        {/* ========================================== */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className={`w-5 h-5 ${darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]'}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]'}`}>
                  Parliamentary Leadership
                </span>
              </div>
              <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-[#2E3A8C]'}`}>
                Key Office Bearers
              </h2>
            </div>

            {/* Leadership Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All Leadership', val: 'All' },
                { label: 'Presiding Officers', val: 'Presiding' },
                { label: 'Majority Party', val: 'Majority' },
                { label: 'Minority Party', val: 'Minority' }
              ].map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setLeadershipCategory(tab.val)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300
                    ${leadershipCategory === tab.val 
                      ? (darkMode ? 'bg-[#C7A537] text-[#2E3A8C] shadow-lg shadow-[#C7A537]/20' : 'bg-[#2E3A8C] text-white shadow-md')
                      : (darkMode ? 'bg-slate-900 text-slate-400 hover:text-slate-200' : 'bg-white text-slate-600 hover:bg-slate-100')}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Office Bearers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLeadership.map((leader) => (
              <div
                key={leader.id}
                className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2
                  ${darkMode 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-[#C7A537] hover:shadow-[0_0_30px_rgba(199,165,55,0.2)]' 
                    : 'bg-white border-slate-200/80 shadow-xl hover:border-[#2E3A8C] hover:shadow-2xl'}`}
              >
                {/* Visual Banner Accent */}
                <div className={`h-2.5 w-full ${leader.category === 'Presiding' ? 'bg-gradient-to-r from-[#2E3A8C] via-[#C7A537] to-[#2E3A8C]' : leader.category === 'Majority' ? 'bg-yellow-500' : 'bg-orange-500'}`} />

                <div className="p-6">
                  {/* Category Pill Tag & Party Color */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                      ${leader.category === 'Presiding'
                        ? (darkMode ? 'bg-[#C7A537]/20 text-[#C7A537] border border-[#C7A537]/30' : 'bg-[#2E3A8C]/10 text-[#2E3A8C] border border-[#2E3A8C]/20')
                        : leader.category === 'Majority'
                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20'
                        : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'}`}>
                      {leader.category === 'Presiding' && <Crown className="w-3 h-3" />}
                      {leader.category === 'Majority' && <ShieldCheck className="w-3 h-3" />}
                      {leader.category === 'Minority' && <Star className="w-3 h-3" />}
                      {leader.category} Leadership
                    </span>

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {leader.party}
                    </span>
                  </div>

                  {/* Profile Image & Name Section */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-slate-200 dark:border-slate-800 shadow-md">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className={`text-[11px] font-extrabold uppercase tracking-wider block mb-1 truncate
                        ${darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]'}`}>
                        {leader.role}
                      </span>
                      <h3 className="text-lg font-black leading-tight text-slate-900 dark:text-white mb-1.5 flex flex-wrap items-center gap-1.5">
                        <span>{leader.name}</span>
                        {leader.honour && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-amber-500/15 text-amber-700 dark:text-[#C7A537] border border-amber-500/30">
                            <Award className="w-3 h-3" />
                            {leader.honour}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {leader.countyOrSeat}
                      </p>
                    </div>
                  </div>

                  {/* Description / Constitutional Mandate */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t pt-4 border-slate-100 dark:border-slate-800/80">
                    {leader.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 2: ALL SENATORS DIRECTORY & FILTERS */}
        {/* ========================================== */}
        <section>
          {/* Section Header */}
          <div className="mb-8 border-b pb-4 border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className={`w-5 h-5 ${darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]'}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-[#C7A537]' : 'text-[#2E3A8C]'}`}>
                  Parliamentary Directory
                </span>
              </div>
              <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-[#2E3A8C]'}`}>
                Distinguished Senators
              </h2>
            </div>
            
            <span className={`text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border self-start md:self-auto
              ${darkMode ? 'bg-[#2E3A8C]/30 text-[#C7A537] border-[#C7A537]/30' : 'bg-[#2E3A8C]/10 text-[#2E3A8C] border-[#2E3A8C]/20'}`}>
              Showing {filteredSenators.length} of 67 Members
            </span>
          </div>

          {/* Filter Controls Bar */}
          <div className={`mb-10 p-6 rounded-3xl border backdrop-blur-sm transition-colors duration-300
            ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Search Input */}
              <div className="relative">
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-[#2E3A8C]'}`}>
                  Search Senator or Honour
                </label>
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 
                    ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    placeholder="Name, County, or Honour (e.g. EGH)..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-2xl outline-none transition-all duration-300
                      border focus:ring-2 focus:ring-[#C7A537]/50
                      ${darkMode 
                        ? 'bg-slate-955 border-slate-800 text-slate-200 placeholder-slate-600 focus:border-[#C7A537]' 
                        : 'bg-slate-50 border-slate-200 text-[#2E3A8C] placeholder-slate-400 focus:border-[#2E3A8C]'}`}
                  />
                </div>
              </div>

              {/* Party Filter */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-[#2E3A8C]'}`}>
                  Political Party
                </label>
                <div className="relative">
                  <select
                    value={selectedParty}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedParty(e.target.value)}
                    className={`w-full appearance-none pl-4 pr-10 py-3 text-sm rounded-2xl outline-none transition-all duration-300
                      border focus:ring-2 focus:ring-[#C7A537]/50 cursor-pointer
                      ${darkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#C7A537]' 
                        : 'bg-slate-50 border-slate-200 text-[#2E3A8C] focus:border-[#2E3A8C]'}`}
                  >
                    {parties.map(party => (
                      <option key={party} value={party}>{party === 'All' ? 'All Parties' : party}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none
                    ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
              </div>

              {/* County Filter */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-[#2E3A8C]'}`}>
                  County / Seat
                </label>
                <div className="relative">
                  <select
                    value={selectedCounty}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCounty(e.target.value)}
                    className={`w-full appearance-none pl-4 pr-10 py-3 text-sm rounded-2xl outline-none transition-all duration-300
                      border focus:ring-2 focus:ring-[#C7A537]/50 cursor-pointer
                      ${darkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#C7A537]' 
                        : 'bg-slate-50 border-slate-200 text-[#2E3A8C] focus:border-[#2E3A8C]'}`}
                  >
                    {counties.map(county => (
                      <option key={county} value={county}>{county === 'All' ? 'All Counties' : county}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none
                    ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
              </div>

              {/* Category / Representation Type Filter */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-[#2E3A8C]'}`}>
                  Representation Type
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
                    className={`w-full appearance-none pl-4 pr-10 py-3 text-sm rounded-2xl outline-none transition-all duration-300
                      border focus:ring-2 focus:ring-[#C7A537]/50 cursor-pointer
                      ${darkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#C7A537]' 
                        : 'bg-slate-50 border-slate-200 text-[#2E3A8C] focus:border-[#2E3A8C]'}`}
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                    ))}
                  </select>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none
                    ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
              </div>

            </div>
          </div>

          {/* Senators Cards Grid */}
          {filteredSenators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSenators.map((senator: Senator) => (
                <div 
                  key={senator.id} 
                  className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:-translate-y-2
                    ${darkMode 
                      ? 'bg-slate-900 border-slate-800 hover:shadow-[0_0_30px_rgba(199,165,55,0.15)] ' + themeColors.cardBorderHover
                      : 'bg-white border-slate-100 shadow-lg hover:shadow-2xl ' + themeColors.cardBorderHover}`}
                >
                  {/* Image & Gradient Header */}
                  <div className="relative h-72 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img 
                      src={senator.image} 
                      alt={senator.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-[#0f172a] via-[#0f172a]/40' : 'from-[#2E3A8C] via-[#2E3A8C]/40'} to-transparent opacity-90`} />
                    
                    {/* Top Tags & State Honour Badge */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full text-white backdrop-blur-md bg-black/40 border border-white/20">
                        {senator.type}
                      </span>

                      {senator.honour && (
                        <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#C7A537] text-[#2E3A8C] shadow-lg flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {senator.honour}
                        </span>
                      )}
                    </div>

                    {/* Senator Name Overlay with Honours Tag */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white leading-tight flex flex-wrap items-center gap-1.5">
                        <span>{senator.name}</span>
                        {senator.honour && (
                          <span className="text-amber-300 text-xs font-bold">
                            , {senator.honour}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* Info Details Section */}
                  <div className="p-6">
                    <div className="space-y-4">
                      
                      {/* County / Region Info */}
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-2xl flex-shrink-0 ${darkMode ? 'bg-[#2E3A8C]/40 text-[#C7A537]' : 'bg-[#2E3A8C]/10 text-[#2E3A8C]'}`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[10px] uppercase tracking-widest font-bold truncate ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>County / Region</p>
                          <p className={`font-bold text-base truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{senator.county}</p>
                        </div>
                      </div>

                      {/* Political Party Info */}
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-2xl flex-shrink-0 ${darkMode ? 'bg-[#2E3A8C]/40 text-[#C7A537]' : 'bg-[#2E3A8C]/10 text-[#2E3A8C]'}`}>
                          <User className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[10px] uppercase tracking-widest font-bold truncate ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Political Party</p>
                          <p className={`font-bold flex items-center gap-2 text-base truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                            <span className="truncate">{senator.party}</span>
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${senator.partyColor} ring-2 ring-white/10`}></span>
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* View Profile Action */}
                    <button className={`w-full mt-6 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all duration-300
                      ${themeColors.buttonBg} ${themeColors.accentHover}`}>
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State when zero results match */
            <div className={`flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border-2 border-dashed
              ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-[#2E3A8C]/20 bg-[#2E3A8C]/5'}`}>
              <div className={`p-5 rounded-full mb-4 ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-[#2E3A8C] shadow-md'}`}>
                <Search className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#2E3A8C]'}`}>No Senators Found</h3>
              <p className={`max-w-md text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                We couldn't find any representatives matching your current search term or filters.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedParty('All'); setSelectedCounty('All'); setSelectedType('All'); }}
                className={`mt-6 px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors
                  ${themeColors.buttonBg} ${themeColors.accentHover}`}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}