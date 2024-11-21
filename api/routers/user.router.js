import express from "express";
import {
  deleteUser,
  getUserListings,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/helper.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);

export default userRouter;
