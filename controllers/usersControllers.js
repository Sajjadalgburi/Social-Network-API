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
};
