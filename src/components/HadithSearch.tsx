"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface Hadith {
  hadithnumber: string;
  text: string;
}

interface HadithData {
  [key: string]: Hadith[];
}

export default function HadithSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedBook, setSelectedBook] = useState("eng-bukhari");
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hadithData, setHadithData] = useState<HadithData>({});
  const [arabicHadithData, setArabicHadithData] = useState<HadithData>({});
  const resultsPerPage = 20;

  useEffect(() => {
    const fetchHadithData = async () => {
      if (hadithData[selectedBook]) return;
      
      try {
        const baseBook = selectedBook.split("-")[1];
        const [translatedResponse, arabicResponse] = await Promise.all([
          fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${selectedBook}.json`
          ),
          fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${baseBook}.json`
          ),
        ]);
        
        if (!translatedResponse.ok || !arabicResponse.ok) {
          throw new Error("Failed to fetch Hadith data");
        }

        const [translatedData, arabicData] = await Promise.all([
          translatedResponse.json(),
          arabicResponse.json(),
        ]);

        setHadithData((prev) => ({ ...prev, [selectedBook]: translatedData.hadiths || [] }));
        setArabicHadithData((prev) => ({ ...prev, [selectedBook]: arabicData.hadiths || [] }));
      } catch (error) {
        console.error("Error fetching hadith data:", error);
      }
    };

    fetchHadithData();
  }, [selectedBook]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.length > 2) {
        setSearchResults(searchHadith(searchTerm));
        setCurrentPage(1);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedBook]);

  const searchHadith = (query: string) => {
    if (!hadithData[selectedBook]) return [];
    return hadithData[selectedBook].filter((hadith) =>
      hadith.text.toLowerCase().includes(query.toLowerCase())
    );
  };

  const paginatedResults = searchResults.slice(0, currentPage * resultsPerPage);

  return (
    <section>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Hadith With Word"
            className="w-full h-12 px-4 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-sm sm:text-base mb-4"
          />
          <Search className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
          <label htmlFor="bookSelect" className="mr-2 text-slate-800">Select Hadith Book</label>
          <select
            id="bookSelect"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-[#67b2b4] focus:outline-none focus:border-[#004D40] text-slate-800"
          >
            <option value="eng-bukhari">Sahih al-Bukhari</option>
            <option value="eng-ibnmajah">Sunan Ibn Majah</option>
            <option value="eng-malik">Muwatta Malik</option>
            <option value="eng-muslim">Sahih Muslim</option>
            <option value="eng-nasai">Sunan an-Nasa'i</option>
            <option value="eng-tirmidhi">Jami` at-Tirmidhi</option>
          </select>
        </div>

        {searchResults.length > 0 && (
          <div id="searchInfo" className="my-5 bg-[#67b2b4] text-slate-800 bg-opacity-20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="w-6 h-6 mr-2" />
                <span className="font-semibold">FILTER</span>
              </div>
              <div className="text-sm">{searchResults.length} Search Results</div>
            </div>
          </div>
        )}

        <div className="space-y-10">
          {paginatedResults.map((result, index) => {
            const arabicMatch = arabicHadithData[selectedBook]?.find(
              (h) => h.hadithnumber === result.hadithnumber
            );

            return (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <div className="bg-[#67b2b4] py-2 px-4">
                  <h3 className="text-white font-semibold">Hadith {result.hadithnumber}</h3>
                </div>
                <div className="px-4 pb-4 pt-8">
                  <p className="text-cyan-800 font-arabic leading-[4rem] text-right text-2xl" dir="rtl">
                    {arabicMatch?.text || "Arabic text not available"}
                  </p>
                  <p className={`text-cyan-800 my-10 ${selectedLanguage === "urdu" ? "font-urdu text-right" : ""}`}>
                    {result.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {searchResults.length > paginatedResults.length && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="w-full py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300 mt-4"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
