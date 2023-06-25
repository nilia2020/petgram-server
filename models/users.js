const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	password: {
		type: String,
		required: true,
	},
	favs: [
		{
			type: String,
		},
	],
	avatar: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

const User = mongoose.model("Users", userSchema);
module.exports = { User };
