const searchBox = document.getElementById('searchBox');
const hadithBox = document.getElementById('hadithBox');

searchBox.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 3) {
        try {
            const response = await fetch(`https://www.hadithapi.com/api/hadiths/?apiKey=$2y$10$mSMZREZf0fTOkCoskvkMxetPgCBh8Z4RU7mPRj9qUmtViZj0Gstx6&search=${query}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const hadiths = data.data;  // Adjusted according to the new API's response format

            if (!hadiths) {
                throw new Error('Invalid data format');
            }

            displayHadiths(hadiths);
        } catch (error) {
            console.error(error);
            hadithBox.innerHTML = '';
        }
    } else {
        hadithBox.innerHTML = '';
    }
});

function displayHadiths(hadiths) {
    hadithBox.innerHTML = '';
    hadiths.forEach((hadith) => {
        const hadithHTML = `
            <h3>${hadith.book_name} - ${hadith.chapter_number}:${hadith.hadith_number}</h3>
            <p>${hadith.arabic}</p>
            <p>${hadith.translation}</p>
        `;
        const hadithElement = document.createElement('div');
        hadithElement.innerHTML = hadithHTML;
        hadithBox.appendChild(hadithElement);
    });
}
