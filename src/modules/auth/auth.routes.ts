import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const _AuthController = new AuthController();

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
 *           example:
 *             name: Juan Perez
 *             email: juan@gmail.com
 *             password: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: El usuario ya existe
 */

router.post("/register", _AuthController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: juan@gmail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", _AuthController.login);

export default router;
