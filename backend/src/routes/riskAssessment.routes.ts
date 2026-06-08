import express from "express";

import {
  createRiskAssessmentController,
  getMyRiskAssessmentController,
  updateRiskAssessmentController,
  getAllRiskAssessmentsController,
  getRiskAssessmentByIdController,
} from "../controllers/riskAssessment.controller";

import {
  authenticate,
} from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";


const router = express.Router();

router.post(
  "/",
  authenticate,
  createRiskAssessmentController
);

router.get(
  "/me",
  authenticate,
  getMyRiskAssessmentController
);

router.put(
  "/me",
  authenticate,
  updateRiskAssessmentController
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllRiskAssessmentsController
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  getRiskAssessmentByIdController
);

export default router;