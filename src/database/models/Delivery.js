const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    orderId: { type: String, required: true },
    status: { type: String, enum: ['On Hold', 'Packed', 'Shipped', 'Delivered','Cancelled'], default: 'On Hold' },
    trackingNumber: { type: String, required: true },
    longitude:String,
    latitude:String,
    estimatedDeliveryDate: { type: Date },
    cost: { type: Number, required: true },
}, 
{ timestamps: true });

module.exports = mongoose.model('delivery', DeliverySchema);