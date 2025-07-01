// components/Header.tsx
"use client"

import Image from "next/image"
import { Menu } from "lucide-react"
import Sidebar from "./Sidebar"
import { useState } from "react"

type HeaderProps = {
  searchInput: string
  setSearchInput: (val: string) => void
}

export default function BookHeader({ searchInput, setSearchInput }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <header className="relative text-white p-8 shadow-md overflow-hidden">
      {/* Background image using next/image for LCP optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/darkwood.webp"
          alt="Wood background"
          fill
          priority
          quality={70}
          className="object-cover"
        />
      </div>

      {/* Foreground content with matching layout */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-2 p-2 hover:bg-amber-800 rounded-md transition-all"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-amber-300" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-300">BOOKS STORE</h1>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search philosophy books..."
            className="w-full sm:w-64 md:w-96 p-2 rounded-md bg-white text-black"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search books"
          />
        </div>
      </div>

      {/* Sidebar and overlay */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  )
}
