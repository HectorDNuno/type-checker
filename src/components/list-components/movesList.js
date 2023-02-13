/* eslint-disable */
import React from "react";
import "./movesList.css";

function MovesList({ title, moves, damageType }) {
  return (
    <div className="all-moves">
      <h4 className={`section-title ${damageType} `}> {title} </h4>
      <ul className="moves-list">
        {moves?.map((move, index) => {
          return (
            <>
              <li className="moves" key={index}>
                {move.damageClass === damageType && <p className="move"> {move.name} </p>}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
export default MovesList;
