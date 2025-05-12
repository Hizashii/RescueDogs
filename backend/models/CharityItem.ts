import { Schema, model, Document } from 'mongoose'

export interface CharityItemDoc extends Document {
  name:       string
  price:      number
  description:string
  imageUrl:   string
  isActive:   boolean
  category:   string
  stock:      number
}
const CharityItemSchema = new Schema({
  name:        { type: String,  required: true },
  price:       { type: Number,  required: true },
  description: { type: String,  required: true },
  imageUrl:    { type: String,  required: true },
  isActive:    { type: Boolean, default: true },
  category:    { type: String,  required: true },
  stock:       { type: Number,  required: true },
}, { timestamps: true })

export default model('CharityItem', CharityItemSchema)