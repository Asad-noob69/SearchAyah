
        // Function to fetch data from Hadith API
        const searchHadith = async (query) => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
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
            console.log('Displaying suggestions for query',query);
            console.log('Matches:',matches)
            
            const suggestionsBox = document.getElementById('suggestions');
            suggestionsBox.innerHTML = '';

            if (!Array.isArray(matches) || matches.length === 0) {
                suggestionsBox.innerHTML = '<div class="suggestion">No matches found</div>';
                return;
            }

            const regex = new RegExp(query, 'i');

            matches.forEach(match => {
                if (regex.test(match.name)) {
                    const suggestion = document.createElement('div');
                    suggestion.textContent = match.name;
                    suggestion.className = 'suggestion';
                    suggestion.addEventListener('click', () => showHadith(match));
                    suggestionsBox.appendChild(suggestion);
                }
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
    