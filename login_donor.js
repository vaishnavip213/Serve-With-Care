const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const errorText = document.getElementById('errorText');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Sample donor data (In real app, this would come from backend)
    const validDonors = [
      {
        email: 'donor@example.com',
        password: 'password123',
        name: 'John Doe'
      },
      {
        email: 'jane@example.com',
        password: 'password456',
        name: 'Jane Smith'
      },
      {
        email: 'test@test.com',
        password: 'test1234',
        name: 'Test User'
      }
    ];

    // Password Toggle
    passwordToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Clear error messages on input
    emailInput.addEventListener('focus', function() {
      emailError.textContent = '';
      emailError.classList.remove('show');
      this.classList.remove('error');
    });

    passwordInput.addEventListener('focus', function() {
      passwordError.textContent = '';
      passwordError.classList.remove('show');
      this.classList.remove('error');
    });

    // Email validation
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous messages
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';
      emailError.textContent = '';
      passwordError.textContent = '';
      emailError.classList.remove('show');
      passwordError.classList.remove('show');
      emailInput.classList.remove('error', 'success');
      passwordInput.classList.remove('error', 'success');

      let isValid = true;

      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        isValid = false;
      } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailInput.classList.add('success');
      }

      // Validate password
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        isValid = false;
      } else {
        passwordInput.classList.add('success');
      }

      if (!isValid) return;

      // Simulate login process
      loginBtn.classList.add('loading');
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Logging in...';

      setTimeout(() => {
        const email = emailInput.value.toLowerCase();
        const password = passwordInput.value;

        // Check credentials
        const donor = validDonors.find(d => d.email === email && d.password === password);

        if (donor) {
          // Store login data if "Remember Me" is checked
          if (rememberMeCheckbox.checked) {
            localStorage.setItem('donorEmail', email);
            localStorage.setItem('donorRemembered', 'true');
          } else {
            localStorage.removeItem('donorEmail');
            localStorage.removeItem('donorRemembered');
          }

          // Store donor info in session
          sessionStorage.setItem('donorName', donor.name);
          sessionStorage.setItem('donorEmail', email);
          sessionStorage.setItem('isLoggedIn', 'true');

          // Show success message
          successMessage.style.display = 'block';
          document.getElementById('successText').textContent = `Welcome back, ${donor.name}! Redirecting to dashboard...`;

          // Redirect to dashboard
          setTimeout(() => {
            window.location.href = 'donor-dashboard.html';
          }, 1500);
        } else {
          // Show error message
          errorMessage.style.display = 'block';
          errorText.textContent = 'Invalid email or password. Please try again.';
          
          // Reset button
          loginBtn.classList.remove('loading');
          loginBtn.disabled = false;
          loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
      }, 1500);
    });

    // Load remembered email if exists
    window.addEventListener('load', function() {
      const rememberedEmail = localStorage.getItem('donorEmail');
      const isRemembered = localStorage.getItem('donorRemembered');

      if (rememberedEmail && isRemembered === 'true') {
        emailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
      }
    });

    // Enter key to submit form
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
      }
    });