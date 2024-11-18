import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/helper.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUser);

export default userRouter;
