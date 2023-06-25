var express = require("express");
var router = express.Router();
const controller = require("../controllers/userController");
const { check } = require("express-validator");
const {
	validateUserId,
} = require("../middlewares/validations");

/* Registrarse */
router.post(
	"/signup",
	[
		check("email")
			.not()
			.isEmpty()
			.withMessage("Debes ingresar un email")
			.isEmail()
			.withMessage("Debes ingresar un formato de email válido"),
		check("password")
			.not()
			.isEmpty()
			.withMessage("Debes ingresar una contraseña")
			.isLength({ min: 8, max: 12 })
			.withMessage(
				"La contraseña debe contener entre 8 a 12 caracteres."
			),
	],
	controller.signup
);
/* Ver Todos los usuarios */
router.get("/seeusers", controller.allUsers);

/* Ver un usuario*/
router.get(
	"/seeusers/:id",
	validateUserId,
	controller.userById
);
module.exports = router;

/* Editar password */
router.put(
	"/editpassword/:id",
	validateUserId,
	[
		check("password")
			.not()
			.isEmpty()
			.withMessage("El campo esta vacio")
			.isLength({ min: 8, max: 12 })
			.withMessage(
				"La contraseña debe contener entre 8 y 12 caracteres."
			),
	],
	controller.editPassword
);

/* Borrar usurio*/
router.delete(
	"/deleteuser/:id",
	validateUserId,
	controller.deleteUser
);
