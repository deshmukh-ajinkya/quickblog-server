import { Request } from 'express';
import { BlogModel } from '../model';

// The service to create a blog
export const createBlogService = async (request: Request): Promise<object> => {
  try {
    const { author, bannerImg, title, content, category } = request.body;

    if (!author || !bannerImg || !title || !content || !category) {
      throw new Error('All fields (author, bannerImg, title, content, category) are required.');
    }

    // Create a new blog post
    const newBlog = new BlogModel({
      author,
      bannerImg,
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
