import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/youtube.png";

function Home() {
  const [mediaUrl, setMediaUrl] = useState();
  const navigate = useNavigate();

  const searchUrl = (e) => {
    e.preventDefault();
    console.log(mediaUrl);
    navigate(`/video/?url=${mediaUrl}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-5">
      <div className="flex flex-col items-center p-5 mt-20 mb-5">
        <img src={logo} alt="" className="w-24" />
        <span className="font-bold text-2xl text-gray-900 dark:text-white">
          Youtube Downloader
        </span>
      </div>

      <form className="max-w-2xl mx-auto" onSubmit={searchUrl}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <i className="far fa-search text-gray-400"></i>
          </div>
          <input
            type="search"
            name="link"
            defaultValue={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="block min-w-full p-4 ps-12 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            placeholder="Enter video link or text"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col justify-between md:flex-row p-2 text-gray-700 dark:text-white">
          <span>
            Try:{" "}
            <Link
              className="underline"
              to="/video?url=https://www.youtube.com/watch?v=kXxvV5KKNfM"
            >
              https://www.youtube.com/watch?v=kXxvV5KKNfM
            </Link>
          </span>
          <span>
            Try: <Link className="underline">1000 Nights</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Home;
