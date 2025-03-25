export const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
export const jwtOptions = {
  expiresIn: '1h',
};
