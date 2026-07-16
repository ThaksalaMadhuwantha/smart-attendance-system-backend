import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    ref: 'Student', 
    required: true 
  },
  subjectCode: { 
    type: String, 
    ref: 'Subject', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent'], 
    default: 'Absent' 
  },
  markedBy: { 
    type: String, 
    ref: 'User', 
    required: true 
  }, // Invigilator ID
  markedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// Prevent duplicate attendance for the same exam
AttendanceSchema.index({ studentId: 1, subjectCode: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;