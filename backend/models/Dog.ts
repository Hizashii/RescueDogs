import { Schema, model, Document } from 'mongoose';

export interface IDog extends Document {
  name: string;
  description: string;
  image: string;
  adopted: boolean;
  location?: string;
  breed?: string;
  size?: string;   
  age?: string;   
  gender?: string; 
  goodWith?: string[]; 
}

const DogSchema = new Schema<IDog>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  adopted: { type: Boolean, default: false },
  
  location: { type: String },
  breed: { type: String },
  size: { type: String },
  age: { type: String },
  gender: { type: String },
  goodWith: [{ type: String }],
}, { timestamps: true });

export default model<IDog>('Dog', DogSchema);
