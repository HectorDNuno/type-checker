import React from "react";
import "./barchart.css";

const Barchart = ({ stats }) => {
  const shortenedNames = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Spe",
  };

  return (
    stats && (
      <div className="barchart">
        <h5>Stats</h5>

        {stats.map((stat, index) => (
          <div key={index} className="stat-container">
            <div className="stat-name"> {shortenedNames[stat.name]} </div>

            <div className="stat-amount"> {stat.base_stat} </div>

            <div className="progress-container">
              <div className="progress">
                <span className="bar" style={{ width: `${stat.base_stat / 2}%` }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Barchart;
