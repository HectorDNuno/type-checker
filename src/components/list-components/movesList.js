/* eslint-disable */
import React from "react";
import "./movesList.css";

const MovesList = ({ title, moves, damageType }) => {
  return (
    <div className="all-moves">
      <h4 className={`section-title ${damageType} `}> {title} </h4>
      <div className="moves-count">{moves.length} moves </div>
      <ul className="moves-list">
        {moves
          ?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map((move, index) => {
            return (
              <>
                <li className="moves" key={index}>
                  <p> {move.name} </p>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};
export default MovesList;
