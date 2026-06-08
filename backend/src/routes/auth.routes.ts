import { Router } from "express";
import { register , login } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { getProfile } from "../controllers/auth.controller";
import { adminTest } from "../controllers/auth.controller";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);
router.get(
  "/admin-test",
  authenticate,
  authorize("admin"),
  adminTest
);

export default router;