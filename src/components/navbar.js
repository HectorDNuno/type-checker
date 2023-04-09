/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext } from "../selectedTypeContext";
import "./navbar.css";

const Navbar = () => {
  const { selectedType } = useContext(selectedTypeContext);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          Type Checkr <i className="fas fa-circle-check" style={{ color: `${selectedType.color}` }} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
