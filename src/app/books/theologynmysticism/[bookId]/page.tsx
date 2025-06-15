// app/books/theologynmysticism/[bookId]/page.tsx

import BookPopup from "./BookPopup"
import { getBookById } from "@/lib/book-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("theologynmysticism", resolvedParams.bookId)

  return {
    title: book?.title || "Book Not Found",
    description: book?.description.slice(0, 160) || "Book not found.",
    keywords: book?.keywords?.join(", ") || "theology, mysticism, book",
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("theologynmysticism", resolvedParams.bookId)

  if (!book) {
    notFound()
  }

  return (
      <BookPopup book={book} />
  )
}