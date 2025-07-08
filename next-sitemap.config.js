// Load env variables for DB connection
require('dotenv').config();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://searchayah.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {userAgent: '*', disallow: "/admin"},
      {userAgent: '*', allow: "/"},
    ]
  },
  exclude: ['/admin'],
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,

  additionalPaths: async () => {
    // Fetch books dynamically from the database
    const { fetchBooks } = require('./scripts/fetch-sitemap-data');
    
    try {
      console.log('Fetching book data from database for sitemap...');
      const bookData = await fetchBooks();
      
      const paths = [];
      const addedIds = new Set(); // Track already added books to avoid duplicates
      
      const addBookPath = (basePath, book) => {
        if (!book || !book.id) return;
        
        // Skip if we've already processed this book ID
        if (addedIds.has(book.id)) return;
        addedIds.add(book.id);

        const cover = book.coverImage?.trim?.();
        const hasValidImage =
          typeof cover === "string" &&
          cover !== "" &&
          cover !== "undefined" &&
          !cover.includes("undefined");

        let imageUrl = null;

        if (hasValidImage) {
          const rawUrl = cover.startsWith("http")
            ? cover
            : `https://searchayah.com${cover}`;
          imageUrl = encodeURI(rawUrl);
        }

        console.log(`Processing book ${book.id}, image: ${imageUrl || "no image"}`);

        paths.push({
          loc: `${basePath}/${book.id}`,
          changefreq: "monthly",
          priority: 0.6,
          lastmod: new Date().toISOString(),
          images: imageUrl
            ? [
                {
                  loc: { href: imageUrl },
                  title: book.title || "Untitled",
                  caption: book.description || "",
                },
              ]
            : [],
        });
      };

      // Process each book category if available
      if (bookData.iqbal?.()) {
        bookData.iqbal().books.forEach(book => addBookPath("/books/iqbal", book));
      }
      
      if (bookData.historyCategory?.()) {
        bookData.historyCategory().books.forEach(book => 
          addBookPath("/books/islamic-history", book)
        );
      }
      
      if (bookData.philosophyCategory?.()) {
        bookData.philosophyCategory().books.forEach(book => 
          addBookPath("/books/philosophy", book)
        );
      }
      
      if (bookData.TheologyMysticismCategory?.()) {
        bookData.TheologyMysticismCategory().books.forEach(book => 
          addBookPath("/books/theologynmysticism", book)
        );
      }
      
      if (bookData.islamicJurisprudenceCategory?.()) {
        bookData.islamicJurisprudenceCategory().books.forEach(book => 
          addBookPath("/books/islamic-jurisprudence", book)
        );
      }
      
      // Also add all books to the main books page
      if (bookData.mainpageBooks?.()) {
        bookData.mainpageBooks().forEach(book => addBookPath("/books", book));
      }

      console.log(`Total sitemap paths generated: ${paths.length}`);
      return paths;
    } catch (error) {
      console.error('Error generating sitemap paths:', error);
      return [];
    }
  },
  // Optional: Set a robots.txt policy for Googlebot to respect the sitemaps
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://searchayah.com/sitemap.xml',
      'https://searchayah.com/sitemap-0.xml',

    ],
  },
};
