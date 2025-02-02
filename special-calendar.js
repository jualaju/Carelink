document.addEventListener('DOMContentLoaded', () => {
    const specialDays = [
        // January
        {
            date: '2024-01-12',
            title: 'National Youth Day',
            category: 'national',
            description: 'Birth anniversary of Swami Vivekananda, celebrating the potential of youth in nation-building.',
            activities: [
                'Youth leadership workshops',
                'Cultural programs',
                'Motivational speeches'
            ],
            resources: [
                'Youth Development Programs',
                'Educational Resources',
                'Career Guidance'
            ]
        },
        {
            date: '2024-01-26',
            title: 'Republic Day',
            category: 'national',
            description: 'Celebrating the adoption of the Constitution of India.',
            activities: [
                'Flag hoisting ceremony',
                'Cultural performances',
                'Community gatherings'
            ],
            resources: [
                'Constitutional Rights',
                'Senior Citizen Benefits',
                'Government Schemes'
            ]
        },

        // February
        {
            date: '2024-02-04',
            title: 'World Cancer Day',
            category: 'medical',
            description: 'A day to raise awareness about cancer prevention, detection, and treatment.',
            activities: [
                'Free cancer screening camps',
                'Educational seminars',
                'Support group meetings'
            ],
            resources: [
                'WHO Cancer Resources',
                'Local Cancer Support Centers',
                'Dietary Guidelines'
            ]
        },
        {
            date: '2024-02-13',
            title: 'World Radio Day',
            category: 'international',
            description: 'Celebrating radio as a way to promote communication and connection among elderly.',
            activities: [
                'Community radio programs',
                'Story sharing sessions',
                'Music appreciation events'
            ],
            resources: [
                'Local Radio Stations',
                'Community Programs',
                'Music Therapy Resources'
            ]
        },
        {
            date: '2024-02-18',
            title: 'Grandparents Day',
            category: 'elderly',
            description: 'A special day to honor and celebrate the love, wisdom, and contributions of grandparents.',
            activities: [
                'Family gatherings',
                'Story-telling sessions',
                'Intergenerational activities',
                'Photo sharing events'
            ],
            resources: [
                'Family Connection Tips',
                'Memory Sharing Activities',
                'Grandparents Rights Information'
            ]
        },

        // March
        {
            date: '2024-03-08',
            title: 'International Women\'s Day',
            category: 'international',
            description: 'Celebrating women\'s achievements and promoting gender equality.',
            activities: [
                'Women\'s health camps',
                'Recognition ceremonies',
                'Empowerment workshops'
            ],
            resources: [
                'Women\'s Health Resources',
                'Support Services',
                'Legal Aid'
            ]
        },
        {
            date: '2024-03-21',
            title: 'World Down Syndrome Day',
            category: 'medical',
            description: 'Raising awareness about Down syndrome and celebrating contributions.',
            activities: [
                'Community gatherings',
                'Educational workshops',
                'Art exhibitions'
            ],
            resources: [
                'Support Groups',
                'Healthcare Guidelines',
                'Family Resources'
            ]
        },

        // April
        {
            date: '2024-04-07',
            title: 'World Health Day',
            category: 'medical',
            description: 'Annual celebration focusing on global health awareness.',
            activities: [
                'Health checkup camps',
                'Fitness workshops',
                'Nutrition seminars'
            ],
            resources: [
                'WHO Resources',
                'Health Guidelines',
                'Local Health Centers'
            ]
        },
        {
            date: '2024-04-11',
            title: 'National Safe Motherhood Day',
            category: 'national',
            description: 'Promoting maternal health and well-being.',
            activities: [
                'Health awareness sessions',
                'Medical checkups',
                'Family counseling'
            ],
            resources: [
                'Maternal Health Guidelines',
                'Healthcare Services',
                'Support Programs'
            ]
        },

        // May
        {
            date: '2024-05-08',
            title: 'World Red Cross Day',
            category: 'international',
            description: 'Honoring the principles of the International Red Cross and Red Crescent Movement.',
            activities: [
                'First aid training',
                'Blood donation camps',
                'Emergency response workshops'
            ],
            resources: [
                'Red Cross Services',
                'Emergency Guidelines',
                'Volunteer Opportunities'
            ]
        },
        {
            date: '2024-05-12',
            title: 'International Nurses Day',
            category: 'medical',
            description: 'Honoring nurses worldwide for their dedication and contributions to healthcare.',
            activities: [
                'Recognition ceremonies',
                'Healthcare awareness programs',
                'Nursing career guidance sessions',
                'Community health camps'
            ],
            resources: [
                'Nursing Career Resources',
                'Healthcare Guidelines',
                'Professional Development Programs'
            ]
        },

        // June
        {
            date: '2024-06-15',
            title: 'World Elder Abuse Awareness Day',
            category: 'elderly',
            description: 'Raising awareness about elder abuse and promoting dignity.',
            activities: [
                'Awareness workshops',
                'Support meetings',
                'Legal aid camps'
            ],
            resources: [
                'Elder Rights Information',
                'Support Helplines',
                'Legal Resources'
            ]
        },
        {
            date: '2024-06-21',
            title: 'International Day of Yoga',
            category: 'international',
            description: 'Promoting physical and mental well-being through yoga.',
            activities: [
                'Yoga sessions for seniors',
                'Meditation workshops',
                'Wellness talks'
            ],
            resources: [
                'Senior Yoga Guidelines',
                'Meditation Resources',
                'Health Benefits'
            ]
        },

        // July
        {
            date: '2024-07-01',
            title: 'National Doctors Day',
            category: 'medical',
            description: 'Celebrating the contribution of doctors to individual lives and communities.',
            activities: [
                'Medical camps',
                'Health awareness sessions',
                'Doctor-patient interaction programs',
                'Healthcare seminars'
            ],
            resources: [
                'Healthcare Directory',
                'Medical Consultation Guidelines',
                'Patient Care Resources'
            ]
        },

        // Continue with existing entries...
        // (Keep all the existing entries from August to December)
        {
            date: '2024-12-01',
            title: 'World AIDS Day',
            category: 'medical',
            description: 'Raising awareness about HIV/AIDS and supporting those affected by it.',
            activities: [
                'Health awareness campaigns',
                'Free HIV testing camps',
                'Support group meetings',
                'Educational workshops'
            ],
            resources: [
                'HIV/AIDS Information',
                'Testing Center Locations',
                'Support Services Directory',
                'Treatment Guidelines'
            ]
        }
    ];

    let currentDate = new Date();
    const modal = document.getElementById('eventModal');
    const closeModal = document.querySelector('.close-modal');

    function renderCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        document.getElementById('currentMonth').textContent = 
            date.toLocaleString('default', { month: 'long', year: 'numeric' });

        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarDays.appendChild(createDayCell(''));
        }

        // Add cells for each day of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const events = specialDays.filter(event => event.date === currentDateString);
            
            const cell = createDayCell(day, events);
            calendarDays.appendChild(cell);
        }

        updateUpcomingEvents();
    }

    function createDayCell(day, events = []) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;

        if (events.length > 0) {
            cell.classList.add('has-event');
            const indicator = document.createElement('div');
            indicator.className = `event-indicator ${events[0].category}`;
            cell.appendChild(indicator);

            cell.addEventListener('click', () => showEventDetails(events[0]));
        }

        return cell;
    }

    function updateUpcomingEvents() {
        const upcomingList = document.getElementById('upcomingList');
        upcomingList.innerHTML = '';

        const today = new Date();
        const upcoming = specialDays
            .filter(event => new Date(event.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        upcoming.forEach(event => {
            const eventElement = createUpcomingEventElement(event);
            upcomingList.appendChild(eventElement);
        });
    }

    function createUpcomingEventElement(event) {
        const div = document.createElement('div');
        div.className = 'upcoming-event';
        div.innerHTML = `
            <div class="event-date">
                <span class="date">${new Date(event.date).getDate()}</span>
                <span class="month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        div.addEventListener('click', () => showEventDetails(event));
        return div;
    }

    function showEventDetails(event) {
        document.getElementById('modalTitle').textContent = event.title;
        document.getElementById('modalDescription').textContent = event.description;
        
        const activitiesHtml = `
            <h3>Activities:</h3>
            <ul>${event.activities.map(activity => `<li>${activity}</li>`).join('')}</ul>
        `;
        
        const resourcesHtml = `
            <h3>Resources:</h3>
            <ul>${event.resources.map(resource => `<li>${resource}</li>`).join('')}</ul>
        `;

        document.getElementById('modalActivities').innerHTML = activitiesHtml;
        document.getElementById('modalResources').innerHTML = resourcesHtml;
        
        modal.style.display = 'block';
    }

    // Event Listeners
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize calendar
    renderCalendar(currentDate);
}); 