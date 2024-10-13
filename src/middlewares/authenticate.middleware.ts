import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends ExpressRequest {
  user?: string | JwtPayload;
}

export const authenticate = (req: ExpressRequest, res: Response, next: NextFunction): object => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as CustomRequest).user = decoded; // Type assertion to CustomRequest
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.clearCookie('token');
      return res
        .status(401)
        .json({ message: 'Session expired, please log in again', success: false });
    }
    return res.status(403).json({ message: 'Invalid token', success: false });
  }
};
