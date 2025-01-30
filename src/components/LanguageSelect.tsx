"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function LanguageSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState("english")

  useEffect(() => {
    if (pathname.includes("sahaba-urdu")) {
      setLanguage("urdu")
    } else {
      setLanguage("english")
    }
  }, [pathname])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    if (newLanguage === "english") {
      router.push("/sahaba")
    } else if (newLanguage === "urdu") {
      router.push("/sahaba-urdu")
    }
  }

  return (
    <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
      <label htmlFor="languageSelect" className="mr-2 text-slate-800">
        Translation Languages
      </label>
      <select
        id="languageSelect"
        value={language}
        onChange={handleLanguageChange}
        className="px-4 py-2 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#67b2b4] text-slate-800"
      >
        <option value="english">English</option>
        <option value="urdu">اردو</option>
      </select>
    </div>
  )
}

