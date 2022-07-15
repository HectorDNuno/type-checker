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

  return (
    <div className="types-page">
      {type.title ? (
        <>
          <div className="page-title">
            <div className="title-contents" style={{ backgroundColor: `#${type.color}` }}>
              <img className="title-image" src={type.imageUrl} alt={`${type.title} icon`} />
              <span className="title">{type.title}</span>
            </div>
          </div>
          <div className="page-content">
            <div className="name-list">
              <ul>
                {pokemonNames.map((name, index) => {
                  return <li key={index}>{name.pokemon.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="default-title">Choose a type!</div>
      )}
    </div>
  );
};

export default TypesPage;
