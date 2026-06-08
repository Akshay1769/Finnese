import express from "express";

import {
  getDashboardStatsController,
} from "../controllers/dashboard.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

const router =
  express.Router();

router.get(
  "/stats",
  authenticate,
  getDashboardStatsController
);

export default router;