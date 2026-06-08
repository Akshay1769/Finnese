import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createPortfolioController , getPortfolios , getPortfolio , updatePortfolioController , changePortfolioStatusController} from "../controllers/portfolio.controller";

const router = Router();

router.post("/",authenticate, createPortfolioController );
router.get(
  "/",
  authenticate,
  getPortfolios
);


router.patch(
  "/:id/status",
  authenticate,
  changePortfolioStatusController
);


router.get(
  "/:id",
  authenticate,
  getPortfolio
);
  
router.put(
  "/:id",
  authenticate,
  updatePortfolioController
);



export default router;