"use client"

import { useState, useEffect, useMemo } from "react"
import { Search } from "lucide-react"

interface Hadith {
  hadithnumber: string
  text: string
}

interface HadithData {
  [key: string]: Hadith[]
}

export default function HadithSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [selectedBook, setSelectedBook] = useState("eng-bukhari")
  const [searchResults, setSearchResults] = useState<Hadith[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hadithData, setHadithData] = useState<HadithData>({})
  const [arabicHadithData, setArabicHadithData] = useState<HadithData>({})
  const resultsPerPage = 20

  const books = useMemo(
    () => [
      { value: "eng-bukhari", label: "Sahih al-Bukhari" },
      { value: "eng-muslim", label: "Sahih Muslim" },
      { value: "eng-nasai", label: "Sunan an-Nasa'i" },
      { value: "eng-abudawud", label: "Sunan Abi Dawud" },
      { value: "eng-tirmidhi", label: "Jami` at-Tirmidhi" },
      { value: "eng-ibnmajah", label: "Sunan Ibn Majah" },
      { value: "eng-malik", label: "Muwatta Malik" },
    ],
    [],
  )

  useEffect(() => {
    const fetchHadithData = async () => {
      if (hadithData[selectedBook]) return

      setIsLoading(true)

      try {
        const baseBook = selectedBook.split("-")[1]
        const [translatedResponse, arabicResponse] = await Promise.all([
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${selectedBook}.json`),
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${baseBook}.json`),
        ])

        if (!translatedResponse.ok || !arabicResponse.ok) {
          throw new Error("Failed to fetch Hadith data")
        }

        const [translatedData, arabicData] = await Promise.all([translatedResponse.json(), arabicResponse.json()])

        setHadithData((prev) => ({ ...prev, [selectedBook]: translatedData.hadiths || [] }))
        setArabicHadithData((prev) => ({ ...prev, [selectedBook]: arabicData.hadiths || [] }))
      } catch (error) {
        console.error("Error fetching hadith data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHadithData()
  }, [selectedBook, hadithData]) // Added hadithData to the dependency array

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
  }, [searchTerm, selectedBook, hadithData])

  const searchHadith = (query: string) => {
    if (!hadithData[selectedBook]) return []
    return hadithData[selectedBook].filter((hadith) => hadith.text.toLowerCase().includes(query.toLowerCase()))
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.filter(String).map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-blue-200">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    )
  }

  const paginatedResults = searchResults.slice(0, currentPage * resultsPerPage)

  return (
    <section>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Hadith With Word"
            className="w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-sm sm:text-base mb-4"
          />
          <Search className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
          <label htmlFor="bookSelect" className="mr-2 text-slate-800">
            Select Hadith Book
          </label>
          <select
            id="bookSelect"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-slate-800"
          >
            {books.map((book) => (
              <option key={book.value} value={book.value}>
                {book.label}
              </option>
            ))}
          </select>
        </div>

        {isLoading && (
          <div className="my-5 text-center">
            <p>Loading...</p>
          </div>
        )}

        {searchResults.length > 0 && !isLoading && (
          <div id="searchInfo" className="my-5 bg-[#67b2b4] text-slate-800 bg-opacity-20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="w-6 h-6 mr-2" />
                <span className="font-semibold">FILTER</span>
              </div>
              <div className="text-sm">{searchResults.length} Search Results</div>
            </div>
          </div>
        )}

        <div className="space-y-10">
          {paginatedResults.map((result, index) => {
            const arabicMatch = arabicHadithData[selectedBook]?.find((h) => h.hadithnumber === result.hadithnumber)

            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <div className="bg-[#67b2b4] py-2 px-4">
                  <h3 className="text-white font-semibold">Hadith {result.hadithnumber}</h3>
                </div>
                <div className="px-4 pb-4 pt-8">
                  <p className="text-cyan-800 font-arabic leading-[4rem] text-right text-2xl" dir="rtl">
                    {arabicMatch?.text || "Arabic text not available"}
                  </p>
                  <p className={`text-cyan-800 my-10 ${selectedLanguage === "urdu" ? "font-urdu text-right" : ""}`}>
                    {highlightText(result.text, searchTerm)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {searchResults.length > paginatedResults.length && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="w-full py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300 mt-4"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  )
}

