"use client"

import Head from "next/head";
import { useState, useEffect } from "react"

interface SahabaListProps {
  sahabaNames: { name: string; url: string }[]
  language: "english" | "urdu"
}

export default function SahabaList({ sahabaNames, language }: SahabaListProps) {
  const [filteredNames, setFilteredNames] = useState(sahabaNames)

  useEffect(() => {
    const listItems = document.querySelectorAll("#list li")
    listItems.forEach((item) => {
      const link = item.querySelector("a")
      if (link) {
        const suffixElement = document.createElement("sup")
        suffixElement.textContent = language === "urdu" ? "رضي الله عنه" : "R.A"
        suffixElement.style.marginLeft = "0.3em"
        suffixElement.style.marginRight = "0.3em"
        link.insertAdjacentElement("afterend", suffixElement)
      }
    })
  }, [language])

  const searchList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value.toUpperCase()
    const filtered = sahabaNames.filter((sahaba) => sahaba.name.toUpperCase().indexOf(filter) > -1)
    setFilteredNames(filtered)
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
      <input
        type="text"
        id="search-bar"
        placeholder="Search Name..."
        className="text-base sm:text-lg w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#67b2b4] mb-4"
        onChange={searchList}
      />
      <ul id="list" className="max-w-full overflow-hidden mt-10">
        {filteredNames.map((sahaba, index) => (
          <li key={index}>
            <a href={sahaba.url} title={sahaba.name}>
              {sahaba.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

