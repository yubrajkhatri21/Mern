const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Error-handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 400).send({
        message: error.message || "Something went wrong!",
        validation: error.validation,
    });
});

// Start the server and connect to MongoDB
app.listen(5000, async () => {
    console.log('Server started at http://localhost:5000');
    console.log('Press Ctrl+C to stop');

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mern-vci5");
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
});
