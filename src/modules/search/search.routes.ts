import { Router } from "express";

import {
  createProfileController,
  searchProfilesController,
  getProfileByIdController,
  updateProfileController,
  deleteProfileController
} from "./search.controller";

import { authMiddleware } from "../../libs/jwt";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Search
 *   description: Gestión y búsqueda de perfiles
 */

/**
 * @openapi
 * /search/profiles:
 *   post:
 *     summary: Crear perfil
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Juan
 *             email: juan@gmail.com
 *             role: user
 *     responses:
 *       201:
 *         description: Perfil creado
 */
router.post(
  "/profiles",
  authMiddleware,
  createProfileController
);

/**
 * @openapi
 * /search/profiles:
 *   get:
 *     summary: Buscar perfiles con filtros
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         example: Juan
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         example: juan@gmail.com
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get(
  "/profiles",
  authMiddleware,
  searchProfilesController
);

/**
 * @openapi
 * /search/profiles/{id}:
 *   get:
 *     summary: Obtener perfil por ID
 *     tags: [Search]
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
 *         description: Perfil encontrado
 */
router.get(
  "/profiles/:id",
  authMiddleware,
  getProfileByIdController
);

/**
 * @openapi
 * /search/profiles/{id}:
 *   patch:
 *     summary: Actualizar perfil
 *     tags: [Search]
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
 *         description: Perfil actualizado
 */
router.patch(
  "/profiles/:id",
  authMiddleware,
  updateProfileController
);

/**
 * @openapi
 * /search/profiles/{id}:
 *   delete:
 *     summary: Eliminar perfil
 *     tags: [Search]
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
 *         description: Perfil eliminado
 */
router.delete(
  "/profiles/:id",
  authMiddleware,
  deleteProfileController
);

export default router;