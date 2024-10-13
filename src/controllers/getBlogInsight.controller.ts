import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { getBlogInsightService } from '../services';

export const getBlogInsightController = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const data = await getBlogInsightService(request);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
