const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

// Connect to the database
connectDB();

const createAdmin = async () => {
  try {
    let admin = await Admin.findOne({ email: 'admin@example.com' });

    if (admin) {
      console.log('Admin user already exists???');
      return;
    }

    admin = new Admin({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'adminpassword' // Use a strong password in a real-world scenario
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);

    await admin.save();
    console.log('Admin user created');
  } catch (err) {
    console.error(err.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
