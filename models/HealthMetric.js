const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bpSystolic: {
        type: Number,
        required: true
    },
    bpDiastolic: {
        type: Number,
        required: true
    },
    glucose: {
        type: Number,
        required: true
    },
    cholesterol: {
        type: Number,
        required: true
    },
    heartRate: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    notes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('HealthMetric', healthMetricSchema); 