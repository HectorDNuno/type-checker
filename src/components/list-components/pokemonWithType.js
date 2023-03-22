/* eslint-disable */
import React, { useState } from "react";
import "./pokemonWithType.css";
import { Types } from "../typesData";
const Pokemon = require("../pokemon.json");

function PokemonWithTypeList({ type }) {
  const [shinySprites, setShinySprites] = useState(false);
  const [shinyButtonText, setShinyButtonText] = useState("shiny");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [orderButtonText, setOrderButtonText] = useState("alphabetical");

  const toggleShinySprites = () => {
    setShinySprites(!shinySprites);

    if (shinyButtonText === "shiny") {
      setShinyButtonText("normal");
    } else {
      setShinyButtonText("shiny");
    }
  };

  const toggleOrder = () => {
    setAlphabeticalOrder(!alphabeticalOrder);

    if (orderButtonText === "alphabetical") {
      setOrderButtonText("numerical");
    } else {
      setOrderButtonText("alphabetical");
    }
  };

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
    const pokemonWithType = Pokemon.filter((pokemon) => pokemon.types.includes(type));
    const organizedPokemonArray = pokemonWithType.map((pokemon) => {
      const pokemonObject = {
        name: pokemon.name.toLowerCase(),
        number: pokemon.number,
        spriteURL: pokemon.spriteURL,
        shinySpriteURL: pokemon.shinySpriteURL,
        types: pokemon.types,
      };
      return pokemonObject;
    });

    return organizedPokemonArray;
  }

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon with type {getPokemonWithType(type).length} </h2>
      <div id="list" className="pokemon-container">
        <ul className="pokemon-list">
          {getPokemonWithType(type)?.map((pokemon, index) => {
            return (
              <>
                <li className="name-type-section" key={index}>
                  {shinySprites ? (
                    <img
                      className="pokemon-sprite"
                      src={`${pokemon.shinySpriteURL}`}
                      alt="shiny sprite"
                      loading="lazy"
                    />
                  ) : (
                    <img className="pokemon-sprite" src={`${pokemon.spriteURL}`} alt="pokemon sprite" loading="lazy" />
                  )}

                  <div className="pokemon-number">#{pokemon.number}</div>
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

      <div className="toggle-buttons">
        <button type="button" onClick={toggleShinySprites}>
          {shinyButtonText} versions
        </button>

        <button type="button" onClick={toggleOrder}>
          {orderButtonText} order
        </button>
      </div>
    </div>
  );
}

export default PokemonWithTypeList;
