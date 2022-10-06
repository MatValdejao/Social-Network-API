const { Schema, model } = require("mongoose");

// user schema
const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		},
		thoughts: {
			type: Schema.Types.ObjectId,
			ref: "Thought",
		},
		friends: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// create friendCount counter virtual
UserSchema.virtual("friendCount").get(function () {
	return console.log(this);
});

// create model
const User = model("User", UserSchema)

// export model
module.exports = User