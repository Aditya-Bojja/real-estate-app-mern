import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/helper.js";

export const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body);
    return res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(errorHandler(400, "No files uploaded."));
    }

    // Extract URLs from the uploaded files
    const urls = req.files.map((file) => file.path);

    res.status(200).json({ urls });
  } catch (error) {
    next(error);
  }
};
