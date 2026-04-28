// app.js

let cache = new Map();

async function loadUser() {
  const userId = document.getElementById('userId').value;

  if (userId === '') {           
    showResult('Please enter a valid ID');
    return;
  }

  if ((userId) < 0 || isNaN(userId)) {  
    showResult('ID must be positive', true);
    return;
  }

  let user;

  if (cache.has(userId)) {
    user = cache.get(userId);
  } else {
    try {
      user = await fetchUser(userId); 
      if (user && Object.keys(user).length > 0) {
        cache.set(userId, user);
      }
    } catch (error) {
      showResult('Error fetching user', true);
      return;
    }
  }

  if (!user || Object.keys(user).length === 0) {
    showResult('user not found', true);
    return;
  }

  const resultEl = document.getElementById('result');
  resultEl.className = ''; 
  resultEl.innerHTML = '';

  const nameEl = document.createElement('strong');
  nameEl.textContent = user.name;
  
  const emailText = document.createTextNode(user.email);
  const websiteText = document.createTextNode(user.website);

  resultEl.appendChild(nameEl);
  resultEl.appendChild(document.createElement('br'));
  resultEl.appendChild(emailText);
  resultEl.appendChild(document.createElement('br'));
  resultEl.appendChild(websiteText);
}

function showResult(message, isError = false) {
  const el = document.getElementById('result');
  el.className = isError ? 'error' : '';
  el.textContent = message;
}
