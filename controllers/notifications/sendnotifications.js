const admin = require('../../firebase/notify');
const Notification = require('../../models/notifications');


const sendNotification = async ({ token, userId, title, body, actions, data }) => {
  try {
    // Create a notification object in the database
    const notification = new Notification({
      userId: userId,
      title: title || '',
      body: body || '',
      data: data || {},
      actions: actions || []
    });
    await notification.save();

    // Build the message to send via Firebase
    const message = {
      token: token,
      notification: {
        title: title || '',
        body: body || ''
      },
      android: {
        notification: {
          clickAction: data?.clickAction || 'FLUTTER_NOTIFICATION_CLICK'
        }
      },
      webpush: {
        notification: {
          actions: actions || []
        }
      },
      data: data || {}
    };

    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Failed to send notification');
  }
};

module.exports = { sendNotification };