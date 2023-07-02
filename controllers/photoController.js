const { Category } = require("../models/categories");
const { User } = require("../models/users");
const { Photo } = require("../models/photos");
const { validationResult } = require("express-validator");

const photoControllers = {
	newPhoto: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const isSrcExist = await Photo.findOne({
					src: req.body.src,
				});
				if (isSrcExist) {
					return res
						.status(400)
						.json({ error: "La foto ya esta en la base" });
				}
				const isUserIdExist = await User.findById(
					req.body.userId
				);
				if (isUserIdExist === null) {
					return res.status(400).json({
						error: "el id de  usuario no existe",
					});
				}
				const isCategoryIdExist = await Category.findById(
					req.body.categoryId
				);
				if (isCategoryIdExist === null) {
					return res.status(400).json({
						error: "el id de  usuario no existe",
					});
				}
				const savePhoto = new Photo({
					src: req.body.src,
					likes: req.body.likes,
					userId: req.body.userId,
					categoryId: req.body.categoryId,
				});
				await savePhoto.save();
				res.status(201).json(savePhoto);
			} else {
				res.status(501).json(err);
			}
		} catch (err) {
			res.status(501).json({
				msg: "No se ha logrado crear la foto, intente de nuevo",
				err,
			});
		}
	},
	allPhotos: async (req, res) => {
		const photos = await Photo.find();
		res.status(200).json(photos);
	},
	PhotosById: async (req, res) => {
		const photos = await Photo.findById(req.params.id);
		res.status(200).json(photos);
	},
	deletePhoto: async (req, res) => {
		try {
			const photos = await Photo.findByIdAndDelete(
				req.params.id
			);
			res.status(202).json({ msg: "Se ha borrado", photos });
		} catch (error) {
			res.status(400).json({
				msg: "Problemas a la hora de borrar la información",
			});
		}
	},
	editPhoto: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const { id } = req.params;
				let newSrc = req.body.src;
				let newUser = req.body.userId;
				let newCategory = req.body.categoryId;
				let newLike = req.body.likes;
				await Photo.findByIdAndUpdate(id, {
					src: newSrc,
					userId: newUser,
					categoryId: newCategory,
					likes: newLike,
				});
				res.status(202).json({ msg: "Categoria actualizada" });
			} else {
				res.status(501).json(error);
			}
		} catch (error) {
			res.status(501).json({
				msg: "Error al intentar actualizar la categoria",
				error,
			});
		}
	},
};

module.exports = photoControllers;
