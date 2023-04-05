import { Express } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import chatRoutes from "./chat.routes";

export const configureRoutes = (app: Express) => {
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(chatRoutes);
};
