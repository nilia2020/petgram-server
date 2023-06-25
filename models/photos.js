const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema({
	categoryId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "Category",
	},
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "User",
	},
	src: {
		type: String,
	},
	likes: {
		type: Number,
	},
});

const Photo = mongoose.model("Photos", photoSchema);
module.exports = { Photo };
