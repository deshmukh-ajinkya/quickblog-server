import { BlogModel } from '../model';

export const getAllBlogsService = async (): Promise<object> => {
  // Find all blogs and populate the author and comments fields
  const blogs = await BlogModel.find({})
    .populate('author', 'name') // Populate author's fullname and email
    .populate('comments'); // Optionally, populate the comments

  // Format the data if needed, for example, returning only the necessary fields
  return blogs.map((blog) => ({
    id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
    bannerImg: blog.bannerImg,
    category: blog.category,
    likesCount: blog.likes.length, // Number of likes
    commentsCount: blog.comments.length, // Number of comments
    createdAt: blog.createdAt
  }));
};
