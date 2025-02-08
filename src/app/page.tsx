import Header from "../components/Header"
import Footer from "../components/Footer"
import QuranSearch from "../components/QuranSearch"
import { Josefin_Sans } from 'next/font/google';


const josefinSans = Josefin_Sans({
  subsets: ['latin'], // You can specify other subsets if needed
  weight: ['400', '700'], // Choose the weights you want
  style: ['normal', 'italic'], // Optional: Specify styles
});

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

