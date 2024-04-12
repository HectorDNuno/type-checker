/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext, sidebarContext } from "../selectedTypeContext";
import "./navbar.css";

const Navbar = () => {
  const { selectedType } = useContext(selectedTypeContext);
  const { setMenuClass, menuClass } = useContext(sidebarContext);

  const toggleSidebar = () => {
    setMenuClass(menuClass === "hidden" ? "" : "hidden");
  };

  return (
    <nav className={`navbar ${menuClass === "hidden" ? "full-width" : ""}`}>
      <div className="navbar-item">
        <i onClick={toggleSidebar} className="fa-solid fa-bars"></i>
      </div>

      <div className="navbar-item type-name" style={{ background: selectedType.color }}>
        <span> {selectedType.title} </span>
      </div>
    </nav>
  );
};

export default Navbar;
