function toggleSignup() {
    document.getElementById("login-toggle1").style.backgroundColor = "#fff";
    document.getElementById("login-toggle1").style.color = "#222";
    document.getElementById("signup-toggle1").style.backgroundColor = "#5f9999";
    document.getElementById("signup-toggle1").style.color = "#fff";
    document.getElementById("login-form1").style.display = "none";
    document.getElementById("signup-form1").style.display = "block";
}

function toggleLogin() {
    document.getElementById("login-toggle1").style.backgroundColor = "#5f9999";
    document.getElementById("login-toggle1").style.color = "#fff";
    document.getElementById("signup-toggle1").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle1").style.color = "#222";
    document.getElementById("signup-form1").style.display = "none";
    document.getElementById("login-form1").style.display = "block";
}

// To hide the login page inside the button
document.addEventListener('DOMContentLoaded', () => {
    const modal1 = document.getElementById('loginModal1');
    const btn1 = document.getElementById('loginBtn1');
    const span1 = document.getElementsByClassName('close1')[0];

    // Set initial background color of the toggle buttons
    document.getElementById("login-toggle1").style.backgroundColor = "#5f9999";
    document.getElementById("login-toggle1").style.color = "#fff";
    document.getElementById("signup-toggle1").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle1").style.color = "#222";

    btn1.onclick = function() {
        modal1.style.display = 'block';
    }

    span1.onclick = function() {
        modal1.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = 'none';
        }
    }
});
