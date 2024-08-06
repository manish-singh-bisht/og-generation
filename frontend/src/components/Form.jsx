import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/index";

// eslint-disable-next-line react/prop-types
export function Form({ setLocalPosts }) {
  const [post, setPost] = useState({ title: "", content: "", image: null });
  const [error, setError] = useState("");

  const updatePost = (field, value) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  // const handleImageChange = (e) => {
  // const file = e.target.files[0];
  // if (file) {
  //   if (file.type.startsWith("image/")) {
  //     updatePost("image", file);
  //     setError("");
  //   } else {
  //     setError("Please select an image file.");
  //     e.target.value = null;
  //   }
  // }

  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        updatePost("image", Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!post.title || !post.content) {
      setError("Please fill all fields.");
      return;
    }

    if (post.title.length > 150) {
      setError("Title to be less than 150 characters.");
      return;
    }
    if (post.content.length > 1000) {
      setError("Content to be less than 1000 characters.");
      return;
    }

    //formdata doesnt work

    // const formData = new FormData();
    // formData.append("title", post.title);
    // formData.append("content", post.content);
    // post.image
    //   ? formData.append("image", post.image)
    //   : formData.append("image", null);

    try {
      const newPost = await axios.post(
        `${API_BASE_URL}/posts`,
        { title: post.title, content: post.content, image: post.image },
        {
          headers: {
            "Content-Type": "application/json", //for now sending as this as formdata not working,have less time for project submission
          },
        }
      );
      setLocalPosts((prev) => [
        { ...newPost.data.post, image_url: { url: post.image } },
        ...prev,
      ]);
      setPost({ title: "", content: "", image: null });
    } catch (error) {
      setError("Error submitting post. Please try again.");
      console.error("Error submitting post:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4 my-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-black p-2 border rounded-md"
        value={post.title}
        onChange={(e) => updatePost("title", e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="text-black p-2 border rounded-md"
        value={post.content}
        onChange={(e) => updatePost("content", e.target.value)}
        placeholder="Content"
        rows="4"
      />
      <input
        type="file"
        className="w-fit"
        onChange={handleImageChange}
        accept="image/*"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="border hover:bg-gray-800 w-fit rounded-md px-4 py-2 text-white"
        type="submit"
      >
        Submit Post
      </button>
    </form>
  );
}
