const express = require('express');
const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const salt = 10;

// Function to hash the user's password using bcrypt
async function hashPassword(password) {
    let hashedPassword = '';
    try {
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    return hashedPassword;
}

// Controller function for user registration
async function register(req, res) {
    try {
        // Validate presence of email and phone number in the request body
        if (!req.body.email || !req.body.phone) {
            return res.status(400).json({ error: 'Validation failed', message: 'Provide email and phone number' });
        }

        // Validate email format using a regular expression
        if (!/\S+@\S+\.\S+/.test(req.body.email)) {
            return res.status(400).json({ error: 'Validation failed', message: 'Invalid email format' });
        }

        // Create user data including hashed password and profile image
        // if this request came from admin route isAdmin is set to true 
        const data = {
            ...req.body,
            password: await hashPassword(req.body.password),
            profileImg: {
                name: req.file.originalname,
                file: req.file.buffer
            },
            isAdmin: (req.isAdmin) ? req.isAdmin : false // req.isAdmin is set true by the middleware from admin register route 
        };

        // Save user data to the database using the userModel
        await userModel.create(data);

        // Send a success response if user registration is successful
        res.status(200).json({ success: true });
    } catch (error) {
        // Handle internal server errors and log the error
        console.error(error);
        res.status(500).json({ error: 'Error saving user data' });
    }
}

module.exports = register; 
