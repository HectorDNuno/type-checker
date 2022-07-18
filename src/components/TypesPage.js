import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TypesPage.css";

const TypesPage = ({ type }) => {
  const [typeData, setTypeData] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/${type.title.toLowerCase()}`).then((response) => {
      setTypeData(response.data);
      setPokemonNames(response.data.pokemon);
    });
  }, [type.title]);

  const allNames = pokemonNames?.map((name) => {
    const container = `${name.pokemon.name}`;
    return container;
  });

  return (
    <div className="types-page-container">
      {type.title ? (
        <>
          <div className="page-title-container">
            <div className="title-contents" style={{ backgroundColor: `#${type.color}` }}>
              <img className="type-image" src={type.imageUrl} alt={`${type.title} icon`} />
              <span className="type-title">{type.title}</span>
            </div>
          </div>

          <div className="name-list">
            <div className="list-title">Pokemon with type</div>
            <ul className="list">
              {allNames?.sort().map((name, index) => {
                return <li key={index}>{name}</li>;
              })}
            </ul>
          </div>
        </>
      ) : (
        <div className="default-title">Choose a type!</div>
      )}
    </div>
  );
};

export default TypesPage;
