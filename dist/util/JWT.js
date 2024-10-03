"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_token_jwt = exports.create_token_jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create_token_jwt = (data) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};
exports.create_token_jwt = create_token_jwt;
const verify_token_jwt = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verify_token_jwt = verify_token_jwt;
