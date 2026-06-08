import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { loginUser } from "../services/auth.service";

export const register = async (req: Request,res: Response): Promise<void> => {
  try {
    const result = await registerUser(req.body);

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



export const login = async (req: Request,res: Response): Promise<void> => {
  
    try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
      } 
      catch (error) 
      {
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

export const getProfile = async (req: Request,res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
};


export const adminTest = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    message: "Admin access granted",
    user: req.user,
  });
};