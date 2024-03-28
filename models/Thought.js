// Object deconstruct and grab require methods from mongoose
const { Schema, model } = require("mongoose");

// creatig a new instance of thoughtSchema schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "Must have a value!"],
      max: [280, "Value exceeds limit!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // (The user that created this thought)
    username: {
      type: String,
      required: true,
    },

    // (These are like replies)
    reactions: [reactionSchema], // Array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// ! Use a getter method to format the timestamp on query

// Initilizing reactionCount virtual to grab length of friends
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initilizing Thought model in the thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
