import { Router } from "express";
import { UsersController } from "./users.controller";
import { createUserSchema } from "./users.schema";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const _UsersController = new UsersController();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Juan Perez
 *             email: juan@gmail.com
 *             password: 123456
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post(
    "/register",
    validate(createUserSchema),
    _UsersController.register
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get(
    "/",
    authMiddleware,
    _UsersController.findAllUsers
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get(
    "/:id",
    authMiddleware,
    _UsersController.findById
);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Juan Actualizado
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.patch(
    "/:id",
    authMiddleware,
    _UsersController.update
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete(
    "/:id",
    authMiddleware,
    _UsersController.remove
);

export default router;