document.addEventListener('DOMContentLoaded', () => {
    const healthForm = document.getElementById('healthForm');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    let charts = {};

    // Data structure to store health metrics
    let healthMetrics = {
        dates: [],
        bpSystolic: [],
        bpDiastolic: [],
        glucose: [],
        cholesterol: [],
        heartRate: [],
        weight: [],
        height: [],
        bmi: []
    };

    // Load any existing data from localStorage
    loadStoredData();

    // Set default date and time to current
    document.getElementById('measurementDate').value = new Date().toISOString().slice(0, 16);

    // Initialize charts on page load
    initializeCharts();

    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            if(tabId === 'view-trends') {
                updateChartsFromDataStructure();
            }
        });
    });

    // Form Submission
    healthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        try {
            const healthData = {
                date: document.getElementById('measurementDate').value,
                bpSystolic: parseInt(document.getElementById('bpSystolic').value),
                bpDiastolic: parseInt(document.getElementById('bpDiastolic').value),
                glucose: parseInt(document.getElementById('glucose').value),
                cholesterol: parseInt(document.getElementById('cholesterol').value),
                heartRate: parseInt(document.getElementById('heartRate').value),
                weight: parseFloat(document.getElementById('weight').value),
                height: parseInt(document.getElementById('height').value),
                notes: document.getElementById('notes').value
            };

            // Validate the data
            if (isNaN(healthData.bpSystolic) || isNaN(healthData.bpDiastolic) || 
                isNaN(healthData.glucose) || isNaN(healthData.cholesterol) || 
                isNaN(healthData.heartRate) || isNaN(healthData.weight) || 
                isNaN(healthData.height)) {
                throw new Error('Please fill in all required fields with valid numbers');
            }

            healthData.bmi = calculateBMI(healthData.weight, healthData.height);

            // Add data to our data structure
            addToDataStructure(healthData);

            // Save to localStorage
            saveToLocalStorage();

            healthForm.reset();
            document.getElementById('measurementDate').value = new Date().toISOString().slice(0, 16);
            showNotification('Health metrics saved successfully!');
            
            // Refresh charts if on trends tab
            if (document.getElementById('view-trends').classList.contains('active')) {
                updateChartsFromDataStructure();
            }
        } catch (error) {
            showNotification('Error: ' + error.message);
        }
    });

    function initializeCharts() {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Blood Pressure Chart
        charts.bp = new Chart(document.getElementById('bpChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [
                    {
                        label: 'Systolic',
                        borderColor: '#ff6384',
                        data: healthMetrics.bpSystolic,
                        fill: false
                    },
                    {
                        label: 'Diastolic',
                        borderColor: '#36a2eb',
                        data: healthMetrics.bpDiastolic,
                        fill: false
                    }
                ]
            },
            options: chartOptions
        });

        // Glucose Chart
        charts.glucose = new Chart(document.getElementById('glucoseChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [{
                    label: 'Blood Glucose',
                    borderColor: '#4bc0c0',
                    data: healthMetrics.glucose,
                    fill: false
                }]
            },
            options: chartOptions
        });

        // Cholesterol Chart
        charts.cholesterol = new Chart(document.getElementById('cholesterolChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [{
                    label: 'Cholesterol',
                    borderColor: '#ff9f40',
                    data: healthMetrics.cholesterol,
                    fill: false
                }]
            },
            options: chartOptions
        });

        // Heart Rate Chart
        charts.heartRate = new Chart(document.getElementById('heartRateChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [{
                    label: 'Heart Rate',
                    borderColor: '#ff6384',
                    data: healthMetrics.heartRate,
                    fill: false
                }]
            },
            options: chartOptions
        });

        // Weight Chart
        charts.weight = new Chart(document.getElementById('weightChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [{
                    label: 'Weight',
                    borderColor: '#4bc0c0',
                    data: healthMetrics.weight,
                    fill: false
                }]
            },
            options: chartOptions
        });

        // BMI Chart
        charts.bmi = new Chart(document.getElementById('bmiChart'), {
            type: 'line',
            data: {
                labels: healthMetrics.dates,
                datasets: [{
                    label: 'BMI',
                    borderColor: '#9966ff',
                    data: healthMetrics.bmi,
                    fill: false
                }]
            },
            options: chartOptions
        });
    }

    function updateChartsFromDataStructure() {
        // Update BP Chart
        if (charts.bp) {
            charts.bp.data.labels = healthMetrics.dates;
            charts.bp.data.datasets[0].data = healthMetrics.bpSystolic;
            charts.bp.data.datasets[1].data = healthMetrics.bpDiastolic;
            charts.bp.update();
        }

        // Update Glucose Chart
        if (charts.glucose) {
            charts.glucose.data.labels = healthMetrics.dates;
            charts.glucose.data.datasets[0].data = healthMetrics.glucose;
            charts.glucose.update();
        }

        // Update Cholesterol Chart
        if (charts.cholesterol) {
            charts.cholesterol.data.labels = healthMetrics.dates;
            charts.cholesterol.data.datasets[0].data = healthMetrics.cholesterol;
            charts.cholesterol.update();
        }

        // Update Heart Rate Chart
        if (charts.heartRate) {
            charts.heartRate.data.labels = healthMetrics.dates;
            charts.heartRate.data.datasets[0].data = healthMetrics.heartRate;
            charts.heartRate.update();
        }

        // Update Weight Chart
        if (charts.weight) {
            charts.weight.data.labels = healthMetrics.dates;
            charts.weight.data.datasets[0].data = healthMetrics.weight;
            charts.weight.update();
        }

        // Update BMI Chart
        if (charts.bmi) {
            charts.bmi.data.labels = healthMetrics.dates;
            charts.bmi.data.datasets[0].data = healthMetrics.bmi;
            charts.bmi.update();
        }
    }

    function loadStoredData() {
        const stored = localStorage.getItem('healthMetrics');
        if (stored) {
            healthMetrics = JSON.parse(stored);
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('healthMetrics', JSON.stringify(healthMetrics));
    }

    function addToDataStructure(data) {
        const dateStr = new Date(data.date).toLocaleDateString();
        
        // If date already exists, update values at that index
        const existingIndex = healthMetrics.dates.indexOf(dateStr);
        if (existingIndex !== -1) {
            healthMetrics.bpSystolic[existingIndex] = data.bpSystolic;
            healthMetrics.bpDiastolic[existingIndex] = data.bpDiastolic;
            healthMetrics.glucose[existingIndex] = data.glucose;
            healthMetrics.cholesterol[existingIndex] = data.cholesterol;
            healthMetrics.heartRate[existingIndex] = data.heartRate;
            healthMetrics.weight[existingIndex] = data.weight;
            healthMetrics.height[existingIndex] = data.height;
            healthMetrics.bmi[existingIndex] = data.bmi;
        } else {
            // Add new data
            healthMetrics.dates.push(dateStr);
            healthMetrics.bpSystolic.push(data.bpSystolic);
            healthMetrics.bpDiastolic.push(data.bpDiastolic);
            healthMetrics.glucose.push(data.glucose);
            healthMetrics.cholesterol.push(data.cholesterol);
            healthMetrics.heartRate.push(data.heartRate);
            healthMetrics.weight.push(data.weight);
            healthMetrics.height.push(data.height);
            healthMetrics.bmi.push(data.bmi);
        }

        // Sort data by date
        const indices = healthMetrics.dates.map((_, i) => i);
        indices.sort((a, b) => new Date(healthMetrics.dates[a]) - new Date(healthMetrics.dates[b]));

        // Reorder all arrays based on sorted dates
        healthMetrics = {
            dates: indices.map(i => healthMetrics.dates[i]),
            bpSystolic: indices.map(i => healthMetrics.bpSystolic[i]),
            bpDiastolic: indices.map(i => healthMetrics.bpDiastolic[i]),
            glucose: indices.map(i => healthMetrics.glucose[i]),
            cholesterol: indices.map(i => healthMetrics.cholesterol[i]),
            heartRate: indices.map(i => healthMetrics.heartRate[i]),
            weight: indices.map(i => healthMetrics.weight[i]),
            height: indices.map(i => healthMetrics.height[i]),
            bmi: indices.map(i => healthMetrics.bmi[i])
        };
    }

    function calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    function showNotification(message) {
        // Enhanced notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: ${message.includes('Error') ? '#ff6b6b' : '#51cf66'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}); 