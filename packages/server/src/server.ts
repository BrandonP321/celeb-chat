import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { createServer } from "http";
import { connectToMongoDb } from "@/Models";
import { configureApp } from "@/Middleware";
import { configureRoutes } from "@/Routes";

const PORT = process.env.PORT || 8000;

export const app = express();
const httpServer = createServer(app);

// MIDDLEWARE
configureApp(app);

// ROUTES
configureRoutes(app);

// Health check endpoint for Elastic Beanstalk
app.get("/health-check", (req, res) => {
  res.json({}).end();
});

// DB CONNECTION
connectToMongoDb();

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
