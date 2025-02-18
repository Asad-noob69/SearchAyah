"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Head from "next/head"

interface SahabaName {
  name: string
  url: string
}

const englishSahabaNames = [
  { name: "Abu Bakr `Abdullah ibn Abi Quhafa", url: "https://en.wikipedia.org/wiki/Abu_Bakr" },
  { name: "Ali ibn Abi Talib", url: "https://en.wikipedia.org/wiki/Ali_ibn_Abi_Talib" },
  { name: "Aqeel ibn Abi Talib", url: "https://en.wikipedia.org/wiki/Aqeel_ibn_Abi_Talib" },
  // Add more names...
]

const urduSahabaNames = [
  {
    name: "ابوبکر صدیق",
    url: "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%A8%DA%A9%D8%B1_%D8%B5%D8%AF%DB%8C%D9%82",
  },
  {
    name: "علی بن ابی طالب",
    url: "https://ur.wikipedia.org/wiki/%D8%B9%D9%84%DB%8C_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8",
  },
  // Add more names...
]

export default function SahabaSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [language, setLanguage] = useState<"english" | "urdu">("english")
  const [filteredNames, setFilteredNames] = useState<SahabaName[]>(englishSahabaNames)

  const handleSearch = (value: string) => {
    const names = language === "english" ? englishSahabaNames : urduSahabaNames
    const filtered = names.filter((sahaba) => sahaba.name.toLowerCase().includes(value.toLowerCase()))
    setFilteredNames(filtered)
  }

  const handleLanguageChange = (newLanguage: "english" | "urdu") => {
    setLanguage(newLanguage)
    setSearchTerm("")
    setFilteredNames(newLanguage === "english" ? englishSahabaNames : urduSahabaNames)
  }

  return (
    <>
    <Head>
        <title>SearchAyah: Search The Sahaba</title>
        <meta name="description" content="Search any Sahaba using the searchbar and it will guide you to the wikipedia of each sahaba by the names" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching Sahaba, Finding Sahaba, Easy Sahaba, learn Sahaba, Companions of prophet(SAW), Companions, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search about Companions" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching word will appear on the suggestion making it easy for the user to get hadith in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/sahaba" />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleSearch(e.target.value)
          }}
          placeholder="Search Name..."
          className="w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-sm sm:text-base mb-4"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
        <label className="text-slate-800">Translation Languages</label>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as "english" | "urdu")}
          className="px-4 py-2 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-slate-800"
        >
          <option value="english">English</option>
          <option value="urdu">اردو</option>
        </select>
      </div>

      <ul className={`space-y-4 mt-8 ${language === "urdu" ? "text-right" : ""}`}>
        {filteredNames.map((sahaba, index) => (
          <li key={index} className="border-b border-gray-200 pb-2">
            <a
              href={sahaba.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-800 hover:text-[#67b2b4] transition-colors"
            >
              {sahaba.name}
              <sup className="mx-2">{language === "urdu" ? "رضي الله عنه" : "R.A"}</sup>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

