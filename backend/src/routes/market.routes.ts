import express from "express";
import {
    getAllSchemesController,
    getSchemeDetailsController,
    getSchemeHistoryController,
    searchSchemesController
} from "../controllers/market.controller";

const router = express.Router();

router.get("/schemes", getAllSchemesController);

router.get(
    "/scheme/:schemeCode",
    getSchemeDetailsController
);

router.get(
    "/search",
    searchSchemesController
);

router.get(
    "/history/:schemeCode",
    getSchemeHistoryController
);

export default router;