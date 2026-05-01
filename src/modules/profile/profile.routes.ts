import { Router } from "express";
import * as controller from "./profile.controller";

const router = Router();


/**
 * @openapi
 * /profiles:
 *   post:
 *     summary: Crear perfil
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 64f123abc
 *             name: Juan Perez
 *             phone: 3001234567
 *             address: Calle 123
 *             birthDate: 2000-01-01
 *     responses:
 *       201:
 *         description: Perfil creado correctamente
 *       500:
 *         description: Error al crear el perfil
 */
router.post("/", controller.create);

/**
 * @openapi
 * /profiles:
 *   get:
 *     summary: Obtener todos los perfiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Lista de perfiles
 *       500:
 *         description: Error al obtener los perfiles
 */
router.get("/", controller.getAll);

/**
 * @openapi
 * /profiles/{id}:
 *   get:
 *     summary: Obtener perfil por ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *       500:
 *         description: Error al obtener el perfil
 */
router.get("/:id", controller.getById);

/**
 * @openapi
 * /profiles/{id}:
 *   put:
 *     summary: Actualizar perfil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Juan Actualizado
 *             phone: 3000000000
 *             address: Nueva direccion
 *             birthDate: 1999-05-10
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       500:
 *         description: Error al actualizar el perfil
 */
router.put("/:id", controller.update);

/**
 * @openapi
 * /profiles/{id}:
 *   delete:
 *     summary: Eliminar perfil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     responses:
 *       200:
 *         description: Perfil eliminado
 *       500:
 *         description: Error al borrar el perfil
 */
router.delete("/:id", controller.remove);

export default router;