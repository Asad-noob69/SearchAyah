import HadithSearch from "../../components/HadithSearch"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Head from "next/head"

export default function HadithPage() {
  return (
    <>
       <Head>
        <title>SearchAyah: Search The Quran</title>
        <meta name="description" content="Search any hadith from 7 Different books with single word. The matching words will appear on the suggestion making it easy for the user to find hadith in the fastest way possible" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching hadith, Finding hadith, Easy hadith, learn hadith, hadith of prophet(SAW), hadees, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search The Hadith" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching word will appear on the suggestion making it easy for the user to get hadith in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/hadith" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="pb-24">
        <div className="max-w-5xl mx-auto p-4 mb-80 h-auto md:mb-96 lg:mb-112 xl:mb-128">
          <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl text-cyan-800">
            <h1 className="text-xl font-semibold text-center mb-4 sm:text-2xl">SearchAyah - Hadith Search</h1>
            <div className="bg-white p-4 rounded-lg border-2 border-[#67b2b4] text-center">
              <p className="text-base font-medium sm:text-lg">
                "May Allah brighten the face of one who hears my words, retains them, and conveys them to others" <br />
                (Jami' at-Tirmidhi)
              </p>
            </div>
          </div>
          <HadithSearch />
        </div>
      </main>
      <Footer />
    </>
  )
}

