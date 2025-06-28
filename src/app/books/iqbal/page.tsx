"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { X, Menu, Loader2 } from "lucide-react"
import Sidebar from "../../../components/Sidebar"
import { bookApi } from "@/utils/api"
import { Book } from "@/lib/book-data"
import { cloudinaryLoader } from "@/utils/cloudinaryLoader"

export default function IqbalBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [showMainContent, setShowMainContent] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const response = await bookApi.getBooksByCategory('iqbal')
        
        if (response.success) {
          // Convert database books to frontend format
          const formattedBooks = response.data.map((book: any) => 
            bookApi.formatBookForFrontend(book)
          )
          setBooks(formattedBooks)
          setFilteredBooks(formattedBooks)
        } else {
          setError('Failed to load books')
        }
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Failed to load books')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const getBooksPerRow = () => (windowWidth < 640 ? 2 : windowWidth < 768 ? 3 : 4)

  useEffect(() => {
    if (searchInput) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
      setFilteredBooks(filtered)
      setShowMainContent(filtered.length === 0)
    } else {
      setFilteredBooks(books)
      setShowMainContent(true)
    }
  }, [searchInput, books])

  const renderBooksInRows = (books: Book[]) => {
    const booksPerRow = getBooksPerRow()
    const rows = []

    for (let i = 0; i < books.length; i += booksPerRow) {
      const rowBooks = books.slice(i, i + booksPerRow)
      rows.push(
        <div key={`row-${i}`} aria-label={`Book row ${i / booksPerRow + 1}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
            {rowBooks.map((book) => (
              <article key={book.id} className="relative flex flex-col items-center" itemScope itemType="https://schema.org/Book">
                <meta itemProp="name" content={book.title} />
                <meta itemProp="description" content={book.description.slice(0, 160)} />
                <meta itemProp="image" content={`https://searchayah.com${book.coverImage}`} />
                <meta itemProp="author" content="Allama Iqbal" />

                <div className="w-24 sm:w-28 md:w-32 lg:w-36 h-36 sm:h-40 md:h-48 lg:h-52 relative">
                  <Link href={`/books/iqbal/${book.slug}`} aria-label={`Read more about ${book.title}`}>
                    <Image
                      loader={cloudinaryLoader}
                      src={book.coverImage.replace(
                        "https://res.cloudinary.com/dppbxvjbg/image/upload/",
                        ""
                      )}
                      alt={`Cover image of ${book.title}`}
                      fill
                      className="book-cover object-contain transform hover:-translate-y-2 transition duration-200 cursor-pointer"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="w-full flex justify-center mb-8">
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
      )
    }

    return rows
  }

  return (
    <div className="bg-amber-50 min-h-screen" style={{ background: "url(/images/background.webp)" }}>
      <Head>
        <title>Allama Iqbal Books - Islamic Book Store</title>
        <meta name="description" content="Explore our collection of Allama Iqbal’s books on spirituality, philosophy, and poetry." />
        <meta name="keywords" content="allama iqbal, iqbal books, bang-e-dara, baal-e-jibreel, islamic books, urdu poetry, iqbal philosophy" />
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Head>

      <header className="bg-[url('/images/darkwood.webp')] text-white p-8 shadow-md">
        <div className="w-full flex flex-col md:flex-row justify-between items-center px-4">
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
              placeholder="Search Iqbal books..."
              className="w-full sm:w-64 md:w-96 p-2 rounded-md bg-white text-black"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search books"
            />
          </div>
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} aria-label="Sidebar overlay" />
        )}
      </header>

      <main className="min-h-screen sm:px-24 md:px-16 px-2" role="main">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={48} className="animate-spin text-amber-800" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        ) : showMainContent ? (
          <div className="flex flex-col items-center py-12 md:py-24" id="book-container">
            <div className="flex flex-col gap-28 mt-16 md:mt-24 w-full" data-category-id="iqbal">
              <header className="wooden-text relative w-full flex justify-center mb-8">
                <h2 className="text-[#230b08] text-xl sm:text-xl md:text-2xl lg:text-3xl">
                  Iqbal Books Collection
                </h2>
              </header>
              <section className="w-full px-2 sm:px-4 md:px-8" aria-label="Book list">
                {books.length > 0 ? renderBooksInRows(books) : (
                  <p className="text-center text-gray-500 py-12">No books found in this category.</p>
                )}
              </section>
            </div>
          </div>
        ) : (
          <section className="py-12" id="render-book-container" aria-label="Filtered book results">
            {filteredBooks.length > 0 ? (
              renderBooksInRows(filteredBooks)
            ) : (
              <p className="text-center text-gray-500 py-12">No matching books found.</p>
            )}
          </section>
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
