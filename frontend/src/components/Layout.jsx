import Header from "./Header";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-[100vh] fixed overflow-auto w-[100vw] bg-black text-white px-5">
      <Header />
      <div className="w-full  flex  justify-center">
        <main className="flex   w-1/2 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
