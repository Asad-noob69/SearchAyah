export interface Verse {
    verse_key: string
    text_uthmani: string
  }
  
  export interface Translation {
    text: string
  }
  
  export interface Chapter {
    id: number
    name_simple: string
  }
  
  export interface QuranData {
    verses: Verse[]
  }
  
  export interface TranslationData {
    translations: Translation[]
  }
  
  export interface ChapterData {
    chapters: Chapter[]
  }
  
  export interface SearchResult {
    surah: {
      number: number
      englishName: string
    }
    numberInSurah: number
    text: string
    translations: {
      english: string
      urdu: string
      arabic: string
      [key: string]: string  // For dynamic translation access
    }
  }
  
  export type Language = "english" | "urdu" | "arabic"
  
  