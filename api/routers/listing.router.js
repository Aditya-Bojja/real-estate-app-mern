import express from "express";
import { verifyToken } from "../utils/helper.js";
import {
  createListing,
  deleteListing,
  getAllFilteredListings,
  getListingById,
  updateListing,
  uploadImages,
} from "../controllers/listing.controller.js";
import upload from "../utils/multerConfig.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.post(
  "/upload-images",
  verifyToken,
  upload.array("images", 6),
  uploadImages
);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.put("/update/:id", verifyToken, updateListing);
listingRouter.get("/get/:id", getListingById);
listingRouter.get("/get", getAllFilteredListings);

export default listingRouter;
