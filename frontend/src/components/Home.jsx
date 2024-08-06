import useFetch from "../customHooks/useFetch";
import redditLogo from "../../public/reddit.png";
import { Form } from "./Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetch("posts");

  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (data && data.posts) {
      setLocalPosts(data.posts);
    }
  }, [data]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Form setLocalPosts={setLocalPosts} />
      {localPosts && localPosts.length > 0 ? (
        localPosts.map((post) => (
          // not using this below jsx as separate component because being used at this place only.
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="flex rounded-md p-2 hover:cursor-pointer  flex-col border gap-2 hover:bg-slate-800"
          >
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
          </Link>
        ))
      ) : (
        <div>No post,be the first one!!!!</div>
      )}
    </div>
  );
};

export default Home;
