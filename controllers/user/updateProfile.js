const express = require('express');
const router = express.Router();
const upload = require('../../config/multerConfig'); 
const Profile = require('../../models/Profile');

// Fetch Profile Data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the profile and specify which fields to include
        const profile = await Profile.findOne(
            { userId },
            'profilePicture name age gender bio interests images prompts location ' 
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit Profile Controller
const editProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Ensure userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Prepare the update data from request body
        const profileUpdate = { ...req.body };

        // Handle single file upload for profilePicture
        if (req.files && req.files['profilePicture'] && req.files['profilePicture'].length > 0) {
            profileUpdate.profilePicture = req.files['profilePicture'][0].path; // Note [0] to access the single file
        }

        // Handle multiple file uploads for images
        if (req.files && req.files['images']) {
            profileUpdate.images = req.files['images'].map(file => file.path);
        }

        // Find and update the profile
        const profile = await Profile.findOneAndUpdate(
            { userId },
            profileUpdate,
            { new: true, runValidators: true }
        );

        // Check if profile was found and updated
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Respond with the updated profile
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getProfile,
    editProfile
};