const usernames = [
  "CyberNinja47",
  "StarGazer23",
  "TechSavvyGal",
  "CodeWizard101",
  "PixelPirate88",
  "LunaDreamer99",
  "QuantumGeek42",
  "CryptoKnight007",
  "MysticMaven77",
  "ByteBandit23",
  "NeonNebula56",
  "DataDynamo81",
  "ShadowScribe22",
  "EchoEmpress44",
  "CosmicCoder67",
];

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

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(usernames)}`;

// Function to generate random replies that we can add to thoughts object.
const getRandomReplies = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(replies),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomReplies };
