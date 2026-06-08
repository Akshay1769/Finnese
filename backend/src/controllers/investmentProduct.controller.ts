import {Request, Response} from "express";
import { 
    createInvestmentProduct,
    getInvestmentProducts,
    getInvestmentProductById,
    getRecommendedProducts, 
    updateInvestmentProduct,
    changeProductStatus,
    deleteInvestmentProduct
     } from "../services/investmentProduct.service";


export const createInvestmentProductController = async (req: Request, res: Response): Promise<void> => {
    try {

    const {
        name,
        category,
        riskLevel,  
        expectedReturnMin,
        expectedReturnMax,
        description,
        minimumInvestment,
        provider
    } = req.body;

     const result = await createInvestmentProduct({
        name,
        category,
        riskLevel, 
        expectedReturnMin,
        expectedReturnMax,
        description,
        minimumInvestment,
        provider,
     });


        res.status(201).json(result);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
  }
};




export const getInvestmentProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getInvestmentProducts();
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};

export const getInvestmentProductByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id as string;
        const result = await getInvestmentProductById(productId);
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};

export const getRecommendedProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId; 
        const result = await getRecommendedProducts( userId);
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};

export const updateInvestmentProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id as string;
        const updateData = req.body;

        const result = await updateInvestmentProduct(productId , updateData);
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};

export const changeInvestmentProductStatusController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id as string;
        const { isActive } = req.body;
        const result = await changeProductStatus(productId , isActive);
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};

export const deleteInvestmentProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.id as string;
        const result = await deleteInvestmentProduct( productId );
        res.status(200).json(result);
    } catch (error) {
        const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";
        res.status(400).json({
        success: false,
        message,
      });
    }
};