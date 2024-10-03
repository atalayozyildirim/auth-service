"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../../controller/auth/AuthController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Auth router ");
});
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is not valid"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6, max: 12 })
        .withMessage("Password must be between 6 and 12 characters"),
], AuthController_1.Login);
router.post("/register", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email is not valid"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6, max: 12 })
        .withMessage("Password must be between 6 and 12 characters"),
    (0, express_validator_1.body)("name")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),
], AuthController_1.Register);
router.post("/password/reset", AuthController_1.PasswordReset);
router.post("/password/change", AuthController_1.PasswordChange);
exports.default = router;
