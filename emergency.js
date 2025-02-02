document.addEventListener('DOMContentLoaded', () => {
    // Get user's location and find nearby hospitals
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findNearbyHospitals, handleLocationError);
    }

    // SOS Button functionality
    const sosButton = document.getElementById('sosButton');
    sosButton.addEventListener('click', handleEmergency);
});

function findNearbyHospitals(position) {
    const { latitude, longitude } = position.coords;
    
    // In a real application, you would:
    // 1. Call a backend API that interfaces with Google Places API or similar
    // 2. Get a list of nearby hospitals
    // 3. Sort them by distance
    // 4. Display them in the nearbyHospitals div

    // For demonstration, we'll add some sample hospitals
    const hospitals = [
        {
            name: "City General Hospital",
            distance: "1.2",
            phone: "+1234567890"
        },
        {
            name: "Medical Center",
            distance: "2.5",
            phone: "+1234567891"
        },
        {
            name: "Emergency Care Hospital",
            distance: "3.0",
            phone: "+1234567892"
        }
    ];

    displayHospitals(hospitals);
}

function displayHospitals(hospitals) {
    const container = document.getElementById('nearbyHospitals');
    container.innerHTML = '';

    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.className = 'hospital-info';
        hospitalDiv.innerHTML = `
            <h3>${hospital.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${hospital.distance} km away</p>
            <a href="tel:${hospital.phone}" class="call-button">
                <i class="fas fa-phone"></i> Call Now
            </a>
            <button class="direction-button" onclick="getDirections('${hospital.name}')">
                <i class="fas fa-directions"></i> Get Directions
            </button>
        `;
        container.appendChild(hospitalDiv);
    });
}

function handleLocationError(error) {
    console.error('Error getting location:', error);
    showNotification('Unable to get your location. Please enter it manually.');
}

function handleEmergency() {
    // Show emergency dialog
    if (confirm('Do you want to call emergency services?')) {
        // Call the most appropriate emergency number based on user's location
        window.location.href = 'tel:102';
    }
}

function getDirections(hospitalName) {
    // Open Google Maps with directions to the hospital
    // In a real application, you would use the actual coordinates
    const encodedHospital = encodeURIComponent(hospitalName);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedHospital}`, '_blank');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: #ff6b6b;
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 