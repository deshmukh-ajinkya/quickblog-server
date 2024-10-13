import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { getOtpService } from '../services/getOtp.service';

export const getOtpController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await getOtpService(request, response);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
