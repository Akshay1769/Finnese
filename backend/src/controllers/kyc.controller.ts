import { Request, Response } from "express";

import {
  createKyc,
  getMyKyc,
  updateMyKyc,
  getKycStatus,
  getAllKycs,
  getKycById,
  updateKycStatus,
} from "../services/kyc.service";


export const createKycController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const {
      panNumber,
      aadhaarNumber,
      address,
      occupation,
    } = req.body;

    const result = await createKyc({
      userId,
      panNumber,
      aadhaarNumber,
      address,
      occupation,
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


export const getMyKycController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getMyKyc(
      req.user!.userId
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


export const updateMyKycController = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      panNumber,
      aadhaarNumber,
      address,
      occupation,
    } = req.body;

    const updateData = {
      panNumber,
      aadhaarNumber,
      address,
      occupation,
    };

    const result = await updateMyKyc(
      req.user!.userId,
      updateData
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


export const getKycStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await getKycStatus(
        req.user!.userId
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


export const getAllKycsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result =
      await getAllKycs();

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



export const getKycByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const kycId =
      req.params.id as string;

    const result =
      await getKycById(
        kycId
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


export const changeKycStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const kycId =
      req.params.id as string;

    const {
      status,
      remarks,
    } = req.body;

    const validStatuses = [
      "pending",
      "approved",
      "rejected",
    ];

    if (
      !validStatuses.includes(
        status
      )
    ) {
      res.status(400).json({
        success: false,
        message:
          "Invalid status",
      });

      return;
    }

    const result =
      await updateKycStatus(
        kycId,
        status,
        remarks
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


