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
                    <h3 className="absolute inset-0 text-[#230b08] flex items-center justify-center text-xl sm:text-xl md:text-2xl lg:text-3xl text-center">
                      {category.title.split("</br>").map((part, i) => (
                        i === 0 ? part : <><br key={i} />{part}</>
                      ))}
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
const bookCategories: BookCategory[] = [    {
    "id": "usul-al-fiqh",
    "title": "Foundation of Fiqh </br> (Usul al-Fiqh)",
    "books": [
      {
        "id": "SharahAlMaqasssid",
        "title": "Sharah alMaqasidss",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/sharahalmaqasid.jpeg",
        "volumes": 5,
        "downloadLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
         
        ]
      },
      
    ]
  },
  {
    "id": "usul-al-hanafi",
    "title": "Foundation of Hanafi Jurisprudence </br> (Usul al-Fiqh al-Hanafi)",
    "books": [
      {
        "id": "Mukhtasar-al-quduri",
        "title": "The Mukhtasar Al-Quduri",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/mukhtasar.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801906.us.archive.org/27/items/quduri.....-eng..-ahmad-ibn-muh/Quduri.....Eng..Ahmad%20Ibn%20Muh.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801906.us.archive.org/27/items/quduri.....-eng..-ahmad-ibn-muh/Quduri.....Eng..Ahmad%20Ibn%20Muh.pdf", //1
         
        ]
      },
      {
        "id": "al-hidaya",
        "title": "Al-Hidayah",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/alhidayah.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/12uk5bsgD__X2U4_ahTLv_z2sdUXbbvsa/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/12uk5bsgD__X2U4_ahTLv_z2sdUXbbvsa/view?usp=drive_link", //1
         
        ]
      },
      {
        "id": "al-figh-al-muyassur",
        "title": "Al-Fiqh-Ul-Muyassar",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/fiqhalmuyassar.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://dn790006.ca.archive.org/0/items/al-fiqh-ul-muyassar-urdu/AL-FIQH-UL-MUYASSAR-URDU.pdf", //1
          
        ],
        "readLinks": [
          "https://dn790006.ca.archive.org/0/items/al-fiqh-ul-muyassar-urdu/AL-FIQH-UL-MUYASSAR-URDU.pdf", //1
         
        ]
      },
      {
        "id": "ascent-to-felicity",
        "title": "Ascent To Felicity (Maraqi al-Sa‘adat)",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/acsenttofecility.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801806.us.archive.org/29/items/ascent-to-felicity/Ascent%20to%20Felicity.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801806.us.archive.org/29/items/ascent-to-felicity/Ascent%20to%20Felicity.pdf", //1
         
        ]
      },
      {
        "id": "umdat-ul-fiqh",
        "title": "Umdat ul Fiqh",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi (d. 1981): A comprehensive, well-organized four-volume set covering the five pillars of Islam (beliefs, purification, prayer, zakat, fasting, and hajj). It’s detailed yet accessible for laypeople, making it a highly recommended resource for Urdu readers. Available through publishers in Pakistan, such as Mohra Sharif.",
        "coverImage": "/images/umdatulfiqh.jpg",
        "volumes": 3,
        "downloadLinks": [
          "https://ia801304.us.archive.org/2/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-1.pdf", //1
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-2.pdf",
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-3.pdf"
          
        ],
        "readLinks": [
          "https://ia801304.us.archive.org/2/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-1.pdf", //1
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-2.pdf",
          "https://dn790002.ca.archive.org/0/items/Umdat-ul-fiqhUrduHanafi/Umdat-ul-Fiqh-3.pdf"
         
        ]
      },
      {
        "id": "zubdat-ul-fiqh",
        "title": "Zubdat Ul Fiqh",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/zubdatulfiqh.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://ia801708.us.archive.org/21/items/Zubdat-ul-fiqhhanafiUrdu/Zubdat-ul-Fiqh.pdf", //1
          
        ],
        "readLinks": [
          "https://ia801708.us.archive.org/21/items/Zubdat-ul-fiqhhanafiUrdu/Zubdat-ul-Fiqh.pdf", //1
         
        ]
      },
      {
        "id": "bahar-e-shariat",
        "title": "Bahar e Shariat",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/bahareshariat.jpeg",
        "volumes": 6,
        "downloadLinks": [
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-a.pdf", //1
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-b.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-b%20%281%29.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-b.pdf"
          
        ],
        "readLinks": [
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-a.pdf", //1
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-1-b.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-2-b%20%281%29.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-a.pdf",
          "https://dn720004.ca.archive.org/0/items/bahar-e-shariat-jild-1-a/bahar-e-shariat-jild-3-b.pdf"
        ]
      },
      {
        "id": "fiqh-e-hanafi",
        "title": "Fiqh e Hanafi",
        "description": "by Sayyid Zawwar Hussain Shah Naqshbandi: A summarized version of Umdat-ul-Fiqh, offering detailed Hanafi fiqh with proofs. It’s concise, beginner-friendly, and ideal for those seeking a balance between depth and simplicity. Available through Maktabah Mujaddidiyah.",
        "coverImage": "/images/fiqhehanafi.jpeg",
        "volumes": 3,
        "downloadLinks": [
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%201.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%202.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%203.pdf"
          
        ],
        "readLinks": [
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%201.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%202.pdf",
          "https://ia801408.us.archive.org/27/items/FiqhHanafiQuran/Fiqh%20Hanafi%203.pdf"
        ]
      },
    ]
  },
   {
    "id": "usul-al-maliki",
    "title": "Foundation of Maliki Jurisprudence </br> (Usul al-Fiqh al-Maliki)",
    "books": [
      {
        "id": "al-muqaddimat-al-izziyat",
        "title": "Al-Muqaddimat-Al-Izziyat",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/almuqaddimah.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1RBdE3uRDFCddxr-rurFMA74BTgTKmm8J/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1RBdE3uRDFCddxr-rurFMA74BTgTKmm8J/view?usp=drive_link", //1
         
        ]
      },
      {
        "id": "al-murshad-al-muin",
        "title": "Al-Murshad-Al-Muin",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/almurshid.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1aZ-RbwgWo1LUgLBbXYlMwyi0cFP3yKLe/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1aZ-RbwgWo1LUgLBbXYlMwyi0cFP3yKLe/view?usp=drive_link", //1
         
        ]
      },
      {
        "id": "akhdari",
        "title": "Mukhtasar Al-Akhdari",
        "description": "The understanding of the acts of worship according to the Maliki school of Islamic law. Imam al-Akhdari . He is an Algerian scholar whose full name is Abū Yazīd ʿAbdur Raḥmān bin Muḥammad al-Ṣaghīr bin Muḥammad bin ʿĀmir.",
        "coverImage": "/images/almukhtasar.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/1OcYzt4ZlwYamCq5At_wJt5CegQbF_pWr/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1OcYzt4ZlwYamCq5At_wJt5CegQbF_pWr/view?usp=drive_link", //1
         
        ]
      },
      {
        "id": "al-muwatta",
        "title": "Al-Muwatta",
        "description": "A foundational hadith collection and fiqh text by Imam Malik himself, it’s advanced but essential for understanding Maliki rulings. Beginners should avoid studying it without a teacher due to its complexity. English translations, like Aisha Bewley’s, are available.",
        "coverImage": "/images/al-muwatta.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/file/d/15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq/edit", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15AaEOd_KXsQUYN7b8r-fgcXXyJPxjIoq/edit", //1
         
        ]
      },
    ]
  },
   {
    "id": "usul-al-shafi'i",
    "title": "Foundation of Shafi'i Jurisprudence </br> (Usul al-Fiqh al-Shafi'i)",
    "books": [
      {
        "id": "SharahAlMaqasid",
        "title": "Sharah Al Maqasid",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/almaqasid.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://ia802801.us.archive.org/4/items/al-maqasid-121117002304-phpapp02/al-maqasid-121117002304-phpapp02.pdf", //1
          
        ],
        "readLinks": [
          "https://ia802801.us.archive.org/4/items/al-maqasid-121117002304-phpapp02/al-maqasid-121117002304-phpapp02.pdf", //1
         
        ]
      },
       {
        "id": "safinat-al-najah",
        "title": "Safinat Al-Naja",
        "description": "A concise Shafi’i fiqh text focusing on worship (purification, prayer, fasting, zakat). It’s widely used in Shafi’i curricula and suitable for beginners.",
        "coverImage": "/images/safinatalnaja.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
          
        ],
        "readLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
         
        ]
      },
       {
        "id": "safinat-al-najah",
        "title": "Safinat Al-Naja",
        "description": "A concise Shafi’i fiqh text focusing on worship (purification, prayer, fasting, zakat). It’s widely used in Shafi’i curricula and suitable for beginners.",
        "coverImage": "/images/safinatalnaja.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
          
        ],
        "readLinks": [
          "https://data.nur.nu/Kutub/English/Shafi3i-fiqh_Safinat-al-naja.pdf", //1
         
        ]
      },
       {
        "id": "The Reliance of the Traveller",
        "title": "The Reliance of the Traveller",
        "description": "The Reliance of the Traveller (Umdat as-Salik) is a classical manual of Islamic jurisprudence (fiqh) according to the Shafi'i school, translated and annotated by Nuh Ha Mim Keller. This authoritative work covers a wide range of topics, including acts of worship, marriage, business transactions, criminal law, and much more, providing practical guidelines for Muslims on how to lead a life in accordance with Islamic principles. The book is not only a legal guide but also a spiritual manual, combining legal rulings with moral and ethical teachings. It has become a widely referenced text for both scholars and laypersons, offering a clear and concise path for adhering to Islamic law and maintaining personal piety.",
        "coverImage": "/images/reliance-of-traveller.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://dn790002.ca.archive.org/0/items/sharia-reliance-of-the-traveller/Sharia%20-%20Reliance%20Of%20The%20Traveller.pdf", //1
          
        ],
        "readLinks": [
          "https://dn790002.ca.archive.org/0/items/sharia-reliance-of-the-traveller/Sharia%20-%20Reliance%20Of%20The%20Traveller.pdf", //1
         
        ]
      },
    ]
  },
   {
    "id": "usul-al-hanbali",
    "title": "Foundation of Hanbali Jurisprudence </br> (Usul al-Fiqh al-Hanbali)",
    "books": [
      {
        "id": "SharahAlMaqasid",
        "title": "Sharah alMaqasid",
        "description": "Compiled by Imam al-Tirmidhi, this Hadith collection is unique in that it not only presents the Hadiths but also includes Imam al-Tirmidhi's commentary on the reliability of each Hadith. Jami' at-Tirmidhi contains approximately 3,956 Hadiths and covers a wide range of topics, including Islamic theology, jurisprudence, ethics, and eschatology. Imam al-Tirmidhi's approach to Hadith classification makes this collection particularly useful for scholars, as it offers a clear distinction between strong, weak, and acceptable narrations. The Hadiths are organized into thematic chapters, making it a practical guide for understanding Islamic rulings and the Prophet's teachings. Additionally, Jami' at-Tirmidhi includes rare Hadiths not found in other major collections, making it a valuable resource for scholars.\n\n                ",
        "coverImage": "/images/sharahalmaqasid.jpeg",
        "volumes": 5,
        "downloadLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
          
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1k_xOIQIPBfzBKafgDPzF6qSHVRobkvrr/view?usp=drive_link", //1
         
        ]
      },
    ]
  },
]