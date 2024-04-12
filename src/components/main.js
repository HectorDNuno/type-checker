import React, { useContext } from "react";
import "./main.css";
import Navbar from "./navbar";
import Content from "./content";
import { SidebarContext } from "../Contexts";

const Main = () => {
  const { menuClass } = useContext(SidebarContext);
  return (
    <div className={`main ${menuClass === "hidden" ? "full-width" : ""}`}>
      <Navbar />
      <Content />
    </div>
  );
};

export default Main;
