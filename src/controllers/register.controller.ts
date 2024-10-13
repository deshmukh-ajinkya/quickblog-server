import { Request, Response } from 'express';
import { registerService } from '../services';
import { statusCode } from '../constants';

export const registerController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await registerService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
