/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext } from "../selectedTypeContext";
import "./navbar.css";

const Navbar = () => {
  const { selectedType } = useContext(selectedTypeContext);

  return (
    <nav className="navbar">
      <div class="navbar-item">
        <i class="fa-solid fa-bars"></i>
      </div>

      <div class="navbar-item type-name" style={{ background: selectedType.color }}>
        <span> {selectedType.title} </span>
      </div>
    </nav>
  );
};

export default Navbar;
