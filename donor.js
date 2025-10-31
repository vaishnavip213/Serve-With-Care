// Initialize dashboard
    let donations = [];
    let donorProfile = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      memberSince: 'January 2025'
    };

    // Set today's date as default
    document.getElementById('donationDate').valueAsDate = new Date();

    // Load donor profile
    function loadProfile() {
      document.getElementById('donorName').textContent = 'Welcome, ' + donorProfile.name;
      document.getElementById('profileName').textContent = donorProfile.name;
      document.getElementById('profileEmail').textContent = donorProfile.email;
      document.getElementById('profilePhone').textContent = donorProfile.phone;
      document.getElementById('memberSince').textContent = donorProfile.memberSince;
    }

    // Update stats
    function updateStats() {
      const totalDonations = donations.length;
      const totalServings = donations.reduce((sum, d) => sum + d.servings, 0);
      const impactPoints = totalDonations * 10 + totalServings * 2;

      document.getElementById('totalDonations').textContent = totalDonations;
      document.getElementById('peopleServed').textContent = totalServings;
      document.getElementById('impactPoints').textContent = impactPoints;

      // Calculate monthly stats
      const now = new Date();
      const monthlyDonations = donations.filter(d => {
        const donationDate = new Date(d.date);
        return donationDate.getMonth() === now.getMonth() && 
               donationDate.getFullYear() === now.getFullYear();
      });
      document.getElementById('monthlyDonations').textContent = monthlyDonations.length;
      document.getElementById('monthlyPeople').textContent = monthlyDonations.reduce((sum, d) => sum + d.servings, 0);
    }

    // Update donations table
    function updateDonationsTable() {
      const tbody = document.getElementById('donationsTableBody');
      
      if (donations.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" class="empty-state">
              <i class="fas fa-inbox"></i>
              <p>No donations yet. Make your first donation!</p>
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = donations.map(donation => `
        <tr>
          <td>${donation.foodType}</td>
          <td>${donation.quantity} kg</td>
          <td>${donation.servings}</td>
          <td>${new Date(donation.date).toLocaleDateString()}</td>
          <td><span class="status-badge status-${donation.status.toLowerCase()}">${donation.status}</span></td>
        </tr>
      `).reverse().join('');
    }

    // Handle form submission
    document.getElementById('donationForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const donation = {
        foodType: document.getElementById('foodType').value,
        quantity: parseFloat(document.getElementById('quantity').value),
        servings: parseInt(document.getElementById('servings').value),
        description: document.getElementById('description').value,
        date: document.getElementById('donationDate').value,
        pickupTime: document.getElementById('pickupTime').value,
        location: document.getElementById('location').value,
        status: 'Pending'
      };

      donations.push(donation);
      
      // Show success message
      const successMsg = document.getElementById('successMessage');
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 3000);

      // Reset form
      this.reset();
      document.getElementById('donationDate').valueAsDate = new Date();

      // Update dashboard
      updateStats();
      updateDonationsTable();
    });

    // Logout function
    function logout() {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'login.html';
      }
    }

    // Initialize on page load
    window.addEventListener('load', function() {
      loadProfile();
      updateStats();
      updateDonationsTable();
    });

    // Simulate status updates (for demo purposes)
    setInterval(() => {
      donations.forEach(donation => {
        if (donation.status === 'Pending') {
          const randomChance = Math.random();
          if (randomChance > 0.8) {
            donation.status = 'Delivered';
          }
        }
      });
      updateDonationsTable();
    }, 30000);