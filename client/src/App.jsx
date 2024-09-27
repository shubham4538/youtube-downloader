import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";

import "./styles/index.css";
import "./styles/styles.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setDarkTheme(true);
  }, []);

  return (
    <BrowserRouter>
      <button className="z-50 absolute right-0 p-5">
        <i
          className={darkTheme ? "far fa-sun text-white" : "far fa-moon"}
          onClick={() => {
            setDarkTheme((prev) => !prev);
            darkTheme
              ? document.documentElement.classList.remove("dark")
              : document.documentElement.classList.add("dark");
          }}
        ></i>
      </button>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/video"} element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
