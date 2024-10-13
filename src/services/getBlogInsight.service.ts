import { Request } from 'express';
import BlogModel from '../model/blog.model';

export const getBlogInsightService = async (request: Request): Promise<object> => {
  const { userID, fromDate, toDate } = request.body;

  try {
    // 1. Most liked category
    const mostLikedCategory = await BlogModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        }
      },
      { $unwind: { path: '$likes', preserveNullAndEmptyArrays: true } }, // Preserves blogs with no likes
      {
        $group: {
          _id: '$category',
          totalLikes: { $sum: { $cond: [{ $ifNull: ['$likes', false] }, 1, 0] } } // Count likes only if they exist
        }
      },
      { $sort: { totalLikes: -1 } },
      { $limit: 1 }
    ]);

    // 2. All posts created by user with like counts
    const userPosts = await BlogModel.find({
      author: userID,
      createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }
    })
      .select('title likes createdAt')
      .lean()
      .exec();

    const postsTable = userPosts.map((post) => ({
      title: post.title,
      likeCount: post.likes.length || 0, // Default to 0 if no likes
      createdAt: post.createdAt
    }));

    // 3. Most liked blog post
    const mostLikedBlog = await BlogModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        }
      },
      {
        $project: {
          title: 1,
          likeCount: { $size: { $ifNull: ['$likes', []] } } // Handle cases with no likes
        }
      },
      { $sort: { likeCount: -1 } },
      { $limit: 1 }
    ]);

    // 4. Visitors count
    const visitorCount = await BlogModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        }
      },
      { $unwind: { path: '$likes', preserveNullAndEmptyArrays: true } }, // Preserves blogs with no likes
      {
        $group: {
          _id: '$author',
          totalVisitors: { $sum: { $cond: [{ $ifNull: ['$likes', false] }, 1, 0] } } // Count distinct authors with likes
        }
      }
    ]);

    return {
      mostLikedCategory: mostLikedCategory[0] || null,
      postsTable,
      mostLikedBlog: mostLikedBlog[0] || null,
      visitorCount: visitorCount.length ? visitorCount[0].totalVisitors : 0
    };
  } catch (error) {
    throw new Error(`Error fetching blog insights: ${error.message}`); // Improved error handling
  }
};
