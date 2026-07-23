import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { stripUndefined } from "../lib/stripUndefined.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const menuItemSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  dietType: z.enum(["VEG", "NON_VEG", "EGG"]).default("VEG"),
  imageUrl: z.string().url().optional(),
  isPopular: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

router.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const data = stripUndefined(menuItemSchema.parse(req.body));
    const item = await prisma.menuItem.create({ data });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params["id"];
    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Missing menu item id" });
      return;
    }
    const data = stripUndefined(menuItemSchema.partial().parse(req.body));
    const item = await prisma.menuItem.update({ where: { id }, data });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = req.params["id"];
    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Missing menu item id" });
      return;
    }
    await prisma.menuItem.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
