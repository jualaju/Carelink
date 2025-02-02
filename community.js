document.addEventListener('DOMContentLoaded', () => {
    const eventsList = document.getElementById('eventsList');
    const newPostBtn = document.getElementById('newPostBtn');
    const postForm = document.getElementById('postForm');
    const createPostForm = document.getElementById('createPostForm');
    const cancelPostBtn = document.getElementById('cancelPost');
    const locationSelect = document.getElementById('locationSelect');
    const useLocationBtn = document.getElementById('useLocation');

    // Sample events data
    let events = [
        {
            id: 1,
            title: "Free Health Checkup Camp",
            category: "health-checkup",
            date: "2024-02-15",
            location: "City Community Center",
            description: "Comprehensive health screening including blood pressure, diabetes, and general health checkup.",
            contact: "Dr. Smith - 555-0123",
            distance: 2.5
        },
        {
            id: 2,
            title: "Senior Citizens' Vaccination Drive",
            category: "vaccination",
            date: "2024-02-20",
            location: "Central Hospital",
            description: "Free flu vaccinations for senior citizens. Please bring ID proof.",
            contact: "Nurse Johnson - 555-0124",
            distance: 3.8
        },
        {
            id: 3,
            title: "Diabetes Awareness Camp",
            category: "awareness",
            date: "2024-02-25",
            location: "Public Library",
            description: "Learn about diabetes prevention, management, and healthy lifestyle choices.",
            contact: "Dr. Patel - 555-0125",
            distance: 1.2
        }
    ];

    function renderEvents(filteredEvents = events) {
        eventsList.innerHTML = '';
        filteredEvents.forEach(event => {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
        });
    }

    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-header">
                <h3>${event.title}</h3>
                <span class="event-category ${event.category}">${formatCategory(event.category)}</span>
            </div>
            <div class="event-details">
                <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location} (${event.distance} km away)</p>
                <p><i class="fas fa-info-circle"></i> ${event.description}</p>
                <p><i class="fas fa-phone"></i> ${event.contact}</p>
            </div>
            <div class="event-actions">
                <button onclick="addToCalendar('${event.id}')" class="action-btn">
                    <i class="fas fa-calendar-plus"></i> Add to Calendar
                </button>
                <button onclick="shareEvent('${event.id}')" class="action-btn">
                    <i class="fas fa-share-alt"></i> Share
                </button>
            </div>
        `;
        return card;
    }

    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Event Listeners
    newPostBtn.addEventListener('click', () => {
        postForm.style.display = 'block';
    });

    cancelPostBtn.addEventListener('click', () => {
        postForm.style.display = 'none';
        createPostForm.reset();
    });

    createPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEvent = {
            id: events.length + 1,
            title: document.getElementById('eventTitle').value,
            category: document.getElementById('eventCategory').value,
            date: document.getElementById('eventDate').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            contact: document.getElementById('contactInfo').value,
            distance: calculateDistance() // This would need actual geolocation
        };
        events.unshift(newEvent);
        renderEvents();
        postForm.style.display = 'none';
        createPostForm.reset();
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            const filteredEvents = category === 'all' ? 
                events : 
                events.filter(event => event.category === category);
            renderEvents(filteredEvents);
        });
    });

    locationSelect.addEventListener('change', () => {
        const range = locationSelect.value;
        let filteredEvents = events;
        if (range === 'nearby') {
            filteredEvents = events.filter(event => event.distance <= 5);
        } else if (range === 'city') {
            filteredEvents = events.filter(event => event.distance <= 15);
        }
        renderEvents(filteredEvents);
    });

    useLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateLocation);
        }
    });

    // Initialize the events list
    renderEvents();
});

// Global functions for event actions
window.addToCalendar = function(eventId) {
    // Add calendar functionality
    alert('Event will be added to your calendar');
};

window.shareEvent = function(eventId) {
    // Add sharing functionality
    alert('Sharing options will be shown');
}; 