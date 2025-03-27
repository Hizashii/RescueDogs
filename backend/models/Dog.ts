import { Schema, model, Document } from 'mongoose';

export interface IDog extends Document {
  name: string;
  description: string;
  image: string;
  adopted: boolean;
  location?: string;
  breed?: string;
  size?: string;    // e.g., "small", "medium", "large"
  age?: string;     // e.g., "puppy", "adult", "senior"
  gender?: string;  // e.g., "male", "female"
  goodWith?: string[];  // e.g., ["children", "cats", "dogs"]
}

const DogSchema = new Schema<IDog>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  adopted: { type: Boolean, default: false },
  
  // New fields
  location: { type: String },
  breed: { type: String },
  size: { type: String },
  age: { type: String },
  gender: { type: String },
  goodWith: [{ type: String }], // array of strings
}, { timestamps: true });

export default model<IDog>('Dog', DogSchema);
