import { Router } from "express";
import {
  getMyNotifications,
  readNotification,
  removeNotification
} from "./notification.controller";
import { verifyToken } from "../../libs/jwt";
import { createNotificationController } from "./notification.controller";



const router = Router();

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Obtener notificaciones de un usuario
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       400:
 *         description: userId es requerido
 */
router.get("/",  getMyNotifications);

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Crear una notificación
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 64f123abc
 *             message: Nueva notificación
 *     responses:
 *       200:
 *         description: Notificación creada
 *       400:
 *         description: userId y message son requeridos
 */
router.patch("/:id/read", verifyToken, readNotification);

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     summary: Marcar notificación como leída
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     responses:
 *       200:
 *         description: Notificacion marcada como leida
 *       500:
 *         description: Error al marcar como leida
 */
router.delete("/:id", verifyToken, removeNotification);

/**
 * @openapi
 * /notifications/{id}:
 *   delete:
 *     summary: Eliminar notificación
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f123abc
 *     responses:
 *       200:
 *         description: Notificación eliminada
 *       500:
 *         description: Error al eliminar
 */
router.post("/", createNotificationController);

export default router;