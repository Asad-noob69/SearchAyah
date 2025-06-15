import Header from "../components/Header"
import Footer from "../components/Footer"
import QuranSearch from "../components/QuranSearch"
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

// ✅ Metadata API for Next.js 13+
export const metadata = {
  title: "SearchAyah: Search The Quran",
  description: "Search any quranic ayah with single words. The matching words will appear on the suggestion making it easy for the user to get Ayah in the fastest way possible",
  keywords: ["Islamic books", "Tafseer", "Hadith", "Quran", "Searching quran", "Finding ayat", "Easy quran", "learn quran", "Ayat of quran", "qoran", "Islam", "Islamic website"],
  openGraph: {
    title: "SearchAyah: Search The Quran",
    description: "Search any quranic ayah with single words. The matching words will appear on the suggestion making it easy for the user to get Ayah in the fastest way possible",
    images: ["https://searchayah.com/cover.jpg"],
    url: "https://searchayah.com/",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow" style={{ fontFamily: josefinSans.style.fontFamily }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <QuranSearch />
        </div>
      </main>
      <Footer />
    </>
  )
}
