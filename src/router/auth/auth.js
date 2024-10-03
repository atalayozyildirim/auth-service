"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../../controller/auth/AuthController");
var router = express_1.default.Router();
router.post("/login", AuthController_1.Login);
router.post("/register", AuthController_1.Register);
router.post("/password/reset", AuthController_1.PasswordReset);
router.post("/password/change", AuthController_1.PasswordChange);
exports.default = router;
