import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getUserRole = () => {

  const token =
    localStorage.getItem("token");

  if (!token) return null;

  try {

    const decoded =
      jwtDecode<TokenPayload>(token);

    return decoded.role;

  } catch {

    return null;

  }
};