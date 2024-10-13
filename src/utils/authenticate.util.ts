import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { Types } from 'mongoose';
import nodemailer from 'nodemailer';
configDotenv();

export const generateToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Function to send an OTP email
export const sendEmailWithOtp = async (to: string, otp: string): Promise<void> => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_PROVIDER,
    auth: {
      user: process.env.MAIL_ID, // Your Gmail address
      pass: process.env.MAIL_PASS // Your Gmail password or app password
    },
    tls: {
      rejectUnauthorized: false // Allows self-signed certificates
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.MAIL_ID, // Sender address
    to: to, // Recipient email address
    subject: 'Password Reset OTP', // Subject of the email
    text: `Your OTP for password reset is: ${otp}` // Plain text body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};
