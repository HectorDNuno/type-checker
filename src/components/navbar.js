/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext } from "../selectedTypeContext";
import "./navbar.css";

const Navbar = () => {
  const { selectedType } = useContext(selectedTypeContext);

  return (
    <nav className="navbar">
      <div className="navbar-item">
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="navbar-item type-name" style={{ background: selectedType.color }}>
        <span> {selectedType.title} </span>
      </div>
    </nav>
  );
};

export default Navbar;
