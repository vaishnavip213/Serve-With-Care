let donationsData = [
    {
        id: 1,
        date: '2024-09-15',
        amount: 500,
        type: 'Money',
        recipients: 10,
        status: 'completed'
    },
    {
        id: 2,
        date: '2024-09-12',
        amount: 300,
        type: 'Food',
        recipients: 8,
        status: 'completed'
    },
    {
        id: 3,
        date: '2024-09-10',
        amount: 750,
        type: 'Both',
        recipients: 15,
        status: 'processing'
    },
    {
        id: 4,
        date: '2024-09-08',
        amount: 400,
        type: 'Money',
        recipients: 12,
        status: 'pending'
    }
];

let recipientsData = [
    {
        id: 1,
        name: 'Ramesh Kumar',
        location: 'Andheri, Mumbai',
        meals: 15,
        lastHelped: '2024-09-15'
    },
    {
        id: 2,
        name: 'Sunita Sharma',
        location: 'Dharavi, Mumbai',
        meals: 23,
        lastHelped: '2024-09-14'
    },
    {
        id: 3,
        name: 'Mohammad Ali',
        location: 'Kurla, Mumbai',
        meals: 12,
        lastHelped: '2024-09-12'
    },
    {
        id: 4,
        name: 'Priya Singh',
        location: 'Bandra, Mumbai',
        meals: 18,
        lastHelped: '2024-09-11'
    }
];

let activityData = [
    {
        type: 'donation',
        title: 'New Donation',
        description: 'You donated ₹500 to help 10 people',
        time: '2 hours ago'
    },
    {
        type: 'delivery',
        title: 'Food Delivered',
        description: 'Your donation reached 8 recipients',
        time: '1 day ago'
    },
    {
        type: 'thank',
        title: 'Thank You Note',
        description: 'Received thanks from Ramesh Kumar',
        time: '2 days ago'
    },
    {
        type: 'milestone',
        title: 'Milestone Achieved',
        description: 'You have helped 45+ people!',
        time: '3 days ago'
    }
];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupModal();
    setupForms();
    updateDashboard();
    renderDonationsTable();
    renderRecipients();
    renderActivity();
}

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Modal setup
function setupModal() {
    const donateBtn = document.getElementById('donateBtn');
    const modal = document.getElementById('donationModal');
    const modalClose = document.getElementById('modalClose');

    donateBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });

    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Forms setup
function setupForms() {
    const donationForm = document.getElementById('donationForm');
    const profileForm = document.getElementById('profileForm');
    const statusFilter = document.getElementById('statusFilter');

    donationForm.addEventListener('submit', handleDonationSubmit);
    profileForm.addEventListener('submit', handleProfileSubmit);
    statusFilter.addEventListener('change', filterDonations);
}

// Handle donation form submission
function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const amount = parseInt(formData.get('amount'));
    const type = formData.get('type');
    const note = formData.get('note');

    // Basic validation
    if (!amount || amount < 50) {
        showNotification('Please enter amount of at least ₹50', 'error');
        return;
    }

    if (!type) {
        showNotification('Please select donation type', 'error');
        return;
    }

    // Create new donation
    const newDonation = {
        id: donationsData.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: amount,
        type: type.charAt(0).toUpperCase() + type.slice(1),
        recipients: Math.floor(amount / 50), // Estimate recipients
        status: 'processing'
    };

    // Add to donations data
    donationsData.unshift(newDonation);

    // Add to activity
    activityData.unshift({
        type: 'donation',
        title: 'New Donation',
        description: `You donated ₹${amount} to help ${newDonation.recipients} people`,
        time: 'Just now'
    });

    // Update displays
    updateDashboard();
    renderDonationsTable();
    renderActivity();

    // Close modal and reset form
    document.getElementById('donationModal').classList.remove('active');
    e.target.reset();

    showNotification('Donation submitted successfully!', 'success');
}

// Handle profile form submission
function handleProfileSubmit(e) {
    e.preventDefault();
    showNotification('Profile updated successfully!', 'success');
}

// Update dashboard statistics
function updateDashboard() {
    const totalDonated = donationsData.reduce((sum, donation) => sum + donation.amount, 0);
    const totalRecipients = donationsData.reduce((sum, donation) => sum + donation.recipients, 0);
    const totalDonations = donationsData.length;
    const monthlyAverage = Math.round(totalDonated / 3); // Assuming 3 months

    document.getElementById('totalDonated').textContent = `₹${totalDonated.toLocaleString()}`;
    document.getElementById('totalRecipients').textContent = totalRecipients;
    document.getElementById('totalDonations').textContent = totalDonations;
    document.getElementById('monthlyAverage').textContent = `₹${monthlyAverage.toLocaleString()}`;
}

// Render donations table
function renderDonationsTable() {
    const tbody = document.getElementById('donationsTableBody');
    
    tbody.innerHTML = donationsData.map(donation => `
        <tr>
            <td>${formatDate(donation.date)}</td>
            <td>₹${donation.amount.toLocaleString()}</td>
            <td>${donation.type}</td>
            <td>${donation.recipients}</td>
            <td>
                <span class="status ${donation.status}">
                    ${donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
            </td>
        </tr>
    `).join('');
}
