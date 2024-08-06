const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  image_url: {
    public_id: { type: String, trim: true },
    url: { type: String, trim: true },
  }, //just one image
  og_image_url: {
    public_id: { type: String, trim: true },
    url: { type: String, trim: true },
  },

  //add more accordingly,this is just for the assignment
});

module.exports = mongoose.model("Posts", postSchema);
