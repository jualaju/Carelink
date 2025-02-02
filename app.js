// DOM Elements
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const contrastBtn = document.getElementById('contrastBtn');
const languageSelect = document.getElementById('languageSelect');
const sosButton = document.getElementById('sosButton');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Font Size Control
fontSizeSlider.addEventListener('input', () => {
    const size = fontSizeSlider.value;
    document.body.style.fontSize = `${size}px`;
    fontSizeValue.textContent = `${size}px`;
    localStorage.setItem('fontSize', size);
});

// Load saved font size preference
document.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        fontSizeSlider.value = savedFontSize;
        document.body.style.fontSize = `${savedFontSize}px`;
        fontSizeValue.textContent = `${savedFontSize}px`;
    }
});

// Update the contrast toggle functionality
contrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Toggle icons
    if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    } else {
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    }
});

// Language Selection
languageSelect.addEventListener('change', (e) => {
    // In a real application, this would trigger language change
    console.log(`Language changed to: ${e.target.value}`);
});

// SOS Button Functionality
sosButton.addEventListener('click', () => {
    const confirmEmergency = confirm('Do you want to trigger an emergency alert? This will contact your emergency contacts and emergency services if necessary.');
    
    if (confirmEmergency) {
        // In a real application, this would trigger emergency protocols
        alert('Emergency services have been notified. Help is on the way.');
        // Here you would typically:
        // 1. Contact emergency services
        // 2. Send notifications to emergency contacts
        // 3. Share user's location
        // 4. Trigger any connected medical alert systems
    }
});

// Simulated User Data
const userData = {
    name: "John Doe",
    medications: [
        { name: "Blood Pressure Med", time: "14:00" },
        { name: "Vitamin D", time: "09:00" }
    ],
    appointments: [
        { doctor: "Dr. Smith", time: "Tomorrow 10:00 AM" }
    ]
};

// Update Dashboard with User Data
function updateDashboard() {
    const welcomeMessage = document.querySelector('.dashboard-section h1');
    welcomeMessage.textContent = `Welcome, ${userData.name}`;
}

// Check for Medication Times
function checkMedications() {
    const currentTime = new Date();
    userData.medications.forEach(med => {
        const medTime = new Date();
        const [hours, minutes] = med.time.split(':');
        medTime.setHours(hours, minutes);

        if (Math.abs(currentTime - medTime) < 300000) { // Within 5 minutes
            showNotification(`Time to take ${med.name}`);
        }
    });
}

// Browser Notification
function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    setInterval(checkMedications, 60000); // Check every minute
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 