import { getReligiousContent } from './translations';
import { WeddingData } from '../context/WeddingContext';

/**
 * Sync religious content based on language and religion
 * This ensures all religious texts are updated when language changes
 */
export function syncReligiousContent(data: WeddingData): WeddingData {
  const religiousContent = getReligiousContent(data.religion, data.language);
  
  return {
    ...data,
    bismillah: religiousContent.opening,
    quote: religiousContent.quote,
    quoteSource: religiousContent.quoteSource,
    closingText: religiousContent.closing,
  };
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
