// backend/controllers/report.controller.js
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Report from '../models/Report';

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/dog-pictures');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Create multer upload instance with file size and type limits
export const upload = multer({
  storage: storage,
  limits: { fileSize: 32 * 1024 * 1024 }, // 32MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  }
}).single('dogPicture'); // Field name from the form

// Create a new report
export const createReport = async (req: Request, res: Response) => {
  try {
    // Use multer to handle the file upload
    upload(req, res, async (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(400).json({ message: err.message });
      }
      
      // Get file path if uploaded
      const filePath = req.file ? `/uploads/dog-pictures/${req.file.filename}` : null;
      
      // Extract form data
      const { 
        name, 
        phone, 
        email, 
        dogCity, 
        reporterCity, 
        comments 
      } = req.body;
      
      // Validate required fields
      if (!name || !phone || !dogCity || !reporterCity) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Create report in database
      const newReport = new Report({
        name,
        phone,
        email: email || null,
        dogCity,
        reporterCity,
        comments: comments || null,
        dogPicture: filePath,
        status: 'new' // Default status
      });
      
      await newReport.save();
      
      res.status(201).json({ 
        message: 'Report submitted successfully',
        report: newReport
      });
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Failed to submit report' });
  }
};

// Get all reports (for admin dashboard)
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find()
      .sort({ createdAt: -1 }) // Newest first
      .exec();
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

// Get a single report by ID
export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Failed to fetch report' });
  }
};

// Update report status (for admin actions)
export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Failed to update report' });
  }
};