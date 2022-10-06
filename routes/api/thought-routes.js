const router = require("express").Router();
const {
	getThoughts,
	getThoughtById,
	updateThought,
	createThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getThoughts).post(createThought);
router
	.route("/:thoughtId")
	.get(getThoughtById)
    .put(updateThought)
    
router.route("/:userId/:thoughtId").delete(deleteThought)
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
