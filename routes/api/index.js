// Importing the Express Router module
const router = require("express").Router();

// Importing userRoutes module to handle user-related routes
const userRoutes = require("./userRoutes");

// Importing thoughtRoutes module to handle thought-related routes
const thoughtRoutes = require("./thoughtRoutes");

// Mounting userRoutes under the '/users' base path
router.use("/users", userRoutes);

// Mounting thoughtRoutes under the '/thoughts' base path
router.use("/thoughts", thoughtRoutes);

// Exporting the router instance to make it available for use in other modules
module.exports = router;
