import User from "../models/user.model";

export const getMyProfile = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    data: user,
  };
};


interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImage?: string;
}

export const updateMyProfile = async (userId: string,updateData: UpdateProfileData) => {

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "Profile updated successfully",
    data: user,
  };
};



export const getAllUsers = async () => {
  const users = await User.find()
    .select("-password");

  return {
    success: true,
    count: users.length,
    data: users,
  };
};


export const getUserById = async (userId : string ) => {

  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    data: user,
  };
};


export const updateUserStatus = async (userId: string,isActive: boolean) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: `User ${
      isActive
        ? "activated"
        : "deactivated"
    } successfully`,
    data: user,
  };
};



export const updateCustomerType = async (
  userId: string,
  customerType:
    | "advisory"
    | "financial_services"
) => {

  const user =
    await User.findByIdAndUpdate(
      userId,
      { customerType },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return {
    success: true,
    message:
      "Customer type updated successfully",
    data: user,
  };
};