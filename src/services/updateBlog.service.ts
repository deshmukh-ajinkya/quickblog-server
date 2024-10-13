import { Request } from 'express';
import { BlogModel } from '../model';

// Service to update a blog post
export const updateBlogService = async (request: Request): Promise<object> => {
  try {
    const { blogId, title, content, bannerImg, category } = request.body; // Get blogId from the request body

    if (!blogId) {
      throw new Error('Blog ID is required');
    }

    // Find the blog by its ID
    const blog = await BlogModel.findById(blogId);

    // Check if the blog exists
    if (!blog) {
      throw new Error('Blog not found');
    }

    // Update the fields if they are provided in the request body
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (bannerImg) blog.bannerImg = bannerImg;
    if (category) blog.category = category;

    // Save the updated blog
    await blog.save();

    return {
      success: true,
      message: 'Blog updated successfully',
      data: blog
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred while updating the blog.');
  }
};
