import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const genarateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = jwt.sign({}, process.env.SECRET as string, {
    expiresIn: "1h",
  });
  res.setHeader("X-API-TOKEN", token);
  res.status(200).json({ token });
};

const ApiAcsess = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["X-API-TOKEN"];

  try {
    const Verify = jwt.verify(token as string, process.env.SECRET as string);

    if (Verify) {
      return next();
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid api token" });
  }
};

const addAuthTokenToHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = jwt.sign({}, process.env.SECRET as string, {
    expiresIn: "24h",
  });
  req.headers["X-API-TOKEN"] = token;
  next();
};

export { ApiAcsess, genarateToken, addAuthTokenToHeaders };
