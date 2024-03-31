// Importing the Express Router module
const router = require("express").Router();
const {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtsControllers");

//          /api/thoughts/
router.route("/").get(getAllThoughts).post(createThought);

//          /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//          /api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reactions").post(createReaction);

//          /api/thoughts/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
