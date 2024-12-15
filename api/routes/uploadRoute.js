import express from "express";
import fileUpload from "express-fileupload";
import { uploadImage } from "../controllers/uploadcontroller.js";

const router = express.Router();

// Middleware to handle file uploads
router.use(fileUpload());

// Route to handle image upload
router.post("/upload", uploadImage);

export default router;
