const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Storage engine to save files under /media/<productId>/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productId = req.params.id;

    if (!productId) {
      return cb(new Error("Product ID is required in the route params"), null);
    }

    const dir = path.join(__dirname, "../media", productId);
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

// Optional file filter (optional: allow only images/videos)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Only images and MP4 videos are allowed."), false);
  }
};

const uploadGallery = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit to 50MB per file
  },
});

module.exports = uploadGallery;
