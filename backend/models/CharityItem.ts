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
  name:        { type: String,  required: true, index: true },
  price:       { type: Number,  required: true, index: true },
  description: { type: String,  required: true },
  imageUrl:    { type: String,  required: true },
  isActive:    { type: Boolean, default: true, index: true },
  category:    { type: String,  required: true, index: true },
  stock:       { type: Number,  required: true, index: true },
}, { timestamps: true })

export default model('CharityItem', CharityItemSchema)