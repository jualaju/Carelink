const express = require('express');
const router = express.Router();
const HealthMetric = require('../models/HealthMetric');

// @route   POST api/health/metrics
// @desc    Save health metrics
router.post('/metrics', async (req, res) => {
    try {
        const newMetric = new HealthMetric({
            userId: req.body.userId || 'default', // Replace with actual user ID after authentication
            ...req.body
        });

        const metric = await newMetric.save();
        res.json(metric);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/health/metrics
// @desc    Get all health metrics for a user
router.get('/metrics', async (req, res) => {
    try {
        const metrics = await HealthMetric.find({ userId: req.query.userId || 'default' })
            .sort({ date: 1 });
        res.json(metrics);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 