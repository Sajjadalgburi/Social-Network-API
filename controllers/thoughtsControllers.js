const { Thought } = require("./../models");
const { reactionSchema } = require("./../models/Reaction");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      // Retrieve all thoughts from the database, excluding the '__v' field
      const results = await Thought.find().select("-__v");

      // Respond with HTTP status code 500 (Internal Server Error) and the retrieved thoughts in JSON format
      res.status(500).json(results);
    } catch (err) {
      // If an error occurs during execution, log the error to the console
      console.error(err);
      // Respond with HTTP status code 500 (Internal Server Error) and the error details in JSON format
      res.status(500).json(err);
    }
  },
};
