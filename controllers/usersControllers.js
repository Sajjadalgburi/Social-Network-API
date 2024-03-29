const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    const results = await User.find()
      .select("-__v")
      .populate({ path: "thoughts", select: "-__v" });

    res.status.json(results);
    try {
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const results = await User.create(req.body);

      res.json({ message: `Created user: ${results}!` });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const results = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
          .populate({ path: "thoughts", select: "-__v" })
          .populate({ path: "friends", select: "-__v" })
      );

      if (!results) {
        res
          .status(404)
          .json({ message: `User with ID ${req.params.userId} not found` });
      }

      res.status(200).json({ message: "User found", results });
    } catch (err) {
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
};
