const { validationResult, matchedData } = require("express-validator");
const Posts = require("../models/postModel");
const { sendMessage } = require("../kafka/producer");

exports.createPosts = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });

  const { title, content } = matchedData(req);
  const image = req.body.image;

  try {
    const newPost = await Posts.create({
      title,
      content,
      image_url: {
        url: null,
        public_id: null,
      },
      og_image_url: {
        url: null,
        public_id: null,
      },
    });

    res.status(201).json({ message: "post created", post: newPost });

    if (image) {
      await sendMessage("image-upload", {
        event: "upload-image",
        data: { image, postId: newPost._id },
      });
    }
    await sendMessage("og-generation", {
      event: "og-generate",
      data: {
        title,
        content,
        image: image ? image : null,
        postId: newPost._id,
      },
    });
    return;
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({}, { og_image_url: 0 }).sort({ _id: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

exports.getPostById = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ errors: result.array() });

  const { id } = matchedData(req);

  try {
    const post = await Posts.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
};
