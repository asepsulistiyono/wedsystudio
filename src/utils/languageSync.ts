import { getReligiousContent } from './translations';
import { WeddingData } from '../context/WeddingContext';

/**
 * Sync religious content based on language and religion
 * This ensures all religious texts are updated when language changes
 */
export function syncReligiousContent(data: WeddingData): WeddingData {
  console.log('🔄 Syncing religious content for:', { 
    language: data.language, 
    religion: data.religion 
  });
  
  const religiousContent = getReligiousContent(data.religion, data.language);
  
  console.log('✅ Religious content loaded:', {
    opening: religiousContent.opening.substring(0, 50) + '...',
    quote: religiousContent.quote.substring(0, 50) + '...',
    closing: religiousContent.closing.substring(0, 50) + '...'
  });
  
  const synced = {
    ...data,
    bismillah: religiousContent.opening,
    quote: religiousContent.quote,
    quoteSource: religiousContent.quoteSource,
    closingText: religiousContent.closing,
  };
  
  console.log('✅ Sync complete. Data updated.');
  
  return synced;
}

/**
 * Force reset and sync all religious content
 * Use this when language/religion changes to ensure everything is updated
 */
export function forceSyncReligiousContent(data: WeddingData): WeddingData {
  console.log('🔄 Force syncing religious content...');
  console.log('📋 Current data:', {
    language: data.language,
    religion: data.religion,
    currentBismillah: data.bismillah?.substring(0, 30),
    currentQuote: data.quote?.substring(0, 30)
  });
  
  const synced = syncReligiousContent(data);
  
  console.log('✅ Force sync complete. New data:', {
    newBismillah: synced.bismillah?.substring(0, 30),
    newQuote: synced.quote?.substring(0, 30)
  });
  
  return synced;
}

/**
 * Force update language and sync all content
 */
export function updateLanguage(
  currentData: WeddingData,
  newLanguage: 'id' | 'en'
): WeddingData {
  const updatedData = {
    ...currentData,
    language: newLanguage,
  };
  
  return syncReligiousContent(updatedData);
}

/**
 * Force update religion and sync all content
 */
export function updateReligion(
  currentData: WeddingData,
  newReligion: 'islam' | 'kristen' | 'hindu' | 'buddha' | 'konghucu' | 'universal'
): WeddingData {
  const updatedData = {
    ...currentData,
    religion: newReligion,
  };
  
  return syncReligiousContent(updatedData);
}

/**
 * Reset all data to default with specified language
 */
export function resetDataWithLanguage(
  defaultData: WeddingData,
  language: 'id' | 'en' = 'id'
): WeddingData {
  const dataWithLanguage = {
    ...defaultData,
    language,
  };
  
  return syncReligiousContent(dataWithLanguage);
}
