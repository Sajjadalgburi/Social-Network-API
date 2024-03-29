const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    // Fetch all users and their associated thoughts, excluding '__v' field
    const results = await User.find()
      .select("-__v")
      .populate({ path: "thoughts", select: "-__v" });

    // Send HTTP response with fetched results
    res.status(200).json(results);
    try {
    } catch (err) {
      // Handle any errors and send an internal server error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      // Create a new user with the data from the request body
      const results = await User.create(req.body);

      // Send a JSON response indicating successful user creation
      res.json({ message: `Created user: ${results}!` });
    } catch (err) {
      // Handle any errors and send an internal server error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      // Find a single user by ID, excluding '__v' field, and populate their thoughts and friends
      const results = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });

      // If user not found, send a 404 response
      if (!results) {
        res
          .status(404)
          .json({ message: `User with ID ${req.params.userId} not found` });
      }

      // Send a JSON response indicating successful user retrieval
      res.status(200).json({ message: "User found", results });
    } catch (err) {
      // Handle any errors and send an internal server error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const { username, email } = req.body;

      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if username and email are provided
      if (!username || !email) {
        return res
          .status(400)
          .json({ message: "Username and email are required" });
      }

      // Find and update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true } // Returns the modified document rather than the original
      );

      // If user not found, return 404
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: `User with ID ${userId} not found` });
      }

      // Return the updated user
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Find and delete user
      const deletedUser = await User.findByIdAndDelete(userId);

      // If user not found, return 404
      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: `User with ID ${userId} not found` });
      }

      // Return the deleted user
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addFriend(req, res) {
    try {
      // Find the user by ID and update their 'friends' array by adding the new friend
      const results = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } }, // Using $addToSet to avoid adding duplicate friends
        { new: true, runValidators: true } // Return the updated document and run validators
      );

      // If no user found, send a 404 response
      if (!results) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      // Send a JSON response with the updated user object
      res.status(200).json(results);
    } catch (err) {
      // Handle any errors and send an internal server error response
      console.error(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const userId = req.params.userId;

      // Find the user by ID and update their 'friends' array by removing the specified friend
      const results = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: { friendId: req.params.friendId } } }, // Using $pull to remove the specified friend
        { new: true } // Return the updated document
      );

      // If no user found, send a 404 response
      if (!results) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      // Send a JSON response with the updated user object
      res.status(200).json(results);
    } catch (err) {
      // Handle any errors and send an internal server error response
      console.error(err);
      res.status(500).json(err);
    }
  },
};
