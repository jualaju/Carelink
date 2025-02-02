document.addEventListener('DOMContentLoaded', () => {
    const tours = [
        // Monuments
        {
            id: 1,
            title: "Taj Mahal, Agra",
            description: "Experience the majestic beauty of the Taj Mahal, one of the world's most iconic monuments.",
            videoId: "HrYBj0kWgdg",
            thumbnail: "images/taj-mahal.jpg",
            duration: "15:00",
            category: "monuments",
            views: "125K"
        },
        {
            id: 2,
            title: "Qutub Minar, Delhi",
            description: "Explore the historic Qutub Minar complex in Delhi.",
            videoId: "qKFF4HhYg6k",
            thumbnail: "images/qutub-minar.jpg",
            duration: "12:00",
            category: "monuments",
            views: "82K"
        },

        // Temples
        {
            id: 3,
            title: "Golden Temple, Amritsar",
            description: "Take a spiritual journey through the serene Golden Temple.",
            videoId: "JJXwlbGqzm4",
            thumbnail: "images/golden-temple.jpg",
            duration: "12:30",
            category: "temples",
            views: "98K"
        },
        {
            id: 4,
            title: "Meenakshi Temple, Madurai",
            description: "Discover the colorful and intricate architecture of Meenakshi Temple.",
            videoId: "zYcBIqbWNyY",
            thumbnail: "images/meenakshi-temple.jpg",
            duration: "18:00",
            category: "temples",
            views: "65K"
        },

        // Nature
        {
            id: 5,
            title: "Valley of Flowers",
            description: "Explore the breathtaking Valley of Flowers in Uttarakhand.",
            videoId: "7LXF5cCKZRw",
            thumbnail: "images/valley-flowers.jpg",
            duration: "10:15",
            category: "nature",
            views: "75K"
        },
        {
            id: 6,
            title: "Kaziranga National Park",
            description: "Watch the majestic one-horned rhinoceros in their natural habitat.",
            videoId: "kQDwh7Qr9Zk",
            thumbnail: "images/kaziranga.jpg",
            duration: "14:30",
            category: "nature",
            views: "55K"
        },
        {
            id: 7,
            title: "Thar Desert, Rajasthan",
            description: "Experience the golden sands and desert life of Rajasthan.",
            videoId: "dK5GCKFvrHw",
            thumbnail: "images/thar-desert.jpg",
            duration: "16:45",
            category: "nature",
            views: "48K"
        },

        // Museums
        {
            id: 8,
            title: "National Museum, Delhi",
            description: "Discover India's rich cultural heritage at the National Museum.",
            videoId: "p-rqmXsKQYg",
            thumbnail: "images/national-museum.jpg",
            duration: "20:00",
            category: "museums",
            views: "45K"
        },
        {
            id: 9,
            title: "Salar Jung Museum, Hyderabad",
            description: "Explore one of the largest one-man collections of antiques.",
            videoId: "XYZ123abc",
            thumbnail: "images/salar-jung.jpg",
            duration: "22:15",
            category: "museums",
            views: "38K"
        },
        {
            id: 10,
            title: "Victoria Memorial, Kolkata",
            description: "Tour the magnificent Victoria Memorial and its museum collections.",
            videoId: "DEF456ghi",
            thumbnail: "images/victoria-memorial.jpg",
            duration: "19:30",
            category: "museums",
            views: "42K"
        }
    ];

    function initializeTours() {
        renderTourGrid(tours);
        setupEventListeners();
        addSearchFunctionality();
    }

    function renderTourGrid(toursToShow) {
        const tourGrid = document.getElementById('tourGrid');
        tourGrid.innerHTML = '';

        toursToShow.forEach(tour => {
            const tourCard = createTourCard(tour);
            tourGrid.appendChild(tourCard);
        });
    }

    function createTourCard(tour) {
        const div = document.createElement('div');
        div.className = 'tour-card';
        div.innerHTML = `
            <div class="tour-thumbnail">
                <img src="${tour.thumbnail}" alt="${tour.title}">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="tour-card-info">
                <h3>${tour.title}</h3>
                <p>${tour.description}</p>
                <div class="tour-meta">
                    <div class="tour-duration">
                        <i class="fas fa-clock"></i>
                        ${tour.duration}
                    </div>
                    <div class="tour-views">
                        <i class="fas fa-eye"></i>
                        ${tour.views} views
                    </div>
                </div>
            </div>
        `;
        div.addEventListener('click', () => playTour(tour));
        return div;
    }

    function playTour(tour) {
        // Update featured video
        document.getElementById('featuredVideo').src = `https://www.youtube.com/embed/${tour.videoId}`;
        document.getElementById('featuredTitle').textContent = tour.title;
        document.getElementById('featuredDescription').textContent = tour.description;

        // Scroll to featured video
        document.querySelector('.featured-tour').scrollIntoView({ behavior: 'smooth' });
    }

    function setupEventListeners() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter tours
                const category = btn.dataset.category;
                const filteredTours = category === 'all' ? 
                    tours : 
                    tours.filter(tour => tour.category === category);
                renderTourGrid(filteredTours);
            });
        });
    }

    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchTours" placeholder="Search tours...">
            <button id="searchBtn"><i class="fas fa-search"></i></button>
        `;

        const tourCategories = document.querySelector('.tour-categories');
        tourCategories.parentNode.insertBefore(searchContainer, tourCategories);

        const searchInput = document.getElementById('searchTours');
        const searchBtn = document.getElementById('searchBtn');

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredTours = tours.filter(tour => 
                tour.title.toLowerCase().includes(searchTerm) ||
                tour.description.toLowerCase().includes(searchTerm)
            );
            renderTourGrid(filteredTours);
        }

        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        searchBtn.addEventListener('click', performSearch);
    }

    // Initialize the virtual tours
    initializeTours();
}); 