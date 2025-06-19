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
    const paths = [];

    const addBookPath = (basePath, book) => {
      if (!book || !book.id) return;

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
        imageUrl = encodeURI(rawUrl); // <<--- KEY FIX HERE
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

    // Process each book category
    iqbal().books.forEach((book) => addBookPath("/books/iqbal", book));
    historyCategory().books.forEach((book) =>
      addBookPath("/books/islamic-history", book)
    );
    philosophyCategory().books.forEach((book) =>
      addBookPath("/books/philosophy", book)
    );
    TheologyMysticismCategory().books.forEach((book) =>
      addBookPath("/books/theologynmysticism", book)
    );
    islamicJurisprudenceCategory().books.forEach((book) =>
      addBookPath("/books/islamic-jurisprudence", book)
    );
    mainpageBooks().forEach((book) => addBookPath("/books", book));

    return paths;
  },
};
