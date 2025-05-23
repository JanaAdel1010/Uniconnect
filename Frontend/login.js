document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  // 🔧 Get email and password from form inputs
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })  // ✅ Send JSON body
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Login failed');
    }

    // ✅ Save JWT token
    localStorage.setItem('token', data.token);

    // ✅ Redirect after success
    window.location.href = 'trial.html';
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message || 'Something went wrong. Try again.');
  }
});
