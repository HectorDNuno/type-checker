/* eslint-disable */
import React, { useState } from "react";
import "./pokemonWithType.css";
import { Types } from "../typesData";
const Pokemon = require("../pokemon.json");

const PokemonWithTypeList = ({ type }) => {
  const [shinySprites, setShinySprites] = useState(false);
  const [shinyButtonText, setShinyButtonText] = useState("shiny");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [orderButtonText, setOrderButtonText] = useState("alphabetical");

  const toggleSprites = () => {
    setShinySprites(!shinySprites);
    list.scrollTop = 0;

    shinyButtonText === "shiny" ? setShinyButtonText("normal") : setShinyButtonText("shiny");
  };

  const toggleOrder = () => {
    setAlphabeticalOrder(!alphabeticalOrder);
    list.scrollTop = 0;

    orderButtonText === "alphabetical" ? setOrderButtonText("numerical") : setOrderButtonText("alphabetical");
  };

  const setBackgroundColor = (type) => {
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
  };

  const getPokemonWithType = (type) => {
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

    if (alphabeticalOrder) {
      return organizedPokemonArray.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    } else {
      return organizedPokemonArray.sort();
    }
  };

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon with type: {getPokemonWithType(type).length} </h2>
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

      {/* <div className="toggle-buttons">
        <button type="button" onClick={toggleSprites}>
          {shinyButtonText} versions
        </button>

        <button type="button" onClick={toggleOrder}>
          {orderButtonText} order
        </button>
      </div> */}

      <div className="switches">
        <div className="shiny-switch">
          <div className="switch-text"> shiny sprites </div>
          <label className="switch">
            <input type="checkbox" className="checkbox" />
            <div onClick={toggleSprites} className="slider"></div>
          </label>
        </div>

        <div className="order-switch">
          <div className="switch-text">alphabetical order</div>
          <label className="switch">
            <input type="checkbox" className="checkbox" />
            <div onClick={toggleOrder} className="slider"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PokemonWithTypeList;
