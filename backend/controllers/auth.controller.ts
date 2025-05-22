import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { jwtConfig } from '../jwtConfig/jwt.config'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email, role: 'admin' })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { 
        sub: user._id, 
        email: user.email, 
        role: user.role 
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    )

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 
    })

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('admin_token')
  res.json({ message: 'Logged out successfully' })
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    const user = await User.findById(req.user.sub).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}
