import {
  Request,
  Response,
} from "express";

import {
  getDashboardStats,
} from "../services/dashboard.service";

export const getDashboardStatsController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const result =
        await getDashboardStats(
          req.user!.userId
        );

      res.status(200).json(
        result
      );

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