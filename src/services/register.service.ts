import { Request } from 'express';
import { UserModel } from '../model';

export const registerService = async (request: Request): Promise<object> => {
  const { name, email, password } = request.body;
  // Check user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return { message: 'User with this email already exists', success: true };
  }
  // Add user in User collection
  const newUser = new UserModel({
    name,
    email,
    password
  });
  await newUser.save();
  // Return response
  return {
    message: `Registration successful! ${name} Please log in to explore our services.`,
    success: true
  };
};
