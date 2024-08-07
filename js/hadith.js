
const searchBox = document.getElementById('searchBox');
const hadithBox = document.getElementById('hadithBox');
let selectedEnglishEdition = 'eng-bukhari';
let selectedUrduEdition = 'urd-bukhari';

let cachedEngData = null;
let cachedUrdData = null;

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

async function fetchData() {
    if (!cachedEngData || !cachedUrdData) {
        const [engResponse, urdResponse] = await Promise.all([
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${selectedEnglishEdition}.json`),
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${selectedUrduEdition}.json`)
        ]);

        if (!engResponse.ok || !urdResponse.ok) {
            throw new Error(`HTTP error! status: ${engResponse.status} ${urdResponse.status}`);
        }

        cachedEngData = await engResponse.json();
        cachedUrdData = await urdResponse.json();
    }

    return { engData: cachedEngData, urdData: cachedUrdData };
}

async function searchHadiths(query) {
    try {
        hadithBox.innerHTML = 'Searching...';
        const { engData, urdData } = await fetchData();

        query = query.trim().toLowerCase();
        
        if (query.length < 2) {
            hadithBox.innerHTML = 'Please enter at least 2 characters to search.';
            return;
        }

        const queryWords = query.split(/\s+/);

        const filteredHadiths = engData.hadiths.filter(hadith => {
            const hadithText = hadith.text.toLowerCase();
            return hadith.hadithnumber.toString() === query ||
                   query.includes(hadithText) ||
                   hadithText.includes(query) ||
                   queryWords.every(word => hadithText.includes(word));
        }).slice(0, 100);

        const matchedHadiths = filteredHadiths.map(engHadith => {
            const urdHadith = urdData.hadiths.find(h => h.hadithnumber === engHadith.hadithnumber);
            return { eng: engHadith, urd: urdHadith };
        });

        if (matchedHadiths.length === 0) {
            hadithBox.innerHTML = 'No results found.';
        } else {
            displayHadiths(matchedHadiths);
        }
    } catch (error) {
        console.error(error);
        hadithBox.innerHTML = 'Error fetching hadiths';
    }
}


const debouncedSearch = debounce(searchHadiths, 300);

searchBox.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
        debouncedSearch(query);
    } else {
        hadithBox.innerHTML = '';
    }
});

function displayHadiths(hadiths) {
    hadithBox.innerHTML = '';
    hadiths.forEach(hadith => {
        const hadithElement = document.createElement('div');
        hadithElement.innerHTML = `
            <h3>Hadith ${hadith.eng.hadithnumber}</h3>
            <h4>English:</h4>
            <p>${hadith.eng.text}</p>
            <h4>Urdu:</h4>
            <p dir="rtl" lang="ur">${hadith.urd ? hadith.urd.text : 'Urdu translation not available'}</p>
            <p>Reference: Book ${hadith.eng.reference.book}, Hadith ${hadith.eng.reference.hadith}</p>
        `;
        hadithBox.appendChild(hadithElement);
    });
}
