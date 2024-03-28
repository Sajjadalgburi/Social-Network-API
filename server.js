const express = require("express"); // Importing the express module
const db = require("./config/connection"); // Importing the MongoDB connection from the ./config/connection file
const routes = require("./routes/index"); // Importing routes from the ./routes/index file
const app = express();

const PORT = 3001; // Setting the port number

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Middleware to parse incoming requests with URL-encoded payloads
app.use(routes); // Using custom defined routes

// Once the database connection is open, start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
