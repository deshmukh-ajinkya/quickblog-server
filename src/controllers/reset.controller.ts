import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { resetService } from '../services';

export const resetController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await resetService(request);
    response.status(statusCode.ok).json({ data, success: true });
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
