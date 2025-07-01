"use client"

import { useState, useEffect, useMemo } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { X, Menu, Loader2 } from "lucide-react"
import debounce from "lodash.debounce"
import BookHeader from "@/components/BookHeader"
import { bookApi } from "@/utils/api"
import { cloudinaryLoader } from "@/utils/cloudinaryLoader"

export type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  slug?: string;
  school?: string;
  downloadLinks: string[];
  readLinks: string[];
  volumes?: number;
  keywords: string[];
};

export default function IqbalBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWindowWidth(entry.contentRect.width)
      }
    })
    resizeObserver.observe(document.body)
    return () => resizeObserver.disconnect()
  }, [])

  const getBooksPerRow = () => (windowWidth < 640 ? 2 : windowWidth < 768 ? 3 : 4)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookApi.getBooksByCategory("Iqbal")
        if (response.success) {
          const formatted = response.data.map(bookApi.formatBookForFrontend)
          setBooks(formatted)
          setFilteredBooks(formatted)
        } else {
          setError("Failed to load books")
        }
      } catch (err) {
        setError("Failed to load books")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const result = books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredBooks(result)
      }, 300),
    [books]
  )

  useEffect(() => {
    debouncedSearch(searchInput)
  }, [searchInput, debouncedSearch])

  const bookRows = useMemo(() => {
    const perRow = getBooksPerRow()
    const rows: Book[][] = []
    for (let i = 0; i < filteredBooks.length; i += perRow) {
      rows.push(filteredBooks.slice(i, i + perRow))
    }
    return rows
  }, [filteredBooks, windowWidth])

  return (
    <div className="bg-amber-50 min-h-screen" style={{ background: "url(/images/background.webp)" }}>
      <Head>
        <title>Allama Iqbal Books - Islamic Book Store</title>
        <meta name="description" content="Explore our collection of Allama Iqbal’s books on spirituality, philosophy, and poetry." />
        <meta name="keywords" content="allama iqbal, iqbal books, bang-e-dara, baal-e-jibreel, islamic books, urdu poetry, iqbal philosophy" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Allama Iqbal Books",
            "description": "Explore our curated collection of Allama Iqbal's philosophical and poetic works.",
            "hasPart": books.map((book) => ({
              "@type": "Book",
              "name": book.title,
              "description": book.description.slice(0, 160),
              "image": `https://searchayah.com${book.coverImage}`,
              "url": `https://searchayah.com/books/iqbal/${book.id}`
            }))
          })
        }} />
      </Head>

      <BookHeader searchInput={searchInput} setSearchInput={setSearchInput} />


      <main className="min-h-screen sm:px-24 md:px-16 px-2 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={48} className="animate-spin text-amber-800" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <header className="wooden-text relative w-full flex justify-center mb-8 mt-8 md:mt-16">
              <h2 className="text-[#230b08] text-xl sm:text-xl md:text-2xl lg:text-3xl">
                Iqbal Books Collection
              </h2>
            </header>

            <section className="w-full px-2 sm:px-4 md:px-8">
              {bookRows.length > 0 ? (
                bookRows.map((row, i) => (
                  <div key={i} className="mb-12" aria-label={`Row ${i + 1}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-8">
                      {row.map((book) => (
                        <article key={book.id} className="relative flex flex-col items-center" itemScope itemType="https://schema.org/Book">
                          <meta itemProp="name" content={book.title} />
                          <meta itemProp="description" content={book.description.slice(0, 160)} />
                          <meta itemProp="image" content={`https://searchayah.com${book.coverImage}`} />
                          <meta itemProp="author" content="Allama Iqbal" />

                          <Link href={`/books/iqbal/${book.id}`} className="relative block w-28 sm:w-32 md:w-36 lg:w-40 h-40 sm:h-48 md:h-56 lg:h-60">
                            <Image
                              loader={cloudinaryLoader}
                              src={book.coverImage.replace(
                                "https://res.cloudinary.com/dppbxvjbg/image/upload/",
                                ""
                              )}
                              alt={`Cover image of ${book.title}`}
                              fill
                              className="object-contain hover:-translate-y-2 transition duration-200 rounded"
                              loading="lazy"
                            />
                          </Link>
                        </article>
                      ))}
                    </div>
                    <div className="w-full flex justify-center">
                      <Image
                        src="/images/Untitled_design__5_-removebg.png"
                        width={960}
                        height={6}
                        className="w-full h-6 shadow-[0_17px_18px_#060606eb]"
                        alt="Wooden Plank to hold books"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-12">No books found.</p>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 Islamic Book Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
