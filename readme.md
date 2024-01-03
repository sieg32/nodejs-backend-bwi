


# To install dependencies



  

    npm install

  

**after installation create a .env file in directory and provide "MONGO_URI" string to connect to mongodb database and a "JWT_SECRET_KEY" for jsonwebtoken as environment parameters**

    "MONGO_URI"="<Your mongodb url key here>"
    "JWT_SECRET_KEY"="<your secret key here>"

"


**#to test the application**

    npm start

  

## Node.js Backend with Express.js

### Overview

This project is a Node.js backend built using the Express.js framework. It serves as the backend for a web application, handling user registration, authentication, and basic user management functionalities.

  
  
  
  
  

## Project Structure

The project is organized into several directories, each serving a specific purpose:

  

**routes**: Contains route handlers for different parts of the application, grouped by functionality (**user.js** for user-related routes, **admin.js** for admin-specific routes).

  

**controllers**: Holds the logic for processing requests and interacting with the database (**register.js, userLogin.js, userFunc.js, getImage.js**).

  

**middleware**: Houses custom middleware functions used in route handling (**authenticate.js**).

  

**schema**: Defines Mongoose schemas for data models used in the application (userSchema.js).

  
  

**.env**: Configuration file for environment variables, including MongoDB connection URI and JWT secret key.

  
  
  
  
  

## Dependencies

Express: Web application framework for Node.js.

  

Mongoose: MongoDB object modeling tool for Node.js.

  

Bcrypt: Library for hashing passwords securely.

  

Multer: Middleware for handling multipart/form-data, used for file uploads.

  

Jsonwebtoken (JWT): Library for generating and verifying JSON Web Tokens for user authentication.

  
  
  
  
  

## Entry Point

The entry point of the application is server.js, where the Express server is configured, routes are defined, and the server is started.

  
  
  
  

## Authentication

User authentication is handled using JWT. The authenticate middleware checks for a valid JWT in the request headers, extracts user information, and sets them in the request object.

  
  
  
  
  

## Routes

**User Routes (user.js):**

  

**/register**: POST request for user registration.

**/login**: GET request for user login.

**/:id**: PATCH request to update user data.

**/:id**: DELETE request to delete a user.

**/:id** :GET request to retrieve a single user's data.

**/:id/profile**: GET request to retrieve a user's profile image.

  
  
  

 **Admin Routes (admin.js):**

  

**/users**: GET request to retrieve all users (admin-only).

**/register**: POST request for admin to register a user.

## Controllers

### register.js:

  

 - Logic for user registration.
   
  - Password hashing using Bcrypt.
  - storing user data in database.
   
  - File upload for user profile images.

### userLogin.js:

  


- Logic for user login authentication using email/phone and password.

- JWT token generation upon successful login.

### userFunc.js:

  

- checkPermissions: Function to check if the user has the required permissions.

- updateUser: Controller for updating user data (**normal user can only update his own data while admin can update data of any user**).

- deleteUser: Controller for deleting a user.(**normal user can only delete his own account while admin can delete any account**)

- getSingleUser: Controller for retrieving a single user's data.(**normal user can only access his own account data while admin can access any account**)

- getAllUsers: Controller for retrieving all users (admin-only).

- getImage.js: Controller for retrieving a user's profile image.

  
  
  
  

## Database Interaction

Mongoose is used to interact with a MongoDB database. The userSchema.js file defines the data model for users.

  

## Error Handling

Error handling is implemented throughout the application, providing appropriate status codes and messages for different scenarios.

  

## Future Considerations

**Logging**: Consider incorporating a dedicated logging library for more extensive and configurable logging, especially in production.

  

**Caching**: Depending on traffic patterns, consider implementing caching mechanisms for certain operations, such as image retrieval.

  

**Profile Image Handling**: Consider alternative methods for storing and serving profile images, such as using a separate file system or cloud storage. 
