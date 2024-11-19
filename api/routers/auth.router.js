import express from "express";
import {
  authenticateWithGoogle,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", authenticateWithGoogle);
authRouter.get("/signout", signOut);

export default authRouter;
