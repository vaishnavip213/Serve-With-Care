// DOM Elements
    const profileForm = document.getElementById('profileForm');
    const orgNameInput = document.getElementById('orgName');
    const regNumberInput = document.getElementById('regNumber');
    const memberSinceInput = document.getElementById('memberSince');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const descriptionInput = document.getElementById('description');
    const contactNameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Error elements
    const orgNameError = document.getElementById('orgNameError');
    const regNumberError = document.getElementById('regNumberError');
    const memberSinceError = document.getElementById('memberSinceError');
    const cityError = document.getElementById('cityError');
    const stateError = document.getElementById('stateError');
    const descriptionError = document.getElementById('descriptionError');
    const contactNameError = document.getElementById('contactNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    // Clear error on focus
    [orgNameInput, regNumberInput, memberSinceInput, cityInput, stateInput, descriptionInput,
     contactNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
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
    function validateOrgName(name) {
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
      return password.length >= 8;
    }

    // Form submission
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous messages
      errorMessage.style.display = 'none';
      successMessage.style.display = 'none';

      let isValid = true;

      // Validate org name
      if (!orgNameInput.value.trim()) {
        orgNameError.textContent = 'Organization name is required';
        orgNameError.classList.add('show');
        orgNameInput.classList.add('error');
        isValid = false;
      } else if (!validateOrgName(orgNameInput.value)) {
        orgNameError.textContent = 'Organization name must be at least 3 characters';
        orgNameError.classList.add('show');
        orgNameInput.classList.add('error');
        isValid = false;
      } else {
        orgNameInput.classList.add('success');
      }

      // Validate registration number
      if (!regNumberInput.value.trim()) {
        regNumberError.textContent = 'Registration number is required';
        regNumberError.classList.add('show');
        regNumberInput.classList.add('error');
        isValid = false;
      } else {
        regNumberInput.classList.add('success');
      }

      // Validate member since
      if (!memberSinceInput.value) {
        memberSinceError.textContent = 'Member since date is required';
        memberSinceError.classList.add('show');
        memberSinceInput.classList.add('error');
        isValid = false;
      } else {
        memberSinceInput.classList.add('success');
      }

      // Validate city
      if (!cityInput.value.trim()) {
        cityError.textContent = 'City is required';
        cityError.classList.add('show');
        cityInput.classList.add('error');
        isValid = false;
      } else {
        cityInput.classList.add('success');
      }

      // Validate state
      if (!stateInput.value.trim()) {
        stateError.textContent = 'State is required';
        stateError.classList.add('show');
        stateInput.classList.add('error');
        isValid = false;
      } else {
        stateInput.classList.add('success');
      }

      // Validate description
      if (!descriptionInput.value.trim()) {
        descriptionError.textContent = 'Organization description is required';
        descriptionError.classList.add('show');
        descriptionInput.classList.add('error');
        isValid = false;
      } else if (descriptionInput.value.trim().length < 10) {
        descriptionError.textContent = 'Description must be at least 10 characters';
        descriptionError.classList.add('show');
        descriptionInput.classList.add('error');
        isValid = false;
      } else {
        descriptionInput.classList.add('success');
      }

      // Validate contact name
      if (!contactNameInput.value.trim()) {
        contactNameError.textContent = 'Contact person name is required';
        contactNameError.classList.add('show');
        contactNameInput.classList.add('error');
        isValid = false;
      } else if (contactNameInput.value.trim().length < 3) {
        contactNameError.textContent = 'Name must be at least 3 characters';
        contactNameError.classList.add('show');
        contactNameInput.classList.add('error');
        isValid = false;
      } else {
        contactNameInput.classList.add('success');
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
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        passwordInput.classList.add('error');
        isValid = false;
      } else if (!validatePassword(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters';
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

      // Simulate profile creation
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner spinner"></i> Creating Profile...';

      setTimeout(() => {
        // Store NGO data
        const ngoData = {
          orgName: orgNameInput.value,
          regNumber: regNumberInput.value,
          memberSince: memberSinceInput.value,
          city: cityInput.value,
          state: stateInput.value,
          description: descriptionInput.value,
          contactName: contactNameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          password: passwordInput.value,
          createdDate: new Date().toLocaleDateString()
        };

        // Save to localStorage
        let ngos = JSON.parse(localStorage.getItem('ngos')) || [];
        
        // Check if email already exists
        if (ngos.some(n => n.email === ngoData.email)) {
          errorMessage.style.display = 'block';
          document.getElementById('errorText').textContent = 'This email is already registered';
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Create Profile';
          return;
        }

        ngos.push(ngoData);
        localStorage.setItem('ngos', JSON.stringify(ngos));

        // Show success message
        successMessage.style.display = 'block';
        document.getElementById('successText').textContent = `${ngoData.orgName} profile created successfully! Redirecting to login...`;

        // Redirect to login
        setTimeout(() => {
          window.location.href = 'ngo-login.html';
        }, 2000);
      }, 1500);
    });

    // Load sample NGOs on first load
    window.addEventListener('load', function() {
      if (!localStorage.getItem('ngos')) {
        const sampleNGOs = [
          {
            orgName: 'Food For All Foundation',
            regNumber: 'NGO-2024-001',
            memberSince: '2024-01',
            city: 'Mumbai',
            state: 'Maharashtra',
            description: 'Working to eliminate hunger and provide nutrition to underprivileged communities',
            contactName: 'Rajesh Kumar',
            email: 'ngo@example.com',
            phone: '+91 98765 43210',
            password: 'ngopass123',
            createdDate: '01/01/2025'
          },
          {
            orgName: 'Help Foundation',
            regNumber: 'NGO-2024-002',
            memberSince: '2023-06',
            city: 'Delhi',
            state: 'Delhi',
            description: 'Dedicated to providing food security and welfare services',
            contactName: 'Priya Singh',
            email: 'help@ngo.com',
            phone: '+91 87654 32109',
            password: 'ngo12345',
            createdDate: '15/06/2023'
          }
        ];
        localStorage.setItem('ngos', JSON.stringify(sampleNGOs));
      }
    });

    // Enter key to submit
    confirmPasswordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        profileForm.dispatchEvent(new Event('submit'));
      }
    });