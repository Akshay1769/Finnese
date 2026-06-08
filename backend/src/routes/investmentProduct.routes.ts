import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
    createInvestmentProductController,
    getInvestmentProductsController,
    getInvestmentProductByIdController,
    updateInvestmentProductController, 
    changeInvestmentProductStatusController, 
    getRecommendedProductsController, 
    deleteInvestmentProductController 
} from "../controllers/investmentProduct.controller";    

const router = express.Router();

router.get("/", getInvestmentProductsController);
router.get("/recommended"  , authenticate , getRecommendedProductsController);
router.get("/:id", getInvestmentProductByIdController);



router.post("/", authenticate, authorize("admin"), createInvestmentProductController);

router.put("/:id", authenticate, authorize("admin"), updateInvestmentProductController);

router.patch("/:id/status", authenticate, authorize("admin"), changeInvestmentProductStatusController);

router.delete("/:id", authenticate, authorize("admin"), deleteInvestmentProductController);

export default router;