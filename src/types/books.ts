export interface Book {
  _id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;        // Changed from coverImage to imageUrl
  keywords: string[];      // Added keywords array
  volumes: Volume[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Volume {
  volumeNumber: number;
  downloadUrl: string;
}

// Optional: If you need a type for creating books (without generated fields)
export type CreateBookData = Omit<Book, '_id' | 'createdAt' | 'updatedAt'>;

// Optional: If you need a type for updating books
export type UpdateBookData = Partial<Omit<Book, '_id' | 'createdAt'>>;