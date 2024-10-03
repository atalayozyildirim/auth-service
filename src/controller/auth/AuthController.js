"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = exports.PasswordChange = exports.Register = exports.Login = void 0;
var client_1 = require("@prisma/client");
var express_validator_1 = require("express-validator");
var prisma = new client_1.PrismaClient();
var Login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
};
exports.Login = Login;
var Register = function (req, res) { };
exports.Register = Register;
var PasswordReset = function (req, res) { };
exports.PasswordReset = PasswordReset;
var PasswordChange = function (req, res) { };
exports.PasswordChange = PasswordChange;
