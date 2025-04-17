// backend/controllers/auth.controller.ts
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { jwtConfig } from '../jwtConfig/jwt.config'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await user.comparePassword(password)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  )
  res.json({
    token,
    user: {
      id:    user._id,
      email: user.email,
      role:  user.role,
      name:  user.name
    }
  })
}

export const profile = async (req: Request, res: Response) => {
  // authenticateJWT sets req.userId
  const user = await User.findById(req.userId).select('-password')
  if (!user) return res.status(404).json({ message: 'Not found' })
  res.json(user)
}
