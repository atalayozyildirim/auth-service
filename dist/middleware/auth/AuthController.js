"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("../../util/JWT");
const AuthController = (req, res, next) => {
    var _a;
    const acsess_token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const verify_acsess_token = (0, JWT_1.verify_token_jwt)(acsess_token);
    if (verify_acsess_token) {
        return next();
    }
    else {
        return res
            .status(401)
            .json({ message: "Unauthorized", redirect: "/auth/login" });
    }
};
exports.default = AuthController;
