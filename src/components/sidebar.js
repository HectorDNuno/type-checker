/* eslint-disable */
import React, { useContext, useState } from "react";
import { selectedTypeContext } from "../selectedTypeContext";
import { Types } from "./typesData";
import "./sidebar.css";

const Sidebar = () => {
  const { setSelectedType } = useContext(selectedTypeContext);

  // Initialize state for the index of the currently selected type
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);

  const handleTypeClick = (type, index) => {
    setSelectedType({ title: type.title, color: type.color });

    // Update the selected type index
    setSelectedTypeIndex(index);
  };

  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="fa-solid fa-circle-check"></i>
        <span className="logo_name">Type Checkr</span>
      </div>

      <ul className="sidebar-links">
        {Types.map((type, index) => (
          <li
            key={index}
            style={{
              backgroundColor: index === selectedTypeIndex ? type.color : "#1a1919",
            }}
            onClick={() => {
              handleTypeClick(type, index);
            }}
          >
            <a href="#">
              <span className="links-name"> {type.title} </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
