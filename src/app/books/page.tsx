"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"

interface Book {
  id: number
  title: string
  image: string
}

const books: Book[] = [
  { id: 1, title: "Sahih Al-Bukhari", image: "/images/sahihbhukari.jpg" },
  { id: 2, title: "Sahih Muslim", image: "/images/sahimuslim.png" },
  { id: 3, title: "Musnad Imam Ahmad", image: "/images/musnadahmedibnhanbal.png" },
  { id: 4, title: "Sunan Abu Dawood", image: "/images/sunanabudawood.jpeg" },
  { id: 5, title: "Sunan Ibn Majah", image: "/images/sunanibnmajah.jpg" },
  { id: 6, title: "Sunan An-Nasa'i", image: "/images/sunannasai.webp" },
  { id: 7, title: "Sunan Ad-Darimi", image: "/images/sunandarmi.webp" },
  { id: 8, title: "Jami At-Tirmidhi", image: "/images/jamitirmidhi.png" },
]

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <Header />
      <main className="flex-grow bg-amber-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Islamic Books Collection</h1>
          <input
            type="text"
            placeholder="Search for books..."
            className="w-full p-2 mb-4 rounded-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-item flex flex-col items-center">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  width={128}
                  height={192}
                  className="w-32 h-48 object-cover shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                />
                <p className="mt-2 text-center font-semibold">{book.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

