import express from 'express';
import { markAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';


const router = express.Router();

// protect: ලොගින් වෙලා ඉන්න ඕනේ
// authorize: 'invigilator' සහ 'admin' කියන දෙගොල්ලන්ටම විතරයි QR Scan කරලා attendance mark කරන්න පුළුවන්
router.post('/scan', protect, authorize('invigilator', 'admin'), markAttendance);

export default router;