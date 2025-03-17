'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, Paperclip } from 'lucide-react'
import type { SearchResult, QuranData, TranslationData, ChapterData, Language } from '@/types/quran'

const TRANSLATION_IDS: Record<string, number> = {
  english: 131,
  urdu: 97,
  indonesian: 33,
  turkish: 77,
  french: 31,
  bengali: 161,
  german: 27
}

export default function QuranSearch() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [language, setLanguage] = useState<Language>('english')
  const [quranData, setQuranData] = useState<SearchResult[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isProcessingVideo, setIsProcessingVideo] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsPerPage = 20

  const fetchTranslation = async (translationId: number): Promise<TranslationData['translations']> => {
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translationId}`)
    if (!response.ok) throw new Error(`Network response was not ok for translation ${translationId}`)
    const data: TranslationData = await response.json()
    return data.translations
  }

  const fetchQuranData = async () => {
    try {
      setIsLoading(true)
      // Fetch Arabic text
      const arabicResponse = await fetch('https://api.quran.com/api/v4/quran/verses/uthmani')
      const arabicData: QuranData = await arabicResponse.json()

      // Fetch all translations
      const translations = await Promise.all(
        Object.entries(TRANSLATION_IDS).map(async ([lang, id]) => {
          const translationData = await fetchTranslation(id)
          return [lang, translationData]
        })
      )

      // Create translations map
      const translationsMap = Object.fromEntries(translations)

      // Fetch Surah names
      const surahResponse = await fetch('https://api.quran.com/api/v4/chapters')
      const surahData: ChapterData = await surahResponse.json()

      // Create surah names map
      const surahNames = surahData.chapters.reduce<Record<number, string>>((acc, surah) => {
        acc[surah.id] = surah.name_simple
        return acc
      }, {})

      // Combine all data
      const combinedData: SearchResult[] = arabicData.verses.map((verse, index) => {
        const surahNumber = Math.floor(Number(verse.verse_key.split(':')[0]))
        return {
          surah: {
            number: surahNumber,
            englishName: `Surah ${surahNames[surahNumber]}`
          },
          numberInSurah: Number.parseInt(verse.verse_key.split(':')[1]),
          text: verse.text_uthmani,
          translations: {
            english: translationsMap.english[index].text,
            urdu: translationsMap.urdu[index].text,
            indonesian: translationsMap.indonesian[index].text,
            turkish: translationsMap.turkish[index].text,
            french: translationsMap.french[index].text,
            bengali: translationsMap.bengali[index].text,
            german: translationsMap.german[index].text
          }
        }
      })

      setQuranData(combinedData)
    } catch (error) {
      console.error('Error fetching Quran data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = useCallback(() => {
    if (!searchTerm || !quranData) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    const trimmedSearch = searchTerm.trim()
    // Set searching state based on search term length
    setIsSearching(trimmedSearch.length > 2)

    // Only perform search if we have 3 or more characters
    if (trimmedSearch.length > 2) {
      const matches = quranData.filter((ayah) => {
        const searchLower = trimmedSearch.toLowerCase()
        return (
          (ayah.text && ayah.text.includes(searchTerm)) ||
          (ayah.translations && ayah.translations[language] && 
           ayah.translations[language].toLowerCase().includes(searchLower))
        )
      })

      setSearchResults(matches)
      setCurrentPage(1)
    } else {
      setSearchResults([])
    }
  }, [quranData, language, searchTerm])

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('Video file must be less than 50MB');
      return;
    }

    try {
      setIsProcessingVideo(true);
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('/api/video-search', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process video');
      }

      const data = await response.json();
      if (data.text) {
        setSearchTerm(data.text);
      } else {
        throw new Error('No transcription received from server');
      }
    } catch (error) {
      console.error('Error processing video:', error);
      alert(error instanceof Error ? error.message : 'Failed to process video. Please try again.');
    } finally {
      setIsProcessingVideo(false);
    }
  };

  useEffect(() => {
    fetchQuranData()
  }, [])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm, handleSearch])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Clear results and set searching state to false if input is cleared
    if (!value.trim()) {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  const cleanTranslation = (text: string): string => {
    return text.replace(/<[^>]*>/g, '').replace(/\s*\$\$[^)]*\$\$/g, '')
  }

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">$1</mark>')
  }

  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage
    return searchResults.slice(0, startIndex + resultsPerPage)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl mx-auto text-cyan-800">
        <h1 className="text-2xl font-semibold text-center text-cyan-800 mb-6">
          SearchAyah - Quran Search
        </h1>

        <div className="border-2 border-[#67b2b4] rounded-lg p-6 text-center">
          <p className="text-[#004D40] text-base font-medium sm:text-lg">
            "This is the Book about which there is no doubt, a guidance for those conscious of Allah."
          </p>
          <p className="text-[#004D40] mt-2">(Surah Al-Baqarah, 2:2)</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 text-cyan-800">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search Word or Ayat of Quran"
              className="w-full px-4 py-3 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700 pr-12"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#67b2b4] hover:text-[#4a7f81] transition-colors"
              title="Upload video to search by audio"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
              onClick={(e) => (e.currentTarget.value = '')}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700">Translation Languages</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
            >
              <option value="english">English</option>
              <option value="urdu">اردو</option>
              <option value="indonesian">Indonesian</option>
              <option value="turkish">Turkish</option>
              <option value="french">French</option>
              <option value="bengali">Bengali</option>
              <option value="german">German</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#67b2b4] mx-auto"></div>
          </div>
        )}

        {isProcessingVideo && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#67b2b4] mx-auto"></div>
            <p className="mt-2 text-cyan-800">Processing video...</p>
          </div>
        )}

        {/* WordQuran component - only show when not searching */}
        

        {searchResults.length > 0 && !isLoading && (
          <>
            <div className="mt-6 bg-[#E5F6F6] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="font-semibold">FILTER</span>
                </div>
                <span className="text-sm text-gray-600">
                  {searchResults.length} Search Results
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {getPaginatedResults().map((result, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-[#67b2b4] py-2 px-4">
                    <CardTitle className="text-white text-sm font-semibold">
                      {result.surah.englishName} {result.numberInSurah}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-8">
                    <div className="mb-8 text-right" dir="rtl">
                      <span
                        className="text-2xl font-arabic text-cyan-900 leading-[3rem]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(result.text, searchTerm)
                        }}
                      />
                    </div>
                    <p
                      className={`text-cyan-800 ${
                        ['urdu', 'bengali'].includes(language)
                          ? 'text-right font-urdu leading-9'
                          : ''
                      }`}
                      dir={['urdu', 'bengali'].includes(language) ? 'rtl' : 'ltr'}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(
                          cleanTranslation(result.translations[language]),
                          searchTerm
                        )
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchResults.length > currentPage * resultsPerPage && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-full mt-4 py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
      {!isSearching && !isLoading}
    </div>
  )
}