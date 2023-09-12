/* eslint-disable */
import React, { useState } from "react";
import "./pokemonWithType.css";
import { Types } from "../typesData";

const PokemonWithTypeList = ({ pokemon }) => {
  const [shinySprites, setShinySprites] = useState(false);
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);

  const toggleState = (stateSetter) => {
    stateSetter((prevState) => !prevState);
    list.scrollTop = 0;
  };

  const toggleSprites = () => {
    toggleState(setShinySprites);
  };

  const toggleOrder = () => {
    toggleState(setAlphabeticalOrder);
  };

  const setBackgroundColor = (type) => {
    const typeColor = Types.find((item) => item.title === type)?.color;
    return (
      <div className="type-item" style={{ backgroundColor: typeColor }}>
        {type}
      </div>
    );
  };

  const pokemonCopy = [...pokemon];

  if (alphabeticalOrder) {
    pokemonCopy.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  } else {
    pokemonCopy.sort((a, b) => a.number - b.number);
  }

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon with type: {pokemon.length} </h2>

      <div id="list" className="pokemon-container">
        <ul className="pokemon-list">
          {pokemonCopy.map((pokemon, index) => (
            <li className="name-type-section" key={index}>
              <img
                className="pokemon-sprite"
                src={shinySprites ? pokemon.shinySprite : pokemon.sprite}
                alt={shinySprites ? "shiny sprite" : "sprite"}
                loading="lazy"
              />

              <div className="pokemon-number">#{pokemon.number}</div>
              <div className="pokemon-name">{pokemon.name}</div>

              <div className="pokemon-types">
                <div className="first-type">{setBackgroundColor(pokemon.types[0])}</div>
                {pokemon.types[1] && <div className="second-type">{setBackgroundColor(pokemon.types[1])}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="toggle-buttons">
        <button type="button" onClick={toggleSprites}>
          {shinySprites ? "normal" : "shiny"} versions
        </button>

        <button type="button" onClick={toggleOrder}>
          {alphabeticalOrder ? "numerical" : "alphabetical"} order
        </button>
      </div>
    </div>
  );
};

export default PokemonWithTypeList;
