// Function to fetch data from Hadith API using RapidAPI
const searchHadith = async (query) => {
    try {
        // Fetch data from RapidAPI
        const url = `https://hadiths-api.p.rapidapi.com/hadiths?search=${query}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '37d929474dmsh05dbb8dd6c636bdp164194jsn1e4c438d711e',
                'X-RapidAPI-Host': 'hadiths-api.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text(); // Get the response as text
        console.log('Raw response text:', text);

        // Attempt to parse the response as JSON
        let data;
        try {
            data = JSON.parse(text);
        } catch (parseError) {
            throw new Error('Failed to parse JSON response');
        }

        console.log(data); // Log the fetched data to inspect its structure

        // Convert the object into an array of collections
        const collections = Object.keys(data).map(key => ({
            id: key,
            name: data[key].name,
            collection: data[key].collection
        }));

        return collections;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

let debounceTimeout;

document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const query = this.value;
        if (query.length > 2) {
            const matches = await searchHadith(query);
            console.log('Search query:', query);
            displaySuggestions(matches, query);
        }
    }, 300); // Adjust delay as needed
});

function displaySuggestions(matches, query) {
    console.log('Displaying suggestions for query', query);
    console.log('Matches:', matches);

    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    if (!Array.isArray(matches) || matches.length === 0) {
        suggestionsBox.innerHTML = '<div class="suggestion">No matches found</div>';
        return;
    }

    const regex = new RegExp(query, 'i');

    matches.forEach(match => {
        match.collection.forEach(hadith => {
            if (regex.test(hadith.text)) {
                const suggestion = document.createElement('div');
                suggestion.textContent = hadith.text;
                suggestion.className = 'suggestion';
                suggestion.addEventListener('click', () => showHadith(match));
                suggestionsBox.appendChild(suggestion);
            }
        });
    });
}

function showHadith(match) {
    const hadithBox = document.getElementById('hadithBox');
    hadithBox.innerHTML = `<h3>${match.name}</h3>`;

    match.collection.forEach(hadith => {
        const hadithElement = document.createElement('p');
        hadithElement.textContent = hadith.text; // Adjust this if the structure of hadith objects is different
        hadithBox.appendChild(hadithElement);
    });
}
