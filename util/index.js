const {
  getRandomName,
  getRandomReplies,
  getRandomEmail,
  getRandomThought,
  getRandomReactions,
} = require("./seed");
const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => {
  console.error("Connection error:", err);
});

connection.once("open", async () => {
  console.log("Connected!");

  try {
    // Delete the collections if they exist
    await Promise.all([
      connection.dropCollection("users").catch(() => {}),
      connection.dropCollection("thoughts").catch(() => {}),
    ]);

    // Create empty array to hold the users
    const users = [];

    // Create empty array to hold the thoughts
    const thoughts = [];

    for (let i = 0; i < 10; i++) {
      const username = getRandomName();
      const email = getRandomEmail();
      const replies = getRandomReplies();
      const thoughtText = getRandomThought();
      const reactions = getRandomReactions(); // Ensure getRandomReactions returns an array

      // Check if reactions is an array
      if (!Array.isArray(reactions)) {
        throw new Error("Reactions is not an array");
      }

      const reactionObjects = reactions.map((reaction) => ({
        // Convert each reaction string to an object
        reactionBody: reaction,
        username: getRandomName(),
        createdAt: new Date(),
      }));

      // Create user document
      const user = await User.create({ username, email });

      // Create thought document associated with the user
      const thought = await Thought.create({
        reactions: reactionObjects,
        replies,
        username: user.username, // Assign username to thought's username field
        thoughtText,
      });

      // Push thought into user's thoughts array
      user.thoughts.push(thought);

      // Save user (to update thoughts array)
      await user.save();

      thoughts.push(thought);
      users.push(user);
    }

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the connection after seeding
    await connection.close();
  }
});
