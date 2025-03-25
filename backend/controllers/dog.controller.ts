import { Request, Response } from 'express';
import Dog from '../models/Dog';
import multer, { FileFilterCallback } from 'multer';

// Define a file filter to allow only PNG and JPEG files
const fileFilter: multer.Options['fileFilter'] = (req: Request, file, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      // Cast the error to any so TypeScript accepts it
      cb(new Error('Invalid file type. Only PNG and JPEG are allowed.') as any, false);
    }
  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/dogs');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    }
  });
  
  export const upload = multer({ storage, fileFilter });
  
// Controller to get all dogs
export const getDogs = async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ error: 'Failed to fetch dogs.' });
  }
};

// Basic controller to create a dog without image
export const createDog = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    const newDog = new Dog({
      name,
      description,
      adopted: false
    });
    
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(500).json({ error: 'Failed to create dog.' });
  }
};

// Controller to handle creation with image upload
export const createDogWithImage = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }
    
    // Create a new Dog record with the image file path
    const newDog = new Dog({
      name,
      description,
      image: `/uploads/dogs/${req.file.filename}`, // relative URL to the image
      adopted: false
    });
    
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(500).json({ error: 'Failed to create dog.' });
  }
};
