const createPostValidationSchema = {
  title: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      options: { max: 150 },
      errorMessage: "Title cannot be longer than 150 characters",
    },
  },
  content: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Content is required",
    },
    isString: {
      errorMessage: "Content must be a string",
    },
    isLength: {
      options: { max: 1000 },
      errorMessage: "Content cannot be longer than 1000 characters",
    },
  },

  //add for image
};
const postIdValidationSchema = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "post ID is required",
    },
  },
};

module.exports = { createPostValidationSchema, postIdValidationSchema };
