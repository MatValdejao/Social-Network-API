const { Thought, User } = require("../models");

const thoughtsController = {
	// get all thoughts
	getThoughts(req, res) {
		Thought.find({})
			.select("-__v")
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({
			_id: params.thoughtId,
		})
			.select("-__v")
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

	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{
				_id: params.thoughtId,
			},
			{
				$push: { reactions: body },
			},
			{
				new: true,
				runValidators: true,
			}
		)
			.select("-__v")
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

	// create new thought
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
                    {
                        // username has to be unique, so can use as checker
						username: body.username,
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
				_id: params.thoughtId,
			},
			body,
			{
				new: true,
				runValidators: true,
			}
		)
			.select("-__v")
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

	// delete reaction
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{
				_id: params.thoughtId,
			},
			{
				$pull: { reactions: { reactionId: params.reactionId } },
			},
			{
				new: true,
			}
		)
			.select("-__v")
			.then((deleteReaction) => {
				if (!deleteReaction) {
					res.status(404).json({ message: "No thought with that Id!" });
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// delete thought
	deleteThought({ params: {thoughtId} }, res) {
		Thought.findOneAndDelete({
			_id: thoughtId,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought with that Id!" });
					return;
				}
				return User.findOneAndUpdate(
					{
						thoughts: thoughtId,
					},
					{
						$pull: { thoughts: thoughtId },
					},
					{
						new: true,
					}
				)
					.select("-__v")
					.then((dbUserData) => {
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
