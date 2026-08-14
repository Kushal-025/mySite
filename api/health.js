import mongoose from 'mongoose';

export default async function handler(req, res) {
    res.status(200).json({
        status: 'online',
        service: 'Kushal Banerjee Portfolio Serverless Backend',
        timestamp: new Date().toISOString(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'ready'
    });
}
