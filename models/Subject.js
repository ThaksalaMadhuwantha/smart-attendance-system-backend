import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
  subjectCode: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  }, // e.g., SENG22212
  subjectName: { 
    type: String, 
    required: true 
  },
  semester: { 
    type: String, 
    required: true 
  }, // e.g., "Y2S1"
  examDate: { 
    type: Date, 
    required: true 
  }
}, { timestamps: true });

const Subject = mongoose.model('Subject', SubjectSchema);
export default Subject;