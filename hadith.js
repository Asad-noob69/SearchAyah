

// Function to fetch data from Hadith API
const searchHadith = async (query) => {
    try {
        const response = await fetch(`https://www.hadithapi.com/api/hadiths/?apiKey=$2y$10$mSMZREZf0fTOkCoskvkMxetPgCBh8Z4RU7mPRj9qUmtViZj0Gstx6&query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data || []; // Ensure data is an array
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 3) {
            const matches = await searchHadith(query);
            displaySuggestions(matches);
        }
    }, 300); // Adjust delay as needed
});

function displaySuggestions(matches) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    if (!Array.isArray(matches) || matches.length === 0) {
        suggestionsBox.innerHTML = '<div class="suggestion">No matches found</div>';
        return;
    }
  //   const regex = new RegExp(`(${query})`, 'gi'); 

    matches.forEach(match => {
        const suggestion = document.createElement('div');
        suggestion.textContent = match.text;
        suggestion.className = 'suggestion';
      //  suggestion.innerHTML = match.text.replace (regex, '<span class="highlight">$1</span>');
        suggestion.addEventListener('click', () => showHadith(match));
        suggestionsBox.appendChild(suggestion);
    });
}

function showHadith(match) {
    const ayahBox = document.getElementById('hadithBox');
    ayahBox.innerHTML = `<h3>${match.bookName} Hadith ${match.hadithNumber}</h3><p>${match.hadith}</p>`;

}



let debounceTimeout;
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 3 ) {
            const matches = await searchHadith(query);
            displaySuggestions(matches);
        }
    }, 300); // Adjust delay as needed
});
