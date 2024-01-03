const jwt = require('jsonwebtoken');

// Middleware function for authenticating users using JWT
async function authenticate(req, res, next) {
    // Check if the request headers contain a token
    if (req.headers.token) {
        // Extract the token from the Authorization header
        const token = req.headers.token.split(' ')[1];

        try {
            // Verify the token using the JWT_SECRET_KEY from the environment variables
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            // Set token information in the request object
            req.tokenId = decoded.id;
            req.isAdmin = decoded.isAdmin;
            console.log(decoded); // Log the decoded token information

            // Continue to the next route handler
            next();
        } catch (error) {
            // Handle token verification errors
            res.status(401).send('Unauthorized: Invalid token');
        }
    } else {
        // If no token is provided in the headers, respond with Unauthorized status
        res.status(401).send('Unauthorized: No token provided');
    }
}

module.exports = authenticate; 
