const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const ADMIN_EMAIL = 'mancsmentoadomany@gmail.com';
const ADMIN_PASSWORD = 'Kuty4M4ncsM3ntok';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  name: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

async function setupAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rescuedogs');
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists, updating password...');
      existingAdmin.password = ADMIN_PASSWORD;
      await existingAdmin.save();
      console.log('Admin password updated successfully');
    } else {
      console.log('Creating new admin user...');
      const admin = new User({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
        name: 'Admin'
      });
      await admin.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

setupAdmin(); 