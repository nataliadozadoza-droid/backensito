import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

const controller = new AuthController();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Autenticación y gestión de usuarios
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ivan Prada
 *               email:
 *                 type: string
 *                 example: ivan@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post("/register", controller.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ivan@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post("/login", controller.login);

/**
 * @openapi
 * /auth:
 *   get:
 *     summary: Obtener usuarios
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", controller.findAll);

/**
 * @openapi
 * /auth/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
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
router.get("/:id", controller.findById);

/**
 * @openapi
 * /auth/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     tags: [Auth]
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
 *             name: Ivan
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.patch("/:id", controller.update);

/**
 * @openapi
 * /auth/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Auth]
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
router.delete("/:id", controller.remove);

export default router;