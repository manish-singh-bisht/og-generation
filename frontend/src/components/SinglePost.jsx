import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import redditLogo from "../../public/reddit.png";
const SinglePost = () => {
  const { postId } = useParams();
  const { data, loading, error } = useFetch(`posts/${postId}`);

  const post = data.post;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border p-4 h-screen w-full">
      {post ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center hover:underline">
            <img
              src={redditLogo}
              alt="reddit logo"
              className="h-5 w-5  rounded-full"
            />
            <span className="text-[0.8s5rem]">Username</span>
          </div>

          <div className="text-2xl font-bold break-words">{post.title}</div>
          <div className="text-[0.95rem] break-words">{post.content}</div>
          {post.image_url?.url && (
            <div>
              <img
                src={post.image_url?.url}
                className="border rounded-lg"
                alt="image"
              />
            </div>
          )}
          <div>Comments.......</div>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default SinglePost;
