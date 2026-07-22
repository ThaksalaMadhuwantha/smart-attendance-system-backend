import express from 'express';
import { generateAdmission } from '../controllers/admissionController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, authorize('staff'), generateAdmission);

export default router;