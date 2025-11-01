// ================================
// PART 1: EVENT HANDLING & INTERACTIVE ELEMENTS
// ================================

// --- Feature 1: Light/Dark Mode Toggle ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  
  // Update button text based on current mode
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️ Toggle Light Mode';
  } else {
    themeToggle.textContent = '🌙 Toggle Dark Mode';
  }
});

// --- Feature 2: Collapsible FAQ Section ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.classList.toggle('show');
    
    // Optional: rotate arrow or change button style (not implemented here for simplicity)
  });
});

// ================================
// PART 2: PASSWORD VISIBILITY TOGGLE
// ================================

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.textContent = type === 'password' ? '👁️' : '🔒';
});

// ================================
// PART 3: CUSTOM FORM VALIDATION (NO HTML5-ONLY)
// ================================

const form = document.getElementById('solanaForm');
const formMessage = document.getElementById('formMessage');

// Helper: Show message with type (error/success)
function showMessage(text, isError = true) {
  formMessage.textContent = text;
  formMessage.className = isError ? 'error' : 'success';
}

// Helper: Validate Solana address (simplified: 32-44 base58 chars)
function isValidSolanaAddress(addr) {
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return solanaRegex.test(addr.trim());
}

// Helper: Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default HTML5 validation + submission

  // Get values
  const name = document.getElementById('walletName').value.trim();
  const email = document.getElementById('walletEmail').value.trim();
  const solAddress = document.getElementById('solanaAddress').value.trim();
  const password = document.getElementById('password').value;

  // Reset message
  formMessage.style.display = 'none';

  // Validation logic
  if (name === '') {
    showMessage('Please enter your full name.');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address.');
    return;
  }

  if (!isValidSolanaAddress(solAddress)) {
    showMessage('Please enter a valid Solana wallet address (32–44 characters, base58).');
    return;
  }

  if (password.length < 8) {
    showMessage('Password must be at least 8 characters long.');
    return;
  }

  // If all valid
  showMessage('✅ Account secured! Welcome to the Solana ecosystem.', false);
  
  // Optional: Reset form
  // form.reset();
});
