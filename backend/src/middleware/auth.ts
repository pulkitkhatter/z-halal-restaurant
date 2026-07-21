import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.["token"];

  if (!token || !JWT_SECRET) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: string };
    req.adminId = payload.adminId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
