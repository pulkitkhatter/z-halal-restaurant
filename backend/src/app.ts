/// <reference path="./types/express.d.ts" />
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as helmetModule from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import menuRouter from "./routes/menu.js";
import settingsRouter from "./routes/settings.js";
import uploadRouter from "./routes/upload.js";

const helmet = helmetModule.default;

export function createApp() {
  const app = express();

  const middleware = helmet();
  app.use(middleware);

  app.use(
    cors({
      origin: process.env["FRONTEND_URL"] ?? "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use(compression());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/menu", menuRouter);
  app.use("/api/settings", settingsRouter);
  app.use("/api/upload", uploadRouter);

  app.use(errorHandler);

  return app;
}
