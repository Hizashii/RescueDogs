import mongoose, { Schema, Document } from 'mongoose';

type ReportStatus = 'new' | 'in-progress' | 'resolved' | 'closed';

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
      type: String, 
      required: false
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true 
  }
);

const Report = mongoose.model<IReport>('Report', ReportSchema);

export default Report;