/* eslint-disable */
import React from "react";
import DamageList from "./damageList";
import "./damageRelations.css";

function DamageRelationsList({ damageRelations }) {
  return (
    <div className="damage-relations-container">
      <div className="left-list">
        <h2>Defense</h2>
        <DamageList damage={damageRelations.double_damage_from} title={"Takes 2x from"} />
        <DamageList damage={damageRelations.half_damage_from} title={"Takes 1/2x from"} />
        <DamageList damage={damageRelations.no_damage_from} title={"Takes 0x from"} />
      </div>

      <div className="right-list">
        <h2>Offense</h2>
        <DamageList damage={damageRelations.double_damage_to} title={"Deals 2x to"} />
        <DamageList damage={damageRelations.half_damage_to} title={"Deals 1/2x to"} />
        <DamageList damage={damageRelations.no_damage_to} title={"Deals 0x to"} />
      </div>
    </div>
  );
}

export default DamageRelationsList;
