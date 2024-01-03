const userModel = require('../schema/userSchema');

// Controller function to retrieve and send user profile image
async function getImage(req, res) {
    try {
        // Find the user by ID and select the 'profileImg' field
        const user = await userModel.findById(req.params.id).select('profileImg');

        // Check if the user or the profileImg field exists
        if (!user || !user.profileImg) {
            // If not found, return a 404 status with 'Image not found' message
            return res.status(404).send('Image not found');
        }

        // Set the Content-Type header to 'image/jpeg'
        res.setHeader('Content-Type', 'image/jpeg');

        // Send the user's profile image buffer in the response
        res.send(user.profileImg.file);
    } catch (error) {
        // Handle internal server errors and log the error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getImage; 
