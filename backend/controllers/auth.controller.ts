import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtOptions } from '../config/jwt.config';

// For demonstration, a hardcoded admin user. In production, verify against your database.
const demoAdmin = {
  id: '1',
  username: 'admin',
  password: 'password'
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (username === demoAdmin.username && password === demoAdmin.password) {
    const token = jwt.sign({ id: demoAdmin.id, username: demoAdmin.username }, jwtSecret, jwtOptions);
    return res.json({ token });
  }
  
  res.status(401).json({ message: 'Invalid credentials' });
};
