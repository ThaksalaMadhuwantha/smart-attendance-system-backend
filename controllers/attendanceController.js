import Attendance from '../models/Attendance.js';
import Admission from '../models/Admission.js';
export const markAttendance = async (req, res) => {
  const { qrToken, subjectCode } = req.body;

  try {
    const admission = await Admission.findOne({ qrToken });
    if (!admission) {
      return res.status(404).json({ message: 'Invalid QR Code or Admission not found!' });
    }

    if (!admission.isEligible) {
      return res.status(400).json({ message: 'Student is NOT eligible for this exam!' });
    }

    const attendance = await Attendance.create({
      studentId: admission.studentId,
      subjectCode,
      status: 'Present',
      markedBy: req.user.userId,
      markedAt: new Date()
    });

    res.status(201).json({
      message: 'Attendance marked successfully! ✅',
      attendance
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Attendance already marked for this subject!' });
    }
    res.status(500).json({ message: error.message });
  }
};