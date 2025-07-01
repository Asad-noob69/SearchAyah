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

interface BookCategory {
  id: string;
  title: string;
  books: Book[];
}

const quranBook: Book = {
  id: "quran",
  title: "The Noble Quran",
  description: "The holy book of Islam, containing the revelations of Allah to Prophet Muhammad.",
  coverImage: "/images/qurancover.png",
  downloadLinks: ["https://drive.google.com/uc?export=download&id=1dIbBpAzk_xjNfyVJ1xGUnqC_7EdvZFQN"],
  readLinks: ["https://drive.google.com/file/d/1dIbBpAzk_xjNfyVJ1xGUnqC_7EdvZFQN/preview"],
  keywords: ["quran", "holy book", "islam", "muslim", "revelation", "allah", "prophet muhammad", "divine", "scripture", "guidance"],
}

export default function BooksPage() {
  const [bookCategories, setBookCategories] = useState<BookCategory[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [activeVolume, setActiveVolume] = useState(1)

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
        setIsLoading(true)
        const categories = [
          { id: "tafseer", title: "Tafseer Books" },
          { id: "hadith", title: "Hadith Books" },
          { id: "seerah", title: "Seerah Books" },
          { id: "khilafat", title: "Khilafat Books" },
          { id: "other", title: "Other Islamic Books" },
        ]

        const categoryPromises = categories.map(async (category) => {
          const response = await bookApi.getBooksByCategory(category.id)
          if (response.success) {
            return {
              ...category,
              books: response.data.map(bookApi.formatBookForFrontend),
            }
          }
          return { ...category, books: [] }
        })

        const fetchedCategories = await Promise.all(categoryPromises)
        setBookCategories(fetchedCategories.filter(category => category.books.length > 0))
      } catch (err) {
        setError("Failed to load books")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const allBooks = useMemo(() => {
    return [quranBook, ...bookCategories.flatMap(category => category.books)]
  }, [bookCategories])

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        const result = allBooks.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredBooks(result)
      }, 300),
    [allBooks]
  )

  useEffect(() => {
    debouncedSearch(searchInput)
  }, [searchInput, debouncedSearch])

  const renderBooksInRows = (books: Book[]) => {
    const booksPerRow = getBooksPerRow()
    const rows: Book[][] = []
    for (let i = 0; i < books.length; i += booksPerRow) {
      rows.push(books.slice(i, i + booksPerRow))
    }

    return rows.map((row, i) => (
      <div key={i} className="mb-12" aria-label={`Row ${i + 1}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-8">
          {row.map((book) => (
            <article key={book.id} className="relative flex flex-col items-center" itemScope itemType="https://schema.org/Book">
              <meta itemProp="name" content={book.title} />
              <meta itemProp="description" content={book.description.slice(0, 160)} />
              <meta itemProp="image" content={`https://searchayah.com${book.coverImage}`} />
              <meta itemProp="author" content="Various Authors" />
              <Link href={`/books/${bookCategories.find(cat => cat.books.includes(book))?.id}/${book.id}`} className="relative block w-28 sm:w-32 md:w-36 lg:w-40 h-40 sm:h-48 md:h-56 lg:h-60" onClick={(e) => { e.preventDefault(); setSelectedBook(book); }}>
                <Image
                  loader={cloudinaryLoader}
                  src={book.coverImage.replace("https://res.cloudinary.com/dppbxvjbg/image/upload/", "")}
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
  }

  const generateVolumeButtons = (totalVolumes: number) => {
    const buttons = []
    for (let i = 1; i <= totalVolumes; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-2 py-1 ${activeVolume === i ? "bg-yellow-600" : "bg-yellow-800"} text-white rounded hover:bg-yellow-900 text-xs sm:text-sm`}
          onClick={() => setActiveVolume(i)}
        >
          Vol {i}
        </button>
      )
    }
    return buttons
  }

  const closeBookPopup = () => {
    setSelectedBook(null)
    setActiveVolume(1)
  }

  return (
    <div className="bg-amber-50 min-h-screen" style={{ background: "url(/images/background.webp)" }}>
      <Head>
        <title>Islamic Books - Islamic Book Store</title>
        <meta name="description" content="Explore our collection of Islamic books including Tafseer, Hadith, Seerah, Khilafat, and more." />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Seerah, Khilafat" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Islamic Books",
            "description": "Explore our curated collection of Islamic books including Tafseer, Hadith, Seerah, Khilafat, and more.",
            "hasPart": allBooks.map((book) => ({
              "@type": "Book",
              "name": book.title,
              "description": book.description.slice(0, 160),
              "image": `https://searchayah.com${book.coverImage}`,
              "url": book.id === 'quran' ? quranBook.readLinks[0] : `https://searchayah.com/books/${bookCategories.find(cat => cat.books.includes(book))?.id}/${book.id}`
            }))
          })
        }} />
      </Head>

      <BookHeader searchInput={searchInput} setSearchInput={setSearchInput} />


      <main className="min-h-screen sm:px-24 md:px-16 px-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={48} className="animate-spin text-amber-800" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-12 md:py-24" id="book-container">
            <section className="w-full flex justify-center mb-16">
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
                <a href={quranBook.readLinks[0]} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={quranBook.coverImage}
                    alt="Quran"
                    width={224}
                    height={336}
                    className="book-cover h-auto object-contain mx-auto transform hover:-translate-y-2 transition duration-200 cursor-pointer w-full"
                  />
                </a>
                <div className="w-full flex justify-center">
                  <Image
                    src="/images/Untitled_design__5_-removebg.png"
                    width={350}
                    height={6}
                    className="w-full h-6 shadow-[0_17px_18px_#060606eb]"
                    alt="Wooden Plank to hold books"
                  />
                </div>
              </div>
            </section>
            {searchInput ? (
              <section className="w-full px-2 sm:px-4 md:px-8">
                {filteredBooks.length > 0 ? (
                  renderBooksInRows(filteredBooks)
                ) : (
                  <p className="text-center text-gray-500 py-12">No books found.</p>
                )}
              </section>
            ) : (
              bookCategories.map((category) => (
                <div key={category.id} className="flex flex-col gap-16 w-full" data-category-id={category.id}>
                  <header className="wooden-text relative w-full flex justify-center mt-12">
                    <h3 className="text-[#230b08] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      {category.title}
                    </h3>
                  </header>
                  <section className="w-full px-2 sm:px-4 md:px-8" aria-label={`${category.title} books`}>
                    {category.books.length > 0 ? renderBooksInRows(category.books) : (
                      <p className="text-center text-gray-500 py-12">No books found in this category.</p>
                    )}
                  </section>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative bg-[url('/images/bgforcard2.webp')] rounded bg-cover bg-center shadow-xl overflow-hidden flex flex-col md:flex-row">
              {/* Left side - Book cover image */}
              <div className="w-full md:w-1/3 flex justify-center p-4">
                <div className="w-32 sm:w-40 md:w-full h-48 sm:h-56 md:h-auto relative">
                  <Image
                    src={selectedBook.coverImage || "/placeholder.svg"}
                    alt={selectedBook.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-2/3 p-4 md:p-6 text-white">
                <div className="absolute top-2 right-2">
                  <button onClick={closeBookPopup} className="cursor-pointer hover:bg-red-500 p-1 rounded">
                    <X size={24} className="h-6 w-6" />
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#430000] mb-2">{selectedBook.title}</h2>

                <div className="max-h-32 sm:max-h-48 md:max-h-64 overflow-y-auto mb-4">
                  <p className="text-[#ece4e2] text-sm sm:text-base">{selectedBook.description}</p>
                </div>

                <div className="flex flex-col items-center mt-4">
                  <div className="flex space-x-2">
                    <button
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300 text-sm sm:text-base"
                      onClick={() => window.open(selectedBook.readLinks[activeVolume - 1], "_blank")}
                    >
                      Read
                    </button>
                    <button
                      className="px-3 py-1 sm:px-6 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
                      onClick={() => window.open(selectedBook.downloadLinks[activeVolume - 1], "_blank")}
                    >
                      Download
                    </button>
                  </div>

                  {/* Volume buttons */}
                  {selectedBook.volumes && selectedBook.volumes > 1 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {generateVolumeButtons(selectedBook.volumes)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 Islamic Book Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}