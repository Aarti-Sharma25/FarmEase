// models/rental.model.js
import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rentalPrice: {
        type: Number,
        required: true,
    },
    rentalPeriod: {
        type: String,
        required: true,
        enum: ['hour', 'day', 'week', 'month']
    },
    availability: {
        type: Boolean,
        default: true
    },
    location: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    rentalManName: {
        type: String,
        required: true,
    },
    rentalManPhone: {
        type: String,
        required: true,
    },
    rentalManEmail: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const RentalEquipment = mongoose.model('RentalEquipment', rentalSchema);