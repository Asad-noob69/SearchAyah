'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Add these styles to your global CSS or use a style tag
// .font-arabic {
//   font-family: 'Scheherazade New', 'Traditional Arabic', serif;
// }
// .font-urdu {
//   font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
// }

// Types for verse and word data
interface Word {
  text_uthmani: string;
  translation: {
    text: string;
  };
}

interface Verse {
  verse_key: string;
  words: Word[];
  translations: Array<{
    text: string;
    language: string; // Ensure this field exists in the API response
  }>;
}

interface Surah {
  number: number;
  name: string;
  verses: number;
}

const SURAHS: Surah[] = [
    { number: 1, name: "Al-Fatihah", verses: 7 },
    { number: 2, name: "Al-Baqarah", verses: 286 },
    { number: 3, name: "Aali Imran", verses: 200 },
    { number: 4, name: "An-Nisa", verses: 176 },
    { number: 5, name: "Al-Ma'idah", verses: 120 },
    { number: 6, name: "Al-An'am", verses: 165 },
    { number: 7, name: "Al-A'raf", verses: 206 },
    { number: 8, name: "Al-Anfal", verses: 75 },
    { number: 9, name: "At-Tawbah", verses: 129 },
    { number: 10, name: "Yunus", verses: 109 },
    { number: 11, name: "Hud", verses: 123 },
    { number: 12, name: "Yusuf", verses: 111 },
    { number: 13, name: "Ar-Ra'd", verses: 43 },
    { number: 14, name: "Ibrahim", verses: 52 },
    { number: 15, name: "Al-Hijr", verses: 99 },
    { number: 16, name: "An-Nahl", verses: 128 },
    { number: 17, name: "Al-Isra", verses: 111 },
    { number: 18, name: "Al-Kahf", verses: 110 },
    { number: 19, name: "Maryam", verses: 98 },
    { number: 20, name: "Taha", verses: 135 },
    { number: 21, name: "Al-Anbiya", verses: 112 },
    { number: 22, name: "Al-Hajj", verses: 78 },
    { number: 23, name: "Al-Mu'minun", verses: 118 },
    { number: 24, name: "An-Nur", verses: 64 },
    { number: 25, name: "Al-Furqan", verses: 77 },
    { number: 26, name: "Ash-Shu'ara", verses: 227 },
    { number: 27, name: "An-Naml", verses: 93 },
    { number: 28, name: "Al-Qasas", verses: 88 },
    { number: 29, name: "Al-Ankabut", verses: 69 },
    { number: 30, name: "Ar-Rum", verses: 60 },
    { number: 31, name: "Luqman", verses: 34 },
    { number: 32, name: "As-Sajda", verses: 30 },
    { number: 33, name: "Al-Ahzab", verses: 73 },
    { number: 34, name: "Saba", verses: 54 },
    { number: 35, name: "Fatir", verses: 45 },
    { number: 36, name: "Yaseen", verses: 83 },
    { number: 37, name: "As-Saffat", verses: 182 },
    { number: 38, name: "Sad", verses: 88 },
    { number: 39, name: "Az-Zumar", verses: 75 },
    { number: 40, name: "Ghafir", verses: 85 },
    { number: 41, name: "Fussilat", verses: 54 },
    { number: 42, name: "Ash-Shura", verses: 53 },
    { number: 43, name: "Az-Zukhruf", verses: 89 },
    { number: 44, name: "Ad-Dukhan", verses: 59 },
    { number: 45, name: "Al-Jathiyah", verses: 37 },
    { number: 46, name: "Al-Ahqaf", verses: 35 },
    { number: 47, name: "Muhammad", verses: 38 },
    { number: 48, name: "Al-Fath", verses: 29 },
    { number: 49, name: "Al-Hujurat", verses: 18 },
    { number: 50, name: "Qaf", verses: 45 },
    { number: 51, name: "Adh-Dhariyat", verses: 60 },
    { number: 52, name: "At-Tur", verses: 49 },
    { number: 53, name: "An-Najm", verses: 62 },
    { number: 54, name: "Al-Qamar", verses: 55 },
    { number: 55, name: "Ar-Rahman", verses: 78 },
    { number: 56, name: "Al-Waqia", verses: 96 },
    { number: 57, name: "Al-Hadid", verses: 29 },
    { number: 58, name: "Al-Mujadila", verses: 22 },
    { number: 59, name: "Al-Hashr", verses: 24 },
    { number: 60, name: "Al-Mumtahina", verses: 13 },
    { number: 61, name: "As-Saff", verses: 14 },
    { number: 62, name: "Al-Jumuah", verses: 11 },
    { number: 63, name: "Al-Munafiqun", verses: 11 },
    { number: 64, name: "At-Taghabun", verses: 18 },
    { number: 65, name: "At-Talaq", verses: 12 },
    { number: 66, name: "At-Tahrim", verses: 12 },
    { number: 67, name: "Al-Mulk", verses: 30 },
    { number: 68, name: "Al-Qalam", verses: 52 },
    { number: 69, name: "Al-Haqqah", verses: 52 },
    { number: 70, name: "Al-Ma'arij", verses: 44 },
    { number: 71, name: "Nuh", verses: 28 },
    { number: 72, name: "Al-Jinn", verses: 28 },
    { number: 73, name: "Al-Muzzammil", verses: 20 },
    { number: 74, name: "Al-Muddathir", verses: 56 },
    { number: 75, name: "Al-Qiyamah", verses: 40 },
    { number: 76, name: "Al-Insan", verses: 31 },
    { number: 77, name: "Al-Mursalat", verses: 50 },
    { number: 78, name: "An-Naba", verses: 40 },
    { number: 79, name: "An-Naziat", verses: 46 },
    { number: 80, name: "Abasa", verses: 42 },
    { number: 81, name: "At-Takwir", verses: 29 },
    { number: 82, name: "Al-Infitar", verses: 19 },
    { number: 83, name: "Al-Mutaffifin", verses: 36 },
    { number: 84, name: "Al-Inshiqaq", verses: 25 },
    { number: 85, name: "Al-Buruj", verses: 22 },
    { number: 86, name: "At-Tariq", verses: 17 },
    { number: 87, name: "Al-Ala", verses: 19 },
    { number: 88, name: "Al-Ghashiyah", verses: 26 },
    { number: 89, name: "Al-Fajr", verses: 30 },
    { number: 90, name: "Al-Balad", verses: 20 },
    { number: 91, name: "Ash-Shams", verses: 15 },
    { number: 92, name: "Al-Layl", verses: 21 },
    { number: 93, name: "Ad-Duha", verses: 11 },
    { number: 94, name: "Ash-Sharh", verses: 8 },
    { number: 95, name: "At-Tin", verses: 8 },
    { number: 96, name: "Al-Alaq", verses: 19 },
    { number: 97, name: "Al-Qadr", verses: 5 },
    { number: 98, name: "Al-Bayyinah", verses: 8 },
    { number: 99, name: "Az-Zalzalah", verses: 8 },
    { number: 100, name: "Al-Adiyat", verses: 11 },
    { number: 101, name: "Al-Qariah", verses: 11 },
    { number: 102, name: "At-Takathur", verses: 8 },
    { number: 103, name: "Al-Asr", verses: 3 },
    { number: 104, name: "Al-Humazah", verses: 9 },
    { number: 105, name: "Al-Fil", verses: 5 },
    { number: 106, name: "Quraysh", verses: 4 },
    { number: 107, name: "Al-Ma'un", verses: 7 },
    { number: 108, name: "Al-Kawthar", verses: 3 },
    { number: 109, name: "Al-Kafirun", verses: 6 },
    { number: 110, name: "An-Nasr", verses: 3 },
    { number: 111, name: "Al-Masad", verses: 5 },
    { number: 112, name: "Al-Ikhlas", verses: 4 },
    { number: 113, name: "Al-Falaq", verses: 5 },
    { number: 114, name: "An-Nas", verses: 6 }
    
];

// Simplified translation maps only for English and Urdu
const TRANSLATIONS = {
  en: '131',
  ur: '234'
};

const WORD_TRANSLATIONS = {
  en: 'translation',
  ur: 'translation'
};

const VERSES_PER_PAGE = 20;

export default function WordQuran() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ur">("en");
  const [isWordByWord, setIsWordByWord] = useState(true);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchedSurah, setSearchedSurah] = useState<number | null>(null);
  const [searchedVerse, setSearchedVerse] = useState<number | null>(null);

  const fetchVerses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${currentSurah}`, {
        params: {
          words: true,
          translations: TRANSLATIONS[currentLanguage],
          language: currentLanguage,
          page: currentPage,
          per_page: VERSES_PER_PAGE,
          word_fields: `text_uthmani,${WORD_TRANSLATIONS[currentLanguage]}`,
        },
      });

      setVerses((prevVerses) => (currentPage === 1 ? response.data.verses : [...prevVerses, ...response.data.verses]));
    } catch (err) {
      setError("Failed to fetch verses");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentSurah, currentPage, currentLanguage]);

  const fetchSpecificVerse = useCallback(
    async (surahNum: number, verseNum: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.quran.com/api/v4/verses/by_key/${surahNum}:${verseNum}`, {
          params: {
            words: true,
            translations: TRANSLATIONS[currentLanguage],
            language: currentLanguage,
            word_fields: `text_uthmani,${WORD_TRANSLATIONS[currentLanguage]}`,
          },
        });

        setVerses([response.data.verse]);
      } catch (err) {
        setError("Failed to fetch specific verse");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [currentLanguage],
  );

  useEffect(() => {
    fetchVerses();
  }, [fetchVerses, isWordByWord]); // Add isWordByWord to dependencies to refresh when view changes

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSurah(Number(e.target.value));
    setCurrentPage(1);
    setVerses([]);
    setSearchedSurah(null);
    setSearchedVerse(null);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLanguage(e.target.value as "en" | "ur");

    if (searchedSurah && searchedVerse) {
      fetchSpecificVerse(searchedSurah, searchedVerse);
    } else {
      setCurrentPage(1);
      setVerses([]);
    }
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value === "word-by-word";
    setIsWordByWord(newValue);

    if (searchedSurah && searchedVerse) {
      fetchSpecificVerse(searchedSurah, searchedVerse);
    } else {
      setCurrentPage(1);
      setVerses([]);
    }
  };

  const handleSearchVerse = () => {
    const [surahNum, verseNum] = searchInput.split(":").map((num) => Number(num.trim()));

    if (!surahNum || !verseNum) {
      setError('Please enter verse number in format "surah:verse" (e.g., 2:255)');
      return;
    }

    const surah = SURAHS.find((s) => s.number === surahNum);
    if (!surah) {
      setError("Invalid Surah number. Please enter a number between 1 and 114.");
      return;
    }

    if (verseNum < 1 || verseNum > surah.verses) {
      setError(`Invalid verse number. Surah ${surah.name} has ${surah.verses} verses.`);
      return;
    }

    setSearchedSurah(surahNum);
    setSearchedVerse(verseNum);
    fetchSpecificVerse(surahNum, verseNum);
  };

  const renderVerseContent = (verse: Verse) => {
    const completeArabicText = verse.words.map((word) => word.text_uthmani).join(" ");
    const translationClass = currentLanguage === "ur" ? "urdu-text text-right" : "text-left";

    // Find the correct translation for the selected language
    const translation = verse.translations.find((t) => t.language === currentLanguage)?.text || verse.translations[0]?.text;

    if (isWordByWord) {
      return (
        <>
          <div className="flex flex-wrap flex-row-reverse gap-2">
            {verse.words.map((word, index) => (
              <div key={index} className="word-wrap flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-lg sm:text-xl md:text-2xl mb-2 arabic-text text-cyan-900">
                  {word.text_uthmani}
                </span>
                <span className={`text-base py-2 text-gray-600 ${currentLanguage === "ur" ? "urdu-text" : ""}`}>
                  {word.translation.text || "-"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className={`text-cyan-900 ${translationClass}`}>{translation}</p>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="mb-4">
          <p className="text-lg sm:text-xl md:text-2xl arabic-text text-cyan-900 text-right leading-[3.5rem]">
            {completeArabicText}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className={`text-cyan-900 ${translationClass}`}>{translation}</p>
        </div>
      </>
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8 text-cyan-800 mt-10">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 justify-between">
          <select
            onChange={handleSurahChange}
            value={currentSurah}
            className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
          >
            {SURAHS.map((surah) => (
              <option key={surah.number} value={surah.number}>
                {surah.name} ({surah.verses} verses)
              </option>
            ))}
          </select>

          <select
            onChange={handleLanguageChange}
            value={currentLanguage}
            className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
          </select>

          <select
            onChange={handleViewChange}
            value={isWordByWord ? "word-by-word" : "simple"}
            className="px-4 py-2 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
          >
            <option value="word-by-word">Word by Word</option>
            <option value="simple">Simple Translation</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Word or Ayat of Quran"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#67b2b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67b2b4] text-gray-700"
          />
          <button
            onClick={handleSearchVerse}
            className="px-4 py-3 bg-[#67b2b4] text-white rounded-lg hover:bg-[#5a9b9d] transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">{error}</div>
      )}

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#67b2b4] mx-auto"></div>
        </div>
      )}

      {verses.length > 0 && !isLoading && (
        <>
          <div className="mt-6 bg-[#E5F6F6] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {searchedSurah && searchedVerse ? `VERSE ${searchedSurah}:${searchedVerse}` : "RESULTS"}
                </span>
              </div>
              <span className="text-sm text-gray-600">{verses.length} Verses</span>
            </div>
          </div>

          {searchedSurah && searchedVerse && (
            <button
              onClick={() => {
                setSearchedSurah(null);
                setSearchedVerse(null);
                setSearchInput("");
                setCurrentPage(1);
                setVerses([]);
                fetchVerses();
              }}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Clear Search & Return to Surah View
            </button>
          )}

          <div className="mt-8 space-y-4">
            {verses.map((verse, index) => (
              <div key={`${verse.verse_key}-${index}`} className="overflow-hidden border border-[#67b2b4] rounded-lg">
                <div className="bg-[#67b2b4] py-2 px-4">
                  <h3 className="text-white text-sm font-semibold">Verse {verse.verse_key}</h3>
                </div>
                <div className="px-4 pb-4 pt-8">{renderVerseContent(verse)}</div>
              </div>
            ))}
          </div>

          {!isLoading && (
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              className="w-full mt-4 py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}