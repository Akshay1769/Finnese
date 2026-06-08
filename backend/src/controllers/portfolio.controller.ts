import { Request, Response } from "express";
import { createPortfolio , getMyPortfolios , getPortfolioById , updatePortfolio, updatePortfolioStatus } from "../services/portfolio.service";

export const createPortfolioController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    const {
      name,
      description,
      riskLevel,
      targetAmount,
    } = req.body;

    const result = await createPortfolio({
      name,
      description,
      riskLevel,
      targetAmount,
      userId,
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



export const getPortfolios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });

      return;
    }

    const result = await getMyPortfolios(
      userId
    );

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


export const getPortfolio = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const portfolioId = req.params.id as string;

    const result =
      await getPortfolioById(portfolioId , req.user?.userId! , req.user?.role!);

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


export const updatePortfolioController = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolioId = req.params.id as string;
    const currentUserId = req.user?.userId!;
    const role = req.user?.role!;

    const { name, description, riskLevel, targetAmount } = req.body;

    const updateData = {
      name,
      description,
      riskLevel,
      targetAmount,
    };

    const result = await updatePortfolio(
      portfolioId,
      updateData,
      currentUserId,
      role
    );

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


export const changePortfolioStatusController = async (req : Request , res : Response ): Promise<void> => {
    try {
      const portfolioId = req.params.id as string;
      const currentUserId = req.user?.userId;
      const role = req.user?.role!;
      const {isActive} = req.body!;

      if (typeof isActive !== "boolean") {
      res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    

      return;
    }

      const result = await updatePortfolioStatus(portfolioId , isActive , currentUserId! , role!);

      res.status(200).json(result);

      
    }
     catch (error) {
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