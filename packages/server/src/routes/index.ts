import { Express } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

export const configureRoutes = (app: Express) => {
  app.use(authRoutes);
  app.use(userRoutes);
};
