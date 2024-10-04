const express = require('express');
const router = express.Router();
const { getProfileByUserId, getProfileById } = require('../controllers/user/profileGet');
const authenticateToken = require('../middleware/authenticateToken.js');
const { uploadImage } = require('../controllers/user/imageController.js');
const { getProfile, editProfile } = require('../controllers/user/updateProfile.js'); 
const { getProfileDetailsWithBookings } = require('../controllers/bookRide/offerFindRide');
const upload = require('../config/multerConfig'); 
const { getPrompts, getInterests } = require('../controllers/user/PromptInterestController');

router.get('/profile/:userId',authenticateToken, getProfileByUserId);

router.get('/profiles/by/profileId/:profileId',authenticateToken, getProfileById);

// Route to get all prompts
router.get('/prompts', getPrompts);

// Route to get all interests
router.get('/interests', getInterests);

// Route to upload image
router.post('/upload', uploadImage);

// Fetch profile data
router.get('/profileup//:userId', getProfile);

// Fetch profile 
router.get('/profile/get/:userId', getProfile);

router.get('/OfferFindRide/:id/details',authenticateToken, getProfileDetailsWithBookings);
// Route for updating profile with multer middleware
router.patch('/update/profile/:userId', 
    upload.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'images', maxCount: 5 }
    ]), 
    editProfile
);


module.exports = router;
