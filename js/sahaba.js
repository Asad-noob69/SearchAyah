
let scrollTopBtn = document.getElementById("scrollTopBtn");


function searchList() {
    const input = document.getElementById('search-bar');
    const filter = input.value.toUpperCase();
    const ul = document.getElementById('list');
    const li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName('a')[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Function to add رضي الله عنه to Urdu Sahaba names
function addSuffixToUrduNames() {
    const listItems = document.querySelectorAll('#list li');
    
    listItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const suffixElement = document.createElement('sup');
            suffixElement.textContent = 'رضي الله عنه';
            suffixElement.style.marginRight = '0.3em'; // Add a small gap
            
        
            link.insertAdjacentElement('afterend', suffixElement);
        }
    });
}

// Run the function when the page loads
window.addEventListener('load', addSuffixToUrduNames);

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

window.onload = function() {
    const languageSelect = document.getElementById("languageSelect");
    const currentPage = window.location.pathname;

    if (currentPage.includes("sahaba.html")) {
        languageSelect.value = "urdu"; // Set default to Urdu if on the Urdu page
    } else {
        languageSelect.value = "english"; // Otherwise set it to English
    }
};
    function redirectToPage() {
        const language = document.getElementById("languageSelect").value;
        if (language === "english") {
            window.location.href = "/html/sahaba-eng-version.html"; // Replace with your English page URL
        } else if (language === "urdu") {
            window.location.href = "/html/sahaba.html"; // Replace with your Urdu page URL
        }
    }
    document.addEventListener('DOMContentLoaded', function () {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    });
