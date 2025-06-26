import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Book } from '../types/books';

export class BookModel {
  private static collectionName = 'books';
  
  // In-memory cache for ultra-fast responses
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL = 300000; // 5 minutes cache
  
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
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
    
    // Auto-cleanup: remove old entries when cache gets too large
    if (this.cache.size > 50) {
      const now = Date.now();
      for (const [k, v] of this.cache.entries()) {
        if (now - v.timestamp > this.CACHE_TTL) {
          this.cache.delete(k);
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
        createdAt: 1
      })
      .toArray();

    const result = books.map(book => ({ ...book, _id: book._id.toString() }));
    this.setCache(cacheKey, result);
    return result;
  }

  static async getCategories() {
    const cacheKey = this.getCacheKey('getCategories');
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const collection = await this.getCollection();
    const categories = await collection.distinct('category');
    const result = categories.filter(Boolean).sort();
    
    // Cache categories for longer since they change less frequently
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