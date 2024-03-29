// Importing the Express Router module
const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usersControllers");

//          /api/users/
router.route("/").get(getAllUsers).post(createUser);

//          /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//         /api/users/:userId/friends
router.route(":userId/friends").post(addFriend);

//          /api/users/:userId/friends/:friendId
router.route(":userId/friends/:friendId").delete(removeFriend);
