"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController_1 = require("../../controller/user/UserController");
const router = express_1.default.Router();
router.get("/me", (req, res) => {
    try {
        (0, UserController_1.GetUserData)(req, res);
    }
    catch (err) {
        res.status(403).json({
            message: "Unauthorized",
            status: 403,
        });
    }
});
router.post("/update", [
    (0, express_validator_1.body)("name").isString(),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("phoneNumber").isString(),
], (req, res) => {
    try {
        (0, UserController_1.UpdateUser)(req, res);
    }
    catch (err) {
        res.status(403).json({
            message: "Unauthorized",
            status: 403,
        });
    }
});
router.post("/update/profile", [(0, express_validator_1.body)("name").isString(), (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("bio").isString()], (req, res) => {
    try {
        (0, UserController_1.UpdateProfile)(req, res);
    }
    catch (err) {
        res.status(403).json({
            message: "Unauthorized",
            status: 403,
        });
    }
});
exports.default = router;
