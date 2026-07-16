import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // e.g., SE/2022/001
  fullName: { 
    type: String, 
    required: true 
  },
  faculty: { 
    type: String, 
    required: true 
  },
  degreeProgram: { 
    type: String, 
    required: true 
  },
  profileImage: { 
    type: String, 
    required: true 
  } // URL of the student photo
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);
export default Student;