import multer from "multer";
import path from "path";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageFeed = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "feeds",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) =>
      `feed_${Date.now()}${path.extname(file.originalname)}`,
  },
});

const storageProfile = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "profiles",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    public_id: (req, file) =>
      `profile_${Date.now()}${path.extname(file.originalname)}`,
  },
});

export const uploadFeedFile = multer({
  storage: storageFeed,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export const uploadProfileFile = multer({
  storage: storageProfile,
  limits: { fileSize: 20 * 1024 * 1024 },
});
