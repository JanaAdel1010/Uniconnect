document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const interests = document.getElementById('interests').value.trim();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, skills, interests })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.msg || 'Registration failed');
      }
  
      alert('User registered successfully!');
      window.location.href = 'login.html';
  
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Something went wrong. Try again.');
    }
  });