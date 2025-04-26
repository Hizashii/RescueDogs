// backend/types/express.d.ts
import 'express'

declare module 'express' {
  export interface Request {
    userId?: string    // added by your authenticateJWT middleware :contentReference[oaicite:1]{index=1}
  }
}
