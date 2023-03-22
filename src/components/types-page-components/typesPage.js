/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import TypesPageHeader from "./typesPageHeader";
import MovesList from "../list-components/movesWithType";
import DamageRelationsList from "../list-components/damageRelations";
import PokemonWithTypeList from "../list-components/pokemonWithType";
import "./typesPage.css";

const TypesPage = ({ type }) => {
  const [damageRelations, setDamageRelations] = useState([]);
  const [movesUrls, setMovesUrls] = useState([]);
  const [allMoves, setAllMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/${type.title.toLowerCase()}`).then((response) => {
      const movesPages = response.data.moves.map((item) => {
        const movesPagesUrls = item.url;
        return movesPagesUrls;
      });
      setMovesUrls(movesPages);

      const damageData = response.data.damage_relations;
      setDamageRelations(damageData);
    });
  }, [type.title]);

  useEffect(() => {
    axios.all(movesUrls.map((url) => axios.get(url))).then((response) => {
      const requestData = response.map((datum) => {
        const dataObject = {
          name: datum.data.name,
          damageClass: datum.data.damage_class.name,
        };
        return dataObject;
      });

      setAllMoves(requestData);
      setIsLoading(false);
    });
  }, [movesUrls]);

  return (
    <div className="page-container">
      {type.title ? (
        <div className="types-page">
          <TypesPageHeader type={type.title} />
          <div className="pokemon-damage-container">
            <DamageRelationsList damageRelations={damageRelations} />
            <PokemonWithTypeList type={type.title} />
          </div>
          <MovesList allMoves={allMoves} isLoading={isLoading} type={type.title} />
        </div>
      ) : (
        <div className="default-title">Choose a type!</div>
      )}
    </div>
  );
};

export default TypesPage;
