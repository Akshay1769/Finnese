import User from "..//models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const registerUser =  async (userData: RegisterUserData) => {
    const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  } = userData;

  const existingUser = await User.findOne({
    email,
  });


   if (existingUser) {
    throw new Error(
      "User already exists with this email"
    );
  }

   const hashedPassword =
    await bcrypt.hash(password, 10);
    
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    return {
    success: true,
    message:
      "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
    },
  };

};

interface LoginUserData {
  email: string;
  password: string;
}

export const loginUser = async (
  userData: LoginUserData
) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    success: true,
    message: "Login successful",
    token,
    role: user.role
  };
};

