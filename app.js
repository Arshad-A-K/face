// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cv = require('opencv4nodejs');

const app = express();

// Middleware
app.use(bodyParser.json());

// Route for facial recognition
app.post('/recognize', (req, res) => {
    try {
        const base64Image = req.body.image;
        const imageBuffer = Buffer.from(base64Image.split(',')[1], 'base64');
        const mat = cv.imdecode(imageBuffer);

        // Perform facial recognition (replace this with your facial recognition logic)
        const recognizedGuest = 'John Doe'; // Sample result

        res.json({ success: true, guest: recognizedGuest });
    } catch (error) {
        console.error('Error recognizing face:', error);
        res.status(500).json({ success: false, message: 'Error recognizing face' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
