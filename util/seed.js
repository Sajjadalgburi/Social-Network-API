const usernames = require("./usernameDb");

const replies = [
  "Wow, that's fascinating!",
  "I totally agree with you.",
  "Hmm, I hadn't thought about it that way before.",
  "Interesting point!",
  "I'm not sure I understand. Could you clarify?",
  "That's a unique perspective.",
  "I appreciate your insight.",
  "I respectfully disagree.",
  "Seems like a controversial topic!",
  "Thanks for sharing!",
  "Absolutely!",
  "I couldn't have said it better myself.",
  "I'm on the same page as you.",
  "Fascinating stuff, indeed!",
  "You've given me a lot to think about.",
  "Interesting take!",
  "I see what you're saying now.",
  "Hmm, let me ponder on that for a bit.",
  "You've hit the nail on the head!",
  "I'm not sure I fully grasp it, but it's intriguing.",
];

const emails = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "bob.johnson@example.com",
  "susan.baker@example.com",
  "mike.wilson@example.com",
  "emily.davis@example.com",
  "alexander.perez@example.com",
  "sarah.jackson@example.com",
  "daniel.thomas@example.com",
  "laura.white@example.com",
  "mary.jones@example.com",
  "chris.anderson@example.com",
  "olivia.martin@example.com",
  "jacob.thompson@example.com",
  "hannah.rodriguez@example.com",
  "william.garcia@example.com",
  "ava.lopez@example.com",
  "matthew.hernandez@example.com",
  "amelia.gonzalez@example.com",
  "ethan.martinez@example.com",
];

const thoughtText = [
  "Life is like a camera, focus on what's important and you'll capture it perfectly.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "In the midst of chaos, there is also opportunity.",
  "The best way to predict the future is to invent it.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The journey of a thousand miles begins with one step.",
  "The best preparation for tomorrow is doing your best today.",
  "Believe you can and you're halfway there.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "Opportunities don't happen, you create them.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "The harder I work, the luckier I get.",
  "Dream big and dare to fail.",
  "The secret of getting ahead is getting started.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Do what you can with all you have, wherever you are.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only person you should try to be better than is the person you were yesterday.",
];

const reactions = [
  "Wow!",
  "Interesting...",
  "I agree!",
  "That's cool!",
  "Great!",
  "Nice!",
  "Awesome!",
  "Amazing!",
  "Impressive!",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(usernames)}`;

// Gets a random full name
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

const getRandomThought = () => `${getRandomArrItem(thoughtText)}`;

// Function to generate random number of reactions
const getRandomReactions = () => {
  const count = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(getRandomArrItem(reactions));
  }
  return results;
};

// Function to generate random replies that we can add to thoughts object.
// Function to generate random replies that we can add to thoughts object.
const getRandomReplies = () => {
  const results = [];
  const numberOfReplies = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
  for (let i = 0; i < numberOfReplies; i++) {
    results.push({
      reactionBody: getRandomArrItem(replies),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = {
  getRandomName,
  getRandomReplies,
  getRandomEmail,
  getRandomThought,
  getRandomReactions,
};
