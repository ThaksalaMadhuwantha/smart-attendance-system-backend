import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; 
import dns from "node:dns";

// DNS Server Configuration
dns.setServers(['8.8.8.8','1.1.1.1']);

dotenv.config();

const seedUsers = async () => {
  try {
    const mongoUri = "mongodb+srv://admin:1234@cluster0.u0chpzi.mongodb.net/sas?appName=Cluster0";
    await mongoose.connect(mongoUri);
    
  
    await User.deleteMany();

    const users = [
      {
        userId: 'ADM001',
        name: 'Admin User',
        email: 'admin@exam.lk',
        password: '123456', 
        role: 'admin',
      },
      {
        userId: 'INV001',
        name: 'Invigilator User',
        email: 'scan@exam.lk',
        password: '123456', 
        role: 'invigilator',
      },
    ];

  
    for (const user of users) {
      await User.create(user);
    }

    console.log('✅ Test Users Created Successfully!');
    console.log('📧 Admin: admin@exam.lk | Pass: 123456');
    console.log('📧 Invigilator: scan@exam.lk | Pass: 123456');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedUsers();