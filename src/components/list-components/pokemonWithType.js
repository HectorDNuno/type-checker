/* eslint-disable */
import React from "react";
import "./pokemonWithType.css";
import { Types } from "../../typesData";
const Pokemon = require("../../pokemon.json");

function PokemonWithTypeList({ type }) {
  function setBackgroundColor(type) {
    let color = "";
    if (Types.some((item) => item.title === type)) {
      for (let i = 0; i < Types.length; i++) {
        if (Types[i].title === type) {
          color += Types[i].color;
        }
      }
    }
    return (
      <div className="type-item" style={{ backgroundColor: `${color}` }}>
        {type}
      </div>
    );
  }

  function getPokemonWithType(type) {
    const PokemonWithType = Pokemon.filter((pokemon) => pokemon.types.includes(type));

    return PokemonWithType;
  }

  return (
    <div className="pokemon-list-container">
      <h2 className="list-title">Pokémon with type {getPokemonWithType(type).length} </h2>
      <div className="pokemon-container">
        <ul className="pokemon-list">
          {getPokemonWithType(type)
            ?.sort()
            .map((pokemon, index) => {
              return (
                <>
                  <li className="name-type-section" key={index}>
                    <img className="pokemon-sprite" src={`${pokemon.spriteURL}`} alt="pokemon sprite" loading="lazy" />

                    <div className="pokemon-name">{pokemon.name}</div>

                    <div className="pokemon-types">
                      <div className="first-type">{setBackgroundColor(pokemon.types[0])}</div>

                      {pokemon.types[1] && <div className="second-type"> {setBackgroundColor(pokemon.types[1])} </div>}
                    </div>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default PokemonWithTypeList;
