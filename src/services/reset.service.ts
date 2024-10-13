import { Request } from 'express';
import { configDotenv } from 'dotenv';
import { UserModel } from '../model';
import moment from 'moment';
import bcrypt from 'bcryptjs';

configDotenv();

export const resetService = async (req: Request): Promise<object> => {
  const { email, otp, newPassword } = req.body;

  // Check for missing fields
  if (!email || !otp || !newPassword) {
    throw new Error('Missing required fields');
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  // Check if OTP is valid and hasn't expired
  if (user.resetToken !== otp || moment().isAfter(user.resetTokenExpiry)) {
    throw new Error('Invalid OTP or expired');
  }

  // Hash the new password securely
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  // Clear reset token after successful change
  user.resetToken = null;
  user.resetTokenExpiry = null;

  await user.save();

  return { message: 'Password changed successfully' };
};
