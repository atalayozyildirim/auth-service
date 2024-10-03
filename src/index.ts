import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import session from "express-session";
// import { doubleCsrf } from "csrf-csrf";
import router from "./router/index";
import { configDotenv } from "dotenv";
import { addAuthTokenToHeaders, ApiAcsess } from "./middleware/ApiAcsess";
import { connectDb } from "./db/connectDb";
import { redisConnect } from "./config/RedisConfig";

const app = express();

configDotenv();

redisConnect();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(addAuthTokenToHeaders);
app.get("/csrf", (req: Request, res: Response) => {});
app.use("/api", ApiAcsess, router);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
