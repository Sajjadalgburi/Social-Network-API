// Importing the Express Router module
const router = require("express").Router();

// Importing the API routes from the 'api' directory
const apiRoutes = require("./api");

// Using the imported API routes under the '/api' base path
router.use("/api", apiRoutes);

// Exporting the router instance to make it available for use in other modules
module.exports = router;
