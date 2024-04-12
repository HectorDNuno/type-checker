/* eslint-disable */
import React, { useContext, useState } from "react";
import { SelectedTypeContext, SidebarContext } from "../Contexts";
import { Types } from "../typesData";
import "./sidebar.css";

const Sidebar = () => {
  const { setSelectedType } = useContext(SelectedTypeContext);
  const { menuClass, setMenuClass } = useContext(SidebarContext);

  // Initialize state for the index of the currently selected type
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);

  const handleTypeClick = (type, index) => {
    setSelectedType({ title: type.title, color: type.color });

    // Update the selected type index
    setSelectedTypeIndex(index);
  };

  const closeSidebar = () => {
    if (screen.width <= 960) {
      setMenuClass("hidden");
    }
  };

  return (
    <div className={`sidebar ${menuClass}`}>
      <div className="logo-details">
        <i className="fa-solid fa-circle-check"></i>
        <span className="logo_name">Type Checkr</span>
        <i onClick={closeSidebar} className="fa-solid fa-xmark close-icon"></i>
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
            <a onClick={closeSidebar} href="#">
              <span className="links-name"> {type.title} </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
