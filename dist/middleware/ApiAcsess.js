"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAuthTokenToHeaders = exports.genarateToken = exports.ApiAcsess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genarateToken = (req, res, next) => {
    const token = jsonwebtoken_1.default.sign({}, process.env.SECRET, {
        expiresIn: "1h",
    });
    res.setHeader("X-API-TOKEN", token);
    res.status(200).json({ token });
};
exports.genarateToken = genarateToken;
const ApiAcsess = (req, res, next) => {
    const token = req.headers["X-API-TOKEN"];
    try {
        const Verify = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (Verify) {
            return next();
        }
    }
    catch (error) {
        res.status(401).json({ message: "Invalid api token" });
    }
};
exports.ApiAcsess = ApiAcsess;
const addAuthTokenToHeaders = (req, res, next) => {
    const token = jsonwebtoken_1.default.sign({}, process.env.SECRET, {
        expiresIn: "24h",
    });
    req.headers["X-API-TOKEN"] = token;
    next();
};
exports.addAuthTokenToHeaders = addAuthTokenToHeaders;
