import { Router } from "express";
import {
  getMyNotifications,
  readNotification,
  removeNotification
} from "./notification.controller";
import { verifyToken } from "../../libs/jwt";
import { createNotificationController } from "./notification.controller";



const router = Router();

router.get("/",  getMyNotifications);
router.patch("/:id/read", verifyToken, readNotification);
router.delete("/:id", verifyToken, removeNotification);
router.post("/", createNotificationController);

export default router;