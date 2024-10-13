import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bannerImg: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'technology'] // Fixed set of options
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BlogModel = mongoose.model('Blog', blogSchema);
export default BlogModel;
