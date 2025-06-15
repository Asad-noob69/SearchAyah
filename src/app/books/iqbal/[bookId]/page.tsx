
import BookPopup from "./BookPopup"
import { getBookById } from "@/lib/book-data"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("iqbal", resolvedParams.bookId)

  return {
    title: book?.title || "Book Not Found",
    description: book?.description.slice(0, 160) || "Book not found.",
    keywords: book?.keywords?.join(", ") || "Allama Iqbal Books, Poetry of iqbal, iqbal famous books, iqbal poetry book",
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  const book = await getBookById("iqbal", resolvedParams.bookId)

  if (!book) {
    notFound()
  }

  return (
      <BookPopup book={book} />
  )
}