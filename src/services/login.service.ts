import { Request } from 'express';
import { UserModel } from '../model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

export const loginService = async (req: Request): Promise<object> => {
  const { email, password } = req.body;
  const tokenExist = req.headers.authorization?.split(' ')[1]; // Check token from Authorization header (Bearer token)

  // Check already exist
  if (tokenExist) {
    const decoded = jwt.verify(tokenExist, process.env.JWT_SECRET);
    if (decoded) {
      return { message: 'User already logged in', success: true };
    }
  }

  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return { message: 'User not found', success: false };
  }

  // Validate password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return { message: 'Invalid credentials', success: false };
  }

  // Generate JWT token
  const token = generateToken(user._id);

  return {
    token: token,
    message: 'Login successful',
    success: true
  };
};
