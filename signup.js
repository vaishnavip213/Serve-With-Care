// Simple form validation on submit
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const confirmPassword = this['confirm-password'].value.trim();
  
    if (!name) {
      alert('Please enter your full name.');
      this.name.focus();
      return;
    }
  
    if (!email) {
      alert('Please enter your email.');
      this.email.focus();
      return;
    }
  
    // Basic email pattern check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      this.email.focus();
      return;
    }
  
    if (!password) {
      alert('Please create a password.');
      this.password.focus();
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      this['confirm-password'].focus();
      return;
    }
  
    // TODO: Add real registration logic here
    alert('Signup successful (dummy)');

    
  
    // Reset form
    this.reset();
  });
  