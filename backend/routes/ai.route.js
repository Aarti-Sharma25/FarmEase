// routes/ai.route.js
import express from 'express';
import { generateDescription } from '../controllers/ai.controller.js';

const router = express.Router();

// POST /api/ai/generate-description
router.post('/generate-description', generateDescription);

export default router;