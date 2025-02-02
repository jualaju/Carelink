document.addEventListener('DOMContentLoaded', () => {
    let currentDate = new Date();
    let events = [
        // January
        {
            date: '2024-01-04',
            title: 'World Braille Day',
            type: 'awareness',
            description: 'Supporting visually impaired seniors'
        },
        {
            date: '2024-01-15',
            title: 'Senior Fitness Workshop',
            type: 'health',
            description: 'Exercise and fitness session designed for seniors'
        },
        {
            date: '2024-01-19',
            title: 'World Geriatrics Day',
            type: 'health',
            description: 'Celebrating elderly healthcare specialists'
        },
        {
            date: '2024-01-28',
            title: 'World Leprosy Day',
            type: 'awareness',
            description: 'Awareness and support for leprosy patients'
        },

        // February
        {
            date: '2024-02-04',
            title: 'World Cancer Day',
            type: 'awareness',
            description: 'Cancer awareness and prevention for seniors'
        },
        {
            date: '2024-02-11',
            title: 'World Day of the Sick',
            type: 'awareness',
            description: 'Special prayers and support for the sick'
        },
        {
            date: '2024-02-20',
            title: 'World Day of Social Justice',
            type: 'awareness',
            description: 'Promoting senior citizens rights and social protection'
        },
        {
            date: '2024-02-28',
            title: 'Rare Disease Day',
            type: 'awareness',
            description: 'Supporting those with rare medical conditions'
        },

        // March
        {
            date: '2024-03-03',
            title: 'World Hearing Day',
            type: 'health',
            description: 'Promoting ear and hearing care'
        },
        {
            date: '2024-03-08',
            title: 'Free Health Check-up Camp',
            type: 'health',
            description: 'Comprehensive health screening for seniors'
        },
        {
            date: '2024-03-15',
            title: 'World Sleep Day',
            type: 'health',
            description: 'Importance of quality sleep for seniors'
        },
        {
            date: '2024-03-30',
            title: 'National Doctors Day',
            type: 'awareness',
            description: 'Honoring physicians and their service'
        },

        // April
        {
            date: '2024-04-07',
            title: 'World Health Day',
            type: 'awareness',
            description: 'Global health awareness and education'
        },
        {
            date: '2024-04-11',
            title: 'World Parkinson\'s Day',
            type: 'awareness',
            description: 'Raising awareness about Parkinson\'s disease'
        },
        {
            date: '2024-04-17',
            title: 'World Hemophilia Day',
            type: 'awareness',
            description: 'Blood disorders awareness and support'
        },
        {
            date: '2024-04-25',
            title: 'Senior Art Workshop',
            type: 'community',
            description: 'Creative arts session for elderly'
        },

        // May
        {
            date: '2024-05-08',
            title: 'World Red Cross Day',
            type: 'awareness',
            description: 'Celebrating humanitarian service'
        },
        {
            date: '2024-05-12',
            title: 'International Nurses Day',
            type: 'awareness',
            description: 'Honoring nurses worldwide'
        },
        {
            date: '2024-05-17',
            title: 'World Hypertension Day',
            type: 'health',
            description: 'Blood pressure awareness and prevention'
        },
        {
            date: '2024-05-28',
            title: 'World Blood Pressure Day',
            type: 'health',
            description: 'Hypertension awareness for seniors'
        },

        // June
        {
            date: '2024-06-14',
            title: 'World Blood Donor Day',
            type: 'awareness',
            description: 'Promoting blood donation'
        },
        {
            date: '2024-06-15',
            title: 'World Elder Abuse Awareness Day',
            type: 'awareness',
            description: 'Preventing elder abuse'
        },
        {
            date: '2024-06-21',
            title: 'Summer Wellness Program',
            type: 'health',
            description: 'Heat safety and summer health tips for seniors'
        },

        // July
        {
            date: '2024-07-01',
            title: 'National Doctors Day (India)',
            type: 'awareness',
            description: 'Honoring medical professionals'
        },
        {
            date: '2024-07-08',
            title: 'Seniors Technology Workshop',
            type: 'community',
            description: 'Learning digital skills and online safety'
        },
        {
            date: '2024-07-24',
            title: 'International Self-Care Day',
            type: 'health',
            description: 'Promoting senior wellness and self-care'
        },
        {
            date: '2024-07-28',
            title: 'World Hepatitis Day',
            type: 'awareness',
            description: 'Hepatitis awareness and prevention'
        },

        // August
        {
            date: '2024-08-12',
            title: 'International Youth Day',
            type: 'community',
            description: 'Intergenerational activities and knowledge sharing'
        },
        {
            date: '2024-08-21',
            title: 'World Senior Citizens Day',
            type: 'community',
            description: 'Celebrating our elderly community'
        },
        {
            date: '2024-08-31',
            title: 'International Day for the Elderly',
            type: 'community',
            description: 'Promoting elderly rights and dignity'
        },

        // September
        {
            date: '2024-09-08',
            title: 'National Grandparents Day',
            type: 'community',
            description: 'Honoring grandparents and their wisdom'
        },
        {
            date: '2024-09-21',
            title: 'World Alzheimer\'s Day',
            type: 'awareness',
            description: 'Dementia awareness and support'
        },
        {
            date: '2024-09-29',
            title: 'World Heart Day',
            type: 'health',
            description: 'Promoting heart health for seniors'
        },

        // October
        {
            date: '2024-10-01',
            title: 'International Day of Older Persons',
            type: 'community',
            description: 'UN day for elderly recognition'
        },
        {
            date: '2024-10-10',
            title: 'World Mental Health Day',
            type: 'health',
            description: 'Mental health awareness for seniors'
        },
        {
            date: '2024-10-11',
            title: 'World Arthritis Day',
            type: 'health',
            description: 'Arthritis awareness and management'
        },
        {
            date: '2024-10-16',
            title: 'World Food Day',
            type: 'health',
            description: 'Promoting healthy nutrition for seniors'
        },
        {
            date: '2024-10-20',
            title: 'World Osteoporosis Day',
            type: 'health',
            description: 'Bone health awareness'
        },
        {
            date: '2024-10-29',
            title: 'World Stroke Day',
            type: 'awareness',
            description: 'Stroke prevention and awareness'
        },

        // November
        {
            date: '2024-11-14',
            title: 'World Diabetes Day',
            type: 'awareness',
            description: 'Diabetes awareness and management'
        },
        {
            date: '2024-11-17',
            title: 'World COPD Day',
            type: 'awareness',
            description: 'Lung disease awareness for seniors'
        },

        // December
        {
            date: '2024-12-01',
            title: 'World AIDS Day',
            type: 'awareness',
            description: 'HIV/AIDS awareness and support'
        },
        {
            date: '2024-12-03',
            title: 'International Day of Disabled Persons',
            type: 'awareness',
            description: 'Supporting seniors with disabilities'
        },
        {
            date: '2024-12-10',
            title: 'Holiday Social Gathering',
            type: 'community',
            description: 'Festive celebration for seniors'
        },
        {
            date: '2024-12-12',
            title: 'Universal Health Coverage Day',
            type: 'awareness',
            description: 'Promoting healthcare access for all'
        },
        {
            date: '2024-12-20',
            title: 'Winter Wellness Workshop',
            type: 'health',
            description: 'Cold weather health tips for seniors'
        }
    ];

    function renderCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const monthDays = lastDay.getDate();

        document.getElementById('currentMonth').textContent = 
            date.toLocaleString('default', { month: 'long', year: 'numeric' });

        const calendarDates = document.getElementById('calendarDates');
        calendarDates.innerHTML = '';

        // Previous month's days
        for (let i = 0; i < startingDay; i++) {
            const prevDate = new Date(date.getFullYear(), date.getMonth(), -i);
            const dateDiv = createDateElement(prevDate, true);
            calendarDates.prepend(dateDiv);
        }

        // Current month's days
        for (let i = 1; i <= monthDays; i++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
            const dateDiv = createDateElement(currentDate);
            calendarDates.appendChild(dateDiv);
        }

        updateEventsList();
    }

    function createDateElement(date, isOtherMonth = false) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date';
        if (isOtherMonth) dateDiv.classList.add('other-month');
        if (isToday(date)) dateDiv.classList.add('today');

        dateDiv.textContent = date.getDate();

        // Check for events on this date
        const dateStr = formatDate(date);
        const dayEvents = events.filter(event => event.date === dateStr);
        
        if (dayEvents.length > 0) {
            dateDiv.classList.add('has-event');
            const eventDot = document.createElement('div');
            eventDot.className = 'event-dot';
            dateDiv.appendChild(eventDot);

            // Add tooltip with event info
            dateDiv.title = dayEvents.map(event => event.title).join('\n');
        }

        return dateDiv;
    }

    function updateEventsList() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';

        const today = new Date();
        const futureEvents = events
            .filter(event => new Date(event.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        futureEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="event-details">
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
                <span class="event-type ${event.type}">${event.type}</span>
            `;
            eventsList.appendChild(eventCard);
        });
    }

    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }

    function formatDate(date) {
        return date.toISOString().split('T')[0];
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

    // Initialize calendar
    renderCalendar(currentDate);
}); 