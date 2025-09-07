// routes/rental.route.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { addRental, getRentals, deleteRental, uploads } from '../controllers/rental.controller.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to add new rental equipment
router.post('/', upload.single('image'), addRental);

// Route to fetch all rental equipment
router.get('/', getRentals);

// Route to delete rental equipment by ID
router.delete('/:id', deleteRental);

export default router;