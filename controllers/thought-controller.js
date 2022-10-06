const { Thought, User } = require("../models");

const thoughtsController = {
	// get all thoughts
	getThoughts(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({
			_id: params.id,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought with that Id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},

	// create new thought
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{
						_id: body.userId,
					},
					{
						$push: { thoughts: _id },
					},
					{
						new: true,
						runValidators: true,
					}
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this Id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// update thought
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate(
			{
				_id: params.id,
			},
			body,
			{
				new: true,
				runValidators: true,
			}
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought with that Id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// delete thought
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({
			_id: params.id,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought with that Id!" });
					return;
				}
				return User.findOneAndUpdate(
					{
						_id: params.userId,
					},
					{
						$pull: { thoughts: params.id },
					},
					{
						new: true,
					}
				).then((dbUserData) => {
					if (!dbUserData) {
						res.status(404).json({ message: "No user with that Id!" });
						return;
					}
					res.json(dbUserData);
				});
			})
			.catch((err) => {
				console.log(err);
				res.staus(400).json(err);
			});
	},
};

module.exports = thoughtsController;
