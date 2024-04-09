const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/photos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model for storing photos
const PhotoSchema = new mongoose.Schema({
    imageData: String
});
const Photo = mongoose.model('Photo', PhotoSchema);

// Route to save photo to database
app.post('/save-photo', async (req, res) => {
    try {
        const imageData = req.body.imageData;

        // Create a new photo instance
        const newPhoto = new Photo({
            imageData: imageData
        });

        // Save the photo to the database
        await newPhoto.save();

        res.json({ success: true, message: 'Photo saved to database' });
    } catch (error) {
        console.error('Error saving photo:', error);
        res.status(500).json({ success: false, message: 'Error saving photo' });
    }
});





function captureImage() {
    // Draw the current frame from the video onto the canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a base64 encoded image
    const base64Image = canvas.toDataURL('image/jpeg');

    // Send the captured image data to the backend for saving
    fetch('/save-photo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageData: base64Image })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Photo saved successfully');
        } else {
            console.error('Failed to save photo:', data.message);
        }
    })
    .catch(error => {
        console.error('Error saving photo:', error);
    });
}






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
