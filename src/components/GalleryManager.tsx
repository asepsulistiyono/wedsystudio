import { useState } from 'react';
import { WeddingData, GalleryPhoto } from '../context/WeddingContext';

interface GalleryManagerProps {
  weddingData: WeddingData;
  setWeddingData: (data: WeddingData) => void;
}

export default function GalleryManager({ weddingData, setWeddingData }: GalleryManagerProps) {
  const [message, setMessage] = useState<string>('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (weddingData.galleryPhotos.length >= 6) {
      setMessage('Maksimal 6 foto!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        dataUrl: reader.result as string,
        caption: '',
        createdAt: new Date().toISOString(),
      };
      
      setWeddingData({
        ...weddingData,
        galleryPhotos: [...weddingData.galleryPhotos, newPhoto]
      });
      
      setMessage('Foto berhasil diupload!');
      setTimeout(() => setMessage(''), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    setWeddingData({
      ...weddingData,
      galleryPhotos: weddingData.galleryPhotos.filter(p => p.id !== id)
    });
  };

  const handleCaptionChange = (id: string, caption: string) => {
    setWeddingData({
      ...weddingData,
      galleryPhotos: weddingData.galleryPhotos.map(p => 
        p.id === id ? { ...p, caption } : p
      )
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-2">📸 Galeri Foto</h3>
      <p className="text-sm text-gray-500 mb-4">
        Upload maksimal 6 foto untuk galeri undangan
      </p>

      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {message}
        </div>
      )}

      {/* Foto yang sudah diupload */}
      {weddingData.galleryPhotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {weddingData.galleryPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#c9a96e] bg-gray-100">
                <img src={photo.dataUrl} alt={photo.caption} className="w-full h-full object-cover" />
              </div>
              <input
                type="text"
                value={photo.caption}
                onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                placeholder="Caption..."
                className="mt-2 w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-[#2d4a3e]"
              />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {weddingData.galleryPhotos.length < 6 ? (
        <div className="text-center">
          <label className="cursor-pointer inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <span className="px-6 py-3 bg-[#2d4a3e] text-white rounded-lg text-sm hover:bg-[#1a3a2e] transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Foto ({weddingData.galleryPhotos.length}/6)
            </span>
          </label>
        </div>
      ) : (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">✓ Galeri foto sudah lengkap (6/6)</p>
        </div>
      )}
    </div>
  );
}
