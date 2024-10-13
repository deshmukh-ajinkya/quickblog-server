import { Request } from 'express';
import { BlogModel } from '../model';

// Service to delete a blog post
export const deleteBlogService = async (request: Request): Promise<object> => {
  try {
    const { blogId } = request.body; // Get blogId from the body
    // const userId = request.user._id; // Extract user ID from the authenticated token

    if (!blogId) {
      throw new Error('Blog ID is required');
    }

    // Find the blog by its ID
    const blog = await BlogModel.findById(blogId);

    // Check if the blog exists
    if (!blog) {
      throw new Error('Blog not found');
    }

    // Check if the authenticated user is the author of the blog
    // if (blog.author.toString() !== userId.toString()) {
    //   throw new Error('You are not authorized to delete this blog');
    // }

    // Delete the blog
    await blog.deleteOne(); // This will delete the blog from the database

    return {
      success: true,
      message: 'Blog deleted successfully'
    };
  } catch (error) {
    throw new Error(error.message || 'An error occurred while deleting the blog');
  }
};
