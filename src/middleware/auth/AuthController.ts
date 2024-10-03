import { Request, Response, NextFunction } from "express";
import { verify_token_jwt } from "../../util/JWT";

const AuthController = (req: Request, res: Response, next: NextFunction) => {
  const acsess_token: any = req.headers["authorization"]?.split(" ")[1];

  const verify_acsess_token = verify_token_jwt(acsess_token);
  if (verify_acsess_token) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized", redirect: "/auth/login" });
  }
};

export default AuthController;
