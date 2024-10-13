import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { deleteBlogService } from '../services';

export const deleteBlogController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await deleteBlogService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
