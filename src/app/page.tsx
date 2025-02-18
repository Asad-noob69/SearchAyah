import Header from "../components/Header"
import Footer from "../components/Footer"
import QuranSearch from "../components/QuranSearch"
import Head from "next/head"
import { Josefin_Sans } from 'next/font/google';


const josefinSans = Josefin_Sans({
  subsets: ['latin'], // You can specify other subsets if needed
  weight: ['400', '700'], // Choose the weights you want
  style: ['normal', 'italic'], // Optional: Specify styles
});

export default function Home() {
  return (
    <>
     <Head>
        <title>SearchAyah: Search The Quran</title>
        <meta name="description" content="Search any quranic ayah with single words. The matching words will appear on the suggestion making it easy for the user to get Ayah in the fastest way possible" />
        <meta name="keywords" content="Islamic books, Tafseer, Hadith, Quran, Searching quran, Finding ayat, Easy quran, learn quran, Ayat of quran, qoran, Islam, Islamic website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="SearchAyah: Search The Quran" />
        <meta property="og:description" content="Search any quranic ayah with single words. The matching words will appear on the suggestion making it easy for the user to get Ayah in the fastest way possible" />
        <meta property="og:image" content="https://searchayah.com/cover.jpg" />
        <meta property="og:url" content="https://searchayah.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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

