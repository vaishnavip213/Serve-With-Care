const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const passwordToggle = document.getElementById('passwordToggle');
    const signupBtn = document.getElementById('signupBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const passwordRequirements = document.getElementById('passwordRequirements');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    // Password requirements
    const lengthReq = document.getElementById('lengthReq');
    const uppercaseReq = document.getElementById('uppercaseReq');
    const lowercaseReq = document.getElementById('lowercaseReq');
    const numberReq = document.getElementById('numberReq');
    const specialReq = document.getElementById('specialReq');

    // Password Toggle
    passwordToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Clear error messages on input
    [nameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
      input.addEventListener('focus', function() {
        this.classList.remove('error');
        const errorId = this.id + 'Error';
        const errorEl = document.getElementById(errorId);
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('show');
        }
      });
    });

    termsCheckbox.addEventListener('change', function() {
      termsError.classList.remove('show');
    });

    // Validations
    function validateName(name) {
      return name.trim().length >= 3;
    }

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function validatePhone(phone) {
      const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return regex.test(phone.replace(/\s/g, ''));
    }

    function validatePassword(password) {
      const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
      };
      return requirements;
    }

    function updatePasswordRequirements(password) {
      const req = validatePassword(password);
      
      updateRequirement(lengthReq, req.length);
      updateRequirement(uppercaseReq, req.uppercase);
      updateRequirement(lowercaseReq, req.lowercase);
      updateRequirement(numberReq, req.number);
      updateRequirement(specialReq, req.special);
    }

    function updateRequirement(element, met) {
      const icon = element.querySelector('i');
      if (met) {
        element.classList.add('met');
        element.classList.remove('unmet');
        icon.className = 'fas fa-check-circle';
      } else {
        element.classList.remove('met');
        element.classList.add('unmet');
        icon.className = 'fas fa-circle';
      }
    }

    function updatePasswordStrength(password) {
      const req = validatePassword(password);
      const metRequirements = Object.values(req).filter(Boolean).length;

      strengthFill.className = 'strength-fill';
      
      if (metRequirements <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Strength: Weak';
        strengthText.className = 'strength-text weak';
      } else if (metRequirements === 3 || metRequirements === 4) {
        strengthFill.classList.add('fair');
        strengthText.textContent = 'Strength: Fair';
        strengthText.className = 'strength-text fair';
      } else if (metRequirements === 5) {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strength: Strong';
        strengthText.className = 'strength-text strong';
      }
    }

    // Password input events
    passwordInput.addEventListener('focus', function() {
      passwordRequirements.classList.add('show');
      passwordStrength.classList.add('show');
    });

    passwordInput.addEventListener('input', function() {
      updatePasswordRequirements(this.value);
      updatePasswordStrength(this.value);
    });

    passwordInput.addEventListener('blur', function() {
      if (!this.value) {
        passwordRequirements.classList.remove('show');
        passwordStrength.classList.remove('show');
      }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous messages
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        isValid = false;
      } else if (!validateName(nameInput.value)) {
        nameError.textContent = 'Name must be at least 3 characters long';
        nameError.classList.add('show');
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.add('success');
      }

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

      // Validate phone
      if (!phoneInput.value.trim()) {
        phoneError.textContent = 'Phone number is required';
        phoneError.classList.add('show');
        phoneInput.classList.add('error');
        isValid = false;
      } else if (!validatePhone(phoneInput.value)) {
        phoneError.textContent = 'Please enter a valid phone number';
        phoneError.classList.add('show');
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.add('success');
      }

      // Validate password
      const passwordReq = validatePassword(passwordInput.value);
      const allRequirementsMet = Object.values(passwordReq).every(Boolean);

      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        isValid = false;
      } else if (!allRequirementsMet) {
        passwordError.textContent = 'Password does not meet all requirements';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        isValid = false;
      } else {
        passwordInput.classList.add('success');
      }

      // Validate confirm password
      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPasswordError.classList.add('show');
        confirmPasswordInput.classList.add('error');
        isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.classList.add('show');
        confirmPasswordInput.classList.add('error');
        isValid = false;
      } else {
        confirmPasswordInput.classList.add('success');
      }

      // Validate terms
      if (!termsCheckbox.checked) {
        termsError.classList.add('show');
        isValid = false;
      }

      if (!isValid) return;

      // Simulate signup process
      signupBtn.classList.add('loading');
      signupBtn.disabled = true;
      signupBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Creating Account...';

      setTimeout(() => {
        // Store user data (in real app, send to backend)
        const donor = {
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          password: passwordInput.value,
          joinDate: new Date().toLocaleDateString()
        };

        // Save to localStorage (for demo purposes)
        let donors = JSON.parse(localStorage.getItem('donors')) || [];
        
        // Check if email already exists
        if (donors.some(d => d.email === donor.email)) {
          errorMessage.style.display = 'block';
          document.getElementById('errorText').textContent = 'This email is already registered';
          signupBtn.classList.remove('loading');
          signupBtn.disabled = false;
          signupBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
          return;
        }

        donors.push(donor);
        localStorage.setItem('donors', JSON.stringify(donors));

        // Show success message
        successMessage.style.display = 'block';
        document.getElementById('successText').textContent = `Welcome ${donor.name}! Your account has been created successfully. Redirecting to login...`;

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = 'donor-login.html';
        }, 2000);
      }, 1500);
    });

    // Load existing donors for demo (optional)
    window.addEventListener('load', function() {
      if (!localStorage.getItem('donors')) {
        const sampleDonors = [
          {
            name: 'John Doe',
            email: 'donor@example.com',
            phone: '+91 98765 43210',
            password: 'password123',
            joinDate: '01/01/2025'
          },
          {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+91 87654 32109',
            password: 'password456',
            joinDate: '02/01/2025'
          }
        ];
        localStorage.setItem('donors', JSON.stringify(sampleDonors));
      }
    });

    // Enter key to submit form
    confirmPasswordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        signupForm.dispatchEvent(new Event('submit'));
      }
    });