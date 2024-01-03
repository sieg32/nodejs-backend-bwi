const express = require('express');
const { getAllUsers } = require('../controllers/userFunc');
const register = require('../controllers/register')
const authenticate = require('../middleware/authenticate')
const route = express.Router();
const multer = require('multer')

const storage = multer.memoryStorage();
const uploads = multer({storage:storage});


route.get('/getUser', authenticate,getAllUsers)
route.post('/register',[(req,res,next)=>{
req.isAdmin = true;
next()
} ,uploads.single('profile')],register);


module.exports = route;