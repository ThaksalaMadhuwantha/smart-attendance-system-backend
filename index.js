import dotenv from 'dotenv';
// ⚠️ හැමදේටම වඩා කලින් .env load කරන්න!
dotenv.config({ path: './.env' }); 

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dns from "node:dns";

// DNS Server Configuration
dns.setServers(['8.8.8.8','1.1.1.1']);

// Routes Import
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();
const PORT = 5000;

console.log("🔑 JWT SECRET KEY IS:", process.env.JWT_SECRET);

// Database Connection
const mongoURL = "mongodb+srv://admin:1234@cluster0.u0chpzi.mongodb.net/sas?appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log("📡 connected to mongodb..."))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/attendance', attendanceRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('🚀 Exam Attendance System API is running smoothly...');
});

app.listen(PORT, () => {
  console.log(`💻 server is running on port ${PORT}...`);
});