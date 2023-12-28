## Server side park code
 // import express from "express";
// import bcrypt from "bcryptjs";
// import { User } from "../models";
// // import keys, { app } from "../config/keys";
// import jwt from "jsonwebtoken";
// import { requireAuth } from "../middleware";


// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     // const { lat, lng } = req.query;
//     const response = await axios({
//       method: "POST",
//       url: "https://pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com/nearby-basic",
//       headers: {
//         "content-type": "application/json",
//         "X-RapidAPI-Key": "a8cae885b6msha39d1a7a8eccfd1p1759bajsn2ffd7e679a1f",
//         "X-RapidAPI-Host":
//           "pipican-dog-park-and-dog-beach-locator-api.p.rapidapi.com",
//       },
//       data: {
//         coords: 
//         // { lat, lng }
//         { 
//           lat: 41.378442396701416, 
//           lng: 2.0965230925291145 
//         },
//         radius: 1,
//         leisure: "dog_park",
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// export default router;







# PSUEDOCODE

## bin/www
sets up basic HTTP server to serve express application

1. Import module dependencies

2. Configure Port
  -set port from environment variable or default to 3001
  -configure port for Express app

3. Create HTTP server with Express app

4. Listen on configured port
  -set event listener for 'error' and 'listening' on server

5. Define function `normalizePort`
  -convert input to valid port number or named pipe

6. Define function `onError` for handling server errors
 -handle common errors like access denied or address in use
 -log error message and exit process

7. Define function `onListening` for handling server start
 -log that the server is listening on t a particular port or pipe

8. Start the server on the configured port      


## config/app.config.js

1. Set PORT to environment's PORT value or default to 3001. Set API_URL to environment's API_URL value or default to `/api`
2. Export PORT, export API_URL

## config/db.config.js
remove

## config/keys.js
1. Set app configuration
  - name as "Mern Social Media"
  - apiEndpoint as environment's API_URL or default to "/api"

2. Set database configuration
  - url as environment's MONGODB_URI or a predefined MongoDB URL
  - name as environment's MONGODB_NAME or default to "capstone"

3. Set jwt configuration
  - secret as environment's JWT_SECRET or default to "jwt-secret"
  - tokenLife as "7d"

4. Export the configuration object


## controllers/api.controller.js

1. Define function `healthCheck` with parameters req, res, next
  -Send response of 'ok'

2. Export `healthCheck`  


## controllers/auth.js
empty

## controllers/file.controller.js

1. Import necessary modules: error, path, uuid

2. Define async function uploadImage with parameters req, res, next
  -Lof req.files
  -If no files in req.files
    send response with status 400 and error message
  -extract image from req.files
  -generate unique image name using uuid
  -set upload path in 'public/images' directory
  -move image to upload path
    -if error occurs,send response with status 500
    -if no error, send response with JSON containing image path

3. Export uploadImage


## controllers/index.js
empty

## middleware/errorHandler.js
1. Define error-handling middleware function with parameters error, req, res, next
2. Set response local variables
  -set `res.locals.message` to error's message
  -set `res.locals.error` to full error object if in `deployment` enviroment, otherwise an empty string
3. Error handling
  -if error is a `NotFoundError`
   -send response with status 404
  -if error is `CastError`
   -send response with status 400
  -if error is a `ValidationError`
   -send response with status 400
  -if error is a `JsonWebTokenErro`
   -send response with status 401
  -otherwise pass error to next middleware
4. Export the middleware funtion     

## middleware/logger.js
1. Define function info with parameters ...params
  -If application environment is not 'test', log parameters to console

2. Define middleware function requestLogger with parameters request, response, next
  -use info function to log
    - HTTP method of the request
    - Path of the request
    - Body of the request
  -cakk next() to pass control to the next middleware

3. Export requestLogger


## middleware/index.js

## middleware/requireAuth.js
1. Import modules
2. Define asynchronous middleware function with parameters req, res, next
  -getauthorization header from req
  -if authorization header is missing, send response with status 401 and error message
  -extract token from authorization header
  -verify token using jwt.verify
    -if verification fails, send response with status 401 and error message
    -otherwise
      -extract user id from token payload
      -find user by id using User model
        -attach user data to req.user
        -call next() to pass control to next middleware

3. Export the middleware function

## models/index.js

## models/post.js
1. Import mongoose library

2. Set ObjectId from mongoose.Schema.Types for reference fields

3. Define postSchema with mongoose.Schema
   -text field as String, required, maximum length 500
   -author field as ObjectId, referencing "User"
   -created field as Date, default to current date and time
   -likes field as array of ObjectId, each referencing "User"
   -comments field as array of objects  - -containing:
     -text field as String, required, maximum length 500
     -author field as ObjectId, referencing "User"
     -created field as Date, default to current date and time

4. Enable timestamps for postSchema (createdAt and updatedAt fields)

5. Create Post model using postSchema

6. Export Post model

## models/user.js
1. Import mongoose library

2. Set ObjectId from mongoose.Schema.Types for reference fields

3. Define userSchema with mongoose.Schema
    -username field as String, unique and required
    -role field as Number, with min value 1, max value 3, default value 3
    -dog field as an object containing:
    -name field as String
    -breed field as String
    -size field as String
    -email field as String, with a specific pattern for validation
    -passwordHash field as String
    -zipcode field as Number, with a maximum value of 99999
    -profile_image field as String, default value "stored photo"
    -posts field as an array of ObjectId, each referencing "Post"
    -postLikes field as an array of ObjectId, each referencing "Post"

4. Create User model using userSchema

5. Export User model



## routes/auth.js 

1. Import necessary libraries and modules

2. Create Express router

3. Define a GET route at base path'/'
   -respone with string 'auth endpoint' for health checks or basic testing

4. Define a POST route at '/signup'
  -Check if username, password, and email are provided. If not, send error response.
  -Verify the password meets length requirements
  -Verify the password and confirm password match. If not, send error response.
  -Search for existing user with same username or email. 
   -If user exists respond with error
   -If user does not exist 
    -hash the password
    -create new User with username, email, dogName, dogBreed, dogSize, zipcode, passwordHash, and profile_image.
    -save user to database
    -for success, respond with success message
    -for failure, console.log error
  
5. Define a POST route at '/signin'
  -Check if username and password are provided. If not, send error response.
  -Fetch user by username and compare provided password with hashed password in DB.
  -If credentials are correct, generate a JWT token
  -Send response with the token and user details  

6. Export the router 


## routes/files.js

1. Import necessary libraries and modules

2. Create `fileRoutes` using router

3. Define a POST route at path `/images` to handle image uploads
  -use `uploadImage` controller to process the incoming image data

4. Export `fileRoutes`



## routes/index.js


## routes/users.js 

1. Import necessary libraries and modules

2. Create Express router

3. Define a GET route at '/users/:username' to retrieve user details including their posts.
  -extract the `username` from the request parameters
  -Define a `populateQuery` for related posts and author details
  -Find the user in the database using `username` and poluate their posts
   -Return user details if found
   -Return error if not found

4. Define a PUT route at '/users/:username' to update user details. Protect this route with the `requireAuth` middleware.
  -Extract user data, password, current password, confirm password from the request body and username from request parameters.
  -If password update is requested, validate new password and check if current password is correct.
   -If valid hash the new password and save it
  -If user details (other than password) are requested use `findOneAndUpdate` to update user's data using `$set`
  -return updated user data

5. Define a PUT route at `/users/:username/avatar` to update user's avatar. Protect this route with the `requireAuth` middleware.
  -extract `username` from url, `req.params`
  -check if file is uploaded, if not send 400 response error message
  -retrieve image file from request assign to variable `profileImage`
  -generate unique name for image using `uuid()` and assign to `imageName`
  -create path to save image on the server using `path.join()` and assign to variable `uploadPath`
  -use `mv()` to move image to the `uploadPath`, if erroro respond with 500
  -assign `imagePath` to new image path
  -update User profile in db. `User.findOneAndUpdate` method is used to find user by `username` and update the `profile_image` with `imagePath` using $set 


6.  Define a PUT route at `/users/:username/dog/images` to update dog image. Protect this route with the `requireAuth` middleware.
  -extract `username` from url, `req.params`
  -check if file is uploaded, if not send 400 response error message
  -retrieve image file from request assign to variable `dogImage`
  -generate unique name for image using `uuid()` and assign to `imageName`
  -create path to save image on the server using `path.join()` and assign to variable `uploadPath`
  -use `mv()` to move image to the `uploadPath`, if erroro respond with 500
  -assign `imagePath` to new image path
  -update User profile in db. `User.findOneAndUpdate` method is used to find user by `username` and uses `$push` operator to add new image URL to `dog.images`
  -`{new: true}` ensures the update document is returned. 

6. Define a GET route at `/users/search`
  -Extract search parameters zipcode, breed, username and size from request query string
  -use the `$or` operator in MongoDB to find users matching provided criteria
  -return list of users matching the search

7. Export the Router 
    
## routes/posts.js

1. Import necessary libraries and modules

2. Define a GET route at base path'/' to retrieve all posts along with their authors, comments and likes
   -define a `populateQuery` that has author and comments' author information and likes in each post
   -fetch all posts from the database, sorted by creation date in descending order, and populate them with `populateQuery`
   -send posts as a JSON response

3. Define a POST route at base path'/' to create a new post. Protect this route with the `requireAuth` middleware.
   -Extract the post text from the request body and authenticate the user's ID 
   -Create new post witht this data
   -handle file uploads
    -check if `req` contains any files using `files` property and for file with  `images` key 
    -if image exists retrieve and store as variable `postImage`
    -generate a unique image name using `uuid()` get the file extension using `path.extname(postImage.name)` 
    -set path for upload using `path.join()`
    -use `mv()` to move file to `uploadPath`. use await as this is an async operation
    -update `post` object to have reference to the image path
   -Save post to database, update the user's post 
   -Send saved post as JSON response

4. Define a GET route at path `/:id` to retrieve a specific post by ID
   -define a `populateQuery` that has author and comments' author information
   -Extract the post ID from the request paramaters
   -Fetch teh post by it's ID, poulate it with `populateQuery`
   -If post exists, send it as a JSON response
   -If post doesn't exist send 404 status

5. Define a DELETE route at path `/:id` to delete a specific post by ID
   -Extract post ID from the request parameters
   -Delete the post from the database
   -If deletion is successful, return deleted post as JSON response
   -If deletion is not successful return 404 status

6. Define an ALL route at path `/like/:postID` to allow users to like or unlike a post. Protect this route with the `requireAuth` middleware.
   -Extract post ID and user from request
   -Fetch the post by its ID
   -If post is found, check if user has already liked it. If so, unlike it. If not, like it.
   -Update the post's likes and return result as JSON response

7. Define a PUT route at path `/comments` that allows users to add comments to a post
   -Extract comment text, userID, and post ID from the request body
   -Create a comment object and add it to the specified post
   -Update post in database, populate it with author information for comments 
   -Send updated post as JSON response

8. Export the Router         


## utils/index.js
1.Define function getTokenFrom with parameter request
  -Set authorization to the 'authorization' header from request
   -if authorization exists AND starts with 'bearer ' (case-insensitive), return the part of authorization after the 'bearer ' prefix
   -if not return null

2. Export getTokenFrom

## app.js
1. Import necessary modules

2. Initialize MongoDB connection with keys.database.url
   -configure mongoose with necessary options

3. Setup MongoDB connection event listeners
   -on 'connected', LOG 'connected to mongoDB'
   -on 'error', LOG error message

4. Initialize Express application

5. Apply middleware to the Express app
   -use logger in 'dev' mode
   -enable cors
   -parse incoming requests with JSON payloads
   -parse incoming requests with URL-encoded payloads
   -use cookieParser for parsing cookies in requests
   -serve static files from 'public' directory
   -use requestLogger for logging requests
   -use fileUpload for handling file uploads

6. Setup API router
  USE keys.app.apiEndpoint as base path for router

7. Handle 404 errors
  -use custom function to create and forward a 404 error to the next middleware

8. Use errorHandler for handling errors

9. Export the Express application



## seedDatabase.js






# Notes/Questions
for posts.js









