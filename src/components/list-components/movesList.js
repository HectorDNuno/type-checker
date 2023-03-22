/* eslint-disable */
import React from "react";
import "./movesList.css";

function MovesList({ title, moves, damageType }) {
  return (
    <div className="all-moves">
      <h4 className={`section-title ${damageType} `}> {title} </h4>
      <ul className="moves-list">
        {moves
          ?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map((move, index) => {
            return (
              <>
                <li id="list" className="moves" key={index}>
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
