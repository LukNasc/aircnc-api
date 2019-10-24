const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date:String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('Booking',BookingSchema);