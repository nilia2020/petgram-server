const { User } = require("../models/users");
const { Category } = require("../models/categories");
const { Photo } = require("../models/photos");

const validateUserId = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (user !== null) {
			next();
		} else {
			res.status(404).json({
				msg: "El id ingresado no se encuentra en la base de datos.",
			});
		}
	} catch (error) {
		res.status(400).json({
			msg: "El formato de id ingresado es inválido, revíselo y vuelva a intentarlo",
			error,
		});
	}
};
const validateCategoryId = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);
		if (category !== null) {
			next();
		} else {
			res.status(404).json({
				msg: "El id ingresado no se encuentra en la base de datos.",
			});
		}
	} catch (error) {
		res.status(400).json({
			msg: "El formato de id ingresado es inválido, revíselo y vuelva a intentarlo",
			error,
		});
	}
};

const validatePhotoId = async (req, res, next) => {
	try {
		const photo = await Photo.findById(req.params.id);
		if (photo !== null) {
			next();
		} else {
			res.status(404).json({
				msg: "El id ingresado no se encuentra en la base de datos.",
			});
		}
	} catch (error) {
		res.status(400).json({
			msg: "El formato de id ingresado es inválido, revíselo y vuelva a intentarlo",
			error,
		});
	}
};

module.exports = {
	validateUserId,
	validateCategoryId,
	validatePhotoId,
};
