// Konten berdasarkan agama dan bahasa

export interface ReligiousContent {
  opening: string;
  quote: string;
  quoteSource: string;
  closing: string;
}

export const religiousTemplates: Record<string, Record<string, ReligiousContent>> = {
  islam: {
    id: {
      opening: 'BISMILLAHIRRAHMANIRRAHIM\n\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
      quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
      quoteSource: 'QS. Ar-Rum: 21',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nWassalamu\'alaikum Warahmatullahi Wabarakatuh',
    },
    en: {
      opening: 'BISMILLAHIRRAHMANIRRAHIM\n\nAssalamu\'alaikum Warahmatullahi Wabarakatuh',
      quote: 'And among His Signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your (hearts).',
      quoteSource: 'QS. Ar-Rum: 21',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nWassalamu\'alaikum Warahmatullahi Wabarakatuh',
    },
  },
  kristen: {
    id: {
      opening: 'PUJI SYUKUR KEPADA TUHAN YANG MAHA ESA',
      quote: 'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
      quoteSource: 'Matius 19:6',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nTuhan Yesus Memberkati',
    },
    en: {
      opening: 'PRAISE BE TO THE ALMIGHTY GOD',
      quote: 'So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.',
      quoteSource: 'Matthew 19:6',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nGod Bless You',
    },
  },
  hindu: {
    id: {
      opening: 'OM SWASTYASTU',
      quote: 'Bahkan dalam pernikahan, dua jiwa menjadi satu. Ini adalah ikatan suci yang harus dijaga dengan penuh cinta dan penghormatan.',
      quoteSource: 'Weda, Rig Weda X.185',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nOm Shanti Shanti Shanti Om',
    },
    en: {
      opening: 'OM SWASTYASTU',
      quote: 'Even in marriage, two souls become one. This is a sacred bond that must be maintained with full love and respect.',
      quoteSource: 'Veda, Rig Veda X.185',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nOm Shanti Shanti Shanti Om',
    },
  },
  buddha: {
    id: {
      opening: 'NAMO BUDDHAYA',
      quote: 'Cinta yang tulus dan kasih sayang yang mendalam adalah dasar dari kehidupan berumah tangga yang harmonis.',
      quoteSource: 'Dhammapada',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nSadhu Sadhu Sadhu',
    },
    en: {
      opening: 'NAMO BUDDHAYA',
      quote: 'Sincere love and deep compassion are the foundation of a harmonious married life.',
      quoteSource: 'Dhammapada',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nSadhu Sadhu Sadhu',
    },
  },
  konghucu: {
    id: {
      opening: 'TIEN KONG CIU SI',
      quote: 'Suami istri yang harmonis adalah dasar dari keluarga yang bahagia dan masyarakat yang sejahtera.',
      quoteSource: 'Kitab Li Ji',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nXie Xie',
    },
    en: {
      opening: 'TIEN KONG CIU SI',
      quote: 'A harmonious husband and wife is the foundation of a happy family and a prosperous society.',
      quoteSource: 'Li Ji Book',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nXie Xie',
    },
  },
  universal: {
    id: {
      opening: 'DENGAN PENUH RASA SYUKUR DAN KEBERKAHAN',
      quote: 'Cinta adalah ketika kebahagiaan orang lain menjadi penting bagi Anda.',
      quoteSource: 'Anonim',
      closing: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.\n\nTerima Kasih',
    },
    en: {
      opening: 'WITH GRATITUDE AND BLESSINGS',
      quote: 'Love is when the happiness of others becomes important to you.',
      quoteSource: 'Anonymous',
      closing: 'It would be our honor and happiness if you would be willing to attend and give your blessings.\n\nThank You',
    },
  },
};

// Label untuk UI
export const religionLabels: Record<string, Record<string, string>> = {
  islam: { id: 'Islam', en: 'Islam' },
  kristen: { id: 'Kristen', en: 'Christian' },
  hindu: { id: 'Hindu', en: 'Hindu' },
  buddha: { id: 'Buddha', en: 'Buddhist' },
  konghucu: { id: 'Konghucu', en: 'Confucian' },
  universal: { id: 'Universal', en: 'Universal' },
};

export const languageLabels: Record<string, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

// Fungsi untuk mendapatkan konten berdasarkan agama dan bahasa
export function getReligiousContent(religion: string, language: string): ReligiousContent {
  return religiousTemplates[religion]?.[language] || religiousTemplates['universal']['id'];
}

// Translations untuk UI
export const translations: Record<string, Record<string, string>> = {
  id: {
    theWeddingOf: 'Pernikahan',
    to: 'Kepada Yth.',
    mrMrs: 'Bapak/Ibu/Saudara/i',
    openInvitation: 'Buka Undangan',
    groom: 'Mempelai Pria',
    bride: 'Mempelai Wanita',
    son: 'Putra dari',
    daughter: 'Putri dari',
    weddingEvent: 'Acara Pernikahan',
    akadNikah: 'Akad Nikah',
    reception: 'Resepsi',
    date: 'Tanggal',
    time: 'Waktu',
    venue: 'Tempat',
    address: 'Alamat',
    seeLocation: 'Lihat Lokasi',
    ourStory: 'Kisah Kami',
    gallery: 'Galeri',
    preciousMoments: 'Momen Berharga',
    rsvp: 'Konfirmasi Kehadiran',
    confirmAttendance: 'Konfirmasi Kehadiran',
    fullName: 'Nama Lengkap',
    enterName: 'Masukkan nama Anda',
    attendance: 'Konfirmasi Kehadiran',
    willAttend: 'Insya Allah Hadir',
    cannotAttend: 'Maaf, Tidak Bisa Hadir',
    notSure: 'Masih Ragu',
    numberOfGuests: 'Jumlah Tamu',
    wishesAndPrayers: 'Ucapan & Doa',
    writeWishes: 'Tulis ucapan dan doa...',
    sendConfirmation: 'Kirim Konfirmasi',
    thankYou: 'Terima Kasih!',
    confirmationReceived: 'Konfirmasi Anda telah kami terima.',
    weddingGift: 'Amplop Digital',
    copyAccountNumber: 'Salin Nomor Rekening',
    copied: 'Tersalin!',
    adminPanel: 'Panel Admin',
    login: 'Masuk',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Masukkan username',
    enterPassword: 'Masukkan password',
    dontHaveAccount: 'Belum punya akun?',
    contactAdmin: 'Silakan hubungi admin untuk mendapatkan akses login.',
    contactViaWhatsApp: 'Hubungi via WhatsApp',
    demoCredentials: 'Demo Credentials:',
    backToInvitation: '← Kembali ke Undangan',
    wrongCredentials: 'Username atau password salah!',
    accessDenied: 'Akses Ditolak',
    noPermission: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
    loggedInAs: 'Login sebagai',
    role: 'Role',
    logoutAndRelogin: 'Logout & Login Ulang',
    logout: 'Logout',
    admin: 'Admin',
    superAdmin: 'Super Admin',
    dashboard: 'Dashboard',
    manageGuests: 'Kelola Tamu',
    viewInvitation: 'Lihat Undangan',
    overview: 'Ringkasan',
    coupleData: 'Data Mempelai',
    eventData: 'Data Acara',
    content: 'Konten',
    edit: 'Edit',
    save: 'Simpan',
    cancel: 'Batal',
    settings: 'Pengaturan',
    language: 'Bahasa',
    religion: 'Agama',
    selectLanguage: 'Pilih Bahasa',
    selectReligion: 'Pilih Agama',
    
    // Countdown Section
    countdown: 'Hitung Mundur',
    countingDays: 'Menghitung Hari',
    days: 'Hari',
    hours: 'Jam',
    minutes: 'Menit',
    seconds: 'Detik',
    
    // Event Section
    timeAndPlace: 'Waktu & Tempat',
    at: 'Pukul',
    
    // Love Story Section
    ourJourney: 'Perjalanan Kami',
    loveStory: 'Kisah Cinta',
    firstMeet: 'Pertama Bertemu',
    firstMeetDesc: 'Kami pertama kali bertemu di sebuah acara kampus.',
    gettingCloser: 'Mulai Dekat',
    gettingCloserDesc: 'Dari teman menjadi sahabat, saling mendukung dalam setiap langkah.',
    inRelationship: 'Menjalin Hubungan',
    inRelationshipDesc: 'Dengan bismillah, kami memutuskan untuk menjalin hubungan yang lebih serius.',
    engagement: 'Lamaran',
    engagementDesc: 'Alhamdulillah, dengan penuh keberkahan kami melangsungkan acara lamaran.',
    marriage: 'Pernikahan',
    marriageDesc: 'Insya Allah, kami akan menyempurnakan separuh agama bersama.',
    
    // Gift Section
    digitalEnvelope: 'Amplop Digital',
    yourBlessing: 'Doa restu Anda merupakan karunia yang sangat berarti bagi kami.',
    
    // Footer
    madeWithLove: 'Dibuat dengan 💛 untuk hari spesial kami',
  },
  en: {
    theWeddingOf: 'The Wedding Of',
    to: 'To',
    mrMrs: 'Mr./Mrs./Ms.',
    openInvitation: 'Open Invitation',
    groom: 'Groom',
    bride: 'Bride',
    son: 'Son of',
    daughter: 'Daughter of',
    weddingEvent: 'Wedding Event',
    akadNikah: 'Wedding Ceremony',
    reception: 'Reception',
    date: 'Date',
    time: 'Time',
    venue: 'Venue',
    address: 'Address',
    seeLocation: 'See Location',
    ourStory: 'Our Story',
    gallery: 'Gallery',
    preciousMoments: 'Precious Moments',
    rsvp: 'RSVP',
    confirmAttendance: 'Confirm Attendance',
    fullName: 'Full Name',
    enterName: 'Enter your name',
    attendance: 'Attendance',
    willAttend: 'Will Attend',
    cannotAttend: 'Cannot Attend',
    notSure: 'Not Sure Yet',
    numberOfGuests: 'Number of Guests',
    wishesAndPrayers: 'Wishes & Prayers',
    writeWishes: 'Write your wishes and prayers...',
    sendConfirmation: 'Send Confirmation',
    thankYou: 'Thank You!',
    confirmationReceived: 'Your confirmation has been received.',
    weddingGift: 'Wedding Gift',
    copyAccountNumber: 'Copy Account Number',
    copied: 'Copied!',
    adminPanel: 'Admin Panel',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter username',
    enterPassword: 'Enter password',
    dontHaveAccount: "Don't have an account?",
    contactAdmin: 'Please contact admin to get login access.',
    contactViaWhatsApp: 'Contact via WhatsApp',
    demoCredentials: 'Demo Credentials:',
    backToInvitation: '← Back to Invitation',
    wrongCredentials: 'Wrong username or password!',
    accessDenied: 'Access Denied',
    noPermission: 'You do not have permission to access this page.',
    loggedInAs: 'Logged in as',
    role: 'Role',
    logoutAndRelogin: 'Logout & Login Again',
    logout: 'Logout',
    admin: 'Admin',
    superAdmin: 'Super Admin',
    dashboard: 'Dashboard',
    manageGuests: 'Manage Guests',
    viewInvitation: 'View Invitation',
    overview: 'Overview',
    coupleData: 'Couple Data',
    eventData: 'Event Data',
    content: 'Content',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    settings: 'Settings',
    language: 'Language',
    religion: 'Religion',
    selectLanguage: 'Select Language',
    selectReligion: 'Select Religion',
    
    // Countdown Section
    countdown: 'Countdown',
    countingDays: 'Counting Days',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    
    // Event Section
    timeAndPlace: 'Time & Place',
    at: 'At',
    
    // Love Story Section
    ourJourney: 'Our Journey',
    loveStory: 'Love Story',
    firstMeet: 'First Meeting',
    firstMeetDesc: 'We first met at a campus event.',
    gettingCloser: 'Getting Closer',
    gettingCloserDesc: 'From friends to best friends, supporting each other in every step.',
    inRelationship: 'In a Relationship',
    inRelationshipDesc: 'With bismillah, we decided to start a more serious relationship.',
    engagement: 'Engagement',
    engagementDesc: 'Alhamdulillah, with full blessings we held the engagement ceremony.',
    marriage: 'Marriage',
    marriageDesc: 'Insya Allah, we will complete half of our religion together.',
    
    // Gift Section
    digitalEnvelope: 'Digital Envelope',
    yourBlessing: 'Your blessing is a very meaningful gift for us.',
    
    // Footer
    madeWithLove: 'Made with 💛 for our special day',
  },
};

export function t(key: string, language: string): string {
  return translations[language]?.[key] || translations['id'][key] || key;
}
