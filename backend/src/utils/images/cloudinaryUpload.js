const cloudinary = require("cloudinary").v2;

async function uploadToCloudinary(imageBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "og-images" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(imageBuffer);
  });
}

module.exports = uploadToCloudinary;
