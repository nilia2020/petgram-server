var express = require("express");
var router = express.Router();
const controller = require("../controllers/categoryController");
const { check } = require("express-validator");
const { validateCategoryId } = require("../middlewares/validations");

/* Crear nueva categoria */
router.post(
    "/new",
    [check("name").not().isEmpty().withMessage("Debes escribir un nombre")],
    controller.newCategory
);
/* Ver todas las categorias */
router.get("/seeall", controller.allCategories);

/* Ver una categoria*/
router.get("/see/:id", validateCategoryId, controller.categoryById);
module.exports = router;

/* Editar categoria */
router.put(
    "/edit/:id",
    validateCategoryId,
    [check("name").not().isEmpty().withMessage("El campo name esta vacio")],
    controller.editCategory
);

/* Borrar categoria*/
router.delete("/delete/:id", validateCategoryId, controller.deleteCategory);
