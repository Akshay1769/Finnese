import express from "express";

import {
  createKycController,
  getMyKycController,
  updateMyKycController,
  getKycStatusController,
  getAllKycsController,
  getKycByIdController,
  changeKycStatusController,
} from "../controllers/kyc.controller";

import {authenticate} from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router = express.Router();

router.post(
  "/",
  authenticate,
  createKycController
);

router.get(
  "/me",
  authenticate,
  getMyKycController
);

router.put(
  "/me",
  authenticate,
  updateMyKycController
);

router.get(
  "/status",
  authenticate,
  getKycStatusController
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllKycsController
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  getKycByIdController
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  changeKycStatusController
);

export default router;