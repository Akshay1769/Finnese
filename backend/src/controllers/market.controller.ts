import { Request, Response } from "express";

import {
    getAllSchemes,
    getSchemeDetails,
    getSchemeHistory,
    searchSchemes
} from "../services/market.service";

export const getAllSchemesController =
async (
    req: Request,
    res: Response
) => {

    const result =
        await getAllSchemes();

    res.status(200).json(result);
};

export const getSchemeDetailsController =
async (
    req: Request<{ schemeCode: string }>,
    res: Response
) => {

    const result =
        await getSchemeDetails(
            req.params.schemeCode
        );

    res.status(200).json(result);
};

export const getSchemeHistoryController =
async (
    req: Request<{ schemeCode: string }>,
    res: Response
) => {

    const result =
        await getSchemeHistory(
            req.params.schemeCode
        );

    res.status(200).json(result);
};

export const searchSchemesController =
async (
    req: Request,
    res: Response
) => {

    const query =
        req.query.q as string;

    const result =
        await searchSchemes(query);

    res.status(200).json(result);

};