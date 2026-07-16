import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    ref: 'Student', 
    required: true 
  },
  semester: { 
    type: String, 
    required: true 
  }, // e.g., "Y2S1"
  isEligible: { 
    type: Boolean, 
    default: false 
  },
  qrToken: { 
    type: String, 
    required: true, 
    unique: true 
  }, // Secure Hash
  isPrinted: { 
    type: Boolean, 
    default: false 
  },
  generatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

const Admission = mongoose.model('Admission', AdmissionSchema);
export default Admission;