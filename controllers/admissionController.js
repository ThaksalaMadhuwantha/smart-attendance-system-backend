import Admission from '../models/Admission.js';
import Student from '../models/Student.js';
import QRCode from 'qrcode';
import crypto from 'crypto';

export const generateAdmission = async (req, res) => {
  const { studentId, semester, isEligible } = req.body;

  try {
    const studentExists = await Student.findOne({ studentId });
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const admissionExists = await Admission.findOne({ studentId, semester });
    if (admissionExists) {
      return res.status(400).json({ message: 'Admission already generated for this semester' });
    }

    const secretData = `${studentId}-${semester}-${process.env.JWT_SECRET}`;
    const qrToken = crypto.createHash('sha256').update(secretData).digest('hex');


    const qrCodeImage = await QRCode.toDataURL(qrToken);

    const admission = await Admission.create({
      studentId,
      semester,
      isEligible,
      qrToken,
      generatedBy: req.user._id 
    });

    res.status(201).json({
      admission,
      qrCodeImage
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};