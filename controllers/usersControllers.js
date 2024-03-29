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
};
