import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Book } from '../types/books';

export class BookModel {
  private static collectionName = 'books';
  
  // In-memory cache for ultra-fast responses
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 3600000; // 1 hour cache for regular queries
  private static LONG_CACHE_TTL = 86400000; // 24 hours cache for rarely changing data like categories
  
  static async getCollection() {
    const client = await clientPromise;
    const db = client.db('bookstore');
    return db.collection<Book>(this.collectionName);
  }

  // Cache utilities
  private static getCacheKey(method: string, params: any = {}): string {
    return `${method}_${JSON.stringify(params)}`;
  }

  private static getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    // Use longer TTL for category data and other rarely changing data
    const ttl = key.includes('getCategories') ? this.LONG_CACHE_TTL : this.CACHE_TTL;
    
    if (Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    
    // Remove expired cache entry
    this.cache.delete(key);
    return null;
  }

  private static setCache(key: string, data: any, longTerm: boolean = false): void {
    this.cache.set(key, { data, timestamp: Date.now() });
    
    // Auto-cleanup: more aggressive cache management
    if (this.cache.size > 100) {
      const now = Date.now();
      const entries = Array.from(this.cache.entries());
      
      // Sort by age (oldest first)
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      // Remove expired entries first
      for (const [k, v] of entries) {
        const ttl = k.includes('getCategories') ? this.LONG_CACHE_TTL : this.CACHE_TTL;
        if (now - v.timestamp > ttl) {
          this.cache.delete(k);
        }
      }
      
      // If still too many entries, remove oldest ones
      if (this.cache.size > 80) {
        const entriesToRemove = Math.floor(this.cache.size * 0.2); // Remove 20% of oldest entries
        for (let i = 0; i < entriesToRemove && i < entries.length; i++) {
          this.cache.delete(entries[i][0]);
        }
      }
    }
  }

  private static invalidateCache(): void {
    this.cache.clear();
  }

  static async create(bookData: Omit<Book, '_id' | 'createdAt' | 'updatedAt'>) {
    const collection = await this.getCollection();
    const now = new Date();
    
    const book: Book = {
      ...bookData,
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(book);
    
    // Clear cache after data mutation
    this.invalidateCache();
    
    return { ...book, _id: result.insertedId.toString() };
  }

  static async findById(id: string) {
    const cacheKey = this.getCacheKey('findById', { id });
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    const book = await collection.findOne({ _id: new ObjectId(id) as unknown as string });
    
    const result = book ? { ...book, _id: book._id.toString() } : null;
    this.setCache(cacheKey, result);
    return result;
  }

  static async findBySlug(slug: string) {
    const cacheKey = this.getCacheKey('findBySlug', { slug });
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    
    // Try exact match first
    let book = await collection.findOne({ slug });
    
    // If no exact match, try case-insensitive match
    if (!book) {
      book = await collection.findOne({ 
        slug: { $regex: new RegExp(`^${slug}$`, 'i') } 
      });
    }

    // Try matching on slug without the ID suffix (if it exists)
    if (!book) {
      // Match patterns like "book-title-12345" where we want to find just "book-title"
      const baseSlug = slug.replace(/-[0-9a-f]{24}$/, '');
      if (baseSlug !== slug) {
        book = await collection.findOne({ 
          slug: { $regex: new RegExp(`^${baseSlug}`, 'i') }
        });
      }
    }
    
    // If still no match, try searching by title-based slug
    if (!book) {
      // Clean up slug for title search (remove IDs, normalize dashes)
      const cleanSlug = slug.replace(/-[0-9a-f]{24}$/, '').replace(/-/g, ' ').trim();
      
      // First try exact title match
      book = await collection.findOne({
        title: { $regex: new RegExp(`^${cleanSlug}$`, 'i') }
      });
      
      // Then try partial title match
      if (!book && cleanSlug.length > 3) {
        const slugParts = cleanSlug.split(' ').filter(part => part.length > 2);
        if (slugParts.length > 0) {
          // Create a regex that looks for books where title contains key words from the slug
          const regexPattern = slugParts.join('|');  // Match any of the significant words
          book = await collection.findOne({
            title: { $regex: new RegExp(regexPattern, 'i') }
          });
        }
      }
    }
    
    const result = book ? { ...book, _id: book._id.toString() } : null;
    this.setCache(cacheKey, result);
    return result;
  }

  static async findAll() {
    const cacheKey = this.getCacheKey('findAll');
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    
    const books = await collection
      .find({})
      .limit(1000)
      .sort({ createdAt: -1 })
      // Updated projection to match your actual data structure
      .project({
        title: 1,
        description: 1,
        category: 1,
        imageUrl: 1,      // Changed from coverImage to imageUrl
        keywords: 1,      // Added keywords field
        volumes: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .toArray();

    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    this.setCache(cacheKey, result);
    return result;
  }

  static async update(id: string, updateData: Partial<Omit<Book, '_id' | 'createdAt'>>) {
    const collection = await this.getCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) as unknown as string },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return null;
    }

    // Clear cache after data mutation
    this.invalidateCache();
    
    return await this.findById(id);
  }

  static async findByCategory(category: string) {
    const cacheKey = this.getCacheKey('findByCategory', { category });
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    
    const books = await collection
      .find({ category: { $regex: category, $options: 'i' } })
      .limit(1000)
      .sort({ createdAt: -1 })
      // Updated projection to match your actual data structure
      .project({
        title: 1,
        description: 1,
        category: 1,
        imageUrl: 1,      // Changed from coverImage to imageUrl
        keywords: 1,      // Added keywords field
        volumes: 1,
        school: 1,        // Added school field
        createdAt: 1
      })
      .toArray();

    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    this.setCache(cacheKey, result);
    return result;
  }

  static async getCategories() {
    const cacheKey = this.getCacheKey('getCategories');
    
    // Check for cached categories with longer TTL
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.LONG_CACHE_TTL) {
      return cached.data;
    }

    const collection = await this.getCollection();
    const categories = await collection.distinct('category');
    const result = categories.filter(Boolean).sort();
    
    // Cache categories with the longer TTL
    this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  }

  static async searchBooks(query: string, category?: string) {
    const cacheKey = this.getCacheKey('searchBooks', { query, category });
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    
    const searchFilter: any = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { keywords: { $elemMatch: { $regex: query, $options: 'i' } } } // Search in keywords array
      ]
    };

    if (category) {
      searchFilter.category = { $regex: category, $options: 'i' };
    }

    const books = await collection
      .find(searchFilter)
      .limit(1000)
      .sort({ createdAt: -1 })
      // Updated projection to match your actual data structure
      .project({
        title: 1,
        description: 1,
        category: 1,
        imageUrl: 1,      // Changed from coverImage to imageUrl
        keywords: 1,      // Added keywords field
        volumes: 1,
        createdAt: 1
      })
      .toArray();

    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    this.setCache(cacheKey, result);
    return result;
  }

  static async addVolume(bookId: string, volume: { volumeNumber: number; downloadUrl: string }) {
    const collection = await this.getCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(bookId) as unknown as string },
      { 
        $push: { volumes: volume },
        $set: { updatedAt: new Date() }
      }
    );

    // Clear cache after data mutation
    this.invalidateCache();
    
    return result.matchedCount > 0;
  }

  static async delete(id: string) {
    const collection = await this.getCollection();
    
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
      }
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) as unknown as string });
      
      // Clear cache after data mutation
      this.invalidateCache();
      
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error in BookModel.delete:', error);
      throw error;
    }
  }

  static async removeVolume(bookId: string, volumeNumber: number) {
    const collection = await this.getCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(bookId) as unknown as string },
      { 
        $pull: { volumes: { volumeNumber } },
        $set: { updatedAt: new Date() }
      }
    );

    // Clear cache after data mutation
    this.invalidateCache();
    
    return result.matchedCount > 0;
  }

  // New method to update keywords
  static async updateKeywords(bookId: string, keywords: string[]) {
    const collection = await this.getCollection();
    
    const result = await collection.updateOne(
      { _id: new ObjectId(bookId) as unknown as string },
      { 
        $set: { 
          keywords,
          updatedAt: new Date() 
        }
      }
    );

    // Clear cache after data mutation
    this.invalidateCache();
    
    return result.matchedCount > 0;
  }

  // New method to search by keywords
  static async findByKeywords(keywords: string[]) {
    const cacheKey = this.getCacheKey('findByKeywords', { keywords });
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    
    const books = await collection
      .find({ 
        keywords: { 
          $in: keywords.map(k => new RegExp(k, 'i')) 
        } 
      })
      .limit(1000)
      .sort({ createdAt: -1 })
      .project({
        title: 1,
        description: 1,
        category: 1,
        imageUrl: 1,
        keywords: 1,
        volumes: 1,
        createdAt: 1
      })
      .toArray();

    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    this.setCache(cacheKey, result);
    return result;
  }

  // Utility method to create performance indexes
  static async createIndexes() {
    const collection = await this.getCollection();
    
    try {
      // Create compound indexes for better performance
      await Promise.all([
        collection.createIndex({ title: 'text', description: 'text', keywords: 'text' }), // Updated to include keywords
        collection.createIndex({ category: 1, createdAt: -1 }),
        collection.createIndex({ createdAt: -1 }),
        collection.createIndex({ keywords: 1 }), // Index for keywords array
        collection.createIndex({ 'volumes.volumeNumber': 1 })
      ]);
      
      console.log('✅ Database indexes created successfully');
    } catch (error) {
      console.error('❌ Error creating indexes:', error);
    }
  }

  // Get cache statistics (useful for monitoring)
  static getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      hitRate: this.cache.size > 0 ? 'Active' : 'Empty'
    };
  }

  // Manual cache clear (useful for admin operations)
  static clearCache() {
    this.invalidateCache();
    return { message: 'Cache cleared successfully' };
  }
}