"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
// import { doubleCsrf } from "csrf-csrf";
const index_1 = __importDefault(require("./router/index"));
const dotenv_1 = require("dotenv");
const ApiAcsess_1 = require("./middleware/ApiAcsess");
const connectDb_1 = require("./db/connectDb");
const RedisConfig_1 = require("./config/RedisConfig");
const app = (0, express_1.default)();
(0, dotenv_1.configDotenv)();
(0, RedisConfig_1.redisConnect)();
(0, connectDb_1.connectDb)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(ApiAcsess_1.addAuthTokenToHeaders);
app.get("/csrf", (req, res) => { });
app.use("/api", ApiAcsess_1.ApiAcsess, index_1.default);
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
