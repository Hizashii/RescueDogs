import { Request, Response } from 'express';
import Dog from '../models/Dog';

export const getDogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    res.json(dog);
  } catch (err) {
    console.error('Error fetching dog by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDogs = async (req: Request, res: Response) => {
  try {
    const query: any = {};
    if (req.query.name) {
      query.name = new RegExp(String(req.query.name), 'i');
    }
    if (req.query.location)   query.location   = req.query.location;
    if (req.query.breed)      query.breed      = req.query.breed;
    if (req.query.size)       query.size       = req.query.size;
    if (req.query.age)        query.age        = req.query.age;
    if (req.query.gender)     query.gender     = req.query.gender;
    if (req.query.status)     query.status     = req.query.status;
    if (req.query.furLength)  query.furLength  = req.query.furLength;
    if (req.query.vaccination) query.vaccination = req.query.vaccination;
    if (req.query.goodWith) {
      const gw = Array.isArray(req.query.goodWith)
        ? req.query.goodWith
        : [req.query.goodWith];
      query.goodWith = { $all: gw };
    }

    const total = await Dog.countDocuments(query);
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    
    const dogs = await Dog.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      dogs,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ error: 'Failed to fetch dogs.' });
  }
};

export const createDogWithImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl, ...dogData } = req.body;

    const newDog = new Dog({
      ...dogData,
      image: imageUrl
    });

    await newDog.save();
    res.status(201).json(newDog);
  } catch (error) {
    console.error('Create dog with image error:', error);
    res.status(500).json({ message: 'Failed to create dog' });
  }
};

export const getDogFilterOptions = async (_req: Request, res: Response) => {
  try {
    const [
      breeds,
      locations,
      statuses,
      sizes,
      ages,
      genders,
      furLengths,
      vaccinationOptions,
      goodWithChoices
    ] = await Promise.all([
      Dog.distinct('breed'),
      Dog.distinct('location'),
      Dog.distinct('status'),
      Dog.distinct('size'),
      Dog.distinct('age'),
      Dog.distinct('gender'),
      Dog.distinct('furLength'),
      Dog.distinct('vaccination'),
      Dog.distinct('goodWith')
    ]);

    res.json({
      breeds:    breeds.filter(Boolean),
      locations: locations.filter(Boolean),
      statuses:  statuses.filter(Boolean),
      sizes:     sizes.filter(Boolean),
      ages:      ages.filter(Boolean),
      genders:   genders.filter(Boolean),
      furLengths:    furLengths.filter(Boolean),
      vaccinationOptions: vaccinationOptions.filter(Boolean),
      goodWith:       goodWithChoices.filter(Boolean),
    });
  } catch (err) {
    console.error('Error fetching filter options:', err);
    res.status(500).json({ message: 'Could not load filter options.' });
  }
};

export const updateDog = async (req: Request, res: Response) => {
  try {
    const dogId = req.params.id;
    const { imageUrl, ...updateData } = req.body;

    const updatedDog = await Dog.findByIdAndUpdate(dogId, {
      ...updateData,
      image: imageUrl
    }, { new: true });

    if (!updatedDog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    res.status(200).json(updatedDog);
  } catch (error) {
    console.error('Update dog error:', error);
    res.status(500).json({ message: 'Failed to update dog' });
  }
};

export const getBreeds = async (req: Request, res: Response) => {
  try {
    const breeds = await Dog.distinct('breed');
    
    const validBreeds = breeds
      .filter(breed => breed)
      .sort((a, b) => a.localeCompare(b));
    
    res.json(validBreeds);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    res.status(500).json({ message: 'Failed to fetch breeds' });
  }
};
