import { Schema, model } from 'mongoose';

interface IFilterDefinition {
  key: string;
  label: string;
  type: 'text' | 'select' | 'checkbox';
  options?: string[];
  pages: string[];
  order: number;
}

const FilterDefSchema = new Schema<IFilterDefinition>({
  key:    { type: String, required: true, unique: true },
  label:  { type: String, required: true },
  type:   { type: String, required: true, enum: ['text','select','checkbox'] },
  options:{ type: [String], default: [] },
  pages:  { type: [String], default: [] },
  order:  { type: Number, default: 0 },
});

export const FilterDefinition = model<IFilterDefinition>('FilterDefinition', FilterDefSchema);
