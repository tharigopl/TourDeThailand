const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    firstName: String,
    lastName: String,
    address: String,
    postalCode: String,
    city: String,
    state: String, 
    country: { type: String, default: 'US' },
    created: { type: Date, default: Date.now },
    businessName: String,
    // Stripe account ID to send payments obtained with Stripe Connect.
    stripeAccountId: String,
    onboardingComplete: Boolean
});

mongoose.model('User', UserSchema);