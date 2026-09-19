// Kompresi gambar agresif untuk penyimpanan di localStorage

export interface CompressOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  outputFormat: 'image/jpeg' | 'image/webp';
}

export const PROFILE_OPTIONS: CompressOptions = {
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.6,
  outputFormat: 'image/jpeg',
};

export const GALLERY_OPTIONS: CompressOptions = {
  maxWidth: 800,
  maxHeight: 800,
  quality: 0.55,
  outputFormat: 'image/jpeg',
};

export async function compressImage(
  file: File,
  options: CompressOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Hitung dimensi baru
        if (width > height) {
          if (width > options.maxWidth) {
            height = (height * options.maxWidth) / width;
            width = options.maxWidth;
          }
        } else {
          if (height > options.maxHeight) {
            width = (width * options.maxHeight) / height;
            height = options.maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Background putih untuk JPEG (karena JPEG tidak support transparansi)
        if (options.outputFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        // Smoothing untuk kualitas lebih baik
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL(
          options.outputFormat,
          options.quality
        );

        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Helper untuk mendapatkan ukuran file dalam KB
export function getDataUrlSize(dataUrl: string): number {
  const base64 = dataUrl.split(',')[1];
  return Math.round((base64.length * 3) / 4 / 1024);
}

// Helper untuk format ukuran file
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
