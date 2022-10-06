const { Schema, Types } = require("mongoose");

// user schema
const UserSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		username: {
			type: String,
			unique: true,
			require: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			require: true,
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
	return this.friends.length;
});

// create model
const User = model("User", UserSchema)

// export model
module.exports = UserSchema