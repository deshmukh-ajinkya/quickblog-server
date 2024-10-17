import express from 'express';
import uri from '../constants/uri';
import {
  registerController,
  loginController,
  getOtpController,
  resetController,
  updateProfileController,
  getAllBlogController,
  getCommentController,
  likeBlogController,
  addCommentController,
  createBlogController,
  deleteBlogController,
  updateBlogController,
  getBlogInsightController
} from '../controllers';
import { authenticate, upload } from '../middlewares';

const routes = express.Router();

/* user */
routes.post(uri.register, registerController);
routes.post(uri.login, loginController);
routes.post(uri.get_otp, getOtpController);
routes.post(uri.reset, resetController);
/* blog */
routes.post(uri.update_profile, authenticate, updateProfileController);
routes.post(uri.get_all_blog, authenticate, getAllBlogController);
routes.post(uri.get_comment, authenticate, getCommentController);
routes.put(uri.like_blog, authenticate, likeBlogController);
routes.post(uri.add_comment, authenticate, addCommentController);
routes.post(uri.create_blog, authenticate, upload.single('bannerImg'), createBlogController);
routes.put(uri.update_blog, authenticate, upload.single('bannerImg'), updateBlogController);
routes.delete(uri.delete_blog, authenticate, deleteBlogController);
routes.post(uri.get_blog_insight, authenticate, getBlogInsightController);

export default routes;
