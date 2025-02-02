document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            if(tabId === 'view-appointments') {
                loadAppointments();
            }
        });
    });

    // Form Submission
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const appointment = {
            date: document.getElementById('appointmentDate').value,
            time: document.getElementById('appointmentTime').value,
            doctorName: document.getElementById('doctorName').value,
            hospitalName: document.getElementById('hospitalName').value,
            notes: document.getElementById('appointmentNotes').value,
            id: Date.now() // Unique identifier
        };

        saveAppointment(appointment);
        appointmentForm.reset();
        showNotification('Appointment scheduled successfully!');
    });

    // Load initial appointments
    loadAppointments();
});

function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointmentsList = document.getElementById('appointmentsList');
    
    appointmentsList.innerHTML = '';
    
    // Sort appointments by date and time
    appointments.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
    
    appointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'appointment-card';
        appointmentCard.innerHTML = `
            <h3>Dr. ${appointment.doctorName}</h3>
            <p><i class="fas fa-hospital"></i> ${appointment.hospitalName}</p>
            <p><i class="fas fa-calendar"></i> ${formatDate(appointment.date)}</p>
            <p><i class="fas fa-clock"></i> ${formatTime(appointment.time)}</p>
            ${appointment.notes ? `<p><i class="fas fa-notes-medical"></i> ${appointment.notes}</p>` : ''}
            <div class="appointment-actions">
                <button onclick="editAppointment(${appointment.id})" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteAppointment(${appointment.id})" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        appointmentsList.appendChild(appointmentCard);
    });
}

function deleteAppointment(id) {
    if(confirm('Are you sure you want to delete this appointment?')) {
        let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments = appointments.filter(appointment => appointment.id !== id);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
        showNotification('Appointment deleted successfully!');
    }
}

function editAppointment(id) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointment = appointments.find(app => app.id === id);
    
    if(appointment) {
        // Switch to enter data tab
        document.querySelector('[data-tab="enter-data"]').click();
        
        // Fill the form
        document.getElementById('appointmentDate').value = appointment.date;
        document.getElementById('appointmentTime').value = appointment.time;
        document.getElementById('doctorName').value = appointment.doctorName;
        document.getElementById('hospitalName').value = appointment.hospitalName;
        document.getElementById('appointmentNotes').value = appointment.notes;
        
        // Delete the old appointment
        deleteAppointment(id);
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatTime(timeString) {
    return timeString;
}

function showNotification(message) {
    // You can enhance this with a proper notification system
    alert(message);
} 