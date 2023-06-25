const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	emoji: {
		type: String,
	},
	cover: {
		type: String,
	},
	path: {
		type: String,
	},
});

const Category = mongoose.model("Categories", categorySchema);
module.exports = { Category };
