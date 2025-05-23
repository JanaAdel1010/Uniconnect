document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
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
    }
});