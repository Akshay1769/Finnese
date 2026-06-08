import { Request , Response , NextFunction } from "express";

export const authorize =  (...roles: string [] ) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const userRole =
      (req as any).user?.role;

    if (!userRole) {
      res.status(401).json({
        success: false,
        message: "User role not found",
      });

      return;
    }

    if (!roles.includes(userRole)) {
      res.status(403).json({
        success: false,
        message: "Access denied",
      });

      return;
    }

    next();
  };