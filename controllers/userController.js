const { User } = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const userControllers = {
	signup: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const isEmailExist = await User.findOne({
					email: req.body.email,
				});
				if (isEmailExist) {
					return res
						.status(400)
						.json({ error: "El email ya está registrado" });
				}
				let salt = bcrypt.genSaltSync(10);
				const saveUser = new User({
					password: bcrypt.hashSync(req.body.password, salt),
					favs: req.body.favs,
					avatar: req.body.avatar,
					email: req.body.email,
				});
				await saveUser.save();
				res.status(201).json(saveUser);
			} else {
				res.status(501).json({
					msg: "Error no empty",
					err: error,
				});
			}
		} catch (err) {
			res.status(501).json({
				msg: "No se ha logrado registrar, intente de nuevo",
				err,
			});
		}
	},
	allUsers: async (req, res) => {
		const users = await User.find();
		res.status(200).json(users);
	},
	userById: async (req, res) => {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	},
	deleteUser: async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(202).json({ msg: "Se ha borrado", user });
		} catch (error) {
			res.status(400).json({
				msg: "Problemas a la hora de borrar la información",
			});
		}
	},
	editPassword: async (req, res) => {
		try {
			const error = validationResult(req);
			if (error.isEmpty()) {
				const { id } = req.params;
				let salt = bcrypt.genSaltSync(10);
				let newPassword = bcrypt.hashSync(
					req.body.password,
					salt
				);
				await User.findByIdAndUpdate(id, {
					password: newPassword,
				});
				res.status(202).json({ msg: "Contraseña actualizada" });
			} else {
				res.status(501).json(error);
			}
		} catch (error) {
			res.status(501).json({
				msg: "Error al intentar actualizar la contraseña",
				error,
			});
		}
	},
};

module.exports = userControllers;
