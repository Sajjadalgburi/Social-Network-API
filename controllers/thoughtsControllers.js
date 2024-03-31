const { Thought, User } = require("./../models");

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

  async updateThought(req, res) {
    try {
      const id = req.params.thoughtId;
      const { thoughtText, username } = req.body;

      // Check if thoughtId is provided
      if (!id) {
        return res.status(400).json({ message: "thought ID is required" });
      }

      // Check if thoughtText and username are provided
      if (!thoughtText || !username) {
        return res
          .status(400)
          .json({ message: "thoughtText and username are required" });
      }

      const thought = await Thought.findByIdAndUpdate(
        id,
        { thoughtText, username },
        { new: true } // Returns the modified document rather than the original
      );

      // If thought not found, send a 404 response and return to exit the function
      if (!thought) {
        return res.status(404).json({
          message: `Thought with ID ${id} not found`, // Fixed typo here
        });
      }

      // Send a JSON response indicating successful thought retrieval
      res.status(200).json({ message: "Thought updated", thought });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const _id = req.params.thoughtId;

      const thought = await Thought.findByIdAndDelete(_id);

      // If thought not found, send a 404 response and return to exit the function
      if (!thought) {
        return res
          .status(404)
          .json({ message: `Thought with ID ${_id} not found` });
      }

      // Send a JSON response indicating successful thought retrieval
      res.status(200).json({ message: "Thought deleted from database!" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const results = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!results) {
        return res.status(404).json({ message: "No Thought with this id!" });
      }

      res.status(200).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const results = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!results) {
        return res.status(404).json({ message: "No Thought with this id!" });
      }

      res.status(200).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
