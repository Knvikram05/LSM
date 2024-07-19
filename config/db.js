// File: config/db.js
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://poornashri2703:QQJpDHJJce4RcH1a@cluster0.yp4pylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
