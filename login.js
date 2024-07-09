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

// Handle modal display
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

    // Make the window click event more specific
    window.addEventListener('click', function(event) {
        if (event.target == modal1) {
            modal1.style.display = 'none';
        }
    });

    // Handle form submissions
    document.getElementById('login-form1').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#login-form1 input[type="text"]').value;
        const password = document.querySelector('#login-form1 input[type="password"]').value;
    
        try {
            const response = await fetch('/.netlify/functions/loginFunc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'login', username, password })
            });
        
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    
    document.getElementById('signup-form1').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('#signup-form1 input[type="email"]').value;
        const username = document.querySelector('#signup-form1 input[type="text"]').value;
        const password = document.querySelector('#signup-form1 input[type="password"]').value;
    
        try {
            const response = await fetch('/.netlify/functions/loginFunc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'register', email, username, password })
            });
        
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});