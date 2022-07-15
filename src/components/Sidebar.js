import React, { useState } from "react";
import TypesPage from "./TypesPage";
import "./Sidebar.css";

const Sidebar = ({ options }) => {
  const [isClicked, setIsClicked] = useState({ title: "", color: "", imageUrl: "" });

  return (
    <>
      <nav className="sidebar">
        <input className="search-bar" type="search" placeholder="search types..." />
        <ul>
          {options.map((type, index) => {
            return (
              <>
                <li className={type.cName} key={index}>
                  <div
                    className="individual-options"
                    onClick={() => {
                      setIsClicked({ title: `${type.title}`, color: `${type.color}`, imageUrl: `${type.imageUrl}` });
                    }}
                    style={{ backgroundColor: `#${type.color}` }}
                  >
                    <img className="types-image" src={`${type.imageUrl}`} alt={`${type.title} icon`} />
                    <span className="dropdown-title"> {type.title} </span>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </nav>

      {isClicked && <TypesPage type={isClicked} />}
    </>
  );
};

export default Sidebar;
