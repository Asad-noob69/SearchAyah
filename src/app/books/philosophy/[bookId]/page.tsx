
import BookPopup from "./BookPopup"
import { getBookById } from "@/lib/book-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("philosophy", resolvedParams.bookId)

  return {
    title: book?.title || "Book Not Found",
    description: book?.description.slice(0, 160) || "Book not found.",
    keywords: book?.keywords?.join(", ") || "Islamic philosophy, islamic philosophy books, philosophy books pdf metaphysics, Islamic ethics, rational theology, Kalam, Mulla Sadra, Ibn Sina, Al-Farabi, Al-Ghazali"
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("philosophy", resolvedParams.bookId)

  if (!book) {
    notFound()
  }

  return (
      <BookPopup book={book} />
  )
}