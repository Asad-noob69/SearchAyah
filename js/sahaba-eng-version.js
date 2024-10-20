

function searchList() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUl");

  // Check if ul exists
  if (!ul) {
      console.error("Element with ID 'myUl' not found.");
      return; // Exit the function if ul is not found
  }

  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function addRAtoSahabaNames() {
  const listItems = document.querySelectorAll('#myUl li');
  listItems.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
          const raSpan = document.createElement('sup');
          raSpan.textContent = 'R.A';
          raSpan.style.marginLeft = '0.3em'; // Add a small gap
          item.appendChild(raSpan);
      }
  });
}

// Run the function when the page loads
window.addEventListener('load', addRAtoSahabaNames);


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

  document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const contentDivs = document.querySelectorAll('#intro');

    intro.style.display = 'flex';
    contentDivs.forEach(div => div.classList.add('hidden-content'));

   
});

  // Ensure the intro fades out after the entire page is fully loaded
window.onload = () => {
  const intro = document.getElementById('intro');
  const contentDivs = document.querySelectorAll('#intro');

  setTimeout(() => {
      intro.classList.add('fade-out');
      setTimeout(() => {
          intro.style.display = 'none';
          contentDivs.forEach(div => div.classList.remove('hidden-content'));
      }, 2000);
  }, 3000);
};