import { createContext, useContext, useState, ReactNode } from 'react';

// ============ TYPES ============
export interface WeddingData {
  groomName: string;
  brideName: string;
  groomInitial: string;
  brideInitial: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  weddingDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  receptionTime: string;
  receptionVenue: string;
  receptionAddress: string;
  mapUrl: string;
  bismillah: string;
  quote: string;
  quoteSource: string;
  closingText: string;
}

export interface Guest {
  id: string;
  name: string;
  phone: string;
  group: 'family' | 'friend' | 'colleague' | 'other';
  attendance: 'pending' | 'hadir' | 'tidak' | 'ragu';
  guests: number;
  message: string;
  sent: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  theme: 'green-gold' | 'blue-silver' | 'pink-rose';
  musicEnabled: boolean;
  musicUrl: string;
  coverEnabled: boolean;
  galleryEnabled: boolean;
  storyEnabled: boolean;
  giftEnabled: boolean;
  rsvpEnabled: boolean;
  wishesEnabled: boolean;
  countdownEnabled: boolean;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminContact {
  phone: string;
  name: string;
  message: string;
}

export interface CurrentUser {
  username: string;
  role: 'admin' | 'superadmin';
}

interface WeddingContextType {
  weddingData: WeddingData;
  setWeddingData: (data: WeddingData) => void;
  guests: Guest[];
  setGuests: (guests: Guest[]) => void;
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  sendWhatsApp: (guest: Guest) => void;
  sendAllWhatsApp: () => void;
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  adminCredentials: AdminCredentials;
  superAdminCredentials: AdminCredentials;
  adminContact: AdminContact;
  setAdminContact: (contact: AdminContact) => void;
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => { success: boolean; role?: 'admin' | 'superadmin'; message?: string };
  logout: () => void;
}

const defaultWeddingData: WeddingData = {
  groomName: 'Ahmad Rizky',
  brideName: 'Fatimah Azzahra',
  groomInitial: 'A',
  brideInitial: 'F',
  groomFather: 'H. Muhammad Hasan',
  groomMother: 'Hj. Siti Aisyah',
  brideFather: 'H. Abdullah Rahman',
  brideMother: 'Hj. Nurhaliza',
  weddingDate: '2025-03-15',
  akadTime: '08.00 WIB - Selesai',
  akadVenue: 'Masjid Al-Ikhlas',
  akadAddress: 'Jl. Merdeka No. 123, Jakarta Selatan',
  receptionTime: '11.00 - 14.00 WIB',
  receptionVenue: 'Ballroom Hotel Grand Royal',
  receptionAddress: 'Jl. Sudirman No. 45, Jakarta Pusat',
  mapUrl: 'https://maps.google.com',
  bismillah: 'BISMILLAHIRRAHMANIRRAHIM',
  quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  closingText: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.',
};

const defaultGuests: Guest[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '6281234567890',
    group: 'friend',
    attendance: 'hadir',
    guests: 2,
    message: 'Barakallahu lakuma! Semoga menjadi keluarga sakinah mawaddah warahmah.',
    sent: true,
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    name: 'Dewi Lestari',
    phone: '6282345678901',
    group: 'colleague',
    attendance: 'hadir',
    guests: 1,
    message: 'Selamat menempuh hidup baru! Semoga selalu diberkahi Allah SWT.',
    sent: true,
    createdAt: '2024-12-02',
  },
  {
    id: '3',
    name: 'Keluarga Besar Pak Hasan',
    phone: '6283456789012',
    group: 'family',
    attendance: 'pending',
    guests: 5,
    message: '',
    sent: false,
    createdAt: '2024-12-03',
  },
  {
    id: '4',
    name: 'Rina Marlina',
    phone: '6284567890123',
    group: 'friend',
    attendance: 'ragu',
    guests: 1,
    message: 'Insya Allah kalau tidak ada halangan.',
    sent: true,
    createdAt: '2024-12-04',
  },
  {
    id: '5',
    name: 'Pak Joko & Keluarga',
    phone: '6285678901234',
    group: 'family',
    attendance: 'pending',
    guests: 4,
    message: '',
    sent: false,
    createdAt: '2024-12-05',
  },
];

const defaultSiteSettings: SiteSettings = {
  siteName: 'Undangan Pernikahan Ahmad & Fatimah',
  theme: 'green-gold',
  musicEnabled: true,
  musicUrl: '',
  coverEnabled: true,
  galleryEnabled: true,
  storyEnabled: true,
  giftEnabled: true,
  rsvpEnabled: true,
  wishesEnabled: true,
  countdownEnabled: true,
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('weddingData');
    return saved ? JSON.parse(saved) : defaultWeddingData;
  });

  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('guests');
    return saved ? JSON.parse(saved) : defaultGuests;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  const adminCredentials: AdminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  const superAdminCredentials: AdminCredentials = {
    username: 'superadmin',
    password: 'super123',
  };

  const [adminContact, setAdminContact] = useState<AdminContact>(() => {
    const saved = localStorage.getItem('adminContact');
    return saved ? JSON.parse(saved) : {
      phone: '6281234567890',
      name: 'Admin Undangan',
      message: 'Assalamu\'alaikum, saya ingin meminta akun untuk mengakses panel admin undangan pernikahan.',
    };
  });

  const updateAdminContact = (contact: AdminContact) => {
    setAdminContact(contact);
    localStorage.setItem('adminContact', JSON.stringify(contact));
  };

  // Authentication state
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const saved = sessionStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, password: string): { success: boolean; role?: 'admin' | 'superadmin'; message?: string } => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const user: CurrentUser = { username, role: 'admin' };
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, role: 'admin' };
    } else if (username === superAdminCredentials.username && password === superAdminCredentials.password) {
      const user: CurrentUser = { username, role: 'superadmin' };
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, role: 'superadmin' };
    } else {
      return { success: false, message: 'Username atau password salah!' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  // Save to localStorage
  const updateWeddingData = (data: WeddingData) => {
    setWeddingData(data);
    localStorage.setItem('weddingData', JSON.stringify(data));
  };

  const updateGuests = (newGuests: Guest[]) => {
    setGuests(newGuests);
    localStorage.setItem('guests', JSON.stringify(newGuests));
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  };

  const addGuest = (guest: Guest) => {
    const newGuests = [...guests, guest];
    updateGuests(newGuests);
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    const newGuests = guests.map(g => g.id === id ? { ...g, ...updates } : g);
    updateGuests(newGuests);
  };

  const deleteGuest = (id: string) => {
    const newGuests = guests.filter(g => g.id !== id);
    updateGuests(newGuests);
  };

  const generateWhatsAppMessage = (guest: Guest) => {
    const date = new Date(weddingData.weddingDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `Assalamu'alaikum Warahmatullahi Wabarakatuh 🌸

Yth. Bapak/Ibu/Saudara/i
*${guest.name}*

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami:

💍 *${weddingData.groomName}*
   Putra dari ${weddingData.groomFather} & ${weddingData.groomMother}
   
   &
   
💍 *${weddingData.brideName}*
   Putri dari ${weddingData.brideFather} & ${weddingData.brideMother}

📅 *${date}*

🕌 *Akad Nikah*
   Pukul ${weddingData.akadTime}
   ${weddingData.akadVenue}
   ${weddingData.akadAddress}

🎊 *Resepsi*
   Pukul ${weddingData.receptionTime}
   ${weddingData.receptionVenue}
   ${weddingData.receptionAddress}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Atas perhatian dan doa restunya, kami ucapkan terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

*${weddingData.groomName} & ${weddingData.brideName}* 🤍`;
  };

  const sendWhatsApp = (guest: Guest) => {
    const message = generateWhatsAppMessage(guest);
    const url = `https://wa.me/${guest.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    updateGuest(guest.id, { sent: true });
  };

  const sendAllWhatsApp = () => {
    const unsentGuests = guests.filter(g => !g.sent);
    if (unsentGuests.length > 0) {
      sendWhatsApp(unsentGuests[0]);
    }
  };

  return (
    <WeddingContext.Provider
      value={{
        weddingData,
        setWeddingData: updateWeddingData,
        guests,
        setGuests: updateGuests,
        addGuest,
        updateGuest,
        deleteGuest,
        sendWhatsApp,
        sendAllWhatsApp,
        siteSettings,
        setSiteSettings: updateSiteSettings,
        adminCredentials,
        superAdminCredentials,
        adminContact,
        setAdminContact: updateAdminContact,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within WeddingProvider');
  }
  return context;
}
