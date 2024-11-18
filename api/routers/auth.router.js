import express from "express";
import {
  authenticateWithGoogle,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", authenticateWithGoogle);

export default authRouter;
