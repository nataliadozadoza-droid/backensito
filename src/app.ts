import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import v1Routes from "./api/v1/index";
import { errorMiddleware } from "./middlewares/error.middleware";
import profileRoutes from "./modules/profile/profile.routes";
import notificationsRoutes from "./modules/notifications/notification.routes";
import searchRoutes from "./modules/search/search.routes";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from './config/openapi';


export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json()); 

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

app.use("/api/profiles", profileRoutes);
app.use('/api/v1', v1Routes);
app.use("/notifications", notificationsRoutes);
app.use("/search", searchRoutes);


app.get("/test", (req, res) => {
  res.send("OK");
});

app.use(errorMiddleware);

