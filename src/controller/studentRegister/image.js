import Notify from "../../models/notify.js";
import multer from "multer";
import cloudinary from "../../config/cloudconfig.js";

// Setup multer middleware (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single("photo");

const updateimage = async (req, res) => {
  try {
    // Multer handles file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: "File upload error", error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const photourl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "data",
            public_id: Date.now().toString(), // unique id instead of file.name
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );

        uploadStream.end(req.file.buffer);
      });

      // Update Notify document
      const { id } = req.query;
      await Notify.findByIdAndUpdate(id, { photo: photourl });

      res.status(200).json({ success: true, message: "Image uploaded successfully", url: photourl });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export default updateimage;
