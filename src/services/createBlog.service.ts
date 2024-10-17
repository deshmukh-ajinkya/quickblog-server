import { Request as ExpressRequest } from 'express';
import { BlogModel } from '../model';
import multer from 'multer';

// Extend the Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    file?: multer.File; // Add the file property for single file uploads
    files?: multer.File[]; // Add the files property for multiple file uploads
  }
}

// The service to create a blog
export const createBlogService = async (request: ExpressRequest): Promise<object> => {
  try {
    const { author, title, content, category } = request.body;
    const bannerImg = request.file?.path; // Get the uploaded file path

    if (!author || !bannerImg || !title || !content || !category) {
      throw new Error('All fields (author, bannerImg, title, content, category) are required.');
    }

    // Create a new blog post
    const newBlog = new BlogModel({
      author,
      bannerImg, // Save the file path of the uploaded image
      title,
      content,
      category
    });

    // Save the new blog to the database
    await newBlog.save();

    return {
      success: true,
      message: 'Blog created successfully',
      data: newBlog
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred while creating the blog.');
  }
};
