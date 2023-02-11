import React, { useState } from "react";
import TypesPage from "./TypesPage";
import "./Sidebar.css";

const Sidebar = ({ types }) => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });

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
