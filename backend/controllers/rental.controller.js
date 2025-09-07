// controllers/rental.controller.js
import { RentalEquipment } from '../models/rental.model.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const uploads = multer({ storage });

export const addRental = async (req, res) => {
    try {
        const { 
            equipmentName, 
            description, 
            rentalPrice, 
            rentalPeriod, 
            availability,
            location,
            contactInfo,
            rentalManName,
            rentalManPhone,
            rentalManEmail
        } = req.body;

        const image = `http://localhost:5000/uploads/${req.file.filename}`;

        const rental = new RentalEquipment({
            equipmentName,
            description,
            rentalPrice,
            rentalPeriod,
            availability,
            location,
            contactInfo,
            rentalManName,
            rentalManPhone,
            rentalManEmail,
            image
        });

        await rental.save();
        res.status(201).json({ success: true, rental });
    } catch (error) {
        console.error("Error adding rental equipment:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getRentals = async (req, res) => {
    try {
        const rentals = await RentalEquipment.find();
        res.status(200).json({ success: true, rentals });
    } catch (error) {
        console.error("Error fetching rental equipment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteRental = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await RentalEquipment.findByIdAndDelete(id);

        if (!rental) {
            return res.status(404).json({ success: false, message: 'Rental equipment not found' });
        }

        return res.status(200).json({ success: true, message: 'Rental equipment deleted successfully' });
    } catch (error) {
        console.error("Error deleting rental equipment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
