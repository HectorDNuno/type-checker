import React from "react";
import "./main.css";
import Navbar from "./navbar";
import Content from "./content";

const Main = () => {
  return (
    <div className="main">
      <Navbar />
      <Content />
    </div>
  );
};

export default Main;
