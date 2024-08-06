const uploadToCloudinary = require("../../../utils/images/cloudinaryUpload");
const generateOgImage = require("../../../utils/images/ogGenerate");
const Posts = require("../../../models/postModel");

async function ogGenerate(data) {
  if (!data) return;

  const { postId, title, content, image } = data.data;

  try {
    const ogImage = await generateOgImage(title, content, image);
    const ogImageResponse = await uploadToCloudinary(ogImage);

    await Posts.findOneAndUpdate(
      { _id: postId },
      {
        og_image_url: {
          url: ogImageResponse.secure_url,
          public_id: ogImageResponse.public_id,
        },
      }
    );
  } catch (error) {
    console.error("Error processing OG image:", error);
    // retry
  }
}

module.exports = ogGenerate;
