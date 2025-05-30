"use client"

import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { X, Menu, Book, BookOpen, BookCopy, Library, BookMarked, Bookmark, BookText } from "lucide-react"
import Sidebar from "../../../components/Sidebar"

// Book interface
interface Book {
  id: string
  title: string
  description: string
  coverImage: string
  volumes?: number
  downloadLinks: string[]
  readLinks: string[]
}

// Book category interface
interface BookCategory {
  id: string
  title: string
  books: Book[]
}

export default function PhilosophyPage() {
  const [searchInput, setSearchInput] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [showMainContent, setShowMainContent] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [activeVolume, setActiveVolume] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Track window width for responsive calculations
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to get appropriate icon for each category
  const getCategoryIcon = (categoryId: string) => {
    const iconClass = "mr-2"
    switch (categoryId) {
      case "tafseer":
        return <BookOpen size={18} className={iconClass} />
      case "hadith":
        return <BookText size={18} className={iconClass} />
      case "sunnah":
        return <BookMarked size={18} className={iconClass} />
      case "seerah":
        return <Book size={18} className={iconClass} />
      case "sahaba":
        return <Library size={18} className={iconClass} />
      case "khilafat":
        return <BookCopy size={18} className={iconClass} />
      case "iqbal":
        return <BookText size={18} className={iconClass} />
      case "philosophy":
        return <Book size={18} className={iconClass} />
      case "other":
        return <Bookmark size={18} className={iconClass} />
      default:
        return <Book size={18} className={iconClass} />
    }
  }

  // Calculate books per row based on screen size
  const getBooksPerRow = () => {
    if (windowWidth < 640) return 2 // mobile: 2 columns
    if (windowWidth < 768) return 3 // small tablets: 3 columns
    return 4 // larger screens: 4 columns
  }

  // Handle search input change
  useEffect(() => {
    if (searchInput) {
      const filtered = bookCategories.flatMap(category => category.books).filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
      setFilteredBooks(filtered)
      setShowMainContent(filtered.length === 0)
    } else {
      setFilteredBooks([])
      setShowMainContent(true)
    }
  }, [searchInput])

  // Open book popup
  const openBookPopup = (book: Book) => {
    setSelectedBook(book)
    setActiveVolume(1)
  }

  // Close book popup
  const closeBookPopup = () => {
    setSelectedBook(null)
  }

  // Update button links based on selected volume
  const updateButtonLinks = (volumeNumber: number) => {
    setActiveVolume(volumeNumber)
  }
  // Generate volume buttons
  const generateVolumeButtons = (totalVolumes: number | undefined) => {
    if (!totalVolumes) return []
    const buttons = []
    for (let i = 1; i <= totalVolumes; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-2 py-1 ${activeVolume === i ? "bg-yellow-600" : "bg-yellow-800"} text-white rounded hover:bg-yellow-900 text-xs sm:text-sm`}
          onClick={() => updateButtonLinks(i)}
        >
          Vol {i}
        </button>,
      )
    }
    return buttons
  }

  // Render books in rows with planks after each row
  const renderBooksInRows = (books: Book[]) => {
    const booksPerRow = getBooksPerRow()
    const rows = []

    for (let i = 0; i < books.length; i += booksPerRow) {
      const rowBooks = books.slice(i, i + booksPerRow)

      rows.push(
        <div key={`row-${i}`} className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
            {rowBooks.map((book) => (
              <div key={book.id} className="relative flex flex-col items-center">
                <div className="w-24 sm:w-28 md:w-32 lg:w-36 h-36 sm:h-40 md:h-48 lg:h-52 relative">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="book-cover object-contain transform hover:-translate-y-2 transition duration-200 cursor-pointer"
                    onClick={() => openBookPopup(book)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mb-8">
            <Image
              src="/images/Untitled_design__5_-removebg.png"
              width={960}
              height={6}
              className="w-full h-6 shadow-[0_17px_18px_#060606eb]"
              alt=""
            />
          </div>
        </div>,
      )
    }

    return rows
  }

  return (
    <div className="bg-amber-50 min-h-screen" style={{ background: "url(/images/background.webp)" }}>
      <Head>
        <title>Philosophy Books - Islamic Book Store</title>
        <meta name="description" content="Explore our collection of philosophy books at Islamic Book Store." />
        <meta
          name="keywords"
          content="philosophy books, Islamic philosophy, Islamic studies, Islamic bookstore"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}
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

          {/* Search bar */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search for philosophy books..."
              className="w-full sm:w-64 column  md:w-96 p-2 rounded-md bg-white text-black"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Use Sidebar component */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Overlay when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </header>

      <main className="min-h-screen sm:px-24 md:px-16 px-2">
        {showMainContent ? (
          <div className="flex flex-col items-center py-12 md:py-24" id="book-container">
            {/* Book Categories - Only Philosophy */}
            {bookCategories.map((category) => (
              <div className="flex flex-col gap-28 mt-16 md:mt-24 w-full" key={category.id} data-category-id={category.id}>
                <div className="wooden-text relative w-full flex justify-center mb-8">
                  <div className="relative">
                    <h3 className="absolute inset-0 text-[#230b08] flex items-center justify-center text-xl sm:text-xl md:text-2xl lg:text-3xl">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <section className="w-full px-2 sm:px-4 md:px-8">{renderBooksInRows(category.books)}</section>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12" id="render-book-container">
            {filteredBooks.length > 0 ? (
              <div>{renderBooksInRows(filteredBooks)}</div>
            ) : (
              <p className="text-center text-gray-500 py-12">No matching books found.</p>
            )}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2024 Islamic Book Store. All rights reserved.</p>
        </div>
      </footer>

      {/* Book Popup */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <div className="relative bg-[url('/images/bgforcard2.webp')] rounded bg-cover bg-center shadow-xl overflow-hidden flex flex-col md:flex-row">
              {/* Left side - Book cover image */}
              <div className="w-full md:w-1/3 flex justify-center p-4">
                <div className="w-32 sm:w-40 md:w-full h-48 sm:h-56 md:h-auto relative">
                  <Image
                    src={selectedBook?.coverImage || "/placeholder.svg"}
                    alt={selectedBook?.title || "Book cover"}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="w-full md:w-2/3 p-4 md:p-6 text-white">
                <div className="absolute top-2 right-2">
                  <button onClick={closeBookPopup} className="cursor-pointer hover:bg-red-500 p-1 rounded">
                    <X className="h-6 w-6" />
                  </button>
                </div>                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#430000] mb-2">{selectedBook?.title}</h2>

                <div className="max-h-32 sm:max-h-48 md:max-h-64 overflow-y-auto mb-4">
                  <p className="text-[#ece4e2] text-sm sm:text-base">{selectedBook?.description}</p>
                </div>

                <div className="flex flex-col items-center mt-4">
                  <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300 text-sm sm:text-base"
                    onClick={() => selectedBook && window.open(selectedBook.readLinks[activeVolume - 1], "_blank")}
                  >
                    Read
                  </button>                    
                  <button
                    className="px-3 py-1 sm:px-6 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
                    onClick={() => selectedBook && window.open(selectedBook.downloadLinks[activeVolume - 1], "_blank")}
                  >
                      Download
                    </button>
                  </div>

                  {/* Volume buttons */}                  
                  {selectedBook && selectedBook.volumes && selectedBook.volumes > 1 && (
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
    </div>
  )
}

// Philosophy books data (filtered from bookCategories)
const bookCategories: BookCategory[] = [
    {
    "id": "philosophy",
    "title": "Philosophical Books",
    "books": [
      {
        "id": "reconstruction-of-religious-thought-in-islam",
        "title": "Reconstruction of Religious Thought in Islam",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/reconstruction-of-religious-thoughts.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1Ea_UKYhdYuk87qbUJbcDC6xFMs5y5KdK/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1Ea_UKYhdYuk87qbUJbcDC6xFMs5y5KdK/view?usp=drive_link"
        ]
      },
      {
        "id": "-alchemy-of-happiness",
        "title": " Alchemy of Happiness",
        "description": "Written by the renowned Persian philosopher Al-Ghazali, The Alchemy of Happiness is a spiritual guide that focuses on achieving true happiness through self-awareness and the pursuit of inner purity. It delves into the nature of the soul, the importance of religious practice, and the realization of divine love. Ghazali's work teaches the balance between worldly life and spiritual growth, offering wisdom that encourages a deep connection with God while navigating life's challenges.",
        "coverImage": "/images/alchemyofhappiness.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1E6DMOZ8W9ivF3WBGJYTffnqY2MvWxBRY/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1E6DMOZ8W9ivF3WBGJYTffnqY2MvWxBRY/view?usp=drive_link"
        ]
      },
      {
        "id": "the-perfect-state",
        "title": "The Perfect State",
        "description": "Authored by the philosopher Al-Farabi, The Perfect State is a pioneering work in political philosophy, discussing the ideal society governed by virtuous and wise leadership. Al-Farabi merges Islamic and Greek philosophical ideas to outline a vision where justice, ethics, and intellect reign supreme. He describes the characteristics of a ruler who embodies knowledge and righteousness, promoting a utopian vision of governance that inspires order, peace, and moral excellence.",
        "coverImage": "/images/perfect-state.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1rDq7o1QS-HcRqNEcSoIQCWaF8B1d6o8d/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1rDq7o1QS-HcRqNEcSoIQCWaF8B1d6o8d/view?usp=drive_link"
        ]
      },
      {
        "id": "-minhaj-al-abideen",
        "title": " Minhaj Al-Abideen",
        "description": "Minhaj Al-Abideen is a profound guide by Imam Al-Ghazali, outlining the spiritual path of worship and devotion to Allah. The book is structured around the stages and obstacles that believers face in their journey towards spiritual fulfillment. It provides practical advice on overcoming worldly distractions, improving one's character, and attaining closeness to God. Al-Ghazali emphasizes sincerity, humility, and perseverance as essential qualities for spiritual progress.",
        "coverImage": "/images/minhaj-abideen.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1_F1yiH3-9fEMn901kxWAth9lNwRxHjoB/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1_F1yiH3-9fEMn901kxWAth9lNwRxHjoB/view?usp=drive_link"
        ]
      },
      {
        "id": "Inchorence of philosophy",
        "title": "The Incoherence of Philosophy",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/incoherenceofphilosophy.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1ic7jIMnTybMlYztaSgWYN5jfJ97fKKY3/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ic7jIMnTybMlYztaSgWYN5jfJ97fKKY3/view?usp=drive_link"
        ]
      },
      {
        "id": "SharahAlMukhtasar",
        "title": "Sharah al-mukhtasar",
        "description": "This work by Muhammad Iqbal re-examines traditional Islamic thought through the lens of modern philosophy and science. Iqbal explores the relationship between faith, reason, and knowledge, advocating for a revitalized understanding of Islam that harmonizes with contemporary issues. The book emphasizes dynamic change, spiritual development, and the integration of Islamic principles with modernity, challenging outdated interpretations and promoting intellectual growth in the Muslim world.",
        "coverImage": "/images/sharahalmukhtasar.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1HvK07vDhWaXkXbiVJ2MNR9r8IiznxBnM/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1HvK07vDhWaXkXbiVJ2MNR9r8IiznxBnM/view?usp=drive_link"

        ]
      },
    ]
  },
]