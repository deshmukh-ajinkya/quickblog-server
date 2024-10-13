import { Request, Response } from 'express';
import { UserModel } from '../model';

// Controller to update user profile
export const updateProfileService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body; // Assuming userId is passed as a route param
    const { name, email, profilePic } = req.body;

    // Validate the required fields
    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required.' });
      return;
    }

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Update the user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;

    // Save the updated user details
    await user.save();

    // Return the updated user profile
    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile.' });
  }
};
