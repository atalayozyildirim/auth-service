"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChange = exports.PasswordReset = exports.Register = exports.Logout = exports.Login = void 0;
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HashPassword_1 = require("../../util/HashPassword");
const mail_1 = require("../mail/mail");
const JWT_1 = require("../../util/JWT");
const prisma = new client_1.PrismaClient();
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phoneNumber, name } = req.body;
    try {
        const existingUser = yield prisma.auth.findFirst({ where: { email } });
        const exitingUserPhone = yield prisma.auth.findFirst({
            where: { phoneNumber: parseInt(phoneNumber, 10) },
        });
        if (existingUser || exitingUserPhone) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield (0, HashPassword_1.HashPassword)(password);
        const userData = {
            data: {
                email,
                password: hashedPassword,
                phoneNumber,
            },
        };
        const userAuth = yield prisma.auth.create(userData);
        // await Login(req, res); // Auto login after register
        return res.status(201).json({ userAuth });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield prisma.auth.findFirstOrThrow({
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
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });
        // await client.set("auth_token", token, { EX: 3600 });
        return res.status(200).json({ data: { token } });
    }
    catch (err) {
        console.error("Error in login process:", err);
        return res.status(400).json({ message: "Error server", err });
    }
});
exports.Login = Login;
const PasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = yield prisma.auth.findFirst({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });
        const data = {
            token: token,
            email: email,
        };
        (0, mail_1.sendMail)({
            to: email,
            subject: "Password Reset Request",
            text: `Click this link to reset your password`,
            user: data,
        }, req, res);
    }
    catch (error) {
        console.error("Error in password reset process:", error);
        return res.status(500).json({ message: "Error server", error });
    }
});
exports.PasswordReset = PasswordReset;
const PasswordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { password } = req.body;
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const verifyToken = (0, JWT_1.verify_token_jwt)(token);
        if (!verifyToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const decodeJwt = jsonwebtoken_1.default.decode(token);
        const hashedPassword = yield (0, HashPassword_1.HashPassword)(password);
        const oldPassword = yield prisma.auth.findFirst({
            where: { id: decodeJwt.id },
            select: { password: true },
        });
        const comparePassword = yield (0, HashPassword_1.ComparePassword)(password, oldPassword.password);
        if (comparePassword)
            return res.status(400).json({ message: "Same password", status: 400 });
        const UpdateData = yield prisma.auth.update({
            where: { id: decodeJwt.id },
            data: { password: hashedPassword },
        });
        res.json({ message: "Passowrd has changed log in again" });
    }
    catch (error) {
        console.error("Error in password change process:", error);
        return res.status(500).json({ message: "Error server", error });
    }
});
exports.PasswordChange = PasswordChange;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }
        const verifyToken = (0, JWT_1.verify_token_jwt)(token);
        if (!verifyToken) {
            return res.status(400).json({ message: "Invalid token" });
        }
        return res.status(200).json({ message: "Logout success" });
    }
    catch (error) {
        console.error("Error in logout process:", error);
        return res.status(500).json({ message: "Error server", error });
    }
});
exports.Logout = Logout;
