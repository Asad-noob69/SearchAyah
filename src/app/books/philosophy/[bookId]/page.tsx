import BookPopup from "./BookPopup"
import { notFound } from "next/navigation"
import { bookApi } from "@/utils/api"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params

  try {
    const bookId = resolvedParams.bookId
    const apiUrl = new URL(`/api/books/${bookId}`, process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')

    const response = await fetch(apiUrl.toString(), { cache: 'no-store' })
    if (!response.ok) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "Islamic philosophy, metaphysics, rational theology, ethics, Mulla Sadra, Ibn Sina, Al-Ghazali"
      }
    }

    const data = await response.json()
    if (!data.success || !data.data) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "Islamic philosophy, metaphysics, rational theology, ethics, Mulla Sadra, Ibn Sina, Al-Ghazali"
      }
    }

    const book = bookApi.formatBookForFrontend(data.data)

    return {
      title: book?.title || "Book Not Found",
      description: book?.description.slice(0, 160) || "Book not found.",
      keywords: book?.keywords?.join(", ") || "Islamic philosophy, metaphysics, rational theology"
    }
  } catch (error) {
    console.error("Error fetching book metadata:", error)
    return {
      title: "Book Not Found",
      description: "Book not found.",
      keywords: "Islamic philosophy"
    }
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params

  try {
    const bookId = resolvedParams.bookId
    const apiUrl = new URL(`/api/books/${bookId}`, process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')

    const response = await fetch(apiUrl.toString(), { cache: 'no-store' })
    if (!response.ok) notFound()

    const data = await response.json()
    if (!data.success || !data.data) notFound()

    const book = bookApi.formatBookForFrontend(data.data)
    if (!book) notFound()

    return <BookPopup book={book} />
  } catch (error) {
    console.error("Error fetching book:", error)
    notFound()
  }
}
