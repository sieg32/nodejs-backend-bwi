const express = require('express');
const route = express.Router();
const register = require('../controllers/register');
const userLogin = require('../controllers/userLogin');
const { updateUser, deleteUser, getSingleUser } = require('../controllers/userFunc');
const getImage = require('../controllers/getImage');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');

// multer for handling file uploads

const storage = multer.memoryStorage(); // Use memory storage for file uploads
const uploads = multer({ storage: storage }); 

// routes and corresponding controllers
route.post('/register', uploads.single('profile'), register); // Route for user registration
route.get('/login', userLogin); // Route for user login
route.patch('/:id', [authenticate, uploads.single('profile'), updateUser]); // Route for updating user data
route.delete('/:id', [authenticate, deleteUser]); // Route for deleting a user
route.get('/:id', [authenticate, getSingleUser]); // Route for getting a single user's data
route.get('/:id/profile', getImage); // Route for getting a user's profile image

module.exports = route; 
