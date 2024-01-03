const express = require('express');
const { getAllUsers } = require('../controllers/userFunc');
const register = require('../controllers/register');
const authenticate = require('../middleware/authenticate');
const route = express.Router();
const multer = require('multer');


const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// routes and corresponding controllers
route.get('/getUser', authenticate, getAllUsers); // Route for getting all users with authenticate middleware
route.post(
  '/register',
  [
    (req, res, next) => {
      req.isAdmin = true; // Set isAdmin flag to true in the request object so the next controller will store isAdmin as true in database
      next();
    },
    uploads.single('profile'), // profile upload is handled by this
  ],
  register // register controller
);

module.exports = route; 
