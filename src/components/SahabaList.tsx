"use client"

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
  )
}

