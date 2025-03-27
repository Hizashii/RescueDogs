import { Request, Response } from 'express';
import Dog from '../models/Dog';
import multer, { FileFilterCallback } from 'multer';

const fileFilter: multer.Options['fileFilter'] = (req: Request, file, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
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
  
export const getDogs = async (req: Request, res: Response) => {
  try {
    const query: any = {};

    if (req.query.location) query.location = req.query.location;
    if (req.query.breed) query.breed = req.query.breed;
    if (req.query.size) query.size = req.query.size;
    if (req.query.age) query.age = req.query.age;
    if (req.query.gender) query.gender = req.query.gender;

    if (req.query.goodWith) {
      // If goodWith can be multiple values
      const goodWithFilter = Array.isArray(req.query.goodWith)
        ? req.query.goodWith
        : [req.query.goodWith];
      query.goodWith = { $all: goodWithFilter };
    }

    const dogs = await Dog.find(query);
    res.status(200).json(dogs);
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ error: 'Failed to fetch dogs.' });
  }
};


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

export const createDogWithImage = async (req: Request, res: Response) => {
  try {
    const { name, description, location, breed, size, age, gender } = req.body;
    const goodWith = req.body.goodWith;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    let goodWithArray: string[] = [];
    if (Array.isArray(goodWith)) {
      goodWithArray = goodWith;
    } else if (typeof goodWith === 'string') {
      goodWithArray = [goodWith];
    }

    const newDog = new Dog({
      name,
      description,
      image: `/uploads/dogs/${req.file.filename}`,
      adopted: false,
      location,
      breed,
      size,
      age,
      gender,
      goodWith: goodWithArray
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(500).json({ error: 'Failed to create dog.' });
  }
};
