
import { Request, Response } from 'express';
import Report from '../models/Report';


export const createReport = async (req: Request, res: Response) => {
  try {
    const { dogPictureUrl, ...reportData } = req.body;

    const report = new Report({
      ...reportData,
      dogPicture: dogPictureUrl
    });

    await report.save();

    res.status(201).json(report);

  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Failed to create report' });
  }
};

export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Failed to retrieve reports' });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error('Get report by ID error:', error);
    res.status(500).json({ message: 'Failed to retrieve report' });
  }
};

export const updateReportStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Update report status error:', error);
    res.status(500).json({ message: 'Failed to update report status' });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Failed to delete report' });
  }
};