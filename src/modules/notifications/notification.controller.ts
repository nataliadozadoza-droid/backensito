import { Request, Response } from "express";
import * as service from "./notification.service";

export const getMyNotifications = async (
  req: Request,
  res: Response
) => {
  try {

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: "userId es requerido",
      });
    }

    const notifications =
      await service.getUserNotifications(userId as string);

    res.status(200).json(notifications);

  } catch (error) {

    res.status(500).json({
      error: "Error al obtener notificaciones",
    });
  }
};

export const readNotification = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await service.markAsRead(
      req.params.id as string
    );

    res.status(200).json({
      message: "Notificación marcada como leída",
      result,
    });

  } catch (error) {

    res.status(500).json({
      error: "Error al marcar como leída",
    });
  }
};

export const removeNotification = async (
  req: Request,
  res: Response
) => {
  try {

    await service.deleteNotification(
      req.params.id as string
    );

    res.status(200).json({
      message: "Notificación eliminada",
    });

  } catch (error) {

    res.status(500).json({
      error: "Error al eliminar",
    });
  }
};

export const getAllNotificationsController = async (
  req: Request,
  res: Response
) => {
  try {

    const notifications =
      await service.getAllNotifications();

    res.status(200).json(notifications);

  } catch (error) {

    res.status(500).json({
      error: "Error al obtener notificaciones",
    });
  }
};

export const createNotificationController = async (
  req: Request,
  res: Response
) => {
  try {

    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({
        error: "userId y message son requeridos",
      });
    }

    const id = await service.createNotification(
      userId,
      message
    );

    res.status(201).json({
      message: "Notificación creada",
      id,
    });

  } catch (error) {

    res.status(500).json({
      error: "Error al crear notificación",
    });
  }
};