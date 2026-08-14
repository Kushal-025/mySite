require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiting for API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// Health check endpoint (Used by UptimeRobot & Keep-Alive to stay 24/7 online)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        uptime: Math.floor(process.uptime()) + ' seconds',
        service: 'Kushal Banerjee Portfolio API',
        timestamp: new Date().toISOString(),
        mongodb: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected (using resilient in-memory mode)'
    });
});

// Routes
app.use('/api', contactRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'API Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Portfolio Express Backend listening on http://localhost:${PORT}`);
    console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);

    // 24/7 Keep-Alive Engine: If deployed on Render/Koyeb, auto-ping to prevent sleep mode
    const serverUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL;
    if (serverUrl) {
        console.log(`⚡ 24/7 Keep-Alive activated for: ${serverUrl}`);
        setInterval(async () => {
            try {
                const res = await fetch(`${serverUrl}/api/health`);
                if (res.ok) console.log(`💓 Keep-alive ping sent at ${new Date().toLocaleTimeString()} — Server is awake`);
            } catch (err) {
                console.warn('Keep-alive ping warning:', err.message);
            }
        }, 8 * 60 * 1000); // Ping every 8 minutes
    }
});
