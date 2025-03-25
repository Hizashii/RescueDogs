import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies and handle CORS
app.use(express.json());
app.use(cors());

// Serve static files (so uploaded images are accessible)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Connect to MongoDB (Mongoose v6+ does not require useNewUrlParser or useUnifiedTopology)
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Import routes
import authRoutes from './routes/auth.routes';
import dogRoutes from './routes/dog.routes';
import userRoutes from './routes/user.routes';
import statisticsRoutes from './routes/statistics.routes';
import blogRoutes from './routes/blog.routes';
import donationRoutes from './routes/donation.routes';
import reportRoutes from './routes/report.routes';
import emailRoutes from './routes/email.routes';
import settingsRoutes from './routes/settings.routes';

// Mount the API routes
app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/settings', settingsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
