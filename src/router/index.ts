import express from "express";
import auth from "./auth/auth";

import AuthController from "../middleware/auth/AuthController";

const router = express.Router();

router.use("/auth", auth);

export default router;
