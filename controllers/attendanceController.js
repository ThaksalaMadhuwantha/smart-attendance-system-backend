import Attendance from '../models/Attendance.js';
import Admission from '../models/Admission.js';

// @desc    Scan QR and Mark Attendance
// @route   POST /api/attendance/scan
// @access  Private (Invigilator or Admin)
export const markAttendance = async (req, res) => {
  const { qrToken, subjectCode } = req.body;

  try {
    // 1. qrToken එකෙන් Admission එක හොයාගන්නවා
    const admission = await Admission.findOne({ qrToken });
    if (!admission) {
      return res.status(404).json({ message: 'Invalid QR Code or Admission not found!' });
    }

    // 2. ශිෂ්‍යයා විභාගයට සුදුසුද (Eligible) බලනවා
    if (!admission.isEligible) {
      return res.status(400).json({ message: 'Student is NOT eligible for this exam!' });
    }

    // 3. Attendance එක Save කරනවා
    // (Duplicate scan එකක් ආවොත් model එකේ index එක නිසා database එකෙන් auto error එකක් දෙනවා)
    const attendance = await Attendance.create({
      studentId: admission.studentId,
      subjectCode,
      status: 'Present',
      markedBy: req.user.userId, // 👈 ඔයාගේ model එකට අනුව Userගේ 'userId' (String) එක මෙතනට දානවා
      markedAt: new Date()
    });

    res.status(201).json({
      message: 'Attendance marked successfully! ✅',
      attendance
    });

  } catch (error) {
    // Duplicate index error එකක් ආවොත් ලස්සන message එකක් යවනවා
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Attendance already marked for this subject!' });
    }
    res.status(500).json({ message: error.message });
  }
};