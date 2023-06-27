const { Category } = require("../models/categories");
const { validationResult } = require("express-validator");

const categoryControllers = {
	newCategory: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const isNameExist = await Category.findOne({
					name: req.body.name,
				});
				if (isNameExist) {
					return res
						.status(400)
						.json({ error: "El nombre ya está registrado" });
				}
				const saveCategory = new Category({
					name: req.body.name,
					emoji: req.body.emoji,
					cover: req.body.cover,
					path: req.body.path,
				});
				await saveCategory.save();
				res.status(201).json(saveCategory);
			} else {
				res.status(501).json(err);
			}
		} catch (err) {
			res.status(501).json({
				msg: "No se ha logrado crear la categoria, intente de nuevo",
				err,
			});
		}
	},
	allCategories: async (req, res) => {
		const { categories } = await Category.find();
		res.status(200).json({ categories });
	},
	categoryById: async (req, res) => {
		const category = await Category.findById(req.params.id);
		res.status(200).json({ category });
	},
	deleteCategory: async (req, res) => {
		try {
			const category = await Category.findByIdAndDelete(
				req.params.id
			);
			res.status(202).json({ msg: "Se ha borrado", category });
		} catch (error) {
			res.status(400).json({
				msg: "Problemas a la hora de borrar la información",
			});
		}
	},
	editCategory: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const { id } = req.params;
				let newName = req.body.name;
				if (newName !== null) {
					await Category.findByIdAndUpdate(id, {
						name: newName,
					});
				}
				let newEmoji = req.body.emoji;
				if (newEmoji !== null) {
					await Category.findByIdAndUpdate(id, {
						emoji: newEmoji,
					});
				}
				let newCover = req.body.cover;
				if (newCover !== null) {
					await Category.findByIdAndUpdate(id, {
						cover: newCover,
					});
				}
				let newPath = req.body.path;
				if (newPath !== null) {
					await Category.findByIdAndUpdate(id, {
						path: newPath,
					});
				}
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

module.exports = categoryControllers;
