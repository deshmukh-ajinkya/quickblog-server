import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { likeBlogService } from '../services';

export const likeBlogController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await likeBlogService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
