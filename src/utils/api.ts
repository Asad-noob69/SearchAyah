
const API_BASE_URL = '/api';

export const bookApi = {
  getBooks: async (page = 1, limit = 10000, category?: string, search?: string) => {
    let url = `${API_BASE_URL}/books?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    
    const response = await fetch(url);
    return response.json();
  },

  getBooksByCategory: async (category: string, page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/books?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`);
    return response.json();
  },

  searchBooks: async (query: string, category?: string, page = 1, limit = 10) => {
    let url = `${API_BASE_URL}/books?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    
    const response = await fetch(url);
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  },

  getBook: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return response.json();
  },

  createBook: async (bookData: any) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    return response.json();
  },

  updateBook: async (id: string, bookData: any) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    return response.json();
  },

  deleteBook: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  addVolume: async (bookId: string, volume: { volumeNumber: number; downloadUrl: string }) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/volumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volume),
    });
    return response.json();
  },

  uploadFile: async (file: File, type: 'image' | 'document') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};