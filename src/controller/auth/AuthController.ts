import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ComparePassword, HashPassword } from "../../util/HashPassword";
import { sendMail } from "../mail/mail";
import { verify_token_jwt } from "../../util/JWT";
import client from "../../config/RedisConfig";

const prisma = new PrismaClient();

const Register = async (req: Request, res: Response) => {
  const { email, password, phoneNumber, name } = req.body;

  try {
    const existingUser = await prisma.auth.findFirst({ where: { email } });
    const exitingUserPhone = await prisma.auth.findFirst({
      where: { phoneNumber: parseInt(phoneNumber, 10) },
    });

    if (existingUser || exitingUserPhone) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await HashPassword(password);

    const userData: any = {
      data: {
        email,
        password: hashedPassword,
        phoneNumber,
      },
    };

    const userAuth = await prisma.auth.create(userData);

    // await Login(req, res); // Auto login after register

    return res.status(201).json({ userAuth });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await prisma.auth.findFirstOrThrow({
      where: { email: email },
    });

    if (typeof password !== "string") {
      console.error("Password is not a string:", password);
      return res
        .status(400)
        .json({ message: "Invalid input type for password" });
    }

    if (typeof user.password !== "string") {
      console.error("User password is not a string:", user.password);
      return res
        .status(400)
        .json({ message: "Invalid input type for user password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 3600,
    });
    // await client.set("auth_token", token, { EX: 3600 });

    return res.status(200).json({ data: { token } });
  } catch (err) {
    console.error("Error in login process:", err);
    return res.status(400).json({ message: "Error server", err });
  }
};

const PasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.auth.findFirst({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 3600,
    });

    const data = {
      token: token,
      email: email,
    };
    sendMail(
      {
        to: email,
        subject: "Password Reset Request",
        text: `Click this link to reset your password`,
        user: data,
      },
      req,
      res
    );
  } catch (error) {
    console.error("Error in password reset process:", error);
    return res.status(500).json({ message: "Error server", error });
  }
};

const PasswordChange = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const token: any = req.headers["authorization"]?.split(" ")[1];

    const verifyToken = verify_token_jwt(token);

    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const decodeJwt: any = jwt.decode(token);
    const hashedPassword = await HashPassword(password);

    const oldPassword: any = await prisma.auth.findFirst({
      where: { id: decodeJwt.id },
      select: { password: true },
    });

    const comparePassword = await ComparePassword(
      password,
      oldPassword.password
    );

    if (comparePassword)
      return res.status(400).json({ message: "Same password", status: 400 });

    const UpdateData = await prisma.auth.update({
      where: { id: decodeJwt.id },
      data: { password: hashedPassword },
    });

    res.json({ message: "Passowrd has changed log in again" });
  } catch (error) {
    console.error("Error in password change process:", error);
    return res.status(500).json({ message: "Error server", error });
  }
};

const Logout = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const verifyToken = verify_token_jwt(token);

    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    return res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error("Error in logout process:", error);
    return res.status(500).json({ message: "Error server", error });
  }
};

export { Login, Logout, Register, PasswordReset, PasswordChange };
