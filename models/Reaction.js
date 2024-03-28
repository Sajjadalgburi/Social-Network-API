const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    require: true,
    maxlength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ! Use a getter method to format the timestamp on query

// Initilizing createdAt virtual to format the date
reactionSchema.virtual("createdAt").get(function () {
  return this.createdAt.toLocaleDateString();
});

module.exports = reactionSchema;
