import Header from "../components/Header"
import Footer from "../components/Footer"
// import Link from "next/link"
import QuranSearch from "../components/QuranSearch"

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <QuranSearch />
          
        </div>
      </main>
      <Footer />
    </>
  )
}

