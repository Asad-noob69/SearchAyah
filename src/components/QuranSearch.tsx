"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { Book, Languages, BookOpen, ChevronDown, Loader2, X, RefreshCw } from "lucide-react"
import axios from "axios"

// Types
type Language =
  | "english"
  | "urdu"
  | "indonesian"
  | "turkish"
  | "french"
  | "bengali"
  | "german"
  | "spanish"
  | "russian"
  | "arabic"
  | "portuguese"
  | "italian"

interface Word {
  text_uthmani: string
  translation: {
    text: string
  }
}

interface Verse {
  verse_key: string
  words: Word[]
  translations: Array<{
    text: string
    language: string
  }>
  text_uthmani?: string
}

interface Surah {
  number: number
  name: string
  verses: number
}

// Add these type definitions at the top of the file, after the existing types
interface SearchResult {
  surah: {
    number: number
    englishName: string
  }
  numberInSurah: number
  text: string
  translations: {
    [key in Language]: string
  }
}

interface QuranData {
  verses: {
    verse_key: string
    text_uthmani: string
  }[]
}

interface TranslationData {
  translations: {
    text: string
  }[]
}

interface ChapterData {
  chapters: {
    id: number
    name_simple: string
  }[]
}

// Translation IDs for the Quran API
const TRANSLATION_IDS = {
  english: 19,
  urdu: 97,
  indonesian: 33,
  turkish: 77,
  french: 31,
  bengali: 161,
  german: 27,
  spanish: 83,
  russian: 79,
  arabic: 169,
  portuguese: 128,
  italian: 40,
}

// List of all Surahs in the Quran
const SURAHS: Surah[] = [
  { number: 1, name: "Al-Fatihah", verses: 7 },
  { number: 2, name: "Al-Baqarah", verses: 286 },
  { number: 3, name: "Aali Imran", verses: 200 },
  { number: 4, name: "An-Nisa", verses: 176 },
  { number: 5, name: "Al-Ma'idah", verses: 120 },
  { number: 6, name: "Al-An'am", verses: 165 },
  { number: 7, name: "Al-A'raf", verses: 206 },
  { number: 8, name: "Al-Anfal", verses: 75 },
  { number: 9, name: "At-Tawbah", verses: 129 },
  { number: 10, name: "Yunus", verses: 109 },
  { number: 11, name: "Hud", verses: 123 },
  { number: 12, name: "Yusuf", verses: 111 },
  { number: 13, name: "Ar-Ra'd", verses: 43 },
  { number: 14, name: "Ibrahim", verses: 52 },
  { number: 15, name: "Al-Hijr", verses: 99 },
  { number: 16, name: "An-Nahl", verses: 128 },
  { number: 17, name: "Al-Isra", verses: 111 },
  { number: 18, name: "Al-Kahf", verses: 110 },
  { number: 19, name: "Maryam", verses: 98 },
  { number: 20, name: "Taha", verses: 135 },
  { number: 21, name: "Al-Anbiya", verses: 112 },
  { number: 22, name: "Al-Hajj", verses: 78 },
  { number: 23, name: "Al-Mu'minun", verses: 118 },
  { number: 24, name: "An-Nur", verses: 64 },
  { number: 25, name: "Al-Furqan", verses: 77 },
  { number: 26, name: "Ash-Shu'ara", verses: 227 },
  { number: 27, name: "An-Naml", verses: 93 },
  { number: 28, name: "Al-Qasas", verses: 88 },
  { number: 29, name: "Al-Ankabut", verses: 69 },
  { number: 30, name: "Ar-Rum", verses: 60 },
  { number: 31, name: "Luqman", verses: 34 },
  { number: 32, name: "As-Sajda", verses: 30 },
  { number: 33, name: "Al-Ahzab", verses: 73 },
  { number: 34, name: "Saba", verses: 54 },
  { number: 35, name: "Fatir", verses: 45 },
  { number: 36, name: "Yaseen", verses: 83 },
  { number: 37, name: "As-Saffat", verses: 182 },
  { number: 38, name: "Sad", verses: 88 },
  { number: 39, name: "Az-Zumar", verses: 75 },
  { number: 40, name: "Ghafir", verses: 85 },
  { number: 41, name: "Fussilat", verses: 54 },
  { number: 42, name: "Ash-Shura", verses: 53 },
  { number: 43, name: "Az-Zukhruf", verses: 89 },
  { number: 44, name: "Ad-Dukhan", verses: 59 },
  { number: 45, name: "Al-Jathiyah", verses: 37 },
  { number: 46, name: "Al-Ahqaf", verses: 35 },
  { number: 47, name: "Muhammad", verses: 38 },
  { number: 48, name: "Al-Fath", verses: 29 },
  { number: 49, name: "Al-Hujurat", verses: 18 },
  { number: 50, name: "Qaf", verses: 45 },
  { number: 51, name: "Adh-Dhariyat", verses: 60 },
  { number: 52, name: "At-Tur", verses: 49 },
  { number: 53, name: "An-Najm", verses: 62 },
  { number: 54, name: "Al-Qamar", verses: 55 },
  { number: 55, name: "Ar-Rahman", verses: 78 },
  { number: 56, name: "Al-Waqia", verses: 96 },
  { number: 57, name: "Al-Hadid", verses: 29 },
  { number: 58, name: "Al-Mujadila", verses: 22 },
  { number: 59, name: "Al-Hashr", verses: 24 },
  { number: 60, name: "Al-Mumtahina", verses: 13 },
  { number: 61, name: "As-Saff", verses: 14 },
  { number: 62, name: "Al-Jumuah", verses: 11 },
  { number: 63, name: "Al-Munafiqun", verses: 11 },
  { number: 64, name: "At-Taghabun", verses: 18 },
  { number: 65, name: "At-Talaq", verses: 12 },
  { number: 66, name: "At-Tahrim", verses: 12 },
  { number: 67, name: "Al-Mulk", verses: 30 },
  { number: 68, name: "Al-Qalam", verses: 52 },
  { number: 69, name: "Al-Haqqah", verses: 52 },
  { number: 70, name: "Al-Ma'arij", verses: 44 },
  { number: 71, name: "Nuh", verses: 28 },
  { number: 72, name: "Al-Jinn", verses: 28 },
  { number: 73, name: "Al-Muzzammil", verses: 20 },
  { number: 74, name: "Al-Muddathir", verses: 56 },
  { number: 75, name: "Al-Qiyamah", verses: 40 },
  { number: 76, name: "Al-Insan", verses: 31 },
  { number: 77, name: "Al-Mursalat", verses: 50 },
  { number: 78, name: "An-Naba", verses: 40 },
  { number: 79, name: "An-Naziat", verses: 46 },
  { number: 80, name: "Abasa", verses: 42 },
  { number: 81, name: "At-Takwir", verses: 29 },
  { number: 82, name: "Al-Infitar", verses: 19 },
  { number: 83, name: "Al-Mutaffifin", verses: 36 },
  { number: 84, name: "Al-Inshiqaq", verses: 25 },
  { number: 85, name: "Al-Buruj", verses: 22 },
  { number: 86, name: "At-Tariq", verses: 17 },
  { number: 87, name: "Al-Ala", verses: 19 },
  { number: 88, name: "Al-Ghashiyah", verses: 26 },
  { number: 89, name: "Al-Fajr", verses: 30 },
  { number: 90, name: "Al-Balad", verses: 20 },
  { number: 91, name: "Ash-Shams", verses: 15 },
  { number: 92, name: "Al-Layl", verses: 21 },
  { number: 93, name: "Ad-Duha", verses: 11 },
  { number: 94, name: "Ash-Sharh", verses: 8 },
  { number: 95, name: "At-Tin", verses: 8 },
  { number: 96, name: "Al-Alaq", verses: 19 },
  { number: 97, name: "Al-Qadr", verses: 5 },
  { number: 98, name: "Al-Bayyinah", verses: 8 },
  { number: 99, name: "Az-Zalzalah", verses: 8 },
  { number: 100, name: "Al-Adiyat", verses: 11 },
  { number: 101, name: "Al-Qariah", verses: 11 },
  { number: 102, name: "At-Takathur", verses: 8 },
  { number: 103, name: "Al-Asr", verses: 3 },
  { number: 104, name: "Al-Humazah", verses: 9 },
  { number: 105, name: "Al-Fil", verses: 5 },
  { number: 106, name: "Quraysh", verses: 4 },
  { number: 107, name: "Al-Ma'un", verses: 7 },
  { number: 108, name: "Al-Kawthar", verses: 3 },
  { number: 109, name: "Al-Kafirun", verses: 6 },
  { number: 110, name: "An-Nasr", verses: 3 },
  { number: 111, name: "Al-Masad", verses: 5 },
  { number: 112, name: "Al-Ikhlas", verses: 4 },
  { number: 113, name: "Al-Falaq", verses: 5 },
  { number: 114, name: "An-Nas", verses: 6 },
]

const VERSES_PER_PAGE = 20

export default function QuranBrowse() {
  // State for browse view
  const [currentSurah, setCurrentSurah] = useState(1)
  const [wordByWordPage, setWordByWordPage] = useState(1)
  const [isWordByWord, setIsWordByWord] = useState(false)
  const [verses, setVerses] = useState<Verse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchedSurah, setSearchedSurah] = useState<number | null>(null)
  const [searchedVerse, setSearchedVerse] = useState<number | null>(null)
  const [language, setLanguage] = useState<Language>("english")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFootnotes, setShowFootnotes] = useState(true) // New state to toggle footnotes
  // Add these state variables inside the QuranBrowse component
  const [quranData, setQuranData] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 20

  // Fetch verses for word-by-word view
  const fetchVerses = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${currentSurah}`, {
        params: {
          words: true,
          translations: TRANSLATION_IDS[language],
          language: language === "urdu" ? "ur" : "en",
          page: wordByWordPage,
          per_page: VERSES_PER_PAGE,
          word_fields: `text_uthmani,translation`,
        },
      })

      setVerses((prevVerses) =>
        wordByWordPage === 1 ? response.data.verses : [...prevVerses, ...response.data.verses],
      )
    } catch (err) {
      setError("Failed to fetch verses")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [currentSurah, wordByWordPage, language])

  // Fetch specific verse for word-by-word view
  const fetchSpecificVerse = useCallback(
    async (surahNum: number, verseNum: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(`https://api.quran.com/api/v4/verses/by_key/${surahNum}:${verseNum}`, {
          params: {
            words: true,
            translations: TRANSLATION_IDS[language],
            language: language === "urdu" ? "ur" : "en",
            word_fields: `text_uthmani,translation`,
          },
        })

        setVerses([response.data.verse])
      } catch (err) {
        setError("Failed to fetch specific verse")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [language],
  )

  // Parse verse reference from search input
  const parseVerseReference = (input: string) => {
    const match = input.match(/^(\d+):(\d+)$/)
    if (match) {
      const surahNum = Number.parseInt(match[1], 10)
      const verseNum = Number.parseInt(match[2], 10)

      const surah = SURAHS.find((s) => s.number === surahNum)
      if (!surah) {
        return { error: `Invalid Surah number. Please enter a number between 1 and 114.` }
      }

      if (verseNum < 1 || verseNum > surah.verses) {
        return { error: `Invalid verse number. Surah ${surah.name} has ${surah.verses} verses.` }
      }

      return { surahNum, verseNum }
    }

    return { error: null }
  }

  // Add these functions inside the QuranBrowse component
  const fetchTranslation = async (translationId: number) => {
    const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translationId}`)
    if (!response.ok) throw new Error(`Network response was not ok for translation ${translationId}`)
    const data: TranslationData = await response.json()
    return data.translations
  }

  const fetchQuranData = async () => {
    try {
      setIsLoading(true)
      // Fetch Arabic text
      const arabicResponse = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani")
      const arabicData: QuranData = await arabicResponse.json()

      // Fetch all translations
      const translations = await Promise.all(
        Object.entries(TRANSLATION_IDS).map(async ([lang, id]) => {
          const translationData = await fetchTranslation(id as number)
          return [lang, translationData]
        }),
      )

      // Create translations map
      const translationsMap = Object.fromEntries(translations)

      // Fetch Surah names
      const surahResponse = await fetch("https://api.quran.com/api/v4/chapters")
      const surahData: ChapterData = await surahResponse.json()

      // Create surah names map
      const surahNames = surahData.chapters.reduce<Record<number, string>>((acc, surah) => {
        acc[surah.id] = surah.name_simple
        return acc
      }, {})

      // Combine all data
      const combinedData: SearchResult[] = arabicData.verses.map((verse, index) => {
        const surahNumber = Math.floor(Number(verse.verse_key.split(":")[0]))
        return {
          surah: {
            number: surahNumber,
            englishName: `Surah ${surahNames[surahNumber]}`,
          },
          numberInSurah: Number.parseInt(verse.verse_key.split(":")[1]),
          text: verse.text_uthmani,
          translations: Object.fromEntries(
            Object.keys(TRANSLATION_IDS).map((lang) => [lang, translationsMap[lang][index]?.text || ""]),
          ) as Record<Language, string>,
        }
      })

      setQuranData(combinedData)
    } catch (error) {
      console.error("Error fetching Quran data:", error)
      setError("Failed to load Quran data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Replace the searchVersesByText function with this one
  const searchVersesByText = useCallback(
    (query: string) => {
      if (!query.trim() || query.trim().length < 3) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      const matches = quranData.filter((ayah) => {
        const searchLower = query.toLowerCase()
        const translationText = ayah.translations[language] || ""

        // Search in Arabic text (exact match for Arabic characters)
        // Search in translation (case-insensitive)
        return ayah.text.includes(query) || translationText.toLowerCase().includes(searchLower)
      })
      setSearchResults(matches)
      setCurrentPage(1)
      setIsSearching(false)
    },
    [quranData, language],
  )

  // Add this function to highlight search terms
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text
    const regex = new RegExp(`(${term})`, "gi")
    return text.replace(regex, '<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">$1</mark>')
  }

  // Add this function to get paginated results
  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage
    return searchResults.slice(0, startIndex + resultsPerPage)
  }

  // Handle search submit for verse reference
  const handleSearchSubmit = () => {
    // First check if it's a verse reference (e.g., 2:255)
    const verseRef = parseVerseReference(searchTerm)

    if (verseRef.surahNum && verseRef.verseNum) {
      setSearchedSurah(verseRef.surahNum)
      setSearchedVerse(verseRef.verseNum)
      setCurrentSurah(verseRef.surahNum)
      setIsWordByWord(true)
      setSearchResults([])
      fetchSpecificVerse(verseRef.surahNum, verseRef.verseNum)
    } else {
      // If not a valid verse reference, search by text
      searchVersesByText(searchTerm)
    }
  }

  // Handle surah change
  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSurah(Number(e.target.value))
    setWordByWordPage(1)
    setVerses([])
    setSearchedSurah(null)
    setSearchedVerse(null)
  }

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
    if (searchedSurah && searchedVerse) {
      fetchSpecificVerse(searchedSurah, searchedVerse)
    } else {
      setWordByWordPage(1)
      setVerses([])
      fetchVerses()
    }
  }

  // Handle word-by-word toggle
  const handleWordByWordToggle = (value: boolean) => {
    setIsWordByWord(value)
    if (searchedSurah && searchedVerse) {
      fetchSpecificVerse(searchedSurah, searchedVerse)
    } else {
      setWordByWordPage(1)
      setVerses([])
      fetchVerses()
    }
  }

  // Function to clean HTML and optionally remove <sup> tags
  const cleanTranslation = (text: string, includeSup: boolean) => {
    if (!includeSup) {
      return text.replace(/<sup[^>]*>.*?<\/sup>/gi, "").replace(/&lt;sup[^>]*&gt;.*?&lt;\/sup&gt;/gi, "")
    }
    return text
  }

  // Modify the renderVerseContent function to support highlighting
  const renderVerseContent = (verse: Verse, highlight = false) => {
    const completeArabicText = verse.words.map((word) => word.text_uthmani).join(" ");
    const translationClass = language === "urdu" ? "font-urdu text-right" : "text-left";

    // Safely access translations with a fallback
    const translation =
      verse.translations && Array.isArray(verse.translations)
        ? verse.translations.find((t) => t.language === (language === "urdu" ? "ur" : "en"))?.text ||
        verse.translations[0]?.text ||
        "Translation not available"
        : "Translation not available";

    if (isWordByWord) {
      return (
        <>
          <div className="flex flex-wrap flex-row-reverse gap-2">
            {verse.words.map((word, index) => (
              <div key={index} className="word-wrap flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-lg sm:text-xl md:text-2xl mb-2 font-arabic text-cyan-900">
                  {word.text_uthmani}
                </span>
                <span className={`text-base py-2 text-gray-600 ${language === "urdu" ? "font-urdu" : ""}`}>
                  {word.translation.text || "-"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p
              className={`text-cyan-900 ${translationClass}`}
              dangerouslySetInnerHTML={{
                __html: highlight
                  ? highlightSearchTerm(cleanTranslation(translation, showFootnotes), searchTerm)
                  : cleanTranslation(translation, showFootnotes),
              }}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="mb-4">
          <p
            className="text-lg sm:text-xl md:text-2xl font-arabic text-cyan-900 text-right leading-[3.5rem]"
            dangerouslySetInnerHTML={{
              __html: highlight ? highlightSearchTerm(completeArabicText, searchTerm) : completeArabicText,
            }}
          />
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p
            className={`text-cyan-900 ${translationClass}`}
            dangerouslySetInnerHTML={{
              __html: highlight
                ? highlightSearchTerm(cleanTranslation(translation, showFootnotes), searchTerm)
                : cleanTranslation(translation, showFootnotes),
            }}
          />
        </div>
      </>
    );
  };

  // Load initial verses
  useEffect(() => {
    fetchVerses()
  }, [fetchVerses])

  // Add this useEffect to load Quran data on component mount
  useEffect(() => {
    fetchQuranData()
  }, [])

  // Replace the existing useEffect for search with this one
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        // Check if it's a verse reference first
        const verseRef = parseVerseReference(searchTerm)
        if (verseRef.surahNum && verseRef.verseNum) {
          setSearchedSurah(verseRef.surahNum)
          setSearchedVerse(verseRef.verseNum)
          setCurrentSurah(verseRef.surahNum)
          setIsWordByWord(true)
          fetchSpecificVerse(verseRef.surahNum, verseRef.verseNum)
        } else {
          // If not a verse reference, search by text
          searchVersesByText(searchTerm)
        }
      } else {
        setSearchResults([])
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm, searchVersesByText, fetchSpecificVerse])

  return (
    <div className="min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl mx-auto text-cyan-800">
        <h1 className="text-2xl font-semibold text-center text-cyan-800 mb-6">Quran Browser</h1>

        <div className="border-2 border-[#67b2b4] rounded-lg p-6 text-center">
          <p className="text-[#004D40] text-base font-medium sm:text-lg">
            "This is the Book about which there is no doubt, a guidance for those conscious of Allah."
          </p>
          <p className="text-[#004D40] mt-2">(Surah Al-Baqarah, 2:2)</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 text-cyan-800">
        {/* Verse Reference or Text Search Bar */}
        <div className="relative mb-6">
          <div className="relative flex-grow">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by verse reference (e.g., 2:255) or by words in any language"
              className="w-full pl-10 pr-10 py-3 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSearchResults([])
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center">
              <BookOpen size={18} className="mr-2 text-[#67b2b4]" />
              <select
                onChange={handleSurahChange}
                value={currentSurah}
                className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
              >
                {SURAHS.map((surah) => (
                  <option key={surah.number} value={surah.number}>
                    {surah.name} ({surah.verses} verses)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="word-by-word"
                  name="view-type"
                  checked={isWordByWord}
                  onChange={() => handleWordByWordToggle(true)}
                  className="mr-2 accent-[#67b2b4]"
                />
                <label htmlFor="word-by-word" className="text-sm">
                  Word by Word
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="simple-translation"
                  name="view-type"
                  checked={!isWordByWord}
                  onChange={() => handleWordByWordToggle(false)}
                  className="mr-2 accent-[#67b2b4]"
                />
                <label htmlFor="simple-translation" className="text-sm">
                  Simple Translation
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <Languages size={18} className="mr-2 text-[#67b2b4]" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
              >
                <option value="english">English</option>
                <option value="urdu">اردو</option>
                <option value="indonesian">Indonesian</option>
                <option value="turkish">Turkish</option>
                <option value="french">French</option>
                <option value="bengali">Bengali</option>
                <option value="german">German</option>
                <option value="spanish">Spanish</option>
                <option value="russian">Russian</option>
                <option value="arabic">Arabic</option>
                <option value="portuguese">Portuguese</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
            {error}
            <button onClick={() => setError(null)} className="absolute top-3 right-3 text-red-700">
              <X size={16} />
            </button>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 text-center">
            <Loader2 className="animate-spin h-8 w-8 text-[#67b2b4] mx-auto" />
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Browse View */}
        {((verses.length > 0 && !isLoading) || (searchResults.length > 0 && !isSearching)) && (
          <>
            <div className="mt-6 bg-[#E5F6F6] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span className="font-semibold">
                    {searchResults.length > 0
                      ? `SEARCH RESULTS FOR "${searchTerm}"`
                      : searchedSurah && searchedVerse
                        ? `VERSE ${searchedSurah}:${searchedVerse}`
                        : `SURAH ${SURAHS[currentSurah - 1].name}`}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {searchResults.length > 0 ? `${searchResults.length} Results` : `${verses.length} Verses`}
                </span>
              </div>
            </div>

            {(searchResults.length > 0 || (searchedSurah && searchedVerse)) && (
              <button
                onClick={() => {
                  setSearchedSurah(null)
                  setSearchedVerse(null)
                  setSearchTerm("")
                  setSearchResults([])
                  setWordByWordPage(1)
                  setVerses([])
                  fetchVerses()
                }}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Clear Search & Return to Surah View
              </button>
            )}

            <div className="mt-8 space-y-4">
              {searchResults.length > 0
                ? getPaginatedResults().map((result, index) => (
                  <div key={`search-${index}`} className="overflow-hidden border border-[#67b2b4] rounded-lg">
                    <div className="bg-[#67b2b4] py-2 px-4">
                      <h3 className="text-white text-sm font-semibold">
                        {result.surah.englishName} {result.numberInSurah}
                      </h3>
                    </div>
                    <div className="px-4 pb-4 pt-8">
                      <div className="mb-4">
                        <p
                          className="text-lg sm:text-xl md:text-2xl font-arabic text-cyan-900 text-right leading-[3.5rem]"
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(result.text, searchTerm),
                          }}
                        />
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p
                          className={`text-cyan-900 ${language === "urdu" ? "font-urdu text-right" : "text-left"}`}
                          dir={language === "urdu" ? "rtl" : "ltr"}
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(result.translations[language], searchTerm),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
                : verses.map((verse, index) => (
                  <div
                    key={`verse-${verse.verse_key}-${index}`}
                    className="overflow-hidden border border-[#67b2b4] rounded-lg"
                  >
                    <div className="bg-[#67b2b4] py-2 px-4">
                      <h3 className="text-white text-sm font-semibold">Verse {verse.verse_key}</h3>
                    </div>
                    <div className="px-4 pb-4 pt-8">{renderVerseContent(verse)}</div>
                  </div>
                ))}
            </div>

            {searchResults.length > 0 && searchResults.length > currentPage * resultsPerPage && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-full mt-4 py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300 flex items-center justify-center"
              >
                <ChevronDown size={18} className="mr-2" />
                Load More Results
              </button>
            )}

            {!searchedSurah && !searchedVerse && searchResults.length === 0 && (
              <button
                onClick={() => setWordByWordPage((prevPage) => prevPage + 1)}
                className="w-full mt-4 py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300 flex items-center justify-center"
              >
                <ChevronDown size={18} className="mr-2" />
                Load More
              </button>
            )}
          </>
        )}

        {isSearching && (
          <div className="mt-8 text-center">
            <Loader2 className="animate-spin h-8 w-8 text-[#67b2b4] mx-auto" />
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {searchTerm && searchResults.length === 0 && !isSearching && (
          <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No results found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
