 


  // for Quran API 

  const searchAyah = async (query) => {
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/en`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data.matches || []; // Ensure matches is an array
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
            const matches = await searchAyah(query);
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
        suggestion.addEventListener('click', () => showAyah(match));
        suggestionsBox.appendChild(suggestion);
    });
}

function showAyah(match) {
    const ayahBox = document.getElementById('ayahBox');
    ayahBox.innerHTML = `<h3>Surah ${match.surah.name} Ayah ${match.numberInSurah}</h3><p>${match.text}</p>`;
}



let debounceTimeout;
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 3 ) {
            const matches = await searchAyah(query);
            displaySuggestions(matches);
        }
    }, 300); // Adjust delay as needed
});
