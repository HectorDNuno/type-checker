/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext } from "../selectedTypeContext";
import { Types } from "./typesData";
import "./sidebar.css";

const Sidebar = () => {
  const { setSelectedType } = useContext(selectedTypeContext);
  const types = Types;

  const changeSelectedTypeColor = (e, color) => {
    const allSideBarOptions = document.querySelectorAll(".name-section");
    allSideBarOptions.forEach((option) => {
      option.style.backgroundColor = "";
      option.style.color = "#000000";
    });

    const selected = e.target;
    selected.style.backgroundColor = color;
    selected.style.color = "#FFFFFF";
  };

  const resetListPosition = () => {
    const list = document.getElementById("list");
    list.scrollTop = 0;
  };

  return (
    <>
      <nav className="sidebar">
        <div className="scroll">
          {types.map((type, index) => {
            return (
              <div className={type.cName} key={index}>
                <div
                  className="name-section"
                  onClick={(e) => {
                    setSelectedType({ title: `${type.title}`, color: `${type.color}` });
                    changeSelectedTypeColor(e, type.color);
                    resetListPosition();
                  }}
                >
                  {type.title}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
