const { Env } = require("./envConfig");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: Env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: Env.CLOUDINARY_API_SECRET,
});

const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image",
    quality: "auto:good",
  }),
});

const upload = multer(
  { storage, limits: { fileSize: 5 * 1024 * 1024 }, file: 1 },
  (fileFilter = (_, file, cb) => {
    const isValidFile = /^image\/(jpeg|png|jpg)$/.test(file.mimetype);
    if (!isValidFile) return;

    cb(null, true);
  })
);
