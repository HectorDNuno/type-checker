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
          <div key={index} class="stat-container">
            <div class="stat-name"> {shortenedNames[stat.name]} </div>

            <div class="stat-amount"> {stat.base_stat} </div>

            <div class="progress-container">
              <div class="progress">
                <span class="bar" style={{ width: `${stat.base_stat / 2}%` }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Barchart;
