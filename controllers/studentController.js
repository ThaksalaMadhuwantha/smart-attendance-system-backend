import Student from '../models/Student.js';

export const registerStudent = async (req, res) => {
  const { studentId, fullName, faculty, degreeProgram, profileImage } = req.body;

  try {
    const studentExists = await Student.findOne({ studentId });

    if (studentExists) {
      return res.status(400).json({ message: 'Student with this ID already exists' });
    }

    const student = await Student.create({
      studentId,
      fullName,
      faculty,
      degreeProgram,
      profileImage, 
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};