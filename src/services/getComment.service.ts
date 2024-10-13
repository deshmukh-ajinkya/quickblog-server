import { BlogModel } from '../model';
import { Request } from 'express';

export const getCommentService = async (request: Request): Promise<object> => {
  const { blogID } = request.body;
  // Find the blog by ID and populate the comments and their authors
  const blog = await BlogModel.findById(blogID).populate({
    path: 'comments',
    populate: {
      path: 'authorID', // Populate the author details of each comment
      select: 'name' // Select only necessary fields
    }
  });

  if (!blog) {
    throw new Error('Blog not found');
  }

  // Return the comments for the blog
  return blog.comments;
};
