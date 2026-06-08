import { Request, Response } from "express";

import {
  createRiskAssessment,
  getMyRiskAssessment,
  updateRiskAssessment,
  getAllRiskAssessments,
  getRiskAssessmentById,
} from "../services/riskAssessment.service";

export const createRiskAssessmentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await createRiskAssessment({
        userId: req.user!.userId,
        ...req.body,
      });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getMyRiskAssessmentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await getMyRiskAssessment(
        req.user!.userId
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const updateRiskAssessmentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await updateRiskAssessment(
        req.user!.userId,
        req.body
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getAllRiskAssessmentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await getAllRiskAssessments();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getRiskAssessmentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await getRiskAssessmentById(
        req.params.id as string
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};