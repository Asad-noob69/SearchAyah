const API_BASE_URL = '/api';

// utils/api.ts (or wherever your file is)

import { createSlug, createSlugWithId } from './slugUtils';

export const bookApi = {
  getBooks: async (category?: string, search?: string) => {
    let url = `${API_BASE_URL}/books`;
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  getBooksByCategory: async (category: string) => {
    const response = await fetch(`${API_BASE_URL}/books?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  searchBooks: async (query: string, category?: string) => {
    let url = `${API_BASE_URL}/books?search=${encodeURIComponent(query)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  // Convert database book format to frontend book format
  formatBookForFrontend: (dbBook: any) => {
    const id = dbBook._id.toString();
    return {
      id: id,
      title: dbBook.title,
      description: dbBook.description,
      coverImage: dbBook.imageUrl,
      // Generate a slug with ID to ensure uniqueness
      slug: dbBook.slug || createSlugWithId(dbBook.title, id),
      school: dbBook.school || '',
      downloadLinks: dbBook.volumes?.map((vol: any) => vol.downloadUrl) || [],
      readLinks: dbBook.volumes?.map((vol: any) => vol.downloadUrl.replace('uc?export=download&id=', 'file/d/').concat('/preview')) || [],
      volumes: dbBook.volumes?.length || 1,
      keywords: dbBook.keywords || []
    };
  },
  


  getBook: async (idOrSlug: string) => {
    try {
      // Encode the ID or slug to handle special characters
      const encoded = encodeURIComponent(idOrSlug);
      console.log(`Fetching book from URL: ${API_BASE_URL}/books/${encoded}`);
      
      const response = await fetch(`${API_BASE_URL}/books/${encoded}`);
      if (!response.ok) {
        console.error(`API response not OK: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching book:", error);
      throw error;
    }
  },

  createBook: async (bookData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create book error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  updateBook: async (id: string, bookData: any) => {
    try {
      console.log('Updating book:', id, bookData); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update book error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  deleteBook: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete book error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  addVolume: async (bookId: string, volume: { volumeNumber: number; downloadUrl: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${bookId}/volumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volume),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Add volume error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error adding volume:', error);
      throw error;
    }
  },

  uploadFile: async (file: File, type: 'image' | 'document') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload file error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
};