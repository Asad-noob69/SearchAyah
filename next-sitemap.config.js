const {
  iqbal,
  historyCategory,
  philosophyCategory,
  TheologyMysticismCategory,
  mainpageBooks,
  islamicJurisprudenceCategory,
} = require("./compiled-sitemap/book-data");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://searchayah.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,

  additionalPaths: async () => {
    const paths = []

    // 1. Iqbal Books
    iqbal().books.forEach((book) => {
      paths.push({
        loc: `/books/iqbal/${book.id}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // 2. History Books
    historyCategory().books.forEach((book) => {
      paths.push({
        loc: `/books/islamic-history/${book.id}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // 3. Philosophy Books
    philosophyCategory().books.forEach((book) => {
      paths.push({
        loc: `/books/philosophy/${book.id}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // 4. Theology & Mysticism Books
    TheologyMysticismCategory().books.forEach((book) => {
      paths.push({
        loc: `/books/theologynmysticism/${book.id}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // 5. Islamic Jurisprudence Books
    islamicJurisprudenceCategory().books.forEach((book) => {
      paths.push({
        loc: `/books/islamic-jurisprudence/${book.id}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })
    // 6. Mainpage Books
    mainpageBooks().forEach((book) => {
      paths.push({
        loc: `/books/${book.id}`, // 🔁 Adjust this path if needed
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });

    return paths
  },
}
