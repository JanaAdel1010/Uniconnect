document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    /* const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
     try {
     fetch('/api/auth/login', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
     })
         .then(async response => {
             if (!response.ok) {
                 const data = await response.json();
                 throw new Error(data.msg);
             }
             return response.json();
         })
         .then(data => {
             localStorage.setItem('token', data.token);
             window.location.href = 'home.html';
         })
         .catch(error => {
             console.error('Login error:', error);
             alert(error.message || 'Something went wrong. Try again.');
         });
 } catch (error) {
     console.error('Error:', error);
     alert('Something went wrong. Try again.');
 }*/
    // Grab entered values (optional if you want to validate)
    /* const username = this.querySelector('input[type="text"]').value.trim();
     const password = this.querySelector('input[type="password"]').value.trim();
 
     // Simulated login check (you can replace this with your real validation)
     if (username === "admin" && password === "1234") {
         // Redirect to trial.html if login is successful
         window.location.href = "trial.html";
     } else {
         alert("Invalid username or password. Try again!");
     }
     document.getElementById('loginForm').addEventListener('submit', async function (e) {
         e.preventDefault();*/

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch(`http://localhost:5000/api/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
        }

        // Save token or session data if you get one
        localStorage.setItem('token', data.token);

        // Redirect after successful login
        window.location.href = 'trial.html';

    } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Something went wrong. Try again.');
    }

});