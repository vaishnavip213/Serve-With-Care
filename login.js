
// Simple form validation on submit
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
document.getElementById("loginBtn").addEventListener("click", () => {
alert("Logging in...");
});
    const email = this.email.value.trim();
    const password = this.password.value.trim();
  
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
      alert('Please enter your password.');
      this.password.focus();
      return;
    }
  
    // TODO: Add real authentication here
    alert('Login successful (dummy)');
  
    // Reset form
    this.reset();
  });