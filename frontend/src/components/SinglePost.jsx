import { Link, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import redditLogo from "../../public/reddit.png";
import { Helmet } from "react-helmet";
const SinglePost = () => {
  const { postId } = useParams();
  const { data, loading, error } = useFetch(`posts/${postId}`);

  const post = data.post;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border p-4 h-screen w-full">
      <Helmet>
        <meta
          property="og:image"
          content={post?.og_image_url?.url || "fallback_image_url"}
        />

        <meta
          name="twitter:image"
          content={post?.og_image_url?.url || "fallback_image_url"}
        />
      </Helmet>
      {post ? (
        <div className="flex flex-col gap-4">
          {post.og_image_url?.url !== null ? (
            <div>
              <a
                href={post.og_image_url.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600"
              >
                {post.og_image_url.url}

                {post.og_image_url.url}
              </a>
              <div className="text-red-400">
                I thought i would show you a preview by sharing in twitter, but
                this did not turn out well because ssr is needed,crawling issues
                of twitter,doesnot execute js so ,doesnt read the tags.
              </div>
            </div>
          ) : (
            <div>
              wait og image is being processed.refresh after 2 seconds.
            </div>
          )}
          <div className="flex mt-10 gap-2 items-center hover:underline">
            <img
              src={redditLogo}
              alt="reddit logo"
              className="h-5 w-5  rounded-full"
            />
            <span className="text-[0.85rem]">Username</span>
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
