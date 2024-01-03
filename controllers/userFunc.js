const userModel = require('../schema/userSchema');

// Function to check if the user has the required permissions
async function checkPermissions(req) {
    // Check if the user ID in the request parameters matches the token ID or if the user is an admin
    return req.params.id === req.tokenId || req.isAdmin;
}





// Controller for updating user data
async function updateUser(req, res) {
    // Check if the user has the required permissions
    if (await checkPermissions(req)) {
        try {
            let newData = {};

            // If a new name is provided in the request body, update it in the newData object
            if (req.body.name) {
                newData.name = req.body.name;
            }

            // If a file is uploaded, update the profileImg property in the newData object
            if (req.file) {
                newData.profileImg = {
                    name: req.file.originalname,
                    file: req.file.buffer,
                };
            }

            // Find and update the user data in the database
            const data = await userModel.findByIdAndUpdate(
                req.params.id,
                newData,
                { new: true }
            );

            // If no user is found with the provided ID, return a 404 error
            if (!data) {
                return res.status(404).json({
                    error: 'User not found',
                    message: 'No user found with the provided ID',
                });
            }

            // Send a success response if the update is successful
            res.status(200).json({ message: 'Update successful' });
        } catch (error) {
            // Handle internal server errors and log the error
            console.error(error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Unable to process the request',
            });
        }
    } else {
        // If the user does not have permission, return a 401 error
        res.status(401).json({
            error: 'Permission denied',
            message: 'Does not have permission to change userdata',
        });
    }
}








// Controller for deleting a user
async function deleteUser(req, res) {
    // Check if the user has the required permissions
    if (await checkPermissions(req)) {
        try {
            // Find and delete the user with the provided ID from the database
            const data = await userModel.findOneAndDelete({ _id: req.params.id });

            // If no user is found with the provided ID, return a 404 error
            if (!data) {
                return res.status(404).json({
                    error: 'User not found',
                    message: 'No user found with the provided ID',
                });
            }

            // Send a success response if the user is deleted
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            // Handle internal server errors and log the error
            console.error(error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Unable to process the request',
            });
        }
    } else {
        // If the user does not have permission, return a 401 error
        res.status(401).json({
            error: 'Permission denied',
            message: 'Does not have permission to delete user',
        });
    }
}






// Controller for getting a single user's data
async function getSingleUser(req, res) {
    // Check if the user has the required permissions
    if (await checkPermissions(req)) {
        try {
            // Find the user with the ID and exclude the password field from the result
            const data = await userModel.findById(req.params.id).select('-password');

            // If the user is found, send the data in the response
            if (data) {
                res.status(200).json({ data: data });
            } else {
                // If no user is found, send a message indicating data not found
                res.send('Data not found');
            }
        } catch (error) {
            // Handle internal server errors and log the error
            console.log(error);
            res.status(500).send('Internal server error');
        }
    } else {
        // If the user does not have permission, send a message indicating permission denied
        res.send('Permission denied');
    }
}








// Controller for getting all users (admin-only)
async function getAllUsers(req, res) {
    console.log(req.headers.token, req.isAdmin);
    // Check if the user is an admin
    if (req.isAdmin) {
        try {
            // Find all users in the database and exclude the password field from the result
            const data = await userModel.find({}).select('-password');

            // Send the data in the response
            res.status(200).json({ data: data });
        } catch (error) {
            // Handle internal server errors and log the error
            console.error(error);
            res.status(500).send('Internal server error');
        }
    } else {
        // If the user is not an admin, return a 501 status indicating permission denied
        res.status(501).send('Permission denied');
    }
}


module.exports = { updateUser, deleteUser, checkPermissions, getSingleUser, getAllUsers };
