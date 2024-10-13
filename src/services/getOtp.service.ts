import { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import crypto from 'crypto'; // Import for secure OTP generation
import { UserModel } from '../model';
import moment from 'moment';
import { sendEmailWithOtp } from '../utils';
configDotenv();

export const getOtpService = async (req: Request, res: Response): Promise<object> => {
  const { email } = req.body;

  // 1. Find the user by email
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // 2. Generate a secure OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    const otpExpiry = moment().add(process.env.OTP_EXPIRY_MINUTES, 'minutes'); // Set expiration time

    // 3. Update user with OTP and expiry
    user.resetToken = otp;
    user.resetTokenExpiry = otpExpiry.toDate();
    await user.save();

    // 4. Send email with OTP
    await sendEmailWithOtp(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
