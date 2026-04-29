import { Request, Response } from "express";
import * as service from "./notification.service";
import { createNotification } from "./notification.service";

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId es requerido" });
    }

    const notifications = await service.getUserNotifications(userId as string);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener notificaciones" });
  }
};

export const readNotification = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await service.markAsRead(req.params.id as string);
  } catch (error) {
    res.status(500).json({ error: "Error al marcar como leída" });
  }
};

export const removeNotification = async (req: Request, res: Response) => {
  try {
    await service.deleteNotification(req.params.id as string);
    res.json({ message: "Notificación eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};


export const createNotificationController = async (req:Request, res:Response) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "userId y message son requeridos" });
    }

    const id = await createNotification(userId, message);

    res.json({ message: "Notificación creada", id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear notificación" });
  }
};