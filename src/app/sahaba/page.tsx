import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SahabaSearch from "../../components/SahabaSearch"

// ✅ Metadata for SEO using Next.js App Router
export const metadata = {
    title: "Sahaba Search: SearchAyah",
  description:
    "Search any Sahaba using the search bar and get redirected to their respective Wikipedia pages by name.",
  keywords: [
    "Islamic books",
    "Tafseer",
    "Hadith",
    "Quran",
    "Searching Sahaba",
    "Finding Sahaba",
    "Easy Sahaba",
    "learn Sahaba",
    "Companions of prophet(SAW)",
    "Companions",
    "Islam",
    "Islamic website"
  ],
  openGraph: {
    title: "SearchAyah: Search about Companions",
    description:
      "Search any Sahaba using the search bar and get redirected to their respective Wikipedia pages by name.",
    images: ["https://searchayah.com/cover.jpg"],
    url: "https://searchayah.com/sahaba"
  },
  twitter: {
    card: "summary_large_image"
  }
}

export default function SahabaPage() {
  return (
    <>
      <Header />
      <main className="pb-24">
        <div className="max-w-5xl mx-auto p-4 mb-80 h-auto md:mb-96 lg:mb-112 xl:mb-128">
          <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl mx-auto text-cyan-800">
            <h1 className="text-xl font-semibold text-center mb-4 sm:text-2xl">
              SearchAyah - Sahaba Names
            </h1>
            <div className="bg-white p-4 rounded-lg border-2 border-[#67b2b4] text-center">
              <p className="text-base font-medium sm:text-lg">
                &quot;The best of people is my generation, then those who come after them, then those who come after them.&quot;
                <br />
                (Sahih al-Bukhari 6429, Sahih Muslim 2533)
              </p>
            </div>
          </div>
          <SahabaSearch />
        </div>
      </main>
      <Footer />
    </>
  )
}
