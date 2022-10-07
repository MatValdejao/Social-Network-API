const { User, Thought } = require("../models");

const userController = {
	// get user
	getAllUser(req, res) {
		User.find({})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.populate({
				path: "friends",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get user by id value
	getUserById({ params }, res) {
		User.findOne({
			_id: params.id,
		})
			.populate({
				path: "thoughts",
				select: "-__v",
			})
			.populate({
				path: "friends",
				select: "-__v",
			})
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user with that Id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// add user
	addUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// add a friend
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{
				_id: params.userId,
			},
			{
				$push: { friends: params.friendId },
			},
			{
				new: true,
			}
		)
			.select("-__v")
			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: "Please provide valid users" });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => {
				console.log(err);
				res.status(404).json(err);
			});
	},

	// update user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate(
			{
				_id: params.id,
			},
			body,
			{
				new: true,
				runValidators: true,
			}
		)
			.select("-__v")
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user with that Id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// delete a friend
	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{
				_id: params.userId,
			},
			{
				$pull: { friends: params.friendId },
			},
			{
				new: true,
			}
		)
			.select("-__v")
			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: "Please provide valid users!" });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},

	// delete user by id
    deleteUser({ params, body }, res) {
		User.findOneAndDelete({
			_id: params.id,
		})
			.select("-__v")
			.then(async (dbUserData) => {
				if (!dbUserData) {
					res.json(404).json({ message: "No user with that Id!" });
					return;
                }
                const thoughts = await Thought.remove({
                    username: dbUserData.username
                })
                console.log(thoughts)
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};

module.exports = userController;
