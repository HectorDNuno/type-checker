/* eslint-disable */
import React, { useState } from "react";
import "./pokemonWithType.css";
import { Types } from "../typesData";

const PokemonWithTypeList = ({ pokemon }) => {
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

  const sortPokemon = (pokemon, alphabeticalOrder) => {
    if (alphabeticalOrder === true) {
      pokemon.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    } else {
      pokemon.sort((a, b) => a.number - b.number);
    }

    return pokemon.map((monster, index) => {
      return (
        <>
          <li className="name-type-section" key={index}>
            {shinySprites ? (
              <img className="pokemon-sprite" src={`${monster.shinySprite}`} alt="shiny sprite" loading="lazy" />
            ) : (
              <img className="pokemon-sprite" src={`${monster.sprite}`} alt="pokemon sprite" loading="lazy" />
            )}

            <div className="pokemon-number">#{monster.number}</div>
            <div className="pokemon-name">{monster.name}</div>

            <div className="pokemon-types">
              <div className="first-type">{setBackgroundColor(monster.types[0])}</div>
              {monster.types[1] && <div className="second-type"> {setBackgroundColor(monster.types[1])} </div>}
            </div>
          </li>
        </>
      );
    });
  };

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon with type: {pokemon.length} </h2>

      <div id="list" className="pokemon-container">
        <ul className="pokemon-list">{sortPokemon(pokemon, alphabeticalOrder)}</ul>
      </div>

      <div className="toggle-buttons">
        <button type="button" onClick={toggleSprites}>
          {shinyButtonText} versions
        </button>

        <button type="button" onClick={toggleOrder}>
          {orderButtonText} order
        </button>
      </div>
    </div>
  );
};

export default PokemonWithTypeList;
