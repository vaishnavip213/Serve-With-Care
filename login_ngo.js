// DOM Elements
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

    // Sample NGO data
    const validNGOs = [
      {
        email: 'ngo@example.com',
        password: 'ngopass123',
        name: 'Food For All Foundation',
        orgName: 'Food For All Foundation',
        regNumber: 'NGO-2024-001',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      {
        email: 'help@ngo.com',
        password: 'ngo12345',
        name: 'Help Foundation',
        orgName: 'Help Foundation',
        regNumber: 'NGO-2024-002',
        city: 'Delhi',
        state: 'Delhi'
      },
      {
        email: 'test@ngo.com',
        password: 'test1234',
        name: 'Test NGO',
        orgName: 'Test NGO',
        regNumber: 'NGO-2024-003',
        city: 'Bangalore',
        state: 'Karnataka'
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
        const ngo = validNGOs.find(n => n.email === email && n.password === password);

        if (ngo) {
          // Store login data if "Remember Me" is checked
          if (rememberMeCheckbox.checked) {
            localStorage.setItem('ngoEmail', email);
            localStorage.setItem('ngoRemembered', 'true');
          } else {
            localStorage.removeItem('ngoEmail');
            localStorage.removeItem('ngoRemembered');
          }

          // Store NGO info in session
          sessionStorage.setItem('ngoName', ngo.name);
          sessionStorage.setItem('ngoEmail', email);
          sessionStorage.setItem('ngoOrgName', ngo.orgName);
          sessionStorage.setItem('ngoRegNumber', ngo.regNumber);
          sessionStorage.setItem('ngoCity', ngo.city);
          sessionStorage.setItem('ngoState', ngo.state);
          sessionStorage.setItem('isLoggedIn', 'true');

          // Show success message
          successMessage.style.display = 'block';
          document.getElementById('successText').textContent = `Welcome ${ngo.name}! Redirecting to dashboard...`;

          // Redirect to dashboard
          setTimeout(() => {
            window.location.href = 'ngo-dashboard.html';
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
      const rememberedEmail = localStorage.getItem('ngoEmail');
      const isRemembered = localStorage.getItem('ngoRemembered');

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