const Profile = require('../../models/Profile');

// Update FCM token
exports.updateFcmToken = async (req, res) => {
    const { profileId } = req.params; 
    const { fcmToken } = req.body;   

    try {
        // Check if the fcmToken is provided
        if (!fcmToken) {
            return res.status(400).json({ message: 'Token not found' });
        }

        // Find the profile by profileId and update the fcmToken
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            { fcmToken: fcmToken },
            { new: true } 
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Respond with a success message only
        return res.status(200).json({
            message: 'FCM token updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating FCM token',
            error: error.message
        });
    }
};
