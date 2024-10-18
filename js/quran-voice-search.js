// Global variables
let recognition;
let isListening = false;
let finalTranscript = '';
let debounceTimer;
let quranVerses = [];
let fuse; // Declare Fuse.js instance

// DOM elements
const micButton = document.getElementById('micButton');
const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');

// Function to remove Arabic diacritics
function removeDiacritics(text) {
    return text.replace(/[\u064B-\u065F]/g, '');
}

// Fetch Quran verses when the page loads
fetchQuranVerses();

// Check if browser supports speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ar-SA'; // Set to Arabic

    recognition.onresult = function(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        // Update search box with current transcription
        searchBox.value = finalTranscript + interimTranscript;
        
        // Debounce the search to avoid too frequent searches
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (finalTranscript.trim() !== '') {
                const cleanTranscript = removeDiacritics(finalTranscript.trim());  // Remove diacritics
                searchQuran(cleanTranscript);  // Use cleaned transcript for search
            }
        }, 1000);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
        stopListening();
    };

    recognition.onend = function() {
        if (isListening) {
            recognition.start();
        }
    };
} else {
    console.log('Web Speech API is not supported in this browser.');
    micButton.style.display = 'none';
}

// Add event listener for the microphone button
micButton.addEventListener('click', toggleListening);

function toggleListening() {
    if (!isListening) {
        startListening();
    } else {
        stopListening();
    }
}


function startListening() {
    if (recognition) {
        finalTranscript = '';
        recognition.start();
        isListening = true;
        micButton.style.backgroundImage = "url('/images/rhythm.png')";
        micButton.style.backgroundSize = "cover";
        micButton.innerHTML = '<img src="/images/microphone.png" alt="Stop Listening" class="w-10 h-10 relative" style="top: -10px;"/>';
        searchBox.value = 'Listening...';
    }
}

function stopListening() {
    if (recognition) {
        recognition.stop();
        isListening = false;
        micButton.style.backgroundImage = "none";
        micButton.innerHTML = '<img src="/images/microphone.png" alt="Start Listening" class="w-10 h-10 relative" style="top: -10px;" />';
        // Perform a final search with the complete transcription
        if (finalTranscript.trim() !== '') {
            searchQuran(finalTranscript.trim());
        }
    }
}

function fetchQuranVerses() {
    const apiUrl = 'https://api.quran.com/api/v4/quran/verses/uthmani';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            quranVerses = data.verses.map(verse => ({
                ...verse,
                text_uthmani_clean: removeDiacritics(verse.text_uthmani)
            }));
            console.log('Quran verses loaded and processed');

            // Initialize Fuse.js after verses are loaded
            fuse = new Fuse(quranVerses, {
                keys: ['text_uthmani_clean'], // Adjust the key based on your data structure
                includeScore: true,
                threshold: 0.3, // Adjust threshold for fuzzy matching
            });
        })
        .catch(error => {
            console.error('Error fetching Quran verses:', error);
        });
}

function fetchTranslation(verseKey) {
    const apiUrl = `https://api.quran.com/api/v4/quran/translations/131?verse_key=${verseKey}`; 
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.translations && data.translations.length > 0) {
                return data.translations[0].text;
            } else {
                return 'Translation not available';
            }
        })
        .catch(error => {
            console.error('Error fetching translation:', error);
            return 'Error fetching translation';
        });
}

function searchQuran(query) {
    if (quranVerses.length === 0) {
        results.innerHTML = '<p class="text-red-500">Quran verses are still loading. Please try again in a moment.</p>';
        results.classList.remove('hidden');
        return;
    }

    const cleanQuery = removeDiacritics(query);
    
    // Use Fuse.js to search
    const matchingVerses = fuse.search(cleanQuery).map(result => result.item);

    displayResults(matchingVerses);
}

function removeSuperscripts(text) {
    return text.replace(/<sup[^>]*>.*?<\/sup>/g, '');
}

function displayResults(verses) {
    // Clear previous results
    results.innerHTML = '';

    // Show search information and result count only once
    const searchInfo = document.getElementById('searchInfo');
    const resultCount = document.getElementById('resultCount');

    if (verses.length > 0) {
        results.classList.remove('hidden');
        searchInfo.classList.remove('hidden');
        
        // Update result count dynamically
        resultCount.textContent = `${verses.length} Search Results`;

        verses.forEach(verse => {
            // Create the result card with the updated design
            const resultDiv = document.createElement('div');
            resultDiv.className = 'bg-white rounded-lg shadow-md overflow-hidden mb-4'; // Card design

            const headerDiv = document.createElement('div');
            headerDiv.className = 'bg-[#67b2b4] py-2 px-4'; // Card header
            const verseTitle = document.createElement('h3');
            verseTitle.className = 'text-white font-semibold';
            verseTitle.textContent = `Surah ${verse.verse_key}`; // Surah and Ayah number

            // Main content area for Arabic text and translation
            const verseContentDiv = document.createElement('div');
            verseContentDiv.className = 'px-4 pb-4 pt-8'; // Main content area

            // Add Arabic text (Uthmani script) on top
            const verseText = document.createElement('p');
            verseText.className = 'text-2xl font-arabic text-cyan-900 leading-normal text-right'; // Right-aligned Arabic text
            verseText.textContent = verse.text_uthmani; // Uthmani script

            // Add translation placeholder
            const verseTranslation = document.createElement('p');
            verseTranslation.className = 'text-slate-500 mt-2 text-base'; // Spacing for translation
            verseTranslation.textContent = 'Loading translation...'; // Placeholder for translation

            // Fetch translation dynamically
            fetchTranslation(verse.verse_key).then(translation => {
                verseTranslation.textContent = removeSuperscripts(`${translation}`);
            }).catch(() => {
                verseTranslation.textContent = 'Translation not available'; // Handle translation errors
            });

            // Append elements to resultDiv
            headerDiv.appendChild(verseTitle);
            resultDiv.appendChild(headerDiv); // Add the header to the card
            verseContentDiv.appendChild(verseText); // Add Arabic text on top
            verseContentDiv.appendChild(verseTranslation); // Add translation below
            resultDiv.appendChild(verseContentDiv); // Add content area to the card

            // Append the resultDiv to the results container
            results.appendChild(resultDiv);
        });
    } else {
        // If no results, show a message
        results.innerHTML = '<p class="text-gray-500">No matching verses found.</p>';
        results.classList.remove('hidden');
        searchInfo.classList.add('hidden');
    }
}

// Function to clear results when search bar is cleared
function clearSearch() {
    // Clear the input value
    document.getElementById('searchBox').value = '';

    // Clear results
    const results = document.getElementById('results');
    results.innerHTML = '';
    results.classList.add('hidden'); // Hide the results div

    const searchInfo = document.getElementById('searchInfo');
    searchInfo.classList.add('hidden'); // Hide search info
}

// Add event listener to the search input for clearing results
document.getElementById('searchBox').addEventListener('input', function () {
    if (this.value === '') {
        clearSearch();
    }
});
