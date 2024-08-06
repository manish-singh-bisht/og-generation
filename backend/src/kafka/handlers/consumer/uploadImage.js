const uploadToCloudinary = require("../../../utils/images/cloudinaryUpload");
const Posts = require("../../../models/postModel");

async function uploadImage(data) {
  if (!data) return;
  try {
    const imageResponse = await uploadToCloudinary(data.data.image);

    await Posts.findOneAndUpdate(
      { _id: data.data.postId },
      {
        image_url: {
          url: imageResponse.secure_url,
          public_id: imageResponse.public_id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = uploadImage;
