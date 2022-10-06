const router = require("express").Router();
const {
	getThoughts,
	getThoughtById,
	updateThought,
	createThought,
	deleteThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getThoughts).post(createThought);
router
	.route("/:id")
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought);

module.exports = router;
