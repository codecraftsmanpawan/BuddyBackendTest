const express = require('express');
const router = express.Router();
const profileController = require('../controllers/fcmToken/fcmToken');

// Route to update FCM token using profileId
router.put('/fcm-token/:profileId', profileController.updateFcmToken);


module.exports = router;
