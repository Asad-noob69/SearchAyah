import BookPopup from "./BookPopup"
import { getBookById } from "@/lib/book-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  console.log("📘 generateMetadata - Received bookId:", resolvedParams.bookId)

  const book = await getBookById("islamic-jurisprudence", resolvedParams.bookId)
  if (!book) {
    console.warn("⚠️ generateMetadata - Book not found for ID:", resolvedParams.bookId)
  }

  return {
    title: book?.title || "Book Not Found",
    description: book?.description.slice(0, 160) || "Book not found.",
    keywords: book?.keywords?.join(", ") || "Islamic Jurisprudence, Hanafi Fiqh, Shafi'i Usul, Islamic Law Books",
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  console.log("📘 BookPage - Received bookId:", resolvedParams.bookId)

  const book = await getBookById("islamic-jurisprudence", resolvedParams.bookId)

  if (!book) {
    console.warn("❌ BookPage - Book not found for ID:", resolvedParams.bookId)
    notFound()
  }

  console.log("✅ BookPage - Book found:", book.title)

  return (
    <BookPopup book={book} />
  )
}
