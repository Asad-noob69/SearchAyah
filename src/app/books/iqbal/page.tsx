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
    "id": "iqbal",
    "title": "Iqbal Books",
    "books": [
      {
        "id": "-bang-e-dara",
        "title": " Bang-e-Dara",
        "description": "Bang-e-Dara (The Call of the Marching Bell) is a collection of poems by the renowned philosopher and poet Allama Muhammad Iqbal. Written over a span of several years, the poems are a mix of personal reflections and nationalistic aspirations. The early poems in the collection are marked by a deep connection to Iqbal's homeland and contain verses on nature, love, and human emotions. However, as the collection progresses, Iqbal’s poetry shifts toward awakening the Muslim Ummah from its slumber. In these poems, he laments the decline of Islamic civilization and calls for a revival through self-awareness, action, and unity. Bang-e-Dara is a timeless masterpiece that continues to inspire individuals striving for intellectual and spiritual growth.",
        "coverImage": "/images/bangedara.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1fIX03tsiIX2Wx1yCJyeqjb0olQufnBZR"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1fIX03tsiIX2Wx1yCJyeqjb0olQufnBZR/preview"
        ]
      },
      {
        "id": "-baal-e-jibreel",
        "title": " Baal-e-Jibreel",
        "description": "Baal-e-Jibreel (Gabriel's Wing) is a profound poetic work by Allama Iqbal that delves into the themes of selfhood, spirituality, and the pursuit of higher ideals. The book is divided into three sections, each reflecting Iqbal’s deep philosophical musings on life, faith, and human potential. The first section, written in Persian, invokes the spirit of Gabriel, symbolizing divine inspiration and guidance. The Urdu section focuses on the Muslim world's need for self-realization and resilience. Throughout the work, Iqbal urges Muslims to awaken from their slumber, break free from complacency, and reclaim their lost glory through strength, wisdom, and faith. The final section speaks to the timeless values of courage, justice, and perseverance. Baal-e-Jibreel is not only a call to action but also a profound meditation on human potential and the spiritual journey.",
        "coverImage": "/images/baalejibreal.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&pid=1wli8OnPHsAjolpxjb582D-BplsIkF1pW"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wli8OnPHsAjolpxjb582D-BplsIkF1pW/preview"
        ]
      },
      {
        "id": "shikwa-jawab-e-shikwa",
        "title": "Shikwa Jawab-e-Shikwa",
        "description": "Shikwa (The Complaint) and Jawab-e-Shikwa (The Answer to the Complaint) are two interconnected poems that present a unique dialogue between a disillusioned Muslim and Allah. In Shikwa, Iqbal expresses the frustration and disappointment of Muslims, questioning why they suffer despite being faithful. The poem articulates the grievances of the Muslim community, lamenting their fallen state in the world. Jawab-e-Shikwa is Allah’s response, delivered in majestic and empowering language. Iqbal’s Allah tells the Muslim world that their downfall is not due to divine abandonment but their own neglect of the principles of Islam. He emphasizes that Muslims must reclaim their position by embodying the virtues of courage, unity, and hard work. These two poems resonate with powerful emotions and remain some of Iqbal’s most celebrated works, touching on the themes of divine justice, human responsibility, and the revival of the Islamic spirit.",
        "coverImage": "/images/shikwa.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1wIkk_b845XRTxJ_OQXS0Xd7HaNJSJ66a"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1wIkk_b845XRTxJ_OQXS0Xd7HaNJSJ66a/preview"
        ]
      },
      {
        "id": "reconstruction-of-religious-thought-in-islam",
        "title": "Reconstruction of Religious Thought in Islam",
        "description": "In The Reconstruction of Religious Thought in Islam, Allama Iqbal offers a groundbreaking analysis of Islamic philosophy in the modern age. This collection of essays reflects Iqbal’s efforts to reconcile Islamic teachings with contemporary intellectual challenges. Iqbal explores subjects such as the role of reason in Islam, the nature of reality, and the relationship between religion and science. He critiques traditional Islamic theology for becoming stagnant and calls for a dynamic, evolving understanding of the faith. Iqbal argues that Islamic thought must be reconstructed to meet the demands of modern life, and he emphasizes the importance of ijtihad (independent reasoning) in this process. This book is a profound contribution to Islamic philosophy and is essential reading for those seeking to engage with the intellectual and spiritual dimensions of Islam in a modern context.                ",
        "coverImage": "/images/reconstruction-of-religious-thoughts.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1nHNj2F883pJ0xu8Sghy8tZhidyd9Z-7N"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1nHNj2F883pJ0xu8Sghy8tZhidyd9Z-7N/preview"
        ]
      },
      {
        "id": "zarb-e-kaleem",
        "title": "Zarb-e-Kaleem",
        "description": "Zarb-e-Kaleem (The Rod of Moses) is one of Allama Iqbal’s most significant works, written as a philosophical response to the various challenges facing the Muslim world in the 20th century. This collection of poetry is a passionate critique of Western materialism and the weakening state of Muslim societies. Iqbal uses the metaphor of Moses' Rod, symbolizing a tool of transformation and deliverance, to encourage Muslims to awaken from their slumber and lead a moral and spiritual revolution. The themes in Zarb-e-Kaleem emphasize the importance of self-awareness, the need for a new moral order, and the revitalization of the Muslim Ummah through action and faith. This work serves as a call to Muslims to resist external domination and internal decay by adhering to the true principles of Islam.",
        "coverImage": "/images/zarbekaleem.webp",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1ExIM2ZrEwxp5LapjK5P8mGJjlcrNfXty"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1ExIM2ZrEwxp5LapjK5P8mGJjlcrNfXty/preview"
        ]
      },
      {
        "id": "javed-nama",
        "title": "Javed Nama",
        "description": "Javed Nama is often regarded as one of Allama Iqbal’s most ambitious works, taking the form of a spiritual journey akin to Dante’s Divine Comedy. Written in Persian, Javed Nama chronicles Iqbal’s celestial journey through the spheres of the universe, where he meets great historical and spiritual figures who impart their wisdom. The journey is named after Iqbal’s son, Javed, symbolizing the transmission of wisdom to future generations. Throughout this allegorical journey, Iqbal addresses the themes of selfhood, immortality, and the eternal struggle between good and evil. The work explores Islamic, Sufi, and philosophical concepts, blending them into a powerful narrative that encourages Muslims to seek knowledge, cultivate their inner strength, and contribute to the betterment of humanity.",
        "coverImage": "/images/javednama.jpeg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1vEzz0DRssHO4MZ2S5lpB0mXsIOmmVnjU"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1vEzz0DRssHO4MZ2S5lpB0mXsIOmmVnjU/preview"
        ]
      },
      {
        "id": "kulyat-e-iqba",
        "title": "Kulyat-e-Iqba",
        "description": "Kulyat-e-Iqbal is a comprehensive collection of Allama Muhammad Iqbal’s Urdu and Persian poetry, encompassing his major poetic works. The collection brings together his profound thoughts on philosophy, religion, selfhood, and society. Iqbal's poetry resonates with themes of spiritual awakening, the quest for freedom, and the realization of human potential. His works such as Bang-e-Dara, Baal-e-Jibreel, Zarb-e-Kaleem, and Asrar-e-Khudi are all included in this volume, reflecting his deep concern for the Muslim Ummah and humanity as a whole. Kulyat-e-Iqbal offers readers a complete picture of Iqbal’s literary genius, providing insights into his intellectual journey, his thoughts on the human condition, and his vision for a just and enlightened world. This collection is a treasure trove for those seeking to explore the depth of Iqbal’s poetic universe.                ",
        "coverImage": "/images/kulyateiqbal.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=1xSguMdTt3lAy2TqQNTH6x8fqOvLBJPLp"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/1xSguMdTt3lAy2TqQNTH6x8fqOvLBJPLp/preview"
        ]
      },
      {
        "id": "aaina-e-haram",
        "title": "Aaina-e-Haram",
        "description": "Aaina-e-Haram (The Mirror of the Sacred) is a poetic work that addresses the relationship between the Muslim individual and the broader community, urging introspection and moral rejuvenation. Iqbal, in this collection, reflects on the struggles of the Muslim world and calls for a return to the true essence of Islam. He emphasizes that Muslims must examine their inner selves, just as one looks into a mirror, to recognize their shortcomings and reclaim their spiritual and intellectual heritage. Aaina-e-Haram focuses on moral reform, personal accountability, and the importance of unity among Muslims. This work is another of Iqbal’s powerful reminders that self-improvement is key to overcoming the challenges faced by the Ummah.",
        "coverImage": "/images/ainaeharam.jpg",
        "volumes": 1,
        "downloadLinks": [
          "https://drive.google.com/uc?export=download&id=15vH9tchHp97AT1SQi-VVBcZ7oKlTaoCP"
        ],
        "readLinks": [
          "https://drive.google.com/file/d/15vH9tchHp97AT1SQi-VVBcZ7oKlTaoCP/preview"
        ]
      }
    ]
  },
]