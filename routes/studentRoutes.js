import express from 'express';
import { registerStudent, getAllStudents } from '../controllers/studentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('staff'), registerStudent);

router.get('/', protect, getAllStudents);

export default router;