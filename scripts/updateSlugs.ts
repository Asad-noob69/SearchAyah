/**
 * Script to update the slug field for all books in the database
 * This will convert slugs to use only the title (without IDs)
 */
import { MongoClient, ObjectId } from 'mongodb';
import { createSlug } from '../src/utils/slugUtils';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

async function updateSlugs() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('bookstore');
    const booksCollection = db.collection('books');
    
    // Get all books
    const books = await booksCollection.find().toArray();
    console.log(`Found ${books.length} books to update`);
    
    // Process each book
    let updated = 0;
    let skipped = 0;
    
    for (const book of books) {
      const title = book.title;
      if (!title) {
        console.log(`Skipping book ${book._id}: No title found`);
        skipped++;
        continue;
      }
      
      // Generate clean slug from title
      const newSlug = createSlug(title);
      
      if (book.slug === newSlug) {
        skipped++;
        continue; // No need to update
      }
      
      // Update the book with the new slug
      await booksCollection.updateOne(
        { _id: new ObjectId(book._id) },
        { $set: { slug: newSlug } }
      );
      
      updated++;
      console.log(`Updated book: ${title} => ${newSlug}`);
    }
    
    console.log(`Done! Updated ${updated} books, skipped ${skipped} books`);
  } catch (error) {
    console.error('Error updating slugs:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

updateSlugs().catch(console.error);
