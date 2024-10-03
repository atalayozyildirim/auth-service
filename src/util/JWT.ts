import jwt from "jsonwebtoken";

export const create_token_jwt = (data: string | object) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verify_token_jwt = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
