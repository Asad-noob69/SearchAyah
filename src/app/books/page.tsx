"use client"

import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { X, Menu, Book, BookOpen, BookCopy, Library, BookMarked, Bookmark, BookText } from "lucide-react"
import Sidebar from "./../../components/Sidebar"

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

export default function BooksPage() {
  const [searchInput, setSearchInput] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [showMainContent, setShowMainContent] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [activeVolume, setActiveVolume] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle clicking outside the sidebar to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])
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
      const filtered = allBooks.filter((book) => book.title.toLowerCase().includes(searchInput.toLowerCase()))
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
  const generateVolumeButtons = (totalVolumes: number) => {
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
      placeholder="Search for books..."
      className="w-full sm:w-64 md:w-96 p-2 rounded-md bg-white text-black"
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
            <div className="w-full flex justify-center mb-16">
              <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
                <Image
                  src="/images/qurancover.png"
                  alt="Quran"
                  width={224}
                  height={336}
                  className="book-cover h-auto object-contain mx-auto transform hover:-translate-y-2 transition duration-200 cursor-pointer w-full"
                  onClick={() => openBookPopup(quranBook)}
                />
                <div className="w-full flex justify-center">
                  <Image
                    src="/images/Untitled_design__5_-removebg.png"
                    width={350}
                    height={6}
                    className="w-full h-6 shadow-[0_17px_18px_#060606eb]"
                    alt=""
                  />
                </div>
              </div>
            </div>            
            {/* Book Categories */}
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
          <p>&copy; 2024 Islamic Book Store. All rights reserved.</p>
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
                    <X className="h-6 w-6" />
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
    </div>
  )
}

const quranBook: Book = {
  id: "quran",
  title: "The Noble Quran",
  description: "The holy book of Islam, containing the revelations of Allah to Prophet Muhammad.",
  coverImage: "/images/qurancover.png",
  downloadLinks: ["https://drive.google.com/uc?export=download&id=1dIbBpAzk_xjNfyVJ1xGUnqC_7EdvZFQN"],
  readLinks: ["https://drive.google.com/file/d/1dIbBpAzk_xjNfyVJ1xGUnqC_7EdvZFQN/preview"],
}

const bookCategories: BookCategory[] = [
  {
    "id": "tafseer",
    "title": "Tafseer Books",
    "books": [
      {
        "id": "tafsir-ibn-abbas",
        "title": "Tafsir Ibn-'Abbas",
        "description": "Tafseer Ibn Abbas is one of the earliest Quranic commentaries, attributed to Abdullah ibn Abbas, a cousin of Prophet Muhammad (PBUH). Known for its concise and insightful explanations, it provides context, meanings, and interpretations of Quranic verses, reflecting Ibn Abbas's profound knowledge and close connection to the Prophet. Ibn Abbas (may Allah be pleased with him) said, The Holy Prophet (peace be upon him) placed his hand on my head and then prayed, O Allah, grant him understanding in religion",
        "coverImage": "/images/tafseeribnabbasimg.webp",
        "volumes": 3,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=18FMFR5sCwRoiK-rgZEeEGojfSbNINM-1",
          "https://drive.google.com/uc?export=download&id=17W6YTh3nLbXI5Ger_RHEoS54kPCvlxE3",
          "https://drive.google.com/uc?export=download&id=1YFIhafKrRhE9FoYY-rMtvsuYWLhXJJl3"
        ],
        "readLinks": [
          "https://drive.google.com/uc?export=download&id=18FMFR5sCwRoiK-rgZEeEGojfSbNINM-1",
          "https://drive.google.com/file/d/17W6YTh3nLbXI5Ger_RHEoS54kPCvlxE3/preview",
          "https://drive.google.com/file/d/1YFIhafKrRhE9FoYY-rMtvsuYWLhXJJl3/preview"
        ]
      },
      {
        "id": "bayan-ul-quran-tafseer-e-usmani",
        "title": "Bayan ul Quran & Tafseer e Usmani",
        "description": "This highly regarded work by Maulana Ashraf Ali Thanvi and Maulana Shabbir Ahmad Usmani provides a thorough and detailed commentary on the Quran. It is especially appreciated for its focus on explaining verses in their historical, linguistic, and theological contexts, helping readers understand the nuances of Quranic teachings. The commentary is both educational and spiritually enriching, often cited for its comprehensive approach to explaining complex concepts, making it a valuable resource for scholars and students alike.",
        "coverImage": "/images/Bayan ul Quran & Tafseer e Usmani.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1osMBEG8YJZgTdt-d3KLN7r6fGbfXvMlD"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1osMBEG8YJZgTdt-d3KLN7r6fGbfXvMlD/preview"
        ]
      },
      {
        "id": "tafsir-al-jalalayn",
        "title": "Tafsir al-Jalalayn",
        "description": "Authored by two prominent scholars, Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti, this work is one of the most famous and widely read commentaries on the Quran. It offers a concise and clear interpretation of every verse in the Quran, making it particularly useful for readers who seek an easily understandable yet authoritative exegesis. The commentary explains difficult words, provides background context, and simplifies complex theological concepts, making it a popular choice for both beginners and advanced students of Quranic studies.                ",
        "coverImage": "/images/Tafsir al-Jalalayn Book Cover Design.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1cQPt9hpzqY4bxhpdut_AxrCIlJpHEWGZ/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1cQPt9hpzqY4bxhpdut_AxrCIlJpHEWGZ/view?usp=drive_link"
        ]
      },
      {
        "id": "tafseer-ibn-katheer",
        "title": "Tafseer Ibn Katheer",
        "description": "Considered one of the most comprehensive and respected interpretations of the Quran, Tafseer Ibn Katheer is widely used by scholars, students, and general readers. It provides a detailed verse-by-verse analysis, often incorporating explanations from the Hadith (sayings of the Prophet) and the opinions of earlier Islamic scholars. Ibn Katheer’s commentary is known for its depth, clarity, and reliance on authentic sources, making it a cornerstone for understanding the Quran. It explores the historical context of the verses, their linguistic meanings, and the lessons derived from them, offering readers a profound and holistic understanding of the Quran.",
        "coverImage": "/images/tafseer ibn katheer.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1FCibkYzM9Dd_2mgrotjg4aTvCaTn5vWm/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1FCibkYzM9Dd_2mgrotjg4aTvCaTn5vWm/view?usp=drive_link"
        ]
      },
      {
        "id": "Tafseer E Qurtubi",
        "title": "Tafseer E Qurtubi",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/tafseerEqurtubi.webp",
        "volumes": 10,
        "downloadLinks": [
          "https://drive.google.com/file/d/128DNqL307sWZtc4mNMrsXIPU33UGOcc_/view?usp=drive_link", //1
          "https://drive.google.com/file/d/1iGZwbodj0E6X-AvqzKW59pcdC32dvsEk/view?usp=drive_link", //2
          "https://drive.google.com/file/d/1RO9G_qfhrZDO7edSofLed1F7_kIDCg8U/view?usp=drive_link", //3
          "https://drive.google.com/file/d/1A4Z55dEuqEoBZNldb2oIRxaYJalC9ASa/view?usp=drive_link", //4
          "https://drive.google.com/file/d/1Gs49dzUV99Haru6Z40N83g0QS2_DwDog/view?usp=drive_link", //5
          "https://drive.google.com/file/d/19xoqCgvW6uGHxjDGpoll1sdMIum2xFl2/view?usp=drive_link", //6
          "https://drive.google.com/file/d/1MEgKvo9A4c95pbVrAR9JGQzYloiWAORq/view?usp=drive_link", //7
          "https://drive.google.com/file/d/1Ya7jfMZGdzM_t-2zMXcZNasQs6D9iSfr/view?usp=drive_link", //8
          "https://drive.google.com/file/d/1NPEPZ7RIkWplsYFri8UHae8YuZtH_0DB/view?usp=drive_link", //9
          "https://drive.google.com/file/d/1TKZ0EfMVvkkeVnj7q_TjO-YeSFIUcpXg/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/128DNqL307sWZtc4mNMrsXIPU33UGOcc_/view?usp=drive_link", //1
          "https://drive.google.com/file/d/1iGZwbodj0E6X-AvqzKW59pcdC32dvsEk/view?usp=drive_link", //2
          "https://drive.google.com/file/d/1RO9G_qfhrZDO7edSofLed1F7_kIDCg8U/view?usp=drive_link", //3
          "https://drive.google.com/file/d/1A4Z55dEuqEoBZNldb2oIRxaYJalC9ASa/view?usp=drive_link", //4
          "https://drive.google.com/file/d/1Gs49dzUV99Haru6Z40N83g0QS2_DwDog/view?usp=drive_link", //5
          "https://drive.google.com/file/d/19xoqCgvW6uGHxjDGpoll1sdMIum2xFl2/view?usp=drive_link", //6
          "https://drive.google.com/file/d/1MEgKvo9A4c95pbVrAR9JGQzYloiWAORq/view?usp=drive_link", //7
          "https://drive.google.com/file/d/1Ya7jfMZGdzM_t-2zMXcZNasQs6D9iSfr/view?usp=drive_link", //8
          "https://drive.google.com/file/d/1NPEPZ7RIkWplsYFri8UHae8YuZtH_0DB/view?usp=drive_link", //9
          "https://drive.google.com/file/d/1TKZ0EfMVvkkeVnj7q_TjO-YeSFIUcpXg/view?usp=drive_link"
        ]
      },
      {
        "id": "bayan-ul-quran",
        "title": "Bayan-ul-Quran -Dr Israr Ahmed",
        "description": "Dr. Israr Ahmed (1932–2010) was a renowned Pakistani Islamic scholar, theologian, and philosopher who dedicated over four decades of his life to reviving the Quranic-centered Islamic worldview. His monumental work, Bayan-ul-Quran, is a comprehensive series of lectures and a seven-volume Urdu tafsir (exegesis) of the Holy Quran, blending translation, commentary, and practical insights. Delivered with intellectual depth and a reality-centric approach, this work aims to elucidate the Quran’s teachings, emphasizing its role as a guide for establishing a just Islamic society and fostering personal and collective transformation. Dr. Israr Ahmed, founder of Tanzeem-e-Islami, drew upon the Quran, Hadith, Seerah, historical examples, and even Allama Iqbal’s poetry to make the divine message accessible and relevant to contemporary life.",
        "coverImage": "/images/bayanulquran.webp",
        "volumes": 7,
        "downloadLinks": [
          "https://drive.google.com/file/d/19i7UKQBNPSHZh64KFVxkHgbiUuyLqtQv/view?usp=drive_link",
          "https://drive.google.com/file/d/1spuF67HZy0V9EocuwtyxROT3buBcswrW/view?usp=drive_link",
          "https://drive.google.com/file/d/1sLE0xE96c8caNz-fRpWa5lWSpj_y9w8N/view?usp=drive_link",
          "https://drive.google.com/file/d/1vFTvwSFVmkYyXoEM91ZeY8-w85If4w-u/view?usp=drive_link",
          "https://drive.google.com/file/d/1aXZGKU45Wf-eySmWn8PjHDCeROYlBV3o/view?usp=drive_link",
          "https://drive.google.com/file/d/1Jfl5nqW8tiQUj3IcughfGyPa2f04M9qz/view?usp=drive_link",
          "https://drive.google.com/file/d/1NmiUp_qQHgq37Ao6m7mzBkmocu3Mz0jn/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/19i7UKQBNPSHZh64KFVxkHgbiUuyLqtQv/view?usp=drive_link",
          "https://drive.google.com/file/d/1spuF67HZy0V9EocuwtyxROT3buBcswrW/view?usp=drive_link",
          "https://drive.google.com/file/d/1sLE0xE96c8caNz-fRpWa5lWSpj_y9w8N/view?usp=drive_link",
          "https://drive.google.com/file/d/1vFTvwSFVmkYyXoEM91ZeY8-w85If4w-u/view?usp=drive_link",
          "https://drive.google.com/file/d/1aXZGKU45Wf-eySmWn8PjHDCeROYlBV3o/view?usp=drive_link",
          "https://drive.google.com/file/d/1Jfl5nqW8tiQUj3IcughfGyPa2f04M9qz/view?usp=drive_link",
          "https://drive.google.com/file/d/1NmiUp_qQHgq37Ao6m7mzBkmocu3Mz0jn/view?usp=drive_link"
        ]
      },
    ]
  },
  {
    "id": "hadith",
    "title": "Hadith Books",
    "books": [
      {
        "id": "sahih-al-bukhari",
        "title": "Sahih al-Bukhari",
        "description": "Compiled by Imam Muhammad al-Bukhari, this collection is considered the most authentic book of Hadith in Sunni Islam, second only to the Quran. It contains over 7,000 Hadiths, rigorously verified for authenticity, covering various aspects of Islamic life, including theology, jurisprudence, ethics, and social conduct. Sahih al-Bukhari is highly revered for its precision and reliability, making it a fundamental resource for understanding the teachings of Prophet Muhammad (PBUH).",
        "coverImage": "/images/sahihbhukari.webp",
        "volumes": 8,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1wTbznFvrM6C1OTbk0AQA6y2pI-wUtYVr",
          "https://drive.google.com/uc?export=download&id=1Lr6Xu2zutIpjU1Un2-i85cGHylv3cZya",
          "https://drive.google.com/uc?export=download&id=1G712LAY0AftkuK92MHKM6txuQOGPkgrp",
          "https://drive.google.com/uc?export=download&id=1E9vOWfBixLclgFnG1q4E9HWaXiTfPKNR",
          "https://drive.google.com/uc?export=download&id=1D8o-fBIEFPptUc1Hszf4R_3HCRnbQitj",
          "https://drive.google.com/uc?export=download&id=1j7TRf_7Q2Zn7stkTeDyTogpFKaHmPISl",
          "https://drive.google.com/uc?export=download&id=1QYwEbnzS0NHXaa-76psQoMXls8mBnOH3",
          "https://drive.google.com/uc?export=download&id=1saI6rIVEDB8wBwhamWsWPyHu1XgpntL_"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wTbznFvrM6C1OTbk0AQA6y2pI-wUtYVr/preview",
          "https://drive.google.com/file/d/1Lr6Xu2zutIpjU1Un2-i85cGHylv3cZya/preview",
          "https://drive.google.com/file/d/1G712LAY0AftkuK92MHKM6txuQOGPkgrp/preview",
          "https://drive.google.com/file/d/1E9vOWfBixLclgFnG1q4E9HWaXiTfPKNR/preview",
          "https://drive.google.com/file/d/1D8o-fBIEFPptUc1Hszf4R_3HCRnbQitj/preview",
          "https://drive.google.com/file/d/1j7TRf_7Q2Zn7stkTeDyTogpFKaHmPISl/preview",
          "https://drive.google.com/file/d/1QYwEbnzS0NHXaa-76psQoMXls8mBnOH3/preview",
          "https://drive.google.com/file/d/1saI6rIVEDB8wBwhamWsWPyHu1XgpntL_/preview"
        ]
      },
      {
        "id": "sahih-muslim",
        "title": "Sahih Muslim",
        "description": "Compiled by Imam Muslim ibn al-Hajjaj, Sahih Muslim is considered one of the most authentic collections of Hadith, often mentioned alongside Sahih al-Bukhari. Imam Muslim applied rigorous criteria to verify the reliability of narrators and the continuity of the chain of transmission, which is why the Hadiths in this collection are highly regarded. Sahih Muslim consists of approximately 3,033 unique Hadiths, arranged by topics such as faith, prayer, charity, fasting, pilgrimage, and legal matters. Unlike other collections, Imam Muslim includes multiple chains of transmission for the same Hadith, highlighting the authenticity of the reports. This compilation serves as a key source for Islamic jurisprudence and is a primary reference for scholars and students.\n\n                ",
        "coverImage": "/images/sahimuslim.png",
        "volumes": 2,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1JIlzeIsXwv-hRpqQfw_0GTGRABvibLSM",
          "https://drive.google.com/uc?export=download&id=1xRi5LBojL9N5uRkIWQvEf6q22RY6pWay"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1JIlzeIsXwv-hRpqQfw_0GTGRABvibLSM/preview",
          "https://drive.google.com/file/d/1xRi5LBojL9N5uRkIWQvEf6q22RY6pWay/preview"
        ]
      },
      {
        "id": "al-muwatta",
        "title": "Al Muwatta",
        "description": "Al-Muwaṭṭaʾ or Muwatta Imam Malik of Imam Malik written in the 8th-century, is one of the earliest collections of hadith texts comprising the subjects of Islamic law, compiled by the Imam, Malik ibn Anas.",
        "coverImage": "/images/al-muwatta.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq/preview"
        ]
      },
      {
        "id": "sunan-abu-dawood",
        "title": "Sunan Abu Dawood",
        "description": "Compiled by Imam Abu Dawood al-Sijistani, this collection focuses heavily on Hadiths related to Islamic jurisprudence (fiqh). Sunan Abu Dawood includes around 4,800 Hadiths that are specifically selected for their relevance to legal rulings. Imam Abu Dawood collected Hadiths that dealt with issues of everyday life, social conduct, rituals, and legal verdicts. Although some Hadiths in the collection may not meet the highest standards of authenticity compared to Sahih Bukhari and Sahih Muslim, Imam Abu Dawood provides comments on the authenticity of the narrations, offering insights into their application in Islamic law. This collection is invaluable for jurists and students studying the implementation of Islamic law.",
        "coverImage": "/images/sunanabudawood.jpeg",
        "volumes": 4,
        "downloadLinks": [
          "https://drive.google.com/file/d/1KFq19QYArVal_N73ydLw7D5g2pKQ3b-A/view?usp=drive_link",
          "https://drive.google.com/file/d/1tHCh-83DROSoo-2NBfg-AZVuW3biEPCD/view?usp=drive_link",
          "https://drive.google.com/file/d/1Es1aQSB_u1tPpC_PfCEPE5n5hPZ_TedW/view?usp=drive_link",
          "https://drive.google.com/file/d/12cm4nUTTvWeiIeuV90eH-WDjf7Xy6S3u/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1KFq19QYArVal_N73ydLw7D5g2pKQ3b-A/view?usp=drive_link",
          "https://drive.google.com/file/d/1tHCh-83DROSoo-2NBfg-AZVuW3biEPCD/view?usp=drive_link",
          "https://drive.google.com/file/d/1Es1aQSB_u1tPpC_PfCEPE5n5hPZ_TedW/view?usp=drive_link",
          "https://drive.google.com/file/d/12cm4nUTTvWeiIeuV90eH-WDjf7Xy6S3u/view?usp=drive_link"
        ]
      },
      {
        "id": "sunan-ibn-majah",
        "title": "Sunan Ibn Majah",
        "description": "Compiled by Imam Ibn Majah, Sunan Ibn Majah is one of the six major Hadith collections in Sunni Islam. It contains around 4,341 Hadiths, dealing with various aspects of Islamic life, such as prayer, fasting, marriage, inheritance, and commercial transactions. While Sunan Ibn Majah is an important work, it includes some Hadiths of weaker authenticity compared to other collections like Sahih Bukhari or Sahih Muslim. Nonetheless, it remains a valuable resource for scholars due to its coverage of Hadiths that are not found in other major compilations. The collection is particularly significant for students and researchers in the field of Hadith sciences, as it offers insights into the diversity of narrations and the challenges of Hadith verification.",
        "coverImage": "/images/sunanibnmajah.webp",
        "volumes": 6,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1CFyl8Q91UYc6vrQ5gY2k0ykGhtGcP6Dz",
          "https://drive.google.com/uc?export=download&id=1aHRq_3aaYTRKq5wFixqamFG-SGVU5yIi",
          "https://drive.google.com/uc?export=download&id=1rkkCFtiqI-p-Qz5V7Iv0IUXVJG8p6v6M",
          "https://drive.google.com/uc?export=download&id=11jYp6YC_rcloWC_7T33PGJWF8IWdYKTm",
          "https://drive.google.com/uc?export=download&id=1zYTi5tAS8tMRNPULr2kYdmcwl9Rd12JK",
          "https://drive.google.com/uc?export=download&id=1WYetAUbboyPOGaAD6GbrVa6NQwTC9iF3"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1CFyl8Q91UYc6vrQ5gY2k0ykGhtGcP6Dz/preview",
          "https://drive.google.com/file/d/1aHRq_3aaYTRKq5wFixqamFG-SGVU5yIi/preview",
          "https://drive.google.com/file/d/1rkkCFtiqI-p-Qz5V7Iv0IUXVJG8p6v6M/preview",
          "https://drive.google.com/file/d/11jYp6YC_rcloWC_7T33PGJWF8IWdYKTm/preview",
          "https://drive.google.com/file/d/1zYTi5tAS8tMRNPULr2kYdmcwl9Rd12JK/preview",
          "https://drive.google.com/file/d/1WYetAUbboyPOGaAD6GbrVa6NQwTC9iF3/preview"
        ]
      },
      {
        "id": "sunan-an-nasai",
        "title": "Sunan an-Nasa'i",
        "description": "Compiled by Imam Ahmad an-Nasa'i, Sunan an-Nasa'i is well-regarded for its focus on authenticity and precision. This collection contains approximately 5,764 Hadiths, primarily related to Islamic law and jurisprudence. Imam an-Nasa'i was known for his critical approach to the authenticity of narrations, and he excluded any Hadiths he found to be weak or unreliable. As a result, Sunan an-Nasa'i is often considered the most rigorous of the four Sunan collections. It covers a wide range of topics, including rituals, social interactions, and legal rulings, and is frequently referenced by Islamic jurists for its comprehensive coverage of practical legal issues.",
        "coverImage": "/images/sunannasai.webp",
        "volumes": 7,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1Y6p8_fAB6qpyCzv9bZ-ZfWEQlKWFvAaS",
          "https://drive.google.com/uc?export=download&id=1D-EsEAuKM3s4BO4ZH_JiXO3v_mlvrTyI",
          "https://drive.google.com/uc?export=download&id=1xD2eedy6ttAIS9niegbJ4RrSr3YlrgK1",
          "https://drive.google.com/uc?export=download&id=1DxjrueovZTJ0GTeDj6s-ABcxoR4LoZks",
          "https://drive.google.com/uc?export=download&id=1dudCpUnnpG2ZqvgAn7gfHzYR4wVcYmtB",
          "https://drive.google.com/uc?export=download&id=1uaOoIQLRNloGwVQKwikUtrn_1EjPsnAZ",
          "https://drive.google.com/uc?export=download&id=1wljHRIJ5lR2wgMceBFOHC0XeN11PSHtd"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1Y6p8_fAB6qpyCzv9bZ-ZfWEQlKWFvAaS/preview",
          "https://drive.google.com/file/d/1D-EsEAuKM3s4BO4ZH_JiXO3v_mlvrTyI/preview",
          "https://drive.google.com/file/d/1xD2eedy6ttAIS9niegbJ4RrSr3YlrgK1/preview",
          "https://drive.google.com/file/d/1DxjrueovZTJ0GTeDj6s-ABcxoR4LoZks/preview",
          "https://drive.google.com/file/d/1dudCpUnnpG2ZqvgAn7gfHzYR4wVcYmtB/preview",
          "https://drive.google.com/file/d/1uaOoIQLRNloGwVQKwikUtrn_1EjPsnAZ/preview",
          "https://drive.google.com/file/d/1wljHRIJ5lR2wgMceBFOHC0XeN11PSHtd/preview"
        ]
      },
      {
        "id": "sunan-al-darimi",
        "title": "Sunan al-Darimi",
        "description": "Compiled by Imam al-Darimi, Sunan al-Darimi is a Hadith collection that focuses primarily on the sayings and practices of the Prophet (PBUH) and the traditions of the early generations of Muslims (the Salaf). It contains around 3,500 Hadiths, organized into books and chapters that cover essential topics such as faith, worship, and ethics. What distinguishes Sunan al-Darimi is its inclusion of narrations from prominent early scholars and jurists, giving readers insight into the Islamic scholarship of the second and third centuries of Islam. The Hadiths in this collection are accompanied by comments on their chains of transmission, offering insights into the authenticity and reliability of the narrators. While not considered as rigorous as the Sahih collections of Bukhari and Muslim, Sunan al-Darimi is still highly respected, particularly in the study of Hadith sciences, for its focus on key Islamic teachings and practices.",
        "coverImage": "/images/sunandarmi.webp",
        "volumes": 2,
        "downloadLinks": [
          "https://drive.google.com/file/d/1kH997zNZZtkW8lAxcz7L9YexzQNizy12/view?usp=drive_link",
          "https://drive.google.com/file/d/1N6SqtGGn5scv2WvNpQx3LafjXnT8bbje/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1kH997zNZZtkW8lAxcz7L9YexzQNizy12/view?usp=drive_link",
          "https://drive.google.com/file/d/1N6SqtGGn5scv2WvNpQx3LafjXnT8bbje/view?usp=drive_link"
        ]
      },
      {
        "id": "jami-at-tirmidhi",
        "title": "Jami' at-Tirmidhi",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/jamitirmidhi.png",
        "volumes": 2,
        "downloadLinks": [
          "https://drive.google.com/file/d/1BNjtz9pfl2WLwjvcOnlZ7lZkvPpCRa3I/view?usp=drive_link",
          "https://drive.google.com/file/d/1i9H8Bi39D7I3ZrAuaGOwb0gQ0bBTtvw0/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1BNjtz9pfl2WLwjvcOnlZ7lZkvPpCRa3I/view?usp=drive_link",
          "https://drive.google.com/file/d/1i9H8Bi39D7I3ZrAuaGOwb0gQ0bBTtvw0/view?usp=drive_link"
        ]
      }
    ]
  },
  {
    "id": "sunnah",
    "title": "Sunnah Books",
    "books": [
      {
        "id": "musnad-ahmad-ibn-hanbal",
        "title": "Musnad Ahmad ibn Hanbal",
        "description": "Compiled by Imam Ahmad ibn Hanbal, Musnad Ahmad is one of the largest Hadith collections, containing around 40,000 Hadiths. It is organized by narrators, primarily the Companions of the Prophet (PBUH), offering a unique musnad format where narrations are grouped by Companion. This allows for a deeper understanding of how Hadiths were transmitted. Covering topics such as theology, law, and the Prophet's life, the collection includes both strong and weak Hadiths, making it a valuable resource for scholars studying early Islamic history and scholarship.",
        "coverImage": "/images/musnadahmedibnhanbal.png",
        "volumes": 14,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1ozIuVtdTUmPQqneXsVFTCaibS8MUS4rT",
          "https://drive.google.com/uc?export=download&id=1RVO-iTwZTUPLNmmijbHiRiLOIoS6pudt",
          "https://drive.google.com/uc?export=download&id=1N2j5v1qx2sWhoN-uUUnw8ill_coRTUxC",
          "https://drive.google.com/uc?export=download&id=1h8lEbxJnvSOYV105k3zM95ZMmoJKYdg_",
          "https://drive.google.com/uc?export=download&id=11rX7gOWRzJZFdvh6lQGftfNh7C72lAzR",
          "https://drive.google.com/uc?export=download&id=1D2VEZfusuh2KBOh85H958OutCHmQsxYy",
          "https://drive.google.com/uc?export=download&id=1LzgjP5u_DTTNzV2-AbZ4dqIH7EZUCZ2w",
          "https://drive.google.com/uc?export=download&id=1U6-D40En0hUwec3087xdaH1CI2w9y5Zx",
          "https://drive.google.com/uc?export=download&id=1poYJGfne0kAH6TUvAqmocO24E0H-Cc6P",
          "https://drive.google.com/uc?export=download&id=1KZUKu-rP--trAZnwqfaKvIQO6_axIedA",
          "https://drive.google.com/uc?export=download&id=19X_YVqVFoMCib0wnCkdZUZXTB23RCGFV",
          "https://drive.google.com/uc?export=download&id=1OqUoJlcTjpnyuBjSkyRUM4_jJ8VqGwQc",
          "https://drive.google.com/uc?export=download&id=1PqzRM_Nih5MAteZXouPGiE-XykO8gLWX",
          "https://drive.google.com/uc?export=download&id=14asZE8oED9OytSSmIkxQbeA7p6jPywFu"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ozIuVtdTUmPQqneXsVFTCaibS8MUS4rT/preview",
          "https://drive.google.com/file/d/1RVO-iTwZTUPLNmmijbHiRiLOIoS6pudt/preview",
          "https://drive.google.com/file/d/1N2j5v1qx2sWhoN-uUUnw8ill_coRTUxC/preview",
          "https://drive.google.com/file/d/1h8lEbxJnvSOYV105k3zM95ZMmoJKYdg_/preview",
          "https://drive.google.com/file/d/11rX7gOWRzJZFdvh6lQGftfNh7C72lAzR/preview",
          "https://drive.google.com/file/d/1D2VEZfusuh2KBOh85H958OutCHmQsxYy/preview",
          "https://drive.google.com/file/d/1LzgjP5u_DTTNzV2-AbZ4dqIH7EZUCZ2w/preview",
          "https://drive.google.com/file/d/1U6-D40En0hUwec3087xdaH1CI2w9y5Zx/preview",
          "https://drive.google.com/file/d/1poYJGfne0kAH6TUvAqmocO24E0H-Cc6P/preview",
          "https://drive.google.com/file/d/1KZUKu-rP--trAZnwqfaKvIQO6_axIedA/preview",
          "https://drive.google.com/file/d/19X_YVqVFoMCib0wnCkdZUZXTB23RCGFV/preview",
          "https://drive.google.com/file/d/1OqUoJlcTjpnyuBjSkyRUM4_jJ8VqGwQc/preview",
          "https://drive.google.com/file/d/1PqzRM_Nih5MAteZXouPGiE-XykO8gLWX/preview",
          "https://drive.google.com/file/d/14asZE8oED9OytSSmIkxQbeA7p6jPywFu/preview"
        ]
      },
      {
        "id": "bulugh-al-maram",
        "title": "Bulugh al-Maram",
        "description": "Bulugh al-Maram (Attainment of the Objective) is a distinguished compilation of hadiths focusing on Islamic jurisprudence (fiqh). Compiled by the famous scholar Ibn Hajar al-Asqalani, this book is highly regarded for its selection of hadiths that serve as evidence for rulings in various branches of Islamic law, including purification, prayer, fasting, zakat, pilgrimage, and transactions. It is widely studied by students of knowledge and scholars alike due to its organized presentation of legal texts, which helps clarify Islamic laws and practices.",
        "coverImage": "/images/Bulugh al-maram.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1VmChmpl05NZZDe0kAdHRgCimIo10wJdi"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1VmChmpl05NZZDe0kAdHRgCimIo10wJdi/preview"
        ]
      },
      {
        "id": "riyad-as-salihin",
        "title": "Riyad as-Salihin",
        "description": "Riyad as-Salihin (Gardens of the Righteous) is a renowned collection of hadiths compiled by the great Islamic scholar, Imam An-Nawawi. It is a comprehensive book that provides a wide array of authentic sayings of the Prophet Muhammad (PBUH), offering practical guidance on how to live a righteous and ethical life. The hadiths are organized into various chapters, covering topics like sincerity, patience, gratitude, forgiveness, and more. This book is essential for Muslims who seek to improve their character and strengthen their relationship with Allah through the teachings of the Prophet Muhammad (PBUH).",
        "coverImage": "/images/Wahabi Tempering in Riyad-us-Saliheen.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1xjbIWEMRDQ8sXmPJdztUeVbQnksxmlXG"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1xjbIWEMRDQ8sXmPJdztUeVbQnksxmlXG/preview"
        ]
      },
      {
        "id": "al-adab-al-mufrad",
        "title": "Al-Adab Al-Mufrad",
        "description": "Al-Adab al-Mufrad (The Book of Manners) is a collection of hadiths compiled by the renowned scholar Imam Al-Bukhari, focusing specifically on the topics of ethics and good manners in Islam. The book emphasizes the importance of proper conduct in various aspects of life, including family relations, social interactions, and community life. Through the teachings of the Prophet Muhammad (PBUH), the book provides guidelines on how to maintain respect, humility, and kindness in daily life, making it a valuable resource for personal development and spiritual growth.",
        "coverImage": "/images/Al-Adab Al-Mufrad_ A Code for Everyday Living, The Example of the Early Muslims.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1QJ7fbu1ukHwre8ytn3szfP0EoZ7L9I0k"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1QJ7fbu1ukHwre8ytn3szfP0EoZ7L9I0k/preview"
        ]
      }
    ]
  },
  {
    "id": "seerah",
    "title": "Seerah Books",
    "books": [
      {
        "id": "tafsir-ibn-abbas",
        "title": "Tafsir Ibn-'Abbas",
        "description": "Tafseer Ibn Abbas is one of the earliest Quranic commentaries, attributed to Abdullah ibn Abbas, a cousin of Prophet Muhammad (PBUH). Known for its concise and insightful explanations, it provides context, meanings, and interpretations of Quranic verses, reflecting Ibn Abbas's profound knowledge and close connection to the Prophet.",
        "coverImage": "/images/NobleLifeOfProphet.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1tI7ll1XNyT3ZbsLy0gtH2I_TspBTdh6d"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1tI7ll1XNyT3ZbsLy0gtH2I_TspBTdh6d/preview"
        ]
      },
      {
        "id": "in-the-footsteps-of-the-prophet",
        "title": "In the Footsteps of the Prophet",
        "description": "This enlightening biography delves into the life of Prophet Muhammad (PBUH), focusing on his exemplary character and moral teachings. The author presents an engaging narrative that captures the essence of the Prophet’s life, illustrating how his actions and teachings continue to inspire millions around the world. By contextualizing his life within the socio-political landscape of 7th-century Arabia, the book serves as a valuable resource for both new and seasoned readers of Islamic history.",
        "coverImage": "/images/InTheFootstepOfProphet.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1j6yR6CCCS7KJOXLyTLsf_pXbeCxrOkbZ"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1j6yR6CCCS7KJOXLyTLsf_pXbeCxrOkbZ/preview"
        ]
      },
      {
        "id": "prophet-of-mercy",
        "title": "Prophet of Mercy",
        "description": "This book paints a vivid portrait of the compassion and mercy embodied by Prophet Muhammad (PBUH). Through various anecdotes and stories, the author highlights how the Prophet addressed conflicts, extended kindness to others, and upheld justice in his community. The narrative emphasizes the relevance of his teachings in contemporary society, inspiring readers to adopt his principles of empathy and understanding in their daily lives.",
        "coverImage": "/images/ProphetOfMercy.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1rwf1M-8S4beHpYrdPzdo195pcryDxtE5"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1rwf1M-8S4beHpYrdPzdo195pcryDxtE5/preview"
        ]
      },
      {
        "id": "critical-life-seerah",
        "title": "Critical Life Seerah",
        "description": "Offering a scholarly examination of the life of Prophet Muhammad (PBUH), this book focuses on pivotal events that shaped his mission and the early Islamic community. It combines historical facts with critical analysis, allowing readers to engage deeply with the material. The author explores the social, economic, and political factors influencing the Prophet's actions, providing a comprehensive understanding of his life and the challenges he faced.",
        "coverImage": "/images/CriticalLifeSeerah.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1DI8d2hbFn454BCmgw5fp2zFcpTlPdGaq"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1DI8d2hbFn454BCmgw5fp2zFcpTlPdGaq/preview"
        ]
      },
      {
        "id": "seeratunnabi",
        "title": "Seeratunnabi",
        "description": "This extensive multi-volume work provides an in-depth exploration of the life and teachings of Prophet Muhammad (PBUH). Each volume is dedicated to specific periods of his life, from his early childhood to his prophethood and the establishment of the Islamic state. The text is enriched with authentic narrations and historical accounts, making it an essential reference for those seeking to understand the Prophet's impact on humanity.",
        "coverImage": "/images/seeratunnabi.webp",
        "volumes": 7,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1WVz0Wk7e0xX37dsywtA_4TY0x0blRRsa",
          "https://drive.google.com/uc?export=download&id=1odTWCDOFRpHS8p9lH48WLpF0ko85E1B4",
          "https://drive.google.com/uc?export=download&id=1eHi4EN3e3bORsiG10NI8AjRqCg9ysUc1",
          "https://drive.google.com/uc?export=download&id=1V4qslr8gc4lpdCRG_-XlEJ6RDbImQImt",
          "https://drive.google.com/uc?export=download&id=1_4UiK4uwTdx988UH-QpfoY8NlGJFy-Gj",
          "https://drive.google.com/uc?export=download&id=1ad815JgDE4lb7Pjp1Sf9l7weZw-qVPvw",
          "https://drive.google.com/uc?export=download&id=1j0jJMhvbXRjdVu5troqRg1RM1E2sKuOq"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1WVz0Wk7e0xX37dsywtA_4TY0x0blRRsa/preview",
          "https://drive.google.com/file/d/1odTWCDOFRpHS8p9lH48WLpF0ko85E1B4/preview",
          "https://drive.google.com/file/d/1eHi4EN3e3bORsiG10NI8AjRqCg9ysUc1/preview",
          "https://drive.google.com/file/d/1V4qslr8gc4lpdCRG_-XlEJ6RDbImQImt/preview",
          "https://drive.google.com/file/d/1_4UiK4uwTdx988UH-QpfoY8NlGJFy-Gj/preview",
          "https://drive.google.com/file/d/1ad815JgDE4lb7Pjp1Sf9l7weZw-qVPvw/preview",
          "https://drive.google.com/file/d/1j0jJMhvbXRjdVu5troqRg1RM1E2sKuOq/preview"
        ]
      },
      {
        "id": "sirat-ibn-hisham",
        "title": "Sirat Ibn Hisham",
        "description": "A classic biography compiled by Ibn Hisham, this book is based on the earlier works of Ibn Ishaq and serves as a vital resource for understanding the life of Prophet Muhammad (PBUH). It meticulously documents significant events and milestones, providing context and insights into the socio-cultural backdrop of the time. The narrative not only focuses on the Prophet's public life but also offers glimpses into his personal relationships and character.",
        "coverImage": "/images/Sirat Ibn Hisham Biography of the Prophet by Abdus Salim pdf free download.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=19-gD6C6UWQjs0byzTQjY5VcvgHIgB64Y"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/18FMFR5sCwRoiK-rgZEeEGojfSbNINM-1/preview"
        ]
      },
      {
        "id": "ishaqs-sirat-rasul-allah",
        "title": "Ishaq's Sirat Rasul Allah",
        "description": "This influential work retells the life of Prophet Muhammad (PBUH) based on the original narrative by Ibn Ishaq. It chronicles key events in the Prophet’s life and the early Islamic community, capturing the essence of his message and the challenges faced by his followers. The author’s engaging storytelling makes it accessible to a wide audience, serving as a foundational text for understanding the rise of Islam.",
        "coverImage": "/images/Ishaq's Seerah muahmmad saw.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1Yx7u4zZVOtMyG81GDKmUAGIcy688YgVJ"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1Yx7u4zZVOtMyG81GDKmUAGIcy688YgVJ/preview"
        ]
      },
      {
        "id": "shamail-al-tirmidhi",
        "title": "Shamail al-Tirmidhi",
        "description": "A unique compilation of hadiths detailing the physical appearance, character, and habits of Prophet Muhammad (PBUH), this book provides readers with an intimate portrayal of the Prophet. It covers various aspects of his life, including his demeanor, dress, and daily practices, allowing readers to appreciate his virtues and emulate his conduct. The text serves as a source of inspiration for those seeking to embody the values and attributes of the Prophet in their own lives.",
        "coverImage": "/images/Shamil e tirmidi.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1KBLMex-40fEadga4-ywzpdf40KRklViZ"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1KBLMex-40fEadga4-ywzpdf40KRklViZ/preview"
        ]
      }
    ]
  },
  
  {
    "id": "sahaba",
    "title": "Sahaba Books",
    "books": [
      {
        "id": "abu-bakr-sadiqque",
        "title": "Abu Bakr Sadiqque",
        "description": "This biography of Abu Bakr As-Siddiq, the first Caliph of Islam, offers readers an in-depth exploration of his life, leadership, and legacy. Renowned for his unwavering piety and wisdom, Abu Bakr played a pivotal role in consolidating the early Islamic community following the death of Prophet Muhammad (PBUH). The book details his contributions to the establishment of the Islamic state, his diplomatic skills, and his profound impact on the faith's early followers. Through vivid storytelling and historical context, readers gain insights into his character and the challenges he faced, including the wars of apostasy and the compilation of the Quran. This work serves as an essential resource for understanding the foundations of Islamic governance and the principles that guided Abu Bakr during his caliphate.",
        "coverImage": "/images/abu bakr sadiqque.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1k2oTdf3woAOMXPp5HtOxF6jt7V00f6Qt"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1k2oTdf3woAOMXPp5HtOxF6jt7V00f6Qt/preview"
        ]
      },
      {
        "id": "umar-ibn-al-khattab-his-life-and-times",
        "title": "Umar Ibn Al-Khattab (رضي الله عنه) His Life and Times",
        "description": "This comprehensive biography chronicles the life of Umar Ibn Al-Khattab, the second Caliph of Islam, known for his transformative leadership and commitment to justice. The book highlights his early life, conversion to Islam, and the remarkable reforms he instituted during his caliphate, which significantly shaped the Islamic state. Readers will appreciate Umar's military strategies, his role in expanding the Muslim empire, and his efforts to establish a welfare system for the community. With a focus on his character, decisions, and interactions with contemporaries, this biography paints a vivid picture of a leader who balanced strength with humility, leaving a lasting legacy in Islamic history.",
        "coverImage": "/images/[PDF] Umar Ibn Al-Khattab (رضي الله عنه) His Life and Times _ Dr_ Ali Muhammad Sallaabee _ Free Download, Borrow, and Streaming _ Internet Archive.jpeg",
        "volumes": 2,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1s9abf9JhcNSQmJt-g5IUieQw7r4iMrD6",
          "https://drive.google.com/uc?export=download&id=1RGG7Xe34DH0NfiVdMOKO0mS-_8ns_mfi"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1s9abf9JhcNSQmJt-g5IUieQw7r4iMrD6/preview",
          "https://drive.google.com/file/d/1RGG7Xe34DH0NfiVdMOKO0mS-_8ns_mfi/preview"
        ]
      },
      {
        "id": "biography-of-uthman-ibn-affan-",
        "title": "Biography of Uthman Ibn Affan (رضي الله عنه)",
        "description": "This engaging biography delves into the life of Uthman Ibn Affan, the third Caliph of Islam, who is celebrated for his generosity, diplomacy, and dedication to preserving the Quran. The book discusses Uthman's contributions to the Islamic state, including his role in compiling the Quran into a single, authoritative text and his extensive public works. It explores his leadership style, the challenges he faced, including political unrest and opposition, and his eventual martyrdom, which marked a significant turning point in Islamic history. Readers will gain a deeper understanding of Uthman's virtues, his vision for the Muslim community, and the complexities of his caliphate during a turbulent era.",
        "coverImage": "/images/[PDF] Biography of Uthman Ibn Affan (رضي الله عنه) _ Dr_ Ali Muhammad As-Sallabi _ Free Download, Borrow, and Streaming _ Internet Archive.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1am7nUpvSBYo7Dq7_bStpcsDLnt5wmend"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1am7nUpvSBYo7Dq7_bStpcsDLnt5wmend/preview"
        ]
      },
      {
        "id": "ali-ibn-abi-talib",
        "title": "Ali ibn Abi Talib",
        "description": "This biography highlights the life and legacy of Ali ibn Abi Talib, the cousin and son-in-law of Prophet Muhammad (PBUH), and the fourth Caliph of Islam. The book examines Ali's early life, his pivotal role in the early Islamic community, and his unwavering commitment to justice and truth. It details his contributions as a warrior, a statesman, and a scholar, emphasizing his knowledge of Islamic teachings and his deep spirituality. The narrative captures the complexities of Ali's leadership during the fitna (civil strife) and his efforts to maintain unity within the Muslim community. Readers will appreciate his profound wisdom, moral integrity, and the challenges he faced as a leader during a time of great upheaval.",
        "coverImage": "/images/'Ali ibn Abi Talib.jpeg",
        "volumes": 2,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1sbj04IruvU21Jq5l-8ZmiA9V2_lJznkF",
          "https://drive.google.com/uc?export=download&id=1tE6i1Ftd4h2tDA6xmOlrlw8Ktw2HpfpF"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1sbj04IruvU21Jq5l-8ZmiA9V2_lJznkF/preview",
          "https://drive.google.com/file/d/1tE6i1Ftd4h2tDA6xmOlrlw8Ktw2HpfpF/preview"
        ]
      },
      {
        "id": "khalid-ibn-al-walid",
        "title": "Khalid ibn al-Walid",
        "description": "This biography recounts the life of Khalid ibn al-Walid, a legendary military commander in Islamic history known as 'The Sword of Allah.' The book explores his strategic brilliance, key battles, and significant contributions to the early expansion of Islam, including his roles in the battles of Yarmouk and Uhud. It details Khalid's transformation from a fierce opponent of Islam to one of its most devoted champions, illustrating his unwavering commitment to the faith. Through detailed accounts of his military campaigns and personal anecdotes, readers gain insights into his leadership style, tactical innovations, and the values that guided him in both warfare and governance. This biography serves as a testament to his legacy as a remarkable figure in Islamic history.",
        "coverImage": "/images/khalid ibn walid.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1GUVfL8oGbpW4qVtBIWHT9YFcRQ2Gch0r"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1GUVfL8oGbpW4qVtBIWHT9YFcRQ2Gch0r/preview"
        ]
      },
      {
        "id": "al-hassan-ibn-ali",
        "title": "Al-Hassan Ibn Ali",
        "description": "This book presents a comprehensive biography of Al-Hassan Ibn Ali (رضي الله عنه), the grandson of the Prophet Muhammad (PBUH). Dr. Ali Muhammad Sallabi meticulously explores Al-Hassan’s life, focusing on his upbringing, character, and significant contributions to early Islamic history. The book delves into Al-Hassan’s pivotal role in the early Muslim community, particularly his leadership during a time of great political turmoil. It highlights his peacemaking efforts, especially his decision to step down from the caliphate to prevent further conflict, thus earning him the title 'the reconciler.' Dr. Sallabi also provides insight into Al-Hassan's relationship with his family, his deep love for the Prophet (PBUH), and his lasting impact on Islamic leadership and scholarship.",
        "coverImage": "/images/Al hassan.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1gX9VYlI5FT88vcPKQ8_rbEm_FFtWVHoB"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1gX9VYlI5FT88vcPKQ8_rbEm_FFtWVHoB/preview"
        ]
      },
      {
        "id": "hayatus-sahabah",
        "title": "Hayatus Sahabah",
        "description": "This extensive collection in Arabic provides detailed accounts of the lives of the companions of Prophet Muhammad (PBUH), known as the Sahabah. The book serves as a vital resource for understanding the contributions and sacrifices made by these key figures in early Islam. It covers their roles in significant historical events, their character traits, and their profound dedication to the Prophet and the Islamic cause. Through various narratives, readers will appreciate the diverse backgrounds and experiences of the Sahabah, highlighting their commitment to spreading the message of Islam. This work not only honors their legacy but also serves as an inspiring guide for contemporary Muslims seeking to emulate their virtues and steadfastness in faith.",
        "coverImage": "/images/Hayatus Sahabah in Arabic 3 books.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1m_uBGEICx2jMZHoctqRTs_L1LegQwJy-"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1m_uBGEICx2jMZHoctqRTs_L1LegQwJy-/preview"
        ]
      },
      {
        "id": "biography-of-the-rightly-guided-caliphs",
        "title": "Biography of the Rightly Guided Caliphs",
        "description": "This book details the lives of the four Rightly Guided Caliphs: Abu Bakr As-Siddiq, Umar Ibn Al-Khattab, Uthman Ibn Affan, and Ali Ibn Abi Talib (رضي الله عنهم). It highlights their individual leadership styles, their contributions to the early expansion and consolidation of the Islamic state, and their enduring legacy in the Muslim world. Through rich narrative and historical accounts, the book offers an in-depth look into how these caliphs upheld justice, implemented Islamic laws, and managed the political, social, and economic challenges of their time. Their piety, wisdom, and dedication to the principles of Islam are emphasized, showing how their reigns shaped the future of the Islamic world. The book serves as a vital resource for understanding the foundations of Islamic governance and leadership.",
        "coverImage": "/images/biography of rightly caliphate.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1_oJZjto3IqOOTMs72oz3JjJLY5stoXmv/view?usp=drive_link"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1_oJZjto3IqOOTMs72oz3JjJLY5stoXmv/view?usp=drive_link"
        ]
      }
    ]
  },
  
  
  {
    "id": "other",
    "title": "Other Islamic Books",
    "books": [
      {
        "id": "bulugh-al-maram",
        "title": "Bulugh al-Maram",
        "description": "The Muqaddimah, written by the eminent Islamic scholar and historian Ibn Khaldun in the 14th century, is a foundational text in the fields of sociology, historiography, and philosophy of history. Often translated as The Introduction, this work serves as a preface to Ibn Khaldun's larger historical narrative, providing profound insights into the nature of society, the dynamics of civilizations, and the processes of social change. Ibn Khaldun introduces his innovative concepts, such as 'Asabiyyah (social cohesion or group solidarity) and the cyclical theory of history, which explains how societies rise, flourish, and eventually decline. He argues that strong social bonds and collective identity are essential for the prosperity of any civilization, while the weakening of these bonds leads to its downfall.",
        "coverImage": "/images/Goodreads.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1enCwLJsPqqeLzNEvhZUwWSM6b5VNnmko"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1enCwLJsPqqeLzNEvhZUwWSM6b5VNnmko/preview"
        ]
      },
      {
        "id": "dhul-qarnayn-and-yajooj-and-majooj",
        "title": "Dhul-Qarnayn and Yajooj and Majooj",
        "description": "Dhul-Qarnayn and Yajooj Majooj explores the historical and spiritual significance of these figures in Islamic tradition.  explores the fascinating story of Dhul-Qarnayn, a righteous ruler mentioned in the Quran, and the mysterious tribes of Yajooj and Majooj (Gog and Magog). The book provides an in-depth analysis of Dhul-Qarnayn's journey, his encounters with various civilizations, and his efforts to contain the destructive forces of Yajooj and Majooj behind a great barrier. It also delves into the eschatological significance of Yajooj and Majooj in Islamic tradition, particularly their role in the events leading up to the Day of Judgment. The book offers insights into historical interpretations, religious prophecies, and the spiritual lessons drawn from this captivating narrative.",
        "coverImage": "/images/dulqarnain and yajooj majooj.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1-o4dKYu4b1WoUQJtp5eMKrnD8Tz3_CcW"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1-o4dKYu4b1WoUQJtp5eMKrnD8Tz3_CcW/preview"
        ]
      },
      {
        "id": "the-ideal-muslim-society",
        "title": "The Ideal Muslim Society",
        "description": "The Ideal Muslim Society presents a thorough exploration of the societal values and behaviors outlined in the Qur'an and Sunnah. This work delineates the fundamental principles that constitute an ideal Muslim community, emphasizing justice, compassion, and mutual respect among its members. The author articulates key aspects such as family values, social responsibility, and community cohesion, drawing on Islamic teachings to illustrate how these elements contribute to a harmonious society. By examining the role of individuals within this framework, the book encourages readers to actively participate in creating a society that reflects Islamic ideals, promoting a lifestyle rooted in ethical principles and a commitment to collective well-being.",
        "coverImage": "/images/The Ideal Muslim Society _ As Defined in the Qur'an and Sunnah.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1Hyu_04F9uyjj2NnXvrVeeBvV00mj_gJK"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1Hyu_04F9uyjj2NnXvrVeeBvV00mj_gJK/preview"
        ]
      },
     
      {
        "id": "hayatussahaba",
        "title": "HayatUsSahaba",
        "description": "Hayat Us Sahaba is an extensive compilation that narrates the lives, virtues, and significant contributions of the companions of Prophet Muhammad (PBUH). It highlights their unwavering dedication, exemplary character, and pivotal roles in the early Islamic community. The book serves as an inspirational guide, emphasizing the moral values and lessons that can be drawn from the companions' lives. It not only provides historical context but also aims to motivate readers to emulate the qualities of these remarkable individuals in their own lives.",
        "coverImage": "/images/hayatalsahaba.jpg",
        "volumes": 3,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=15Bbj7pyn-H2RNCo8njYcBfReRZePFLTx",
          "https://drive.google.com/uc?export=download&id=1QOqRjw0WpCyER1tvwfmafCVa6uuGDNK0",
          "https://drive.google.com/uc?export=download&id=119Yu7IuV7hf6EWmIHb1597vnh1qB0CXt"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15Bbj7pyn-H2RNCo8njYcBfReRZePFLTx/preview",
          "https://drive.google.com/file/d/1QOqRjw0WpCyER1tvwfmafCVa6uuGDNK0/preview",
          "https://drive.google.com/file/d/119Yu7IuV7hf6EWmIHb1597vnh1qB0CXt/preview"
        ]
      },
      
      {
        "id": "dont-be-sad",
        "title": "Don't Be Sad",
        "description": "Don't Be Sad is an Islamic self-help book designed to provide readers with practical advice, inspiration, and guidance on cultivating happiness and peace through faith. The author draws on Islamic teachings and personal anecdotes to encourage readers to overcome challenges, embrace positivity, and develop a resilient mindset. The book offers a collection of motivational insights aimed at helping individuals navigate the trials of life, fostering a sense of contentment and fulfillment through trust in Allah and adherence to Islamic principles.",
        "coverImage": "/images/Don't Be Sad.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1DsQqTBC210q3xYcBV3nOca2Vh-Q-orgN"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1DsQqTBC210q3xYcBV3nOca2Vh-Q-orgN/preview"
        ]
      },
      {
        "id": "when-the-moon-split",
        "title": "When the Moon Split",
        "description": "When the Moon Split is a comprehensive biography of Prophet Muhammad (PBUH), focusing on the miraculous event of the splitting of the moon and other pivotal moments in Islamic history. The book delves into the life and teachings of the Prophet, exploring the circumstances surrounding his prophethood and the challenges he faced. It provides a detailed account of the early Islamic community's formation, highlighting the key events and figures that shaped the faith. The narrative serves to deepen readers' understanding of the Prophet's character and the foundational principles of Islam, offering valuable lessons for contemporary Muslims.",
        "coverImage": "/images/When the Moon Split  B_W-HC.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1BcQCl4pItcrVYvcaMENlDHH9c0McLqe5"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1BcQCl4pItcrVYvcaMENlDHH9c0McLqe5/preview"
        ]
      },
      
      {
        "id": "the-reliance-of-the-traveller",
        "title": "The Reliance of the Traveller",
        "description": "The Reliance of the Traveller (Umdat as-Salik) is a classical manual of Islamic jurisprudence (fiqh) according to the Shafi'i school, translated and annotated by Nuh Ha Mim Keller. This authoritative work covers a wide range of topics, including acts of worship, marriage, business transactions, criminal law, and much more, providing practical guidelines for Muslims on how to lead a life in accordance with Islamic principles. The book is not only a legal guide but also a spiritual manual, combining legal rulings with moral and ethical teachings. It has become a widely referenced text for both scholars and laypersons, offering a clear and concise path for adhering to Islamic law and maintaining personal piety.",
        "coverImage": "/images/reliance-of-traveller.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1FH4gipdbEy467kK-7E2mCOYF23oHqWfl"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1FH4gipdbEy467kK-7E2mCOYF23oHqWfl/preview"
        ]
      },
      {
        "id": "the-book-of-manner",
        "title": "The Book of Manner",
        "description": "The Book of Manners is a guide to Islamic etiquette, emphasizing the importance of good character, moral behavior, and proper conduct in all aspects of life. Drawing from the Quran, Hadith, and the teachings of the Prophet Muhammad (PBUH), the book outlines the manners and etiquettes Muslims should adopt in their interactions with others, whether in social, familial, or religious contexts. Topics include manners of speaking, eating, dressing, and socializing, as well as the proper way to approach acts of worship. The book serves as a practical manual for cultivating refined behavior, underscoring the role of manners in achieving spiritual growth and earning the pleasure of Allah.",
        "coverImage": "/images/download (3).jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1-x-hsINvbPfxyFhEABiuFHo_UoWL2mnK"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1-x-hsINvbPfxyFhEABiuFHo_UoWL2mnK/preview"
        ]
      },
      {
        "id": "-faiz-ul-bari",
        "title": " Faiz-ul-Bari",
        "description": "Faiz-ul-Bari is a comprehensive commentary on the Sahih al-Bukhari, one of the most authoritative collections of Hadith in Sunni Islam. Written by the renowned scholar Anwar Shah Kashmiri, this book offers a deep analysis of the Hadith, explaining their meanings, context, and significance in Islamic jurisprudence and theology. The commentary provides critical insights into the methodology of Hadith transmission and interpretation, while also addressing various legal and spiritual aspects of Islam. Known for its scholarly depth and clarity, Faiz-ul-Bari is an essential work for students and scholars of Islamic studies, helping to bridge the gap between traditional Hadith scholarship and modern thought.",
        "coverImage": "/images/Faiz-ul-Bari.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=15HUnhL6TsyS5qACXNTTjrUf_gWgy4sGJ"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15HUnhL6TsyS5qACXNTTjrUf_gWgy4sGJ/preview"
        ]
      },
      {
        "id": "-quran-and-modern-science",
        "title": " Quran and Modern Science",
        "description": "Quran and Modern Science explores the remarkable harmony between the teachings of the Quran and contemporary scientific discoveries. The book examines various verses of the Quran in light of modern scientific knowledge, highlighting how these ancient scriptures align with findings in fields such as astronomy, embryology, and geology. It presents compelling evidence that the Quran, revealed over 1400 years ago, contains insights into the natural world that were only confirmed by science centuries later. The book aims to bridge the gap between faith and reason, demonstrating that Islam encourages intellectual inquiry and scientific exploration.",
        "coverImage": "/images/Quran and Modern Science ebook by Darussalam Publishers - Rakuten Kobo.jfif",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1cEKu5rrp_ACkw56Aw4aWccYFYEYKCmy9"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1cEKu5rrp_ACkw56Aw4aWccYFYEYKCmy9/preview"
        ]
      },
      {
        "id": "-aisha-ra",
        "title": " Aisha (R.A.)",
        "description": "Aisha (R.A.) is a detailed biography of Aisha bint Abi Bakr, one of the most revered women in Islamic history and the beloved wife of Prophet Muhammad (PBUH). The book explores her role as a key figure in early Islamic society, known for her wisdom, eloquence, and deep knowledge of the Quran and Hadith. As one of the most prolific narrators of Hadith, Aisha played a crucial role in preserving the teachings of the Prophet. The book also covers her contributions to Islamic jurisprudence, her leadership in matters of faith, and her influence in the socio-political events of her time. Through this account, Aisha (R.A.) is portrayed as a model of faith, intellect, and leadership, providing timeless lessons for Muslims today.",
        "coverImage": "/images/Aisha RA.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=18IhGosfWaci0oOwRh563ZhCpZPBS1wUP"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/18IhGosfWaci0oOwRh563ZhCpZPBS1wUP/preview"
        ]
      },
      {
        "id": "the-four-imams",
        "title": "The Four Imams",
        "description": "The Four Imams delves into the lives, teachings, and legacies of the four great Islamic jurists: Imam Abu Hanifa, Imam Malik, Imam Shafi'i, and Imam Ahmad ibn Hanbal. These scholars laid the foundation for the four major schools of Islamic jurisprudence (Hanafi, Maliki, Shafi'i, and Hanbali), which continue to guide millions of Muslims in their understanding and practice of Islamic law. The book explores their personal histories, their intellectual contributions to Fiqh (Islamic jurisprudence), and their unique approaches to interpreting the Quran and Hadith. It highlights the depth of their scholarship, their commitment to truth, and their respectful differences, showcasing how their work has shaped Islamic thought and law throughout the centuries.",
        "coverImage": "/images/the four imams.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1twZjy9U2bJ0h-rU4VIZNomjTGcTCXho4"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1twZjy9U2bJ0h-rU4VIZNomjTGcTCXho4/preview"
        ]
      },
      {
        "id": "islam-and-science",
        "title": "Islam and Science",
        "description": "Islam and Science delves into the historical and philosophical relationship between Islamic teachings and scientific inquiry. The book traces the significant contributions made by Muslim scholars during the Islamic Golden Age, emphasizing how Islamic civilization fostered advancements in fields such as mathematics, medicine, astronomy, and chemistry. It also discusses how the Quran encourages the pursuit of knowledge and scientific thinking. The work highlights the profound influence of Islamic principles on the development of scientific thought, while also addressing contemporary debates about the role of science in Islamic societies.",
        "coverImage": "/images/islam and science.png",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1juXU9Jk9SG9V-DLDijUuiXyngPmb4nEj"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1juXU9Jk9SG9V-DLDijUuiXyngPmb4nEj/preview"
        ]
      }
    ]
  }

]

const allBooks = [quranBook, ...bookCategories.flatMap((category) => category.books)]

