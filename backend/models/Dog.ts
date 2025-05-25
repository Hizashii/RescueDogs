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
    name:        { type: String, required: true, index: true },
    description: { type: String, required: true },
    image:       { type: String, required: true },


    adopted:     { type: Boolean, default: false, index: true },
    location:    { type: String, index: true },
    breed:       { type: String, index: true },
    size:        { type: String, index: true },
    age:         { type: String, index: true },
    gender:      { type: String, index: true },
    goodWith:    [String],


    status:       { type: String, index: true },
    furLength:    { type: String, index: true },
    vaccination:  { type: String, index: true },

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

// Add compound index for goodWith if queries often combine goodWith with other fields
// DogSchema.index({ goodWith: 1, location: 1 }); // Example compound index

export default model<IDog>('Dog', DogSchema);
