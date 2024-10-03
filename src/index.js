"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var express_1 = require("express");
var index_1 = require("./router/index");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
(0, dotenv_1.configDotenv)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(session());
app.get("/csrf", function (req, res) { });
app.use("/api", index_1.default);
app.listen(3000, function () {
    console.log("Server is running on port http://localhost:3000");
});
