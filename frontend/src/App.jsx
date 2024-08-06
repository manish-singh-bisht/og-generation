import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { Suspense } from "react";
import Loader from "./components/Loader";
import SinglePost from "./components/SinglePost";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts/:postId" element={<SinglePost />} />
            <Route path="*" component={() => <h1>404 Not Found</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
