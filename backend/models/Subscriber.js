import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    consentDate: { type: Date, default: Date.now }
});

export default mongoose.model('Subscriber', subscriberSchema);
