var express = require("express");
var router = express.Router();
const controller = require("../controllers/photoController");
const { check } = require("express-validator");
const { validatePhotoId } = require("../middlewares/validations");

/* Crear nueva foto */
router.post(
    "/new",
    [check("src").not().isEmpty().withMessage("Debes escribir un link a una foto")],
    controller.newPhoto
);
/* Ver todas las fotos */
router.get("/seeall", controller.allPhotos);

/* Ver una foto*/
router.get("/see/:id", validatePhotoId, controller.PhotosById);

/* Filtrar por categoria */
router.get("/seeCategory/:categoryId", validatePhotoId, controller.PhotosByCategoryId);

/* Editar foto */
router.put(
    "/edit/:id",
    validatePhotoId,
    [check("name").not().isEmpty().withMessage("El campo name esta vacio")],
    controller.editPhoto
);

/* Borrar foto*/
router.delete("/delete/:id", validatePhotoId, controller.deletePhoto);

module.exports = router;
