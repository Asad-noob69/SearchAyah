// Global variables to store elements
let elements = {};

function initializeLoginForm() {
    elements = {
        loginToggle: document.getElementById("login-toggle1"),
        signupToggle: document.getElementById("signup-toggle1"),
        loginForm: document.getElementById("login-form1"),
        signupForm: document.getElementById("signup-form1"),
        modal1: document.getElementById('loginModal1'),
        btn1: document.getElementById('loginBtn1'),
        span1: document.getElementsByClassName('close1')[0],
        signupFormElement: document.getElementById('signupForm'),
        loginFormElement: document.getElementById('loginForm')
    };

    const missingElements = Object.entries(elements)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

    if (missingElements.length > 0) {
        console.error("The following elements were not found:", missingElements.join(", "));
        return;
    }

    // Set initial background color of the toggle buttons
    elements.loginToggle.style.backgroundColor = "#5f9999";
    elements.loginToggle.style.color = "#fff";
    elements.signupToggle.style.backgroundColor = "#fff";
    elements.signupToggle.style.color = "#222";

    elements.btn1.onclick = function() {
        elements.modal1.style.display = 'block';
    }

    elements.span1.onclick = function() {
        elements.modal1.style.display = 'none';
    }

    // Make the window click event more specific
    window.addEventListener('click', function(event) {
        if (event.target == elements.modal1) {
            elements.modal1.style.display = 'none';
        }
    });

    // Handle form submissions
    elements.signupFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Your signup form submission code here
    });

    elements.loginFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Your login form submission code here
    });
}

// Define toggleSignup and toggleLogin in the global scope
window.toggleSignup = function() {
    if (!elements.loginToggle) return; // Guard clause in case elements are not initialized
    elements.loginToggle.style.backgroundColor = "#fff";
    elements.loginToggle.style.color = "#222";
    elements.signupToggle.style.backgroundColor = "#5f9999";
    elements.signupToggle.style.color = "#fff";
    elements.loginForm.style.display = "none";
    elements.signupForm.style.display = "block";
}

window.toggleLogin = function() {
    if (!elements.loginToggle) return; // Guard clause in case elements are not initialized
    elements.loginToggle.style.backgroundColor = "#5f9999";
    elements.loginToggle.style.color = "#fff";
    elements.signupToggle.style.backgroundColor = "#fff";
    elements.signupToggle.style.color = "#222";
    elements.signupForm.style.display = "none";
    elements.loginForm.style.display = "block";
}

// This function will be called by common-element.js after the header is loaded
window.initializeLoginForm = initializeLoginForm;

// Try to initialize immediately in case the header is already loaded
document.addEventListener('DOMContentLoaded', initializeLoginForm);

// Also try to initialize after a short delay, in case the header loads slowly
setTimeout(initializeLoginForm, 1000);