// backend/config/jwt.config.ts
export const jwtConfig = {
    secret: process.env.JWT_SECRET!,      // from your .env
    expiresIn: '1h'                       // token lifetime
  }
  