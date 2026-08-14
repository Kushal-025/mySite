const mongoose = require('mongoose');
const dns = require('dns');

// Configure reliable DNS servers to resolve MongoDB Atlas SRV records seamlessly
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    // Ignore if not supported
}

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.log('💡 No MONGODB_URI provided. Running with In-Memory fallback mode.');
        return;
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 8000,
        });
        console.log('✅ MongoDB Atlas connected successfully!');
    } catch (err) {
        console.warn('⚠️  MongoDB connection note:', err.message);
        console.log('💡 Running with In-Memory fallback mode so all API requests still succeed!');
    }
};

module.exports = connectDB;
