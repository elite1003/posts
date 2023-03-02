import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Link to="/post">Post</Link>
      </div>
      <div>
        <Link to="/lazyLoading">LazyLoading</Link>
      </div>
    </div>
  );
}

export default Home;
