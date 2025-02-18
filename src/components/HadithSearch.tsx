'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Head from 'next/head'

type Language = 'english' | 'urdu' | 'bengali' | 'turkish' | 'indonesian'
type LanguageWithArabic = Language | 'arabic'

interface Hadith {
  hadithnumber: string
  text: string
}

const LANGUAGE_CODES: Record<LanguageWithArabic, string> = {
  english: 'eng',
  urdu: 'urd',
  bengali: 'ben',
  turkish: 'tur',
  indonesian: 'ind',
  arabic: 'ara'
}

const BOOKS = [
  { value: 'bukhari', label: 'Sahih al-Bukhari' },
  { value: 'muslim', label: 'Sahih Muslim' },
  { value: 'nasai', label: "Sunan an-Nasa'i" },
  { value: 'abudawud', label: 'Sunan Abi Dawud' },
  { value: 'tirmidhi', label: "Jami' at-Tirmidhi" },
  { value: 'ibnmajah', label: 'Sunan Ibn Majah' },
  { value: 'malik', label: 'Muwatta Malik' }
] as const

type BookValue = typeof BOOKS[number]['value']

const HadithCard = React.memo(({ 
  result, 
  arabicText, 
  selectedLanguage, 
  searchTerm 
}: { 
  result: Hadith
  arabicText?: string
  selectedLanguage: Language
  searchTerm: string 
}) => {
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(
      regex,
      '<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">$1</mark>'
    )
  }

  return (
    <Card>
      <CardHeader className="bg-[#67b2b4] py-2 px-4">
        <h3 className="text-white font-semibold">
          Hadith {result.hadithnumber}
        </h3>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-8">
        <p className="text-cyan-800 font-arabic leading-[4rem] text-right text-2xl" dir="rtl">
          {arabicText || 'Arabic text not available'}
        </p>
        <p
          className={`text-cyan-800 my-10 ${
            ['urdu', 'bengali'].includes(selectedLanguage)
              ? 'text-right font-urdu leading-9'
              : ''
          }`}
          dir={['urdu', 'bengali'].includes(selectedLanguage) ? 'rtl' : 'ltr'}
          dangerouslySetInnerHTML={{
            __html: highlightSearchTerm(result.text, searchTerm)
          }}
        />
      </CardContent>
    </Card>
  )
})

HadithCard.displayName = 'HadithCard'

type HadithDataType = Record<string, Record<LanguageWithArabic, Hadith[]>>

export default function HadithSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english')
  const [selectedBook, setSelectedBook] = useState<BookValue>('bukhari')
  const [searchResults, setSearchResults] = useState<Hadith[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hadithData, setHadithData] = useState<HadithDataType>({})

  const resultsPerPage = 20

  const fetchHadithData = useCallback(async (book: string) => {
    if (hadithData[book]?.[selectedLanguage]) return

    setIsLoading(true)
    try {
      const fetchPromises = Object.entries(LANGUAGE_CODES).map(async ([lang, code]) => {
        const response = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${code}-${book}.json`
        )
        if (!response.ok) throw new Error(`Failed to fetch ${lang} hadith data`)
        const data = await response.json()
        return [lang, data.hadiths] as const
      })

      const results = await Promise.all(fetchPromises)
      
      setHadithData(prev => {
        const newBookData = Object.fromEntries(results) as Record<LanguageWithArabic, Hadith[]>
        return {
          ...prev,
          [book]: newBookData
        }
      })
    } catch (error) {
      console.error('Error fetching hadith data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [hadithData, selectedLanguage])

  useEffect(() => {
    fetchHadithData(selectedBook)
  }, [selectedBook, fetchHadithData])

  const searchHadith = useCallback((query: string) => {
    if (!hadithData[selectedBook]?.[selectedLanguage]) return []

    const lowerQuery = query.toLowerCase()
    return hadithData[selectedBook][selectedLanguage].filter(hadith =>
      hadith.text.toLowerCase().includes(lowerQuery)
    )
  }, [hadithData, selectedBook, selectedLanguage])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.length > 2) {
        setSearchResults(searchHadith(searchTerm))
        setCurrentPage(1)
      } else {
        setSearchResults([])
      }
    }, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm, searchHadith])

  const getPaginatedResults = () => {
    return searchResults.slice(0, currentPage * resultsPerPage)
  }

  return (
    <>
      <Head>
        <title>SearchAyah: Search The Quran</title>
        <meta name="description" content="Search any hadith from 7 Different books with single word. The matching words will appear on the suggestion making it easy for the user to find hadith in the fastest way possible" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching hadith, Finding hadith, Easy hadith, learn hadith, hadith of prophet(SAW), hadees, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search The Hadith" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching word will appear on the suggestion making it easy for the user to get hadith in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/hadith" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    <div className="min-h-screen">
      <Card className="max-w-5xl mx-auto">
        <CardContent className="p-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Hadith"
              className="w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none text-sm sm:text-base"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Select Book</label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value as BookValue)}
                className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
              >
                {BOOKS.map((book) => (
                  <option key={book.value} value={book.value}>
                    {book.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-700">Translation Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
              >
                {Object.entries(LANGUAGE_CODES).map(([lang, _]) => (
                  lang !== 'arabic' && (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          {isLoading && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#67b2b4] mx-auto"></div>
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <>
              <div className="mt-6 bg-[#E5F6F6] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span className="font-semibold">FILTER</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {searchResults.length} Search Results
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {getPaginatedResults().map((result, index) => (
                  <HadithCard
                    key={`${result.hadithnumber}-${index}`}
                    result={result}
                    arabicText={hadithData[selectedBook]?.arabic?.find(
                      h => h.hadithnumber === result.hadithnumber
                    )?.text}
                    selectedLanguage={selectedLanguage}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>

              {searchResults.length > currentPage * resultsPerPage && (
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="w-full mt-4 py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  )
}