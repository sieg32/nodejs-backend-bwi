const express = require('express');
const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const salt =10;

async function hashPassword(password){
    let hashedPassword='';
    try{
       hashedPassword =   await bcrypt.hash(password, salt);
    }catch(error){
        console.log(error);
    }

    return hashedPassword;
}

async function register(req, res) {
    
    try {
        // Validate presence of email and phone number
        if (!req.body.email || !req.body.phone) {
            return res.status(400).json({ error: 'Validation failed', message: 'Provide email and phone number' });
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(req.body.email)) {
            return res.status(400).json({ error: 'Validation failed', message: 'Invalid email format' });
        }

        // Create user data including profile image
        const data = {
            ...req.body,

            password:await hashPassword(req.body.password),
            profileImg: {
                name: req.file.originalname,
                file: req.file.buffer
            },
            isAdmin:(req.isAdmin)? req.isAdmin: false
        };

        // Save user data to the database
        await userModel.create(data);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving user data' });
    }
}

module.exports = register;
