import { useState, useEffect, useMemo } from 'react'
import { bookApi } from '@/utils/api'
import type { Book } from '@/lib/book-data'

interface UseCategoryBooksResult {
  books: Book[];
  filteredBooks: Book[];
  isLoading: boolean;
  error: string | null;
  searchBooks: (query: string) => void;
  groupBooksBySchool: () => { [school: string]: Book[] };
  getUnclassifiedBooks: () => Book[];
}

/**
 * Custom hook to fetch and filter books by category
 * @param category The category to fetch books for
 * @returns Books data, filtered books, loading state, error state, and utility functions
 */
export function useCategoryBooks(category: string): UseCategoryBooksResult {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await bookApi.getBooksByCategory(category)
        
        if (response.success) {
          const formatted = response.data.map(bookApi.formatBookForFrontend)
          setBooks(formatted)
          setFilteredBooks(formatted)
        } else {
          setError("Failed to load books")
        }
      } catch (err) {
        console.error('Error fetching books:', err)
        setError("Failed to load books")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [category])

  // Function to filter books by search query
  const searchBooks = useMemo(() => {
    return (query: string) => {
      setSearchInput(query)
      
      if (!query.trim()) {
        setFilteredBooks(books)
        return
      }
      
      const result = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(query.toLowerCase())) ||
        (book.keywords && book.keywords.some(keyword => 
          keyword.toLowerCase().includes(query.toLowerCase())
        ))
      )
      
      setFilteredBooks(result)
    }
  }, [books])

  // Group books by school
  const groupBooksBySchool = useMemo(() => {
    return () => {
      const grouped: { [school: string]: Book[] } = {}
      
      filteredBooks.forEach((book) => {
        const school = book.school?.toLowerCase() || 'unclassified'
        if (!grouped[school]) {
          grouped[school] = []
        }
        grouped[school].push(book)
      })
      
      return grouped
    }
  }, [filteredBooks])
  
  // Get unclassified books
  const getUnclassifiedBooks = useMemo(() => {
    return () => {
      return filteredBooks.filter((book) => !book.school || book.school.trim() === "")
    }
  }, [filteredBooks])

  return { 
    books, 
    filteredBooks, 
    isLoading, 
    error,
    searchBooks: (query: string) => searchBooks(query),
    groupBooksBySchool,
    getUnclassifiedBooks
  }
}
