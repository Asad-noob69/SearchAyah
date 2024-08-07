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
    
    document.getElementById('signupForm').addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const email = document.getElementById('signupEmail').value;
      const username = document.getElementById('signupUsername').value;
      const password = document.getElementById('signupPassword').value;
    
      try {
        const response = await fetch('/.netlify/functions/signupFunc', {
          method: 'POST',
          body: JSON.stringify({ email, username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Unknown error occurred');
        }
    
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error('Signup error:', error);
        alert(`Error: ${error.message}`);
      }
    });
    
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
    
      const response = await fetch('/.netlify/functions/loginFunc', { // Use loginFunc
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      const result = await response.json();
      alert(result.message);
    });
});
    