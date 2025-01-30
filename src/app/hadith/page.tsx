import HadithSearch from "../../components/HadithSearch"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function HadithPage() {
  return (
    <>
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

