/* eslint-disable */
import React from "react";
import "./movesWithType.css";
import MovesList from "./movesList";

function movesWithTypeList({ allMoves }) {
  return (
    <div className="moves-container">
      <h2 className="list-title">Moves with type {allMoves.length}</h2>
      <div className="moves-list-container">
        <MovesList title={"Physical"} moves={allMoves} damageType={"physical"} />
        <MovesList title={"Special"} moves={allMoves} damageType={"special"} />
        <MovesList title={"Status"} moves={allMoves} damageType={"status"} />
      </div>
    </div>
  );
}

export default movesWithTypeList;
