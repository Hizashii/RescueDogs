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


  status?: string;             
  furLength?: string;
  vaccination?: string;

  cameIn?: string;
  lookingForOwner?: string;
  wentOut?: string;
  adapted?: string;
  relationToPeople?: string;
  moreInfo?: string;
  thumbnails?: { id: string; image: string; name: string }[];
}

const ThumbnailSchema = new Schema({
  id:    { type: Schema.Types.ObjectId, ref: 'Dog' },
  image: String,
  name:  String,
});

const DogSchema = new Schema<IDog>(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    image:       { type: String, required: true },


    adopted:     { type: Boolean, default: false },
    location:    { type: String },
    breed:       { type: String },
    size:        { type: String },
    age:         { type: String },
    gender:      { type: String },
    goodWith:    [String],


    status:       { type: String }, 
    furLength:    { type: String },
    vaccination:  { type: String },

    cameIn:             String,
    lookingForOwner:    String,
    wentOut:            String,
    adapted:            String,
    relationToPeople:   String,
    moreInfo:           String,
    thumbnails:         [ThumbnailSchema],
  },
  { timestamps: true }
);

export default model<IDog>('Dog', DogSchema);
