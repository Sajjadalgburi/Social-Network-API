const { Thought, User } = require("./../models");
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
  // Assuming you have User and Thought schemas defined

  // In your createThought function

  async createThought(req, res) {
    try {
      // Create the thought
      const newThought = await Thought.create(req.body);

      // If thought not found, send a 404 response and return to exit the function
      if (!newThought) {
        return res.status(404).json({ message: `Cannot create new thought` });
      }

      // Get the user associated with the thought
      const user = await User.findById(req.body.userId);

      // If user not found, send a 404 response and return to exit the function
      if (!user) {
        return res.status(404).json({ message: `User not found` });
      }

      // Push the created thought's _id to the associated user's thoughts array
      user.thoughts.push(newThought._id);

      // Save the updated user document
      await user.save();

      // Send a JSON response indicating successful creation of new thought
      res.json({ message: `Created new thought: ${newThought._id}!` });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
