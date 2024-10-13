import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { loginService } from '../services';

export const loginController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await loginService(request, response);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
