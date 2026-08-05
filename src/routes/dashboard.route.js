import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const dashboardRouter = express.Router();

/**
 * GET /api/dashboard
 */
dashboardRouter.get("/", authMiddleware, getDashboard);

export default dashboardRouter;