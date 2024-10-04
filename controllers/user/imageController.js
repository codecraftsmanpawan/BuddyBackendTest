const Image = require('../../models/Image');

// Function to handle uploading base64 image
const uploadImage = async (req, res) => {
    try {
        const { base64Data, contentType } = req.body;

        if (!base64Data) {
            return res.status(400).json({ message: 'Base64 image data is required' });
        }

        // Create a new Image instance
        const newImage = new Image({
            base64Data,
            contentType,
        });

        // Save the image to the database
        await newImage.save();

        res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    uploadImage,
};
