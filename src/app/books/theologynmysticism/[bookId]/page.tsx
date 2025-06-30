import BookPopup from "./BookPopup"
import { notFound } from "next/navigation"
import { bookApi } from "@/utils/api"

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  
  try {
    // Ensure the bookId is properly formatted for the API call
    const bookId = resolvedParams.bookId
    if (!bookId) {
      throw new Error("Book ID is missing")
    }
    
    // Construct a valid URL with proper error handling
    const apiUrl = new URL(`/api/books/${bookId}`, process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')
    
    // Fetch the book from the API using absolute URL
    const response = await fetch(apiUrl.toString(), {
      cache: 'no-store' // Disable caching to ensure fresh data
    })
    
    if (!response.ok) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "theology books, mysticism, islamic mysticism, sufism, quranic philosophy",
      }
    }
    
    const data = await response.json()
    if (!data.success || !data.data) {
      return {
        title: "Book Not Found",
        description: "Book not found.",
        keywords: "theology books, mysticism, islamic mysticism, sufism, quranic philosophy",
      }
    }
    
    const book = bookApi.formatBookForFrontend(data.data)
    
    return {
      title: book?.title || "Book Not Found",
      description: book?.description.slice(0, 160) || "Book not found.",
      keywords: book?.keywords?.join(", ") || "theology books, mysticism, islamic mysticism, sufism, quranic philosophy",
    }
  } catch (error) {
    console.error("Error fetching book for metadata:", error)
    return {
      title: "Book Not Found",
      description: "Book not found.",
      keywords: "theology books, mysticism, islamic mysticism, sufism, quranic philosophy",
    }
  }
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params
  
  try {
    // Ensure the bookId is properly formatted for the API call
    const bookId = resolvedParams.bookId
    if (!bookId) {
      throw new Error("Book ID is missing")
    }
    
    // Construct a valid URL with proper error handling
    const apiUrl = new URL(`/api/books/${bookId}`, process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000')
    
    console.log('Fetching book from URL:', apiUrl.toString())
    
    // Fetch the book from the API using absolute URL
    const response = await fetch(apiUrl.toString(), {
      cache: 'no-store' // Disable caching to ensure fresh data
    })
    
    if (!response.ok) {
      console.error(`API response not OK: ${response.status} ${response.statusText}`)
      notFound()
    }
    
    const data = await response.json()
    if (!data.success || !data.data) {
      console.error('API returned unsuccessful response:', data)
      notFound()
    }
    
    const book = bookApi.formatBookForFrontend(data.data)
    
    if (!book) {
      console.error('Failed to format book data')
      notFound()
    }
    
    return (
      <BookPopup book={book} />
    )
  } catch (error) {
    console.error("Error fetching book:", error)
    notFound()
  }
}