const jwt = require('jsonwebtoken');
const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');

// Controller function for user login
async function userLogin(req, res) {
    try {
        let data;

        // Check if login request contains an email or phone
        if (req.body.email) {
            // If email is provided, find user by email in the database
            data = await userModel.findOne({ email: req.body.email });
        } else if (req.body.phone) {
            // If phone is provided, find user by phone in the database
            data = await userModel.findOne({ phone: req.body.phone });
        } else {
            // If neither email nor phone is provided, return an error
            return res.status(400).json({ error: 'Validation failed', message: 'Enter phone or email' });
        }

        // Check if a user with the email/phone exists
        if (!data) {
            return res.status(404).json({ error: 'Validation failed', message: 'Account not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const result = await bcrypt.compare(req.body.password, data.password);

        // If the passwords match, generate a JWT token and send it in the response
        if (result) {
            const token = jwt.sign(
                { id: data.id, name: data.name, email: data.email, isAdmin: data.isAdmin },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '24h' }
            );
            return res.json({ login: 'success', token: token });
        } else {
            // If the passwords do not match, return an authentication error
            return res.status(401).json({ error: 'Authentication failed', message: 'Incorrect password' });
        }
    } catch (error) {
        // Handle internal server errors and log the error
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', message: 'Unable to process the request' });
    }
}

module.exports = userLogin; 
