"use client"

import { useEffect, useState, type JSX } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter } from "lucide-react"
import type { SearchResult, QuranData, TranslationData, ChapterData, Language } from "../types/quran"

export default function QuranSearch(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [language, setLanguage] = useState<Language>("english")
  const [quranData, setQuranData] = useState<SearchResult[]>([])

  useEffect(() => {
    fetchQuranData()
  }, [])

  useEffect(() => {
    if (searchTerm.trim().split(/\s+/).length <= 3) {
      handleSearch()
    }
  }, [searchTerm])

  const fetchQuranData = async (): Promise<void> => {
    try {
      // Fetch Arabic text
      const arabicResponse = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani")
      const arabicData: QuranData = await arabicResponse.json()

      // Fetch English translation
      const englishResponse = await fetch("https://api.quran.com/api/v4/quran/translations/131")
      const englishData: TranslationData = await englishResponse.json()

      // Fetch Urdu translation
      const urduResponse = await fetch("https://api.quran.com/api/v4/quran/translations/97")
      const urduData: TranslationData = await urduResponse.json()

      // Fetch Surah names
      const surahResponse = await fetch("https://api.quran.com/api/v4/chapters")
      const surahData: ChapterData = await surahResponse.json()

      // Create a map of surah names
      const surahNames: Record<number, string> = surahData.chapters.reduce(
        (acc, surah) => ({
          ...acc,
          [surah.id]: surah.name_simple,
        }),
        {},
      )

      // Combine the data
      const combinedData: SearchResult[] = arabicData.verses.map((verse, index) => {
        const surahNumber: number = Math.floor(Number(verse.verse_key.split(":")[0]))
        return {
          surah: {
            number: surahNumber,
            englishName: `Surah ${surahNames[surahNumber]}`,
          },
          numberInSurah: Number.parseInt(verse.verse_key.split(":")[1]),
          text: verse.text_uthmani,
          englishTranslation: englishData.translations[index].text,
          urduTranslation: urduData.translations[index].text,
          arabicTranslation: verse.text_uthmani,
        }
      })

      setQuranData(combinedData)
    } catch (error) {
      console.error("Error fetching Quran data:", error)
    }
  }

  const handleSearch = async (): Promise<void> => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const matches: SearchResult[] = quranData
        .filter((ayah) => {
          const searchLower: string = searchTerm.toLowerCase()
          const translationKey = `${language}Translation`
          return ayah.text.includes(searchTerm) || ayah[translationKey].toLowerCase().includes(searchLower)
        })
        .map((result) => ({
          ...result,
          englishTranslation: cleanTranslation(result.englishTranslation),
          urduTranslation: cleanTranslation(result.urduTranslation),
          arabicTranslation: cleanTranslation(result.arabicTranslation),
        }))
      setSearchResults(matches)
    } catch (error) {
      console.error("Error searching:", error)
      setSearchResults([])
    }
    setIsLoading(false)
  }

  const cleanTranslation = (text: string): string => {
    return text.replace(/<[^>]*>/g, "").replace(/\s*$$[^)]*$$/g, "")
  }

  const highlightSearchTerm = (text: string, term: string): JSX.Element => {
    if (!term.trim()) return <>{text}</>
    const parts = text.split(new RegExp(`(${term})`, "gi"))
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <mark key={index} className="bg-blue-200 text-black">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    )
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value as Language)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-cyan-800">
      <h1 className="text-2xl font-semibold text-center text-cyan-800 mb-6" style={{ fontFamily: "Anton" }}>
        SearchAyah - Quran Search
      </h1>

      <div className="border border-[#67b2b4] rounded-lg p-6 mb-8 text-center">
        <p className="text-[#004D40] text-lg">
          "This is the Book about which there is no doubt, a guidance for those conscious of Allah."
        </p>
        <p className="text-[#004D40] mt-2">(Surah Al-Baqarah, 2:2)</p>
      </div>

      <form className="space-y-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search Word or Ayat of Quran"
          className="w-full px-4 py-3 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:border-[#004D40] text-gray-700"
        />

        <div className="flex items-center justify-between">
          <label className="text-gray-700">Translation Languages</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:border-[#004D40] text-gray-700"
          >
            <option value="english">English</option>
            <option value="urdu">اردو</option>
            <option value="arabic">العربية</option>
          </select>
        </div>
      </form>

      {searchResults.length > 0 && (
        <>
          <div className="mt-6 bg-[#E5F6F6] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="font-semibold">FILTER</span>
              </div>
              <span className="text-sm text-gray-600">Searching Arabic text and selected translation</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">{searchResults.length} Search Results</div>
          </div>

          <div className="mt-8 space-y-4">
            {searchResults.map((result, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-[#67b2b4] py-2 px-4">
                  <CardTitle className="text-white text-sm font-semibold">
                    {result.surah.englishName} {result.numberInSurah}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-8">
                  <div className="mb-8 text-right" dir="rtl">
                    <span className="text-2xl font-arabic text-cyan-900 leading-[3rem]">
                      {highlightSearchTerm(result.text, searchTerm)}
                    </span>
                  </div>
                  <p
                    className={`text-cyan-800 ${
                      ["urdu", "arabic"].includes(language) ? "text-right font-urdu leading-9" : ""
                    }`}
                    dir={["urdu", "arabic"].includes(language) ? "rtl" : "ltr"}
                  >
                    {highlightSearchTerm(result[`${language}Translation`], searchTerm)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

