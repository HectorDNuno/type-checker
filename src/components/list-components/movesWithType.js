/* eslint-disable */
import React from "react";
import "./movesWithType.css";
import MovesList from "./movesList";

const movesWithTypeList = ({ allMoves, isLoading, type }) => {
  const physicalMoves = allMoves.filter((move) => move.damageClass === "physical");
  const specialMoves = allMoves.filter((move) => move.damageClass === "special");
  const statusMoves = allMoves.filter((move) => move.damageClass === "status");
  return (
    <div className="moves-container">
      <div className="moves-section-title">
        <h2>Moves with type:</h2>

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
          <h2 className="number-skeleton"></h2>
        )}
      </div>

      <div className="moves-list-container">
        <MovesList moves={physicalMoves} damageType={"physical"} isLoading={isLoading} />
        <MovesList moves={specialMoves} damageType={"special"} isLoading={isLoading} />
        <MovesList moves={statusMoves} damageType={"status"} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default movesWithTypeList;
