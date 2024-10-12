let quranData = [];
let urduTranslation = [];

async function fetchQuranData() {
    try {
        // Fetch Arabic text
        const arabicResponse = await fetch('https://api.quran.com/api/v4/quran/verses/uthmani');
        if (!arabicResponse.ok) throw new Error('Network response was not ok for Arabic text');
        const arabicData = await arabicResponse.json();

        // Fetch English translation
        const englishResponse = await fetch('https://api.quran.com/api/v4/quran/translations/131');
        if (!englishResponse.ok) throw new Error('Network response was not ok for English translation');
        const englishData = await englishResponse.json();

        // Fetch Urdu translation
        const urduResponse = await fetch('https://api.quran.com/api/v4/quran/translations/97');
        if (!urduResponse.ok) throw new Error('Network response was not ok for Urdu translation');
        const urduData = await urduResponse.json();

        // Combine Arabic, English, and Urdu data
        quranData = arabicData.verses.map((verse, index) => ({
            surah: { number: Math.floor(verse.verse_key.split(':')[0]), englishName: '' },
            numberInSurah: parseInt(verse.verse_key.split(':')[1]),
            text: verse.text_uthmani,
            englishTranslation: englishData.translations[index].text,
            urduTranslation: urduData.translations[index].text
        }));

        await loadSurahNames();
        console.log('Quran data loaded successfully');
    } catch (error) {
        console.error('Error fetching Quran data:', error);
    }
}

async function loadSurahNames() {
    try {
        const response = await fetch('https://api.quran.com/api/v4/chapters');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const surahNames = data.chapters.reduce((acc, surah) => {
            acc[surah.id] = surah.name_simple;
            return acc;
        }, {});
        
        quranData.forEach(ayah => {
            ayah.surah.englishName = `Surah ${surahNames[ayah.surah.number]}`;
        });
    } catch (error) {
        console.error('Error loading surah names:', error);
    }
}

// Search function
async function searchAyah(query) {
    if (quranData.length === 0) {
        await fetchQuranData();
    }

    const matches = [];
    const lowerQuery = query.toLowerCase();
    const selectedLanguage = document.getElementById('languageSelect').value;

    for (const ayah of quranData) {
        if (ayah.text.includes(query) || 
            ayah[`${selectedLanguage}Translation`].toLowerCase().includes(lowerQuery)) {
            matches.push(ayah);
        }
    }

    return matches;
}

// Event listener for search input
let debounceTimeout;
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 2) {
            const matches = await searchAyah(query);
            displaySearchResults(matches, query);
        }
    }, 300);
});

// Event listener for language selection
document.getElementById('languageSelect').addEventListener('change', async function() {
    const query = document.getElementById('searchBox').value;
    if (query.length > 2) {
        const matches = await searchAyah(query);
        displaySearchResults(matches, query);
    }
});

let currentPage = 1;
const resultsPerPage = 20;
let allMatches = [];

function displaySearchResults(matches, query, isNewSearch = true) {
    const searchResults = document.getElementById('searchResults');
    const searchInfo = document.getElementById('searchInfo');
    const resultCount = document.getElementById('resultCount');
    const selectedLanguage = document.getElementById('languageSelect').value;

    if (isNewSearch) {
        searchResults.innerHTML = '';
        currentPage = 1;
        allMatches = matches;
    }

    if (!Array.isArray(allMatches) || allMatches.length === 0) {
        searchResults.innerHTML = '<div class="p-4 bg-[#67b2b4] bg-opacity-20 rounded-lg text-slate-800 mt-5">No matches found</div>';
        searchInfo.classList.add('hidden');
        return;
    }

    searchInfo.classList.remove('hidden');
    resultCount.textContent = `${allMatches.length} Search Results`;

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentMatches = allMatches.slice(startIndex, endIndex);

    // Remove existing "Load More" button if it exists
    const existingLoadMoreBtn = document.getElementById('loadMoreBtn');
    if (existingLoadMoreBtn) {
        existingLoadMoreBtn.remove();
    }

    // Create a container for the new results
    const newResultsContainer = document.createElement('div');

    currentMatches.forEach(match => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'bg-white rounded-lg shadow-md overflow-hidden mb-4';
        resultDiv.innerHTML = `
            <div class="bg-[#67b2b4] py-2 px-4">
                <h3 class="text-white font-semibold">${match.surah.englishName} ${match.numberInSurah}</h3>
            </div>
            <div class="px-4 pb-4 pt-8">
                <div class="mb-8 text-right" dir="rtl">
                    <span class="text-2xl font-arabic text-cyan-900 leading-4">${match.text}</span>
                </div>
                <p class="text-cyan-800 ${selectedLanguage === 'urdu' ? 'text-right' : ''}" ${selectedLanguage === 'urdu' ? 'dir="rtl"' : ''}>
                    ${highlightSearchTerm(match[`${selectedLanguage}Translation`], query)}
                </p>
            </div>
        `;
        newResultsContainer.appendChild(resultDiv);
    });

    // Append the new results to the search results container
    searchResults.appendChild(newResultsContainer);

    // Add "Load More" button if there are more results
    if (endIndex < allMatches.length) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'loadMoreBtn';
        loadMoreBtn.className = 'w-full py-2 bg-[#67b2b4] text-white rounded-lg hover:bg-[#6e9d9e] transition duration-300';
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            displaySearchResults(allMatches, query, false);
        });
        searchResults.appendChild(loadMoreBtn);
    }

    // Scroll to the newly added results
    if (!isNewSearch) {
        newResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Highlight search term in text
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">$1</mark>');
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener('DOMContentLoaded', function() {
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
mobileMenu.classList.toggle('hidden');
});
});

document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    intro.style.display = 'flex';
    contentDivs.forEach(div => div.classList.add('hidden-content'));

    // Fetch Quran data when the page loads
    fetchQuranData();
});

// Ensure the intro fades out after the entire page is fully loaded
window.onload = () => {
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
            contentDivs.forEach(div => div.classList.remove('hidden-content'));
        }, 2000);
    }, 3000);
};
