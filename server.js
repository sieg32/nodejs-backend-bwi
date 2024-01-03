const express = require('express');
const user = require('./routes/user'); // Import user routes
const admin = require('./routes/admin'); // Import admin routes
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Create an Express server
const server = express();
server.use(express.json()); 

//  routes for '/user' and '/admin'
server.use('/user', user);
server.use('/admin', admin);


// Define an asynchronous function to start the server
async function start() {
    try {
        // Connect to the MongoDB database using the provided URI
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Database connected'); 
    } catch (error) {
        console.log('Error while connecting to the database:', error); 
    }

    // Start the server and listen on the port from environment variables
    server.listen(process.env.PORT, console.log(`Server started at port: ${process.env.PORT}`));
}

// Call the start function to initiate the server
start();
