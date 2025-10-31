let ngoData = {
      name: 'Food For All Foundation',
      email: 'ngo@example.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      state: 'Maharashtra',
      regNumber: 'NGO-2024-001',
      joinDate: 'January 2025',
      description: 'Working to eliminate hunger'
    };

    let beneficiaries = [];
    let donations = [];
    let foodNeeds = [];

    // Initialize
    window.addEventListener('load', function() {
      loadNGOProfile();
      updateStats();
      setupMenuListeners();
    });

    function loadNGOProfile() {
      const ngo = JSON.parse(sessionStorage.getItem('ngoData')) || ngoData;
      document.getElementById('ngoName').textContent = 'Welcome, ' + ngo.name;
      document.getElementById('profileOrgName').textContent = ngo.name;
      document.getElementById('profileRegNumber').textContent = ngo.regNumber;
      document.getElementById('profileLocation').textContent = ngo.city + ', ' + ngo.state;
      document.getElementById('profileContactName').textContent = 'Admin';
      document.getElementById('profileEmail').textContent = ngo.email;
      document.getElementById('profilePhone').textContent = ngo.phone;
      document.getElementById('profileMemberSince').textContent = ngo.joinDate;
    }

    function setupMenuListeners() {
      document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const section = this.getAttribute('data-section');
          toggleSection(section);
          
          document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

    function toggleSection(sectionId) {
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(sectionId).classList.add('active');
    }

    function updateStats() {
      document.getElementById('totalBeneficiaries').textContent = beneficiaries.length;
      document.getElementById('totalDonationsCount').textContent = donations.length;
      document.getElementById('activeFoodNeeds').textContent = foodNeeds.filter(n => !n.fulfilled).length;
      
      const totalPeople = beneficiaries.reduce((sum, b) => sum + (parseInt(b.familySize) || 0), 0);
      document.getElementById('totalImpact').textContent = totalPeople * beneficiaries.length;
      
      document.getElementById('monthlyBeneficiaries').textContent = beneficiaries.length;
      document.getElementById('foodDistributed').textContent = donations.reduce((sum, d) => sum + (parseFloat(d.quantity) || 0), 0).toFixed(1);
      document.getElementById('donationsProcessed').textContent = donations.length;
      
      const avgFamily = beneficiaries.length > 0 ? (totalPeople / beneficiaries.length).toFixed(1) : 0;
      document.getElementById('avgFamilySize').textContent = avgFamily;
      document.getElementById('mealsProvided').textContent = (totalPeople * 3).toLocaleString();
      document.getElementById('peopleHelped').textContent = totalPeople;
      
      updateRecentLists();
    }

    function updateRecentLists() {
      // Recent Beneficiaries
      const recentBeneficiaries = beneficiaries.slice(-3).reverse();
      if (recentBeneficiaries.length > 0) {
        document.getElementById('recentBeneficiaries').innerHTML = recentBeneficiaries.map(b => `
          <div style="padding: 0.8rem; border-bottom: 1px solid #e0e0e0; font-size: 0.9rem;">
            <p style="color: #333; font-weight: bold; margin-bottom: 0.3rem;">${b.name}</p>
            <p style="color: #666;">Family: ${b.familySize} | ${b.category}</p>
          </div>
        `).join('');
      } else {
        document.getElementById('recentBeneficiaries').innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><p>No beneficiaries yet</p></div>`;
      }

      // Recent Donations
      const recentDonations = donations.slice(-3).reverse();
      if (recentDonations.length > 0) {
        document.getElementById('recentDonations').innerHTML = recentDonations.map(d => `
          <div style="padding: 0.8rem; border-bottom: 1px solid #e0e0e0; font-size: 0.9rem;">
            <p style="color: #333; font-weight: bold; margin-bottom: 0.3rem;">${d.foodType}</p>
            <p style="color: #666;">${d.quantity} kg | ${new Date(d.date).toLocaleDateString()}</p>
          </div>
        `).join('');
      } else {
        document.getElementById('recentDonations').innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><p>No donations yet</p></div>`;
      }
    }

    function updateBeneficiariesTable() {
      const tbody = document.getElementById('beneficiariesBody');
      if (beneficiaries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-state"><i class="fas fa-inbox"></i><p>No beneficiaries registered yet</p></td></tr>`;
        return;
      }

      tbody.innerHTML = beneficiaries.map((b, i) => `
        <tr>
          <td>${b.name}</td>
          <td>${b.familySize}</td>
          <td>${b.phone}</td>
          <td>${b.category}</td>
          <td><span class="status-badge status-active">Active</span></td>
          <td>
            <div class="action-buttons">
              <button class="btn-view" onclick="viewBeneficiary(${i})">View</button>
              <button class="btn-delete" onclick="deleteBeneficiary(${i})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    function updateDonationsCards() {
      const container = document.getElementById('donationsCards');
      if (donations.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-inbox"></i><p>No donations received yet</p></div>`;
        return;
      }

      container.innerHTML = donations.map((d, i) => `
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">${d.foodType}</div>
              <p style="font-size: 0.9rem; color: #999; margin-top: 0.3rem;">${new Date(d.date).toLocaleDateString()}</p>
            </div>
            <span class="card-tag">${d.quantity} kg</span>
          </div>
          <div class="card-content">
            <p>From: ${d.donorName}</p>
            <p style="margin-top: 0.5rem; margin-bottom: 0.5rem;">Servings: ${d.servings}</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
              <button class="btn-view" onclick="acceptDonation(${i})" style="flex: 1;">Accept</button>
              <button class="btn-delete" onclick="rejectDonation(${i})" style="flex: 1;">Reject</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function updateFoodNeedsCards() {
      const container = document.getElementById('foodNeedsCards');
      if (foodNeeds.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-inbox"></i><p>No food needs scheduled yet</p></div>`;
        return;
      }

      container.innerHTML = foodNeeds.map((n, i) => `
        <div class="card" style="border-left: 4px solid ${n.urgency === 'Critical' ? '#f44336' : n.urgency === 'High' ? '#ff9800' : '#4caf50'};">
          <div class="card-header">
            <div>
              <div class="card-title">${n.foodType}</div>
              <p style="font-size: 0.9rem; color: #999; margin-top: 0.3rem;">${new Date(n.date).toLocaleDateString()}</p>
            </div>
            <span class="card-tag" style="background-color: ${n.urgency === 'Critical' ? '#ffebee' : n.urgency === 'High' ? '#fff3e0' : '#e8f5e9'}; color: ${n.urgency === 'Critical' ? '#c62828' : n.urgency === 'High' ? '#e65100' : '#2e7d32'};">${n.urgency}</span>
          </div>
          <div class="card-content">
            <p>${n.quantity} kg for ${n.people} people</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">${n.description || 'No additional details'}</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
              <button class="btn-view" onclick="viewFoodNeed(${i})" style="flex: 1;">Details</button>
              <button class="btn-delete" onclick="deleteFoodNeed(${i})" style="flex: 1;">Delete</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function openBeneficiaryModal() {
      document.getElementById('beneficiaryModal').classList.add('active');
    }

    function closeBeneficiaryModal() {
      document.getElementById('beneficiaryModal').classList.remove('active');
      document.getElementById('beneficiaryForm').reset();
    }

    function openFoodNeedModal() {
      document.getElementById('foodNeedModal').classList.add('active');
    }

    function closeFoodNeedModal() {
      document.getElementById('foodNeedModal').classList.remove('active');
      document.getElementById('foodNeedForm').reset();
    }

    // Beneficiary Form Submission
    document.getElementById('beneficiaryForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const beneficiary = {
        name: document.getElementById('benName').value,
        age: document.getElementById('benAge').value,
        familySize: document.getElementById('benFamilySize').value,
        phone: document.getElementById('benPhone').value,
        category: document.getElementById('benCategory').value,
        address: document.getElementById('benAddress').value,
        dietaryNeeds: document.getElementById('benDietaryNeeds').value
      };

      beneficiaries.push(beneficiary);
      closeBeneficiaryModal();
      
      document.getElementById('beneficiarySuccess').classList.add('show');
      setTimeout(() => document.getElementById('beneficiarySuccess').classList.remove('show'), 3000);
      
      updateStats();
      updateBeneficiariesTable();
    });

    // Food Need Form Submission
    document.getElementById('foodNeedForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const foodNeed = {
        date: document.getElementById('foodDate').value,
        quantity: document.getElementById('foodQuantity').value,
        people: document.getElementById('foodPeople').value,
        foodType: document.getElementById('foodType').value,
        description: document.getElementById('foodDescription').value,
        urgency: document.getElementById('foodUrgency').value,
        fulfilled: false,
        createdDate: new Date().toISOString()
      };

      foodNeeds.push(foodNeed);
      closeFoodNeedModal();
      
      document.getElementById('foodNeedSuccess').classList.add('show');
      setTimeout(() => document.getElementById('foodNeedSuccess').classList.remove('show'), 3000);
      
      updateStats();
      updateFoodNeedsCards();
    });

    function deleteBeneficiary(index) {
      if (confirm('Are you sure you want to delete this beneficiary?')) {
        beneficiaries.splice(index, 1);
        updateStats();
        updateBeneficiariesTable();
      }
    }

    function deleteFoodNeed(index) {
      if (confirm('Are you sure you want to delete this food need?')) {
        foodNeeds.splice(index, 1);
        updateStats();
        updateFoodNeedsCards();
      }
    }

    function acceptDonation(index) {
      donations[index].accepted = true;
      updateDonationsCards();
      alert('Donation accepted! Thank you.');
    }

    function rejectDonation(index) {
      if (confirm('Are you sure you want to reject this donation?')) {
        donations.splice(index, 1);
        updateDonationsCards();
      }
    }

    function logout() {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'role-selection.html';
      }
    }

    // Simulate incoming donations
    setInterval(() => {
      if (Math.random() > 0.8 && donations.length < 10) {
        const foodTypes = ['Rice & Grains', 'Vegetables', 'Fruits', 'Cooked Meals', 'Dairy'];
        const donation = {
          foodType: foodTypes[Math.floor(Math.random() * foodTypes.length)],
          quantity: (Math.random() * 20 + 5).toFixed(1),
          servings: Math.floor(Math.random() * 50 + 10),
          donorName: 'Anonymous Donor',
          date: new Date().toISOString(),
          accepted: false
        };
        donations.push(donation);
        updateStats();
        updateDonationsCards();
      }
    }, 15000);