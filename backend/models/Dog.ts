import { Schema, model, Document } from 'mongoose';

export interface IDog extends Document {
  name: string;
  description: string;
  image: string; // URL or local file path
  adopted: boolean;
}

const DogSchema = new Schema<IDog>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  adopted: { type: Boolean, default: false }
});

export default model<IDog>('Dog', DogSchema);
