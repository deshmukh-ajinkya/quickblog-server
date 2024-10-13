import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { getCommentService } from '../services';

export const getCommentController = async (request: Request, response: Response): Promise<void> => {
  try {
    const data = await getCommentService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
