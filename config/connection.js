// Importing necessary modules from mongoose library
const { connect, connection } = require("mongoose");

// Connecting to the MongoDB database hosted locally on port 27017 with the database name "socialNetwork"
connect("mongodb://127.0.0.1:27017/socialNetwork");

// Exporting the connection object to be used elsewhere in the application
module.exports = connection;
