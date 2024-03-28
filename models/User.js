// Object deconstruct and grab require methods from mongoose
const { Schema, model } = require("mongoose");

// creatig a new instance of user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Initilizing friendCount virtual to grab length of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initilizing user model in the userSchema
const User = model("User", userSchema);

module.exports = User;
