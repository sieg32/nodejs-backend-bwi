const userModel = require('../schema/userSchema');

async function getImage(req, res) {
    try {
        const user = await userModel.findById(req.params.id).select('profileImg');

        if (!user || !user.profileImg) {
            return res.status(404).send('Image not found');
        }

      
        res.setHeader('Content-Type', 'image/jpeg');

        
        res.send(user.profileImg.file);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getImage;
