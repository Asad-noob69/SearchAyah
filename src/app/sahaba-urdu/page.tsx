import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SahabaList from "../../components/SahabaList"

const urduSahabaNames = [
  {
    name: "ابوبکر صدیق",
    url: "https://ur.wikipedia.org/wiki/%D8%A7%D8%A8%D9%88%D8%A8%DA%A9%D8%B1_%D8%B5%D8%AF%DB%8C%D9%82",
  },
  {
    name: "علی بن ابی طالب",
    url: "https://ur.wikipedia.org/wiki/%D8%B9%D9%84%DB%8C_%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8",
  },
  {
    name: "عقیل ابن ابی طالب",
    url: "https://ur.wikipedia.org/wiki/%D8%B9%D9%82%DB%8C%D9%84_%D8%A7%D8%A8%D9%86_%D8%A7%D8%A8%DB%8C_%D8%B7%D8%A7%D9%84%D8%A8",
  },
  // Add more names here...
]

export default function SahabaUrdu() {
  return (
    <>
      <Header />
      <main className="pb-24">
        <section className="max-w-5xl mx-auto p-4 mb-80 h-auto md:mb-96 lg:mb-112 xl:mb-128">
          <div className="bg-white p-6 rounded-lg shadow-md my-8 max-w-5xl mx-auto text-cyan-800">
            <h1 className="text-xl font-semibold text-center mb-4 sm:text-2xl">سرچ آیہ - صحابہ کرام کے نام</h1>
            <div className="bg-white p-4 rounded-lg border-2 border-[#67b2b4] text-center">
            <p className="text-base font-medium sm:text-lg text-right" dir="rtl">
              &quot;بہترین لوگ میرے زمانے کے ہیں، پھر وہ جو ان کے بعد آئیں گے، پھر وہ جو ان کے بعد آئیں گے۔&quot;
              <br />
              (صحیح البخاری 6429، صحیح مسلم 2533)
            </p>
            </div>
          </div>
        </section>
          <SahabaList sahabaNames={urduSahabaNames} language="urdu" />
      </main>
      <Footer />
    </>
  )
}

