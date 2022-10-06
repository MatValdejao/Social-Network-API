const router = require("express").Router();
const {
	getAllUser,
	getUserById,
	addUser,
	updateUser,
	deleteUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUser).post(addUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// router.route("/:userID/friends/:friendId")

module.exports = router;
