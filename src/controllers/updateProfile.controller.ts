import { Request, Response } from 'express';
import { statusCode } from '../constants';
import { updateProfileService } from '../services';

export const updateProfileController = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const data = await updateProfileService(request, response);
    response.status(statusCode.ok).json(data);
  } catch (error) {
    response.status(statusCode.internal_server_error).json({
      data: { message: error.message, success: false }
    });
  }
};
