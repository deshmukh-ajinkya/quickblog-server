import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { addCommentService } from '../services';

export const addCommentController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await addCommentService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
