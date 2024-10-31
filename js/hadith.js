let hadithData = {};
let arabicHadithData = {};
let urduHadithData = {}; // New object to store Urdu hadith data
let bengaliHadithData = {}; // New object to store Bengali hadith data
let turkishHadithData = {}; // New object to store Turkish hadith data
let indonesianHadithData = {}; // New object to store Indonesian hadith data

async function fetchHadithData(book) {
    if (hadithData[book]) return;
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${book}.json`);

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        hadithData[book] = data.hadiths;
        console.log(`Hadith data for ${book} loaded successfully`);

        // Fetch corresponding Arabic book data
        const arabicBook = 'ara-' + book.split('-')[1];

        const arabicResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${arabicBook}.json`);
        if (!arabicResponse.ok) throw new Error('Network response was not ok for Arabic book');
        const arabicData = await arabicResponse.json();

        arabicHadithData[book] = arabicData.hadiths;

        console.log(`Arabic Hadith data for ${arabicBook} loaded successfully`);


        // Fetch corresponding Urdu book data

        const urduBook = 'urd-' + book.split('-')[1];

        const urduResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${urduBook}.json`);

        if (!urduResponse.ok) throw new Error('Network response was not ok for Urdu book');
        const urduData = await urduResponse.json();

        urduHadithData[book] = urduData.hadiths; // Store Urdu data in the new object

        console.log(`Urdu Hadith data for ${urduBook} loaded successfully`);

        // Fetch corresponding Bengali book data

        const bengaliBook = 'ben-' + book.split('-')[1];
        const bengaliResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bengaliBook}.json`);
        if (!bengaliResponse.ok) throw new Error('Network response was not ok for Bengali book');

        const bengaliData = await bengaliResponse.json();

        bengaliHadithData[book] = bengaliData.hadiths; // Store Bengali data in the new object

        console.log(`Bengali Hadith data for ${bengaliBook} loaded successfully`);

        // Fetch corresponding Turkish book data

        const turkishBook = 'tur-' + book.split('-')[1];

        const turkishResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${turkishBook}.json`);
        if (!turkishResponse.ok) throw new Error('Network response was not ok for Turkish book');

        const turkishData = await turkishResponse.json();

        turkishHadithData[book] = turkishData.hadiths; // Store Turkish data in the new object
        console.log(`Turkish Hadith data for ${turkishBook} loaded successfully`);

        // Fetch corresponding Indonesian book data
        const indonesianBook = 'ind-' + book.split('-')[1];

        const indonesianResponse = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${indonesianBook}.json`);

        if (!indonesianResponse.ok) throw new Error('Network response was not ok for Indonesian book');
        const indonesianData = await indonesianResponse.json();
        indonesianHadithData[book] = indonesianData.hadiths; // Store Indonesian data in the new object

        console.log(`Indonesian Hadith data for ${indonesianBook} loaded successfully`);
    } catch (error) {
        console.error(`Error fetching Hadith data for ${book}:`, error);
    }
}

// Search function
function searchHadith(query, book, language) {
    const matches = [];
    const lowerQuery = query.toLowerCase();
    // Update dataToSearch to include Bengali, Turkish, and Indonesian
    const dataToSearch = language === 'urdu' ? urduHadithData[book] : 

                        language === 'bengali' ? bengaliHadithData[book] : 

                        language === 'turkish' ? turkishHadithData[book] : 
                        language === 'indonesian' ? indonesianHadithData[book] : 

                        hadithData[book];

    for (const hadith of dataToSearch) {

        if (hadith.text.toLowerCase().includes(lowerQuery)) {
            matches.push(hadith);
        }

    }


    return matches;

}
// ... existing code ...
// Event listener for search input
let debounceTimeout;
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const query = this.value;
        const selectedBook = document.getElementById('bookSelect').value;
        const selectedLanguage = document.getElementById('languageSelect').value;
        if (query.length > 2) {
            const matches = searchHadith(query, selectedBook, selectedLanguage);
            displaySearchResults(matches, query, selectedLanguage);
        }
    }, 300);
});

let currentPage = 1;
const resultsPerPage = 20;
let allMatches = [];

function displaySearchResults(matches, query, language, isNewSearch = true) {
    const searchResults = document.getElementById('searchResults');
    const searchInfo = document.getElementById('searchInfo');
    const resultCount = document.getElementById('resultCount');

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
        
        const arabicMatch = arabicHadithData[document.getElementById('bookSelect').value].find(h => h.hadithnumber === match.hadithnumber);
        const urduMatch = urduHadithData[document.getElementById('bookSelect').value].find(h => h.hadithnumber === match.hadithnumber);
        
        resultDiv.innerHTML = `
            <div class="bg-[#67b2b4] py-2 px-4">
                <h3 class="text-white font-semibold">Hadith ${match.hadithnumber}</h3>
            </div>
            <div class="px-4 pb-4 pt-8">
                <p class="text-cyan-800 font-arabic leading-[4rem]text-right text-2xl" dir="rtl">
                    ${arabicMatch ? arabicMatch.text : 'Arabic text not available'}
                </p>
                <p class="text-cyan-800 my-10 ${language === 'urdu' ? 'font-urdu text-right' : ''}" ${language === 'urdu' ? 'dir="rtl"' : ''}>
                    ${language === 'urdu' 
                        ? (urduMatch ? highlightSearchTerm(urduMatch.text, query, true) : 'Urdu text not available')
                        : highlightSearchTerm(match.text, query, false)}
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
            displaySearchResults(allMatches, query, language, false);
        });
        searchResults.appendChild(loadMoreBtn);
    }

    // Scroll to the newly added results
    if (!isNewSearch) {
        newResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Highlight search term in text
function highlightSearchTerm(text, term, isUrdu) {
    if (isUrdu) {
        // For Urdu, we need to use a different approach due to right-to-left text
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map(part => 
            part.toLowerCase() === term.toLowerCase() 
                ? `<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">${part}</mark>` 
                : part
        ).join('');
    } else {
        // For English, we can use the same method as before
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark class="bg-[#67b2b4] bg-opacity-50 text-cyan-900">$1</mark>');
    }
}

// Event listener for language selection change
document.getElementById('languageSelect').addEventListener('change', function() {
    const query = document.getElementById('searchBox').value;
    const selectedBook = document.getElementById('bookSelect').value;
    if (query.length > 2) {
        const matches = searchHadith(query, selectedBook, this.value);
        displaySearchResults(matches, query, this.value);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    intro.style.display = 'flex';
    contentDivs.forEach(div => div.classList.add('hidden-content'));
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Initial data fetch
    const initialBook = document.getElementById('bookSelect').value;
    fetchHadithData(initialBook);

    // Add event listener for book selection change
    document.getElementById('bookSelect').addEventListener('change', function() {
        const selectedBook = this.value;
        fetchHadithData(selectedBook);
    });
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
