/* eslint-disable */
import React from "react";
import "./movesWithType.css";
import MovesList from "./movesList";

function movesWithTypeList({ allMoves, isLoading, type }) {
  return (
    <div className="moves-container">
      <div className="list-title">
        <h2>Moves with type</h2>

        {!isLoading &&
        allMoves.some(
          (move) =>
            move.name.includes(`${type}`) ||
            move.name.includes("vacuum-wave") ||
            move.name.includes("wing-attack") ||
            move.name.includes("trick-or-treat") ||
            move.name.includes("scorching-sands") ||
            move.name.includes("yawn")
        ) ? (
          <h2 className="number">{allMoves.length}</h2>
        ) : (
          <h2 className="number skeleton"></h2>
        )}
      </div>

      <div className="moves-list-container">
        <MovesList title={"Physical"} moves={allMoves} damageType={"physical"} />
        <MovesList title={"Special"} moves={allMoves} damageType={"special"} />
        <MovesList title={"Status"} moves={allMoves} damageType={"status"} />
      </div>
    </div>
  );
}

export default movesWithTypeList;
