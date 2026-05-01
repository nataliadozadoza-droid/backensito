import { Router } from "express";
import { searchProfilesController } from "./search.controller";

const router = Router();

/**
 * @openapi
 * /search/profiles:
 *   get:
 *     summary: Buscar perfiles con filtros
 *     tags: [Search]
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
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         example: user
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         example: true
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         example: 2024-12-31
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *       500:
 *         description: Error en la búsqueda
 */
router.get("/profiles", searchProfilesController);

export default router;