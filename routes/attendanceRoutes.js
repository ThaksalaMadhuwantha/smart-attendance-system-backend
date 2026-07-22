import express from 'express';
import { markAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/scan', protect, authorize('invigilator', 'admin'), markAttendance);

export default router;