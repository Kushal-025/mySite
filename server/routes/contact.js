const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');

// In-memory fallback list if MongoDB connection is pending
const fallbackMessages = [];

// POST /api/contact - Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, subject, message) are required.'
            });
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const payload = { name, email, subject, message, ipAddress: String(ip), createdAt: new Date() };

        let savedDoc = null;
        if (mongoose.connection.readyState === 1) {
            const newMsg = new Message(payload);
            savedDoc = await newMsg.save();
        } else {
            // Fallback storage
            payload._id = 'temp_' + Date.now();
            fallbackMessages.push(payload);
            savedDoc = payload;
        }

        console.log(`📩 New Contact Message received from [${name} <${email}>]: "${subject}"`);

        return res.status(201).json({
            success: true,
            message: 'Message saved successfully! Kushal has been notified.',
            data: savedDoc
        });
    } catch (err) {
        console.error('Error saving contact message:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error processing your message. Please try again or email directly.'
        });
    }
});

// GET /api/contact - Get messages list (Admin/Testing)
router.get('/contact', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
            return res.json({ success: true, count: messages.length, messages });
        }
        return res.json({ success: true, count: fallbackMessages.length, messages: fallbackMessages });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
