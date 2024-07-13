import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, consent } = req.body;
    if (!name || !email || !consent) {
        return res.status(400).json({ message: 'Name, email, and consent are required' });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber({
            name,
            email,
            consentDate: new Date()
        });

        await newSubscriber.save();
        res.status(201).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
