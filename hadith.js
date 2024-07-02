const searchBox = document.getElementById('searchBox');
const hadithBox = document.getElementById('hadithBox');

searchBox.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 4) {
        try {
            const response = await fetch(`https://hadithapi.com/api/hadiths?apiKey=$2y$10$mSMZREZf0fTOkCoskvkMxetPgCBh8Z4RU7mPRj9qUmtViZj0Gstx6&search=${query}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);  // Debug: Log the entire response

            if (data.hadiths && Array.isArray(data.hadiths.data)) {
                // Log the first hadith object for inspection
                console.log('First Hadith Object:', data.hadiths.data[0]);

                displayHadiths(data.hadiths.data);
            } else {
                console.error('Unexpected data format:', data);
                throw new Error('Invalid data format');
            }

        } catch (error) {
            console.error(error);
            hadithBox.innerHTML = '<p>Error fetching hadiths. Please try again later.</p>';  // Display a user-friendly error message
        }
    } else {
        hadithBox.innerHTML = '';
    }
});

function displayHadiths(hadiths) {
    hadithBox.innerHTML = '';
    hadiths.forEach((hadith) => {
        const hadithHTML = `
            <h3>${hadith.book.bookName || 'N/A'} - ${hadith.chapter.chapterNumber || 'N/A'}:${hadith.hadithNumber || 'N/A'}</h3>
            <p>${hadith.hadithArabic || 'N/A'}</p>
            <p>${hadith.hadithEnglish || 'N/A'}</p>
            <p>${hadith.hadithUrdu || 'N/A'}</p>
        `;
        const hadithElement = document.createElement('div');
        hadithElement.innerHTML = hadithHTML;
        hadithBox.appendChild(hadithElement);
    });
}
