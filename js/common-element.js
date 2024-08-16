// JavaScript to load header from an external file
function loadHeader() {
    fetch('/html/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // Call a function to initialize the login form after the header is loaded
            if (typeof initializeLoginForm === 'function') {
                initializeLoginForm();
            }
        });
}

// Call the function on page load
window.onload = loadHeader;