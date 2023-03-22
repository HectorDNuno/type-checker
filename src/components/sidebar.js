/* eslint-disable */
import React, { useState } from "react";
import TypesPage from "./types-page-components/typesPage";
import "./sidebar.css";

const Sidebar = ({ types }) => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });

  function resetScroll() {
    const list = document.getElementById("list");
    const movesList = document.querySelectorAll(".moves-list");
    list.scrollTop = 0;
    movesList.scrollTop = 0;
  }

  return (
    <>
      <nav className="sidebar">
        <div className="scroll">
          {types.map((type, index) => {
            return (
              <div className={type.cName} key={index}>
                <div
                  className="name-section"
                  onClick={() => {
                    setSelectedType({ title: `${type.title}`, color: `${type.color}` });
                    resetScroll();
                  }}
                  style={{ backgroundColor: `${type.color}` }}
                >
                  <span className="type-name"> {type.title} </span>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {selectedType && <TypesPage type={selectedType} />}
    </>
  );
};

export default Sidebar;
