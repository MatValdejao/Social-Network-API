const { User, Thought } = require("../models");

const userController = {
	// get user
	getAllUser(req, res) {
		User.find({})
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get user by id value
	getUserById({ params }, res) {
		User.findOne({
			_id: params._id,
		})
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
		User.create({ body })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// update user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate(
			{
				_id: params._id,
			},
			body,
			{
				new: true,
				runValidators: true,
			}
		)
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

	// delete user by id
	deleteUser({ params }, res) {
		User.findOneAndDelete({
			_id: params._id,
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.json(404).json({ message: "No user with that Id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
};
