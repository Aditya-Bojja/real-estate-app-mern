import express from "express";
import { verifyToken } from "../utils/helper.js";
import {
  createListing,
  uploadImages,
} from "../controllers/listing.controller.js";
import upload from "../utils/multerConfig.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.post("/upload-images", upload.array("images", 6), uploadImages);

export default listingRouter;
