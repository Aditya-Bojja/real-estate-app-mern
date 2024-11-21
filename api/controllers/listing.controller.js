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

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(400, "Listing not found"));
    if (req.user.id !== listing.userRef)
      return next(errorHandler(401, "Unauthorizd"));
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(400, "Listing not found"));
    if (req.user.id !== listing.userRef)
      return next(errorHandler(401, "Unauthorizd"));
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(400, "Listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
