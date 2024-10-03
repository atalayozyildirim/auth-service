import express from "express";
import {
  Login,
  Register,
  PasswordChange,
  PasswordReset,
} from "../../controller/auth/AuthController";
import { body } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth router ");
});
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be between 6 and 12 characters"),
  ],
  Login
);
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be between 6 and 12 characters"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
  ],
  Register
);
router.post("/password/reset", PasswordReset);

router.post("/password/change", PasswordChange);

export default router;
