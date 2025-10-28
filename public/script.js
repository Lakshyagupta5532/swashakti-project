document.addEventListener('DOMContentLoaded', function() {
  // --- Floating Help Icon open modal ---
  var icon = document.getElementById('floatingHelpIcon');
  var modal = document.getElementById('helpModal');
  var closeBtn = document.getElementById('closeHelpModal');
  if(icon && modal) {
    icon.onclick = function() { modal.style.display = 'block'; }
  }
  if(closeBtn && modal) {
    closeBtn.onclick = function() { modal.style.display = 'none'; }
  }

  // --- REGISTER ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      alert(data.message || data.error);
      registerForm.reset();
      if (!data.error) window.location.href = 'login.html';
    });
  }

  // --- LOGIN ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();
      alert(data.message || data.error);
      if (!data.error) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html';
      }
    });
  }

  // --- PRODUCT UPLOAD ---
  const productUploadForm = document.getElementById('productUploadForm');
  if (productUploadForm) {
    productUploadForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('user'));
      const seller_id = user ? user.id : null;
      const name = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const price = parseFloat(document.getElementById('price').value);
      const image_url = document.getElementById('image_url').value;
      const resp = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, image_url, seller_id })
      });
      const data = await resp.json();
      alert(data.message || data.error);
      if (!data.error) { productUploadForm.reset(); }
    });
  }

});
