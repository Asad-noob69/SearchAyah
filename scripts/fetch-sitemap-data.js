// This script fetches all books from the database for the sitemap
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function fetchBooks() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('bookstore');
    const booksCollection = db.collection('books');

    // Fetch all books grouped by category
    const books = await booksCollection.find({}).toArray();

    // Group books by category
    const booksByCategory = {};
    
    for (const book of books) {
      // Convert MongoDB ObjectId to string
      book._id = book._id.toString();
      
      const category = book.category;
      if (!booksByCategory[category]) {
        booksByCategory[category] = [];
      }
      booksByCategory[category].push(book);
    }

    // Generate category-specific exports
    let exports = {};
    
    // Map MongoDB categories to URL path segments
    const categoryToPathMap = {
      'Iqbal': 'iqbal',
      'Islamic History': 'islamic-history',
      'Philosophy': 'philosophy',
      'Theology & Mysticism': 'theologynmysticism',
      'Islamic Jurisprudence': 'islamic-jurisprudence'
    };
    
    // Main page books (all books or featured books)
    exports.mainpageBooks = () => {
      return books.map(formatBook);
    };
    
    // Category-specific exports
    Object.entries(booksByCategory).forEach(([category, categoryBooks]) => {
      const slugifiedCategory = categoryToPathMap[category] || 
        category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const exportName = getCategoryExportName(category);
      
      if (exportName) {
        exports[exportName] = () => ({
          books: categoryBooks.map(formatBook)
        });
      }
    });

    return exports;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

function formatBook(book) {
  return {
    id: book._id || book.slug,
    title: book.title,
    description: book.description || '',
    coverImage: book.imageUrl || '', // Note the field name change from imageUrl to coverImage for compatibility
  };
}

function getCategoryExportName(category) {
  switch(category) {
    case 'Iqbal':
      return 'iqbal';
    case 'Islamic History':
      return 'historyCategory';
    case 'Philosophy':
      return 'philosophyCategory';
    case 'Theology & Mysticism':
      return 'TheologyMysticismCategory';
    case 'Islamic Jurisprudence':
      return 'islamicJurisprudenceCategory';
    default:
      return null;
  }
}

module.exports = { fetchBooks };
