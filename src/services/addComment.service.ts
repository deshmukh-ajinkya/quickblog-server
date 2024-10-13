import { Request } from 'express';
import CommentModel from '../model/comment.model';
import BlogModel from '../model/blog.model';

export const addCommentService = async (request: Request): Promise<object> => {
  const { blogID, authorID, content } = request.body;
  // Check if the blog post exists
  const blog = await BlogModel.findById(blogID);
  if (!blog) {
    throw new Error('Blog post not found');
  }

  // Create a new comment
  const newComment = await CommentModel.create({
    content,
    authorID,
    blogID
  });

  // Add the new comment to the blog's comments array
  blog.comments.push(newComment._id);
  await blog.save();

  return newComment;
};
