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

  async getSingleThought(req, res) {
    try {
      const _id = req.params.thoughtId;

      const thought = await Thought.findById(_id).select("-__v");

      // If thought not found, send a 404 response and return to exit the function
      if (!thought) {
        return res
          .status(404)
          .json({ message: `Thought with ID ${_id} not found` });
      }

      // Send a JSON response indicating successful thought retrieval
      res.status(200).json({ message: "Thought found", thought });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};