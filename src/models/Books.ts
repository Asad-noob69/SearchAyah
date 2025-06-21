import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { Book } from '../types/books';

export class BookModel {
  private static collectionName = 'books';

  static async getCollection() {
    const client = await clientPromise;
    const db = client.db('bookstore'); // Replace with your database name
    return db.collection<Book>(this.collectionName);
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
    return { ...book, _id: result.insertedId.toString() };
  }

  static async findById(id: string) {
    const collection = await this.getCollection();
    const book = await collection.findOne({ _id: new ObjectId(id) as unknown as string });
    
    if (book) {
      return { ...book, _id: book._id.toString() };
    }
    return null;
  }

  static async findAll(limit = 10, page = 1) {
    const collection = await this.getCollection();
    const skip = (page - 1) * limit;
    
    const books = await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return books.map(book => ({ ...book, _id: book._id.toString() }));
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

    return await this.findById(id);
  }

  static async findByCategory(category: string, limit = 10, page = 1) {
    const collection = await this.getCollection();
    const skip = (page - 1) * limit;
    
    const books = await collection
      .find({ category: { $regex: category, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return books.map(book => ({ ...book, _id: book._id.toString() }));
  }

  static async getCategories() {
    const collection = await this.getCollection();
    const categories = await collection.distinct('category');
    return categories.filter(Boolean).sort();
  }

  static async searchBooks(query: string, category?: string, limit = 10, page = 1) {
    const collection = await this.getCollection();
    const skip = (page - 1) * limit;
    
    const searchFilter: any = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    };

    if (category) {
      searchFilter.category = { $regex: category, $options: 'i' };
    }

    const books = await collection
      .find(searchFilter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    return books.map(book => ({ ...book, _id: book._id.toString() }));
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

    return result.matchedCount > 0;
  }

  static async delete(id: string) {
    const collection = await this.getCollection();
    
    try {
      // Validate ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid book ID');
      }
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) as unknown as string });
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

    return result.matchedCount > 0;
  }
}