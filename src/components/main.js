import React, { useContext } from "react";
import "./main.css";
import Navbar from "./navbar";
import Content from "./content";
import { sidebarContext } from "../selectedTypeContext";

const Main = () => {
  const { menuClass } = useContext(sidebarContext);
  return (
    <div className={`main ${menuClass === "hidden" ? "full-width" : ""}`}>
      <Navbar />
      <Content />
    </div>
  );
};

export default Main;
