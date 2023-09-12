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
    <nav className="sidebar">
      <div className="scroll">
        {Types.map((type, index) => (
          <div className="sidebar-options" key={index}>
            <div
              className="name-section"
              style={{
                backgroundColor: index === selectedTypeIndex ? type.color : "#D3D3D3",
                color: index === selectedTypeIndex ? "#FFFFFF" : "#000000",
              }}
              onClick={() => {
                handleTypeClick(type, index);
              }}
            >
              {type.title}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
