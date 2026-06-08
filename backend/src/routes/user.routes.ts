import {Router } from "express";
import { getProfile, updateProfile ,getUsers ,getUser , changeUserStatus , updateCustomerTypeController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get("/me", authenticate, getProfile);
router.put("/me", authenticate, updateProfile);
router.get("/", authenticate, authorize("admin"), getUsers);



router.patch(
    "/:id/status",
    authenticate,
    authorize("admin"),
    changeUserStatus
)

router.patch(
  "/:id/customer-type",
  authenticate,
  authorize("admin"),
  updateCustomerTypeController
);


router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  getUser
);




export default router;
