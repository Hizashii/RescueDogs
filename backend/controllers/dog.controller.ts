import { Request, Response } from 'express';
import Dog from '../models/Dog';
import multer, { FileFilterCallback } from 'multer';
import path from 'path'
import fs from 'fs'

// ensure the directory exists at runtime
const uploadDir = path.resolve(__dirname, '../uploads/dogs')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const fileFilter: multer.Options['fileFilter'] = (req, file, cb: FileFilterCallback) => {
  if (['image/png','image/jpeg'].includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only PNG & JPEG allowed') as any, false)
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname
    cb(null, unique)
  }
})

export const upload = multer({ storage, fileFilter })
  
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
export const getDogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const dog = await Dog.findById(id)
    if (!dog) return res.status(404).json({ message: 'Dog not found' })
    res.json(dog)
  } catch (err) {
    console.error('Error fetching dog by ID:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
