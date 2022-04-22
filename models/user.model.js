const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			require: true,
		},
		gender: {
			type: String,
			required: true,
			default: 0,
		},
		isLogged: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{
		collection: "users",
	}
);

module.exports = mongoose.model("User", userSchema);
