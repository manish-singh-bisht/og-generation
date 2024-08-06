const express = require("express");
const { checkSchema } = require("express-validator");
const {
  createPostValidationSchema,
  postIdValidationSchema,
} = require("../utils/validations/postValidation");
const {
  createPosts,
  getAllPosts,
  getPostById,
} = require("../controllers/postController");

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts", checkSchema(createPostValidationSchema), createPosts);
router.get("/posts/:id", checkSchema(postIdValidationSchema), getPostById);

module.exports = router;
