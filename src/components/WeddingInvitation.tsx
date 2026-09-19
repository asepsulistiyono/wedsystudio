import { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import { getReligiousContent, t, religionLabels } from '../utils/translations';

// ============ COVER SECTION ============
function CoverSection({ onOpen }: { onOpen: () => void }) {
  const { weddingData, siteSettings } = useWedding();
  const lang = weddingData.language;
  
  if (!siteSettings.coverEnabled) {
    onOpen();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d4a3e] transition-all duration-1000">
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 text-center text-white px-6 animate-fade-in">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto gold-text opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p className="font-elegant text-lg md:text-xl tracking-widest uppercase mb-4 text-[#e8d5a3]">
          {t('theWeddingOf', lang)}
        </p>
        <h1 className="font-script text-5xl md:text-7xl mb-4 text-white">
          {weddingData.groomName.split(' ')[0]} & {weddingData.brideName.split(' ')[0]}
        </h1>
        <div className="ornament-divider mb-6">
          <span className="gold-text text-2xl">✦</span>
        </div>
        <p className="font-elegant text-lg md:text-xl mb-2">{t('to', lang)}</p>
        <p className="font-display text-xl md:text-2xl mb-8">{t('mrMrs', lang)}</p>
        <button
          onClick={onOpen}
          className="px-8 py-3 border-2 border-[#c9a96e] text-[#e8d5a3] rounded-full font-elegant text-lg tracking-wider hover:bg-[#c9a96e] hover:text-white transition-all duration-300 animate-pulse-slow"
        >
          ✉ {t('openInvitation', lang)}
        </button>
      </div>
      <div className="absolute top-10 left-10 opacity-20">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#c9a96e" strokeWidth="1">
          <path d="M50 10 C30 30, 20 50, 50 90 C80 50, 70 30, 50 10" />
          <path d="M30 20 C20 40, 15 60, 30 80" />
          <path d="M70 20 C80 40, 85 60, 70 80" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 rotate-180">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#c9a96e" strokeWidth="1">
          <path d="M50 10 C30 30, 20 50, 50 90 C80 50, 70 30, 50 10" />
          <path d="M30 20 C20 40, 15 60, 30 80" />
          <path d="M70 20 C80 40, 85 60, 70 80" />
        </svg>
      </div>
    </div>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  const { weddingData } = useWedding();
  const lang = weddingData.language;
  const religiousContent = getReligiousContent(weddingData.religion, lang);
  
  const formattedDate = new Date(weddingData.weddingDate).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #2d4a3e 0%, #1a3a2e 50%, #2d4a3e 100%)' }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,169,110,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(201,169,110,0.2) 0%, transparent 40%),
                           radial-gradient(circle at 60% 80%, rgba(201,169,110,0.2) 0%, transparent 40%)`
        }} />
      </div>
      
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#c9a96e" strokeWidth="1.5">
          <path d="M50 5 C35 25, 25 45, 50 95 C75 45, 65 25, 50 5" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-16 animate-float opacity-30" style={{ animationDelay: '1s' }}>
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" stroke="#c9a96e" strokeWidth="1.5">
          <path d="M50 5 C35 25, 25 45, 50 95 C75 45, 65 25, 50 5" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in-up">
        <p className="font-elegant text-[#e8d5a3] text-lg md:text-xl tracking-[0.3em] uppercase mb-6 whitespace-pre-line">
          {religiousContent.opening}
        </p>
        <p className="font-elegant text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
          {lang === 'id' 
            ? 'Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan putra-putri kami'
            : 'With the blessings of the Almighty God, we intend to hold the wedding ceremony of our children'}
        </p>
        
        <div className="mb-8">
          <h1 className="font-script text-6xl md:text-8xl text-white mb-2">
            {weddingData.groomName.split(' ')[0]}
          </h1>
          <span className="font-script text-4xl md:text-5xl text-[#c9a96e]">&</span>
          <h1 className="font-script text-6xl md:text-8xl text-white mt-2">
            {weddingData.brideName.split(' ')[0]}
          </h1>
        </div>

        <div className="ornament-divider mb-8">
          <span className="text-[#c9a96e] text-xl">❧</span>
        </div>

        <p className="font-display text-white/90 text-xl md:text-2xl">
          {formattedDate}
        </p>

        <div className="mt-12 scroll-indicator">
          <svg className="w-6 h-6 mx-auto text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ============ COUPLE SECTION ============
function CoupleSection() {
  const { weddingData } = useWedding();
  const lang = weddingData.language;
  const religiousContent = getReligiousContent(weddingData.religion, lang);

  return (
    <section className="section-padding bg-[#faf7f2] leaf-pattern">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-elegant text-[#c9a96e] text-lg tracking-widest uppercase mb-2">
          {lang === 'id' ? 'Mempelai' : 'The Couple'}
        </p>
        <div className="ornament-divider mb-8">
          <span className="text-[#c9a96e]">✦</span>
        </div>
        <p className="font-elegant text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          "{religiousContent.quote}"
        </p>
        <p className="font-elegant text-[#c9a96e] text-lg mb-16">— {religiousContent.quoteSource} —</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#c9a96e] shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#2d4a3e] to-[#1a3a2e] flex items-center justify-center">
                <span className="font-script text-5xl text-[#e8d5a3]">{weddingData.groomInitial}</span>
              </div>
            </div>
            <h3 className="font-script text-4xl text-[#2d4a3e] mb-2">{weddingData.groomName}</h3>
            <p className="font-elegant text-gray-600 text-lg mb-2">
              {lang === 'id' ? 'Putra dari' : 'Son of'}
            </p>
            <p className="font-display text-gray-700">{weddingData.groomFather}</p>
            <p className="font-display text-gray-500">&</p>
            <p className="font-display text-gray-700">{weddingData.groomMother}</p>
          </div>

          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#c9a96e] shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#c9a96e] to-[#a88a52] flex items-center justify-center">
                <span className="font-script text-5xl text-white">{weddingData.brideInitial}</span>
              </div>
            </div>
            <h3 className="font-script text-4xl text-[#2d4a3e] mb-2">{weddingData.brideName}</h3>
            <p className="font-elegant text-gray-600 text-lg mb-2">
              {lang === 'id' ? 'Putri dari' : 'Daughter of'}
            </p>
            <p className="font-display text-gray-700">{weddingData.brideFather}</p>
            <p className="font-display text-gray-500">&</p>
            <p className="font-display text-gray-700">{weddingData.brideMother}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ COUNTDOWN SECTION ============
function CountdownSection() {
  const { weddingData, siteSettings } = useWedding();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date(weddingData.weddingDate + 'T08:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingData.weddingDate]);

  if (!siteSettings.countdownEnabled) return null;

  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #2d4a3e 0%, #1a3a2e 100%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-elegant text-[#e8d5a3] text-lg tracking-widest uppercase mb-2">Countdown</p>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-12">Menghitung Hari</h2>
        
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
          {[
            { value: timeLeft.days, label: 'Hari' },
            { value: timeLeft.hours, label: 'Jam' },
            { value: timeLeft.minutes, label: 'Menit' },
            { value: timeLeft.seconds, label: 'Detik' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-4 md:p-6 text-center">
              <span className="font-display text-3xl md:text-5xl text-[#2d4a3e] font-bold">
                {String(item.value).padStart(2, '0')}
              </span>
              <p className="font-elegant text-[#c9a96e] text-sm md:text-base mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ EVENT SECTION ============
function EventSection() {
  const { weddingData } = useWedding();
  const formattedDate = new Date(weddingData.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="section-padding bg-[#faf7f2]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-elegant text-[#c9a96e] text-lg tracking-widest uppercase mb-2">Waktu & Tempat</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a3e] mb-4">Acara Pernikahan</h2>
        <div className="ornament-divider mb-12">
          <span className="text-[#c9a96e]">✦</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2d4a3e] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#e8d5a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-[#2d4a3e] mb-4">Akad Nikah</h3>
            <div className="space-y-3">
              <p className="font-elegant text-gray-600 text-lg">
                <span className="font-semibold text-[#2d4a3e]">{formattedDate}</span>
              </p>
              <p className="font-elegant text-gray-600 text-lg">
                Pukul <span className="font-semibold text-[#2d4a3e]">{weddingData.akadTime}</span>
              </p>
              <div className="pt-3 border-t border-[#c9a96e]/30">
                <p className="font-display text-[#2d4a3e] font-semibold">{weddingData.akadVenue}</p>
                <p className="font-elegant text-gray-500">{weddingData.akadAddress}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a96e] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.96V19a1 1 0 01-1.09.99A10 10 0 013 10.09V9a1 1 0 011-1h3m14 7.97V9a1 1 0 00-1-1h-3m-8 0V5a2 2 0 012-2h2a2 2 0 012 2v3m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-[#2d4a3e] mb-4">Resepsi</h3>
            <div className="space-y-3">
              <p className="font-elegant text-gray-600 text-lg">
                <span className="font-semibold text-[#2d4a3e]">{formattedDate}</span>
              </p>
              <p className="font-elegant text-gray-600 text-lg">
                Pukul <span className="font-semibold text-[#2d4a3e]">{weddingData.receptionTime}</span>
              </p>
              <div className="pt-3 border-t border-[#c9a96e]/30">
                <p className="font-display text-[#2d4a3e] font-semibold">{weddingData.receptionVenue}</p>
                <p className="font-elegant text-gray-500">{weddingData.receptionAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <a
            href={weddingData.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d4a3e] text-white rounded-full font-elegant text-lg hover:bg-[#1a3a2e] transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Lihat Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ LOVE STORY SECTION ============
function LoveStorySection() {
  const { siteSettings } = useWedding();
  
  if (!siteSettings.storyEnabled) return null;

  const stories = [
    { year: '2019', title: 'Pertama Bertemu', desc: 'Kami pertama kali bertemu di sebuah acara kampus.' },
    { year: '2020', title: 'Mulai Dekat', desc: 'Dari teman menjadi sahabat, saling mendukung dalam setiap langkah.' },
    { year: '2022', title: 'Menjalin Hubungan', desc: 'Dengan bismillah, kami memutuskan untuk menjalin hubungan yang lebih serius.' },
    { year: '2024', title: 'Lamaran', desc: 'Alhamdulillah, dengan penuh keberkahan kami melangsungkan acara lamaran.' },
    { year: '2025', title: 'Pernikahan', desc: 'Insya Allah, kami akan menyempurnakan separuh agama bersama.' },
  ];

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #faf7f2 0%, #f0ebe3 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-elegant text-[#c9a96e] text-lg tracking-widest uppercase mb-2">Our Journey</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a3e] mb-4">Love Story</h2>
        <div className="ornament-divider mb-12">
          <span className="text-[#c9a96e]">✦</span>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#c9a96e] to-[#2d4a3e]" />
          
          {stories.map((story, idx) => (
            <div key={idx} className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <span className="font-display text-[#c9a96e] text-sm font-semibold">{story.year}</span>
                <h3 className="font-display text-xl text-[#2d4a3e] mt-1">{story.title}</h3>
                <p className="font-elegant text-gray-600 mt-2 leading-relaxed">{story.desc}</p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#c9a96e] border-4 border-[#faf7f2] shadow-md z-10" />
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY SECTION ============
function GallerySection() {
  const { siteSettings } = useWedding();
  
  if (!siteSettings.galleryEnabled) return null;

  const photos = [
    { gradient: 'from-[#2d4a3e] to-[#4a7a6a]', label: 'Pre-wedding 1' },
    { gradient: 'from-[#c9a96e] to-[#e8d5a3]', label: 'Pre-wedding 2' },
    { gradient: 'from-[#1a3a2e] to-[#2d4a3e]', label: 'Pre-wedding 3' },
    { gradient: 'from-[#a88a52] to-[#c9a96e]', label: 'Pre-wedding 4' },
    { gradient: 'from-[#3d5a4e] to-[#2d4a3e]', label: 'Pre-wedding 5' },
    { gradient: 'from-[#e8d5a3] to-[#c9a96e]', label: 'Pre-wedding 6' },
  ];

  return (
    <section className="section-padding bg-[#faf7f2]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-elegant text-[#c9a96e] text-lg tracking-widest uppercase mb-2">Gallery</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a3e] mb-4">Momen Berharga</h2>
        <div className="ornament-divider mb-12">
          <span className="text-[#c9a96e]">✦</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${photo.gradient} flex items-center justify-center hover:scale-105 transition-transform duration-500 cursor-pointer shadow-lg`}
            >
              <div className="text-center text-white/80">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-elegant text-sm">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ RSVP SECTION ============
function RSVPSection() {
  const { siteSettings } = useWedding();
  const [formData, setFormData] = useState({ name: '', attendance: 'hadir', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!siteSettings.rsvpEnabled) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-[#f0ebe3]">
        <div className="max-w-lg mx-auto text-center glass-card p-10">
          <div className="animate-heart inline-block mb-4">
            <svg className="w-16 h-16 text-[#c9a96e]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h3 className="font-display text-2xl text-[#2d4a3e] mb-2">Terima Kasih!</h3>
          <p className="font-elegant text-gray-600 text-lg">Konfirmasi Anda telah kami terima.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-[#f0ebe3]">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-elegant text-[#c9a96e] text-lg tracking-widest uppercase mb-2">RSVP</p>
        <h2 className="font-display text-3xl md:text-4xl text-[#2d4a3e] mb-4">Konfirmasi Kehadiran</h2>
        <div className="ornament-divider mb-8">
          <span className="text-[#c9a96e]">✦</span>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 text-left space-y-5">
          <div>
            <label className="font-elegant text-[#2d4a3e] text-sm block mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-[#c9a96e]/30 focus:border-[#c9a96e] focus:outline-none bg-white/80 font-elegant"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div>
            <label className="font-elegant text-[#2d4a3e] text-sm block mb-1">Konfirmasi Kehadiran</label>
            <select
              value={formData.attendance}
              onChange={(e) => setFormData({...formData, attendance: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-[#c9a96e]/30 focus:border-[#c9a96e] focus:outline-none bg-white/80 font-elegant"
            >
              <option value="hadir">Insya Allah Hadir</option>
              <option value="tidak">Maaf, Tidak Bisa Hadir</option>
              <option value="ragu">Masih Ragu</option>
            </select>
          </div>
          <div>
            <label className="font-elegant text-[#2d4a3e] text-sm block mb-1">Jumlah Tamu</label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-[#c9a96e]/30 focus:border-[#c9a96e] focus:outline-none bg-white/80 font-elegant"
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
            </select>
          </div>
          <div>
            <label className="font-elegant text-[#2d4a3e] text-sm block mb-1">Ucapan & Doa</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-[#c9a96e]/30 focus:border-[#c9a96e] focus:outline-none bg-white/80 font-elegant resize-none"
              placeholder="Tulis ucapan dan doa..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#2d4a3e] text-white rounded-lg font-elegant text-lg hover:bg-[#1a3a2e] transition-colors duration-300"
          >
            Kirim Konfirmasi
          </button>
        </form>
      </div>
    </section>
  );
}

// ============ GIFT SECTION ============
function GiftSection() {
  const { siteSettings } = useWedding();
  const [copied, setCopied] = useState('');

  if (!siteSettings.giftEnabled) return null;

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopied(bank);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #2d4a3e 0%, #1a3a2e 100%)' }}>
      <div className="max-w-lg mx-auto text-center">
        <p className="font-elegant text-[#e8d5a3] text-lg tracking-widest uppercase mb-2">Wedding Gift</p>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Amplop Digital</h2>
        <div className="ornament-divider mb-6">
          <span className="text-[#c9a96e]">✦</span>
        </div>
        <p className="font-elegant text-white/70 mb-8">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
        </p>

        <div className="space-y-4">
          <div className="glass-card p-6">
            <p className="font-elegant text-[#c9a96e] mb-1">Bank Central Asia (BCA)</p>
            <p className="font-display text-xl text-[#2d4a3e] mb-2">1234567890</p>
            <p className="font-elegant text-gray-500 text-sm mb-3">a.n. Ahmad Rizky</p>
            <button
              onClick={() => copyToClipboard('1234567890', 'bca')}
              className="px-4 py-2 border border-[#c9a96e] text-[#c9a96e] rounded-full text-sm font-elegant hover:bg-[#c9a96e] hover:text-white transition-all duration-300"
            >
              {copied === 'bca' ? '✓ Tersalin!' : 'Salin Nomor Rekening'}
            </button>
          </div>
          <div className="glass-card p-6">
            <p className="font-elegant text-[#c9a96e] mb-1">Bank Mandiri</p>
            <p className="font-display text-xl text-[#2d4a3e] mb-2">0987654321</p>
            <p className="font-elegant text-gray-500 text-sm mb-3">a.n. Fatimah Azzahra</p>
            <button
              onClick={() => copyToClipboard('0987654321', 'mandiri')}
              className="px-4 py-2 border border-[#c9a96e] text-[#c9a96e] rounded-full text-sm font-elegant hover:bg-[#c9a96e] hover:text-white transition-all duration-300"
            >
              {copied === 'mandiri' ? '✓ Tersalin!' : 'Salin Nomor Rekening'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER SECTION ============
function FooterSection() {
  const { weddingData } = useWedding();
  const lang = weddingData.language;
  const religiousContent = getReligiousContent(weddingData.religion, lang);
  
  const formattedDate = new Date(weddingData.weddingDate).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, ' • ');

  return (
    <section className="py-16 px-6 text-center" style={{ background: 'linear-gradient(180deg, #1a3a2e 0%, #0f2a1e 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <p className="font-elegant text-[#e8d5a3] text-lg mb-4 whitespace-pre-line">
          {religiousContent.closing}
        </p>
        
        <div className="ornament-divider mb-8">
          <span className="text-[#c9a96e]">✦</span>
        </div>

        <h2 className="font-script text-5xl md:text-6xl text-white mb-2">
          {weddingData.groomName.split(' ')[0]} & {weddingData.brideName.split(' ')[0]}
        </h2>
        <p className="font-elegant text-[#e8d5a3] tracking-widest">{formattedDate}</p>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-elegant text-white/40 text-sm">
            Made with 💛 for our special day
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ MAIN COMPONENT ============
export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    window.scrollTo(0, 0);
  };

  if (!isOpen) {
    return <CoverSection onOpen={handleOpen} />;
  }

  return (
    <div className="animate-fade-in">
      <HeroSection />
      <CoupleSection />
      <CountdownSection />
      <EventSection />
      <LoveStorySection />
      <GallerySection />
      <RSVPSection />
      <GiftSection />
      <FooterSection />
    </div>
  );
}
