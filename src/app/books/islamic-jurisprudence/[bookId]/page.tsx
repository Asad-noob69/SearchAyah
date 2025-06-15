import BookPopup from "./BookPopup"
import { getBookById } from "@/lib/book-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("islamic-jurisprudence", resolvedParams.bookId)

  return {
    title: book?.title || "Book Not Found",
    description: book?.description.slice(0, 160) || "Book not found.",
    keywords: book?.keywords?.join(", ") || "Islamic Jurisprudence, Hanafi Fiqh, Shafi'i Usul, Islamic Law Books",
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("islamic-jurisprudence", resolvedParams.bookId)

  if (!book) {
    notFound()
  }

  return (
    <BookPopup book={book} />
  )
}
