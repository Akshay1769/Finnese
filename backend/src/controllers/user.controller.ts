import { Request, Response } from "express";
import { getMyProfile , updateMyProfile , getAllUsers , getUserById ,updateUserStatus , updateCustomerType} from "../services/user.service";

export const getProfile = async (
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

    const result = await getMyProfile(userId);

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




export const updateProfile = async (
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
      firstName,
      lastName,
      phoneNumber,
      profileImage,
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      phoneNumber,
      profileImage,
    };

    const result = await updateMyProfile(
      userId,
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




export const getUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllUsers();

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




export const getUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id as string;

    const result = await getUserById(userId);

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



export const changeUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id as string;

    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });

      return;
    }

    const result = await updateUserStatus(
      userId,
      isActive
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


export const updateCustomerTypeController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const userId =
        req.params.id as string;

      const {
        customerType,
      } = req.body;

      const result =
        await updateCustomerType(
          userId,
          customerType
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