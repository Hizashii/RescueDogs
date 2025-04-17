// backend/models/User.ts
import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  email:   string
  password:string
  role:    string
  name?:   string
  comparePassword(candidate: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:     { type: String, required: true, default: 'admin' },
  name:     { type: String }
})

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

// Instance method to compare password
userSchema.methods.comparePassword = function(candidate: string) {
  return bcrypt.compare(candidate, this.password)
}

export default model<IUser>('User', userSchema)
