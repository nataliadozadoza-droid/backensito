import { Router } from "express";

import {
  getMyNotifications,
  readNotification,
  removeNotification,
  createNotificationController,
  getAllNotificationsController
} from "./notification.controller";

import { authMiddleware } from "../../libs/jwt";

const router = Router();

/**
 * @openapi
 * /notifications/all:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las notificaciones
 *         content:
 *           application/json:
 *             example:
 *               - _id: 68213c4a9f2d3c7f812ab44
 *                 userId: 68213c4a9f2d
 *                 message: Nueva notificación
 *                 read: false
 *                 createdAt: 2026-05-11T20:00:00.000Z
 *               - _id: 68213c4a9f2d3c7f812ab55
 *                 userId: 68213c4a9f2d
 *                 message: Pedido enviado
 *                 read: true
 *                 createdAt: 2026-05-11T21:00:00.000Z
 *       401:
 *         description: Token inválido o no enviado
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/all",
  authMiddleware,
  getAllNotificationsController
);

/**
 * @openapi
 * tags:
 *   name: Notifications
 *   description: Gestión de notificaciones
 */

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
 *         example: 68213c4a9f2d
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       400:
 *         description: userId es requerido
 */
router.get("/", getMyNotifications);

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Crear una notificación
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 68213c4a9f2d
 *               message:
 *                 type: string
 *                 example: Nueva notificación
 *     responses:
 *       201:
 *         description: Notificación creada
 *       400:
 *         description: userId y message son requeridos
 */
router.post("/", authMiddleware, createNotificationController);

/**
 * @openapi
 * /notifications/{id}/read:
 *   patch:
 *     summary: Marcar notificación como leída
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68213c4a9f2d
 *     responses:
 *       200:
 *         description: Notificación marcada como leída
 *       500:
 *         description: Error interno
 */
router.patch("/:id/read", authMiddleware, readNotification);

/**
 * @openapi
 * /notifications/{id}:
 *   delete:
 *     summary: Eliminar notificación
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68213c4a9f2d
 *     responses:
 *       200:
 *         description: Notificación eliminada
 *       500:
 *         description: Error interno
 */
router.delete("/:id", authMiddleware, removeNotification);

export default router;