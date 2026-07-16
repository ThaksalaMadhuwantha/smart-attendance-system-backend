import express from 'express';
import { registerStudent, getAllStudents } from '../controllers/studentController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// protect: ලොගින් වෙලා ඉන්න ඕනේ
// authorize('staff'): 'staff' role එක තියෙන අයට විතරයි student කෙනෙක්ව register කරන්න පුළුවන්
router.post('/', protect, authorize('staff'), registerStudent);

// Get all students route එක (Staff සහ Invigilator දෙගොල්ලන්ටම බලන්න පුළුවන්)
router.get('/', protect, getAllStudents);

export default router;