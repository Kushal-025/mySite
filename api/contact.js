import mongoose from 'mongoose';
import dns from 'dns';

// Fix DNS resolution for MongoDB Atlas SRV records
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://kushalbanerjee025_db_user:Kushal2004@cluster0.ubk6zb5.mongodb.net/kushal_portfolio?retryWrites=true&w=majority&appName=Cluster0';

// Define Mongoose Schema (cached across warm lambda invocations)
const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    ipAddress: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    try {
        const db = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
        });
        cachedDb = db;
        return db;
    } catch (err) {
        console.warn('MongoDB Atlas connection note:', err.message);
        return null;
    }
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        await connectToDatabase();
        try {
            if (mongoose.connection.readyState === 1) {
                const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
                return res.status(200).json({ success: true, count: messages.length, messages });
            }
            return res.status(200).json({ success: true, message: 'Database connecting', messages: [] });
        } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
        }
    }

    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body || {};

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, subject, message) are required.'
            });
        }

        await connectToDatabase();

        const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
        const payload = { name, email, subject, message, ipAddress: String(ip), createdAt: new Date() };

        try {
            let savedDoc = payload;
            if (mongoose.connection.readyState === 1) {
                const newMsg = new Message(payload);
                savedDoc = await newMsg.save();
            }

            return res.status(201).json({
                success: true,
                message: 'Message saved successfully! Kushal has been notified.',
                data: savedDoc
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error saving message to MongoDB Atlas.',
                error: error.message
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
