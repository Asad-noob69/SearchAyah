import { useState, useEffect } from 'react'
import { bookApi } from '@/utils/api'
import type { Book } from '@/lib/book-data'

interface UseBookOptions {
  redirectToCanonicalSlug?: boolean;
}

interface UseBookResult {
  book: Book | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch a book by ID or slug
 * @param idOrSlug The book ID or slug to fetch
 * @param options Additional options
 * @returns Book data, loading state, and error state
 */
export function useBook(idOrSlug: string, options: UseBookOptions = {}): UseBookResult {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      if (!idOrSlug) {
        setError('No book ID or slug provided')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        const response = await bookApi.getBook(idOrSlug)
        
        if (response.success) {
          setBook(bookApi.formatBookForFrontend(response.data))
        } else {
          setError("Failed to load book")
        }
      } catch (err) {
        console.error('Error fetching book:', err)
        setError("Failed to load book")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBook()
  }, [idOrSlug])

  return { book, isLoading, error }
}
