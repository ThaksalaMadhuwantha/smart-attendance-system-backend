import Admission from '../models/Admission.js';
import Student from '../models/Student.js';
import QRCode from 'qrcode';
import crypto from 'crypto';

// @desc    Generate Admission with QR Code
// @route   POST /api/admissions/generate
// @access  Private (Staff only)
export const generateAdmission = async (req, res) => {
  const { studentId, semester, isEligible } = req.body;

  try {
    // 1. Student කෙනෙක් ඉන්නවද කියලා check කරනවා
    const studentExists = await Student.findOne({ studentId });
    if (!studentExists) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 2. මේ semester එකට මේ studentට දැනටමත් admission එකක් හදලද බලනවා
    const admissionExists = await Admission.findOne({ studentId, semester });
    if (admissionExists) {
      return res.status(400).json({ message: 'Admission already generated for this semester' });
    }

    // 3. Secure QR Token එකක් generate කරගන්නවා (SHA-256 hash එකක්)
    // මේ hash එක ඇතුළට studentId, semester සහ secret key එකක් දාලා encrypt කරනවා
    const secretData = `${studentId}-${semester}-${process.env.JWT_SECRET}`;
    const qrToken = crypto.createHash('sha256').update(secretData).digest('hex');

    // 4. QR Token එක පාවිච්චි කරලා Base64 QR Image එකක් හදනවා
    // Invigilator scan කරද්දී මේ QR code එකෙන් ලැබෙන්නේ qrToken එකයි
    const qrCodeImage = await QRCode.toDataURL(qrToken);

    // 5. Database එකේ Admission එක save කරනවා
    const admission = await Admission.create({
      studentId,
      semester,
      isEligible,
      qrToken,
      generatedBy: req.user._id // Login වෙලා ඉන්න Staff userගේ ID එක (protect middleware එකෙන් ලැබෙන්නේ)
    });

    // 6. Response එක විදිහට database data සහ QR Code Image එක (Base64) යවනවා
    res.status(201).json({
      admission,
      qrCodeImage // මේ image එක frontend එකේ <img> tag එකකට දාලා කෙලින්ම පෙන්වන්න පුළුවන්
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};