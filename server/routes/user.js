import express from "express";
import { userAuth } from "../middleware/user.js";
import { getUserData } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
