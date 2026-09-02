// // controllers/rental.controller.js
// import { RentalEquipment } from '../models/rental.model.js';
// import multer from 'multer';
// import path from 'path';
// import uploadOnCloudinary from '../utils/cloudinary.js';

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads');
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, `${Date.now()}-${file.originalname}`);
// //     },
// // });

// // export const uploads = multer({ storage });
// const upload = multer({ storage: multer.memoryStorage() });
// export const addRental = async (req, res) => {
//     try {
//         const { 
//             equipmentName, 
//             description, 
//             rentalPrice, 
//             rentalPeriod, 
//             availability,
//             location,
//             contactInfo,
//             rentalManName,
//             rentalManPhone,
//             rentalManEmail
//         } = req.body;

      
//         let image = "";
//         if (req.file) {
//             image = await uploadOnCloudinary(req.file.buffer);   // ab .path nahi, .buffer
//         }
//         const rental = new RentalEquipment({
//             equipmentName,
//             description,
//             rentalPrice,
//             rentalPeriod,
//             availability,
//             location,
//             contactInfo,
//             rentalManName,
//             rentalManPhone,
//             rentalManEmail,
//             image
//         });

//         await rental.save();
//         res.status(201).json({ success: true, rental });
//     } catch (error) {
//         console.error("Error adding rental equipment:", error);
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// export const getRentals = async (req, res) => {
//     try {
//         const rentals = await RentalEquipment.find();
//         res.status(200).json({ success: true, rentals });
//     } catch (error) {
//         console.error("Error fetching rental equipment:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const deleteRental = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const rental = await RentalEquipment.findByIdAndDelete(id);

//         if (!rental) {
//             return res.status(404).json({ success: false, message: 'Rental equipment not found' });
//         }

//         return res.status(200).json({ success: true, message: 'Rental equipment deleted successfully' });
//     } catch (error) {
//         console.error("Error deleting rental equipment:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// controllers/rental.controller.js
import { RentalEquipment } from '../models/rental.model.js';
import multer from 'multer';
import path from 'path';
import uploadOnCloudinary from '../utils/cloudinary.js';
import { embedText, cosineSimilarity } from '../utils/embeddings.js';

const upload = multer({ storage: multer.memoryStorage() });
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

      
        let image = "";
        if (req.file) {
            image = await uploadOnCloudinary(req.file.buffer);   // ab .path nahi, .buffer
        }
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

        // Embedding generate karke listing ke saath store karte hain — future semantic search ke liye.
        // try/catch alag rakha hai taaki agar Gemini API fail ho (jaise rate limit) toh bhi
        // listing normally ban jaaye, bas search mein tab tak nahi milegi.
        try {
            const embeddingText = `${equipmentName}. ${description}`;
            rental.embedding = await embedText(embeddingText, "RETRIEVAL_DOCUMENT");
        } catch (embedError) {
            console.error("Embedding generation failed (listing will still be saved):", embedError.message);
        }

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

// GET /api/rentals/search?q=... — semantic search
export const searchRentals = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        const queryEmbedding = await embedText(q, "RETRIEVAL_QUERY");

        // Sirf un listings ko lete hain jinka embedding pehle se ban chuka hai
        const rentals = await RentalEquipment.find({ embedding: { $exists: true, $ne: [] } }).select('+embedding');

        // "Har kisi se compare karo" wala step — brute-force cosine similarity, chhote dataset ke liye kaafi hai
        const scored = rentals.map((rental) => ({
            rental,
            score: cosineSimilarity(queryEmbedding, rental.embedding),
        }));

        scored.sort((a, b) => b.score - a.score);

        const topResults = scored.slice(0, 20).map(({ rental, score }) => {
            const obj = rental.toObject();
            delete obj.embedding; // client ko wapas bhejne ki zaroorat nahi, sirf listing data chahiye
            return { ...obj, similarity: score };
        });

        res.status(200).json({ success: true, rentals: topResults });
    } catch (error) {
        console.error("Error searching rentals:", error);
        res.status(500).json({ success: false, message: "Server error while searching" });
    }
};
