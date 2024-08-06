import redditLogo from "../../public/reddit.png";
const Header = () => {
  return (
    <div className="border-b  sticky top-0  backdrop-blur-md justify-between border-white mb-10 py-2 flex  items-center">
      <div className="flex items-center gap-3">
        <img
          src={redditLogo}
          alt="reddit logo"
          className="h-12 w-12 rounded-full"
        />

        <span className="font-extrabold text-4xl text-white">reddit</span>
      </div>
    </div>
  );
};

export default Header;
