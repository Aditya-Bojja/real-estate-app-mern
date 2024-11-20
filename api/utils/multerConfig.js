import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images", // Folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"], // Restrict to image formats
  },
});

const upload = multer({ storage });

export default upload;
