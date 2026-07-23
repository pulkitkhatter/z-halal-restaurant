import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];

interface TokenPayload {
  adminId: string;
  role: "ADMIN" | "EMPLOYEE";
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.["token"];

  if (!token || !JWT_SECRET) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.adminId = payload.adminId;
    req.adminRole = payload.role;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.adminRole !== "ADMIN") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }
    next();
  });
}
