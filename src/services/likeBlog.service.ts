import { Request } from 'express';
import { BlogModel } from '../model';

export const likeBlogService = async (request: Request): Promise<object> => {
  const { blogId, userId } = request.body;
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new Error('Blog not found');
  }

  // Check if user has already liked the blog
  const hasLiked = blog.likes.includes(userId);

  if (hasLiked) {
    // If user has already liked, remove the like (unlike functionality)
    blog.likes = blog.likes.filter((like) => like.toString() !== userId);
  } else {
    // Add the user's ID to the likes array
    blog.likes.push(userId);
  }

  // Save the blog document after the update
  await blog.save();

  // Return the updated like count
  return { likeCount: blog.likes.length };
};
