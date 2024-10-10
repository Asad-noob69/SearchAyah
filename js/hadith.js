let hadithData = {};
        let arabicHadithData = {};

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
            } catch (error) {
                console.error(`Error fetching Hadith data for ${book}:`, error);
            }
        }

        // Search function
        function searchHadith(query, book) {
            const matches = [];
            const lowerQuery = query.toLowerCase();

            for (const hadith of hadithData[book]) {
                if (hadith.text.toLowerCase().includes(lowerQuery)) {
                    matches.push(hadith);
                }
            }

            return matches;
        }

        // Event listener for search input
        let debounceTimeout;
        document.getElementById('searchBox').addEventListener('input', function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const query = this.value;
                const selectedBook = document.getElementById('bookSelect').value;
                if (query.length > 2) {
                    const matches = searchHadith(query, selectedBook);
                    displaySearchResults(matches, query);
                }
            }, 300);
        });

        let currentPage = 1;
        const resultsPerPage = 20;
        let allMatches = [];

        function displaySearchResults(matches, query, isNewSearch = true) {
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
                
                // Find corresponding Arabic hadith
                const arabicMatch = arabicHadithData[document.getElementById('bookSelect').value].find(h => h.hadithnumber === match.hadithnumber);
                
                resultDiv.innerHTML = `
                    <div class="bg-[#67b2b4] py-2 px-4">
                        <h3 class="text-white font-semibold">Hadith ${match.hadithnumber}</h3>
                    </div>
                    <div class="px-4 pb-4 pt-8">
                        <p class="text-cyan-800 font-arabic text-right text-xl" dir="rtl">
                            ${arabicMatch ? arabicMatch.text : 'Arabic text not available'}
                        </p>
                        <p class="text-cyan-800 my-10">
                            ${highlightSearchTerm(match.text, query)}
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

            // Fetch Hadith data for the initially selected book
            const initialBook = document.getElementById('bookSelect').value;
            fetchHadithData(initialBook);

            // Add event listener for book selection change
            document.getElementById('bookSelect').addEventListener('change', function() {
                const selectedBook = this.value;
                fetchHadithData(selectedBook);
            });
        });