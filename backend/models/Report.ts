// backend/models/report.model.js
import mongoose, { Schema, Document } from 'mongoose';

// Define report status options
type ReportStatus = 'new' | 'in-progress' | 'resolved' | 'closed';

// Interface for the report document
export interface IReport extends Document {
  name: string;
  phone: string;
  email?: string;
  dogCity: string;
  reporterCity: string;
  comments?: string;
  dogPicture?: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Create schema for reports
const ReportSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    dogCity: {
      type: String,
      required: true,
      trim: true
    },
    reporterCity: {
      type: String,
      required: true,
      trim: true
    },
    comments: {
      type: String,
      trim: true
    },
    dogPicture: {
      type: String // Path to the uploaded file
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Create and export the model
const Report = mongoose.model<IReport>('Report', ReportSchema);

export default Report;