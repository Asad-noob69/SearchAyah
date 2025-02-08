import HadithSearch from "../../components/HadithSearch"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Head from "next/head"

export default function HadithPage() {
  return (
    <>
      <Head>
      <title>SearchAyah | Hadith Search</title>
    <meta name="description" content="Search and explore Hadith collections. Discover teachings and sayings of Prophet Muhammad (PBUH) with ease."/>
    <meta name="keywords" content="Hadith, Islamic teachings, Quran, Prophet Muhammad, search Hadith"/>
    <link rel="canonical" href="https://yourwebsite.com/html/hadith.html"/>
    <meta property="og:title" content="Search Hadith - Explore Islamic Teachings"/>
    <meta property="og:description" content="Search and explore Hadith collections. Discover teachings and sayings of Prophet Muhammad (PBUH) with ease."/>
    <meta property="og:image" content="https://yourwebsite.com/images/intro.png"/>
    <meta property="og:url" content="https://yourwebsite.com/html/hadith.html"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="Search Hadith - Explore Islamic Teachings"/>
    <meta name="twitter:description" content="Search and explore Hadith collections. Discover teachings and sayings of Prophet Muhammad (PBUH) with ease."/>
    <meta name="twitter:image" content="https://yourwebsite.com/images/intro.png"/>
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

