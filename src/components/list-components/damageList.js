import React from "react";
import "./damageList.css";
import { Types } from "/Users/hector/Code/React/type-checker/src/typesData.js";

function DamageList({ title, damage }) {
  function setBackgroundColor(type) {
    let color = "";
    if (Types.some((item) => item.title === type)) {
      for (let i = 0; i < Types.length; i++) {
        if (Types[i].title === type) {
          color = color + Types[i].color;
        }
      }
    }

    return (
      <div className="type-item" style={{ backgroundColor: `${color}` }}>
        {type}
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h5 className="card-title"> {title} </h5>
      <ul className="damage-list">
        {damage?.map((type, index) => {
          return (
            <>
              <li className="damage-item" key={index}>
                {setBackgroundColor(type.name)}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default DamageList;
