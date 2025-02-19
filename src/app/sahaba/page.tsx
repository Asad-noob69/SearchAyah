import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SahabaSearch from "../../components/SahabaSearch"
import Head from "next/head"

export default function SahabaPage() {
  return (
    <>
    <Head>
        <title>SearchAyah: Search The Sahaba</title>
        <meta name="description" content="Search any Sahaba using the searchbar and it will guide you to the wikipedia of each sahaba by the names" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching Sahaba, Finding Sahaba, Easy Sahaba, learn Sahaba, Companions of prophet(SAW), Companions, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search about Companions" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching word will appear on the suggestion making it easy for the user to get hadith in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/sahaba" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="pb-24">
        <div className="max-w-5xl mx-auto p-4 mb-80 h-auto md:mb-96 lg:mb-112 xl:mb-128">
          <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl mx-auto text-cyan-800">
            <h1 className="text-xl font-semibold text-center mb-4 sm:text-2xl">SearchAyah - Sahaba Names</h1>
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

