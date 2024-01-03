const jwt = require('jsonwebtoken');
const userModel = require('../schema/userSchema');
const bcrypt = require('bcrypt');

async function userLogin(req, res) {
    

    try {
        let data;

        if (req.body.email) {
            data = await userModel.findOne({ email: req.body.email });
        } else if (req.body.phone) {
            data = await userModel.findOne({ phone: req.body.phone });
        } else {
            return res.status(400).json({ error: 'Validation failed', message: 'Enter phone or email' });
        }

        if (!data) {
            return res.status(404).json({ error: 'Validation failed', message: 'Account not found' });
        }

        const result = await bcrypt.compare(req.body.password, data.password);

        if (result) {
            
            const token = jwt.sign({ id:data.id,name: data.name, email: data.email, isAdmin: data.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
            return res.json({ login: 'success', token: token });
        } else {
            return res.status(401).json({ error: 'Authentication failed', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error', message: 'Unable to process the request' });
    }
}

module.exports = userLogin;
