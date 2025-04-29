import { Document, Schema, model } from 'mongoose'

export interface ICharityItem extends Document {
  name: string
  price: number
  description: string
  imageUrl: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CharityItemSchema = new Schema<ICharityItem>(
  {
    name:        { type: String, required: true },
    price:       { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl:    { type: String, default: '' },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default model<ICharityItem>('CharityItem', CharityItemSchema)
