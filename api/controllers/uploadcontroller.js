import cloudinary from "../utils/configCloudinary.js"; // Import your Cloudinary config

export const uploadImage = async (req, res) => {
  try {
    // Check if files are present in the request
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file; // Access the uploaded file

    // Use Cloudinary's upload_stream to upload the file buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "merestate" }, // Options for Cloudinary
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ message: "Error uploading image to Cloudinary" });
        }

        // Respond with the secure URL of the uploaded image
        return res.status(200).json({ secure_url: result.secure_url });
      }
    );

    // Pipe the file buffer to Cloudinary's upload_stream
    uploadStream.end(file.data);
  } catch (error) {
    console.error("Error in uploadImage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
