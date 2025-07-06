"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import type { Book } from "@/lib/book-data"
import { optimizeBookCover } from "@/utils/imageOptimization"

interface BookProps {
  book: Book
}

export default function BookPopup({ book }: BookProps) {
  const [activeVolume, setActiveVolume] = useState(1)
  const router = useRouter()
  const { bookId } = useParams() as { bookId: string }

  // Ensure we're using the canonical slug URL for SEO
  useEffect(() => {
    // If the book has a slug and it's different from the current URL
    if (book.slug && book.slug !== bookId && book.slug !== "") {
      // Replace the current URL with the canonical one
      router.replace(`/books/islamic-jurisprudence/${book.slug}`, { scroll: false })
    }
  }, [book.slug, bookId, router])

  const generateVolumeButtons = () => {
    return Array.from({ length: book.volumes || 1 }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setActiveVolume(i + 1)}
        className={`px-3 py-1 rounded transition-colors ${
          activeVolume === i + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
        aria-label={`Select volume ${i + 1}`}
      >
        Vol {i + 1}
      </button>
    ))
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: "url('/images/bgforcard2.webp')" }}
    >
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-10 left-10 z-30 px-4 py-2 bg-no-repeat bg-cover bg-center text-[#fff8e7] border border-[#5c3b22] rounded-none shadow-inner transition duration-300 flex items-center gap-1 text-sm"
        style={{ backgroundImage: "url('/images/buttonbg2.png')" }}
        aria-label="Go back to previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": book.title,
          "author": "Islamic Fiqh Books",
          "image": `https://searchayah.com${book.coverImage}`,
          "description": book.description.slice(0, 160),
        })}
      </script>

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center p-4">
        <article className="w-full max-w-6xl flex flex-col md:flex-row gap-2 sm:gap-6 bg-transparent">
          {/* Book Image */}
          <section className="max-w-md w-full md:w-1/4 h-auto flex justify-center items-center" aria-label="Book cover">
            <div className="relative w-40 h-56">
              <Image
                src={optimizeBookCover(book.coverImage, { width: 320, height: 480, quality: 90 })}
                alt={`Cover image of ${book.title}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 160px, 256px"
              />
            </div>
          </section>

          {/* Book Content */}
          <section className="w-full md:w-2/3 flex flex-col text-white" aria-label="Book details">
            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-[#430000]">
              {book.title}
            </h1>

            <div className="mt-4 max-h-64 overflow-y-auto flex-1">
              <p className="text-[#ece4e2] text-base md:text-lg leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() =>
                    window.open(book.readLinks[activeVolume - 1], "_blank")
                  }
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm sm:text-base"
                  aria-label="Read this book"
                >
                  Read
                </button>
                <button
                  onClick={() =>
                    window.open(book.downloadLinks[activeVolume - 1], "_blank")
                  }
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm sm:text-base"
                  aria-label="Download this book"
                >
                  Download
                </button>
              </div>

              {/* Volume Buttons */}
              {book.volumes && book.volumes > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2" aria-label="Volume selector">
                  {generateVolumeButtons()}
                </div>
              )}
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
