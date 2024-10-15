import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

interface CustomRequest extends ExpressRequest {
  user?: string | JwtPayload; // Custom type to store decoded user info
}

// Middleware to authenticate the user using JWT from Authorization header
export const authenticate = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication required', success: false });
  }

  const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ message: 'Token missing', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ message: 'Token expired, please log in again', success: false });
    }
    return res.status(403).json({ message: 'Invalid token', success: false });
  }
};
