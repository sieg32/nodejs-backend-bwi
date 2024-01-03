const express = require('express');
const route = express.Router();
const register = require('../controllers/register')
const userLogin = require('../controllers/userLogin')
const {updateUser, deleteUser, getSingleUser} = require('../controllers/userFunc')
const getImage = require('../controllers/getImage')
const authenticate = require('../middleware/authenticate')
const multer = require('multer');




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
        
//         cb(null, '../uploads/');
//     },
//     filename: function (req, file, cb) {
      
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
 const storage = multer.memoryStorage();
const uploads = multer({storage:storage});


route.post('/register',uploads.single('profile'),register);

route.get('/login',userLogin);
route.patch('/:id',[authenticate ,uploads.single('profile'),updateUser]);
route.delete('/:id',[authenticate, deleteUser]);
route.get('/:id',[authenticate, getSingleUser]);
route.get('/:id/profile',getImage)

module.exports = route;