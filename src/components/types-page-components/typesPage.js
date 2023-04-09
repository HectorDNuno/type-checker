/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { selectedTypeContext } from "../../selectedTypeContext";
import axios from "axios";
import TypesPageHeader from "./typesPageHeader";
import MovesList from "../list-components/movesWithType";
import DamageRelationsList from "../list-components/damageRelations";
import PokemonWithTypeList from "../list-components/pokemonWithType";
import "./typesPage.css";

const TypesPage = () => {
  const [damageRelations, setDamageRelations] = useState([]);
  const [movesUrls, setMovesUrls] = useState([]);
  const [allMoves, setAllMoves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedType } = useContext(selectedTypeContext);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/${selectedType.title.toLowerCase()}`).then((response) => {
      const movesPages = response.data.moves.map((item) => {
        const movesPagesUrls = item.url;
        return movesPagesUrls;
      });
      setMovesUrls(movesPages);

      const damageData = response.data.damage_relations;
      setDamageRelations(damageData);
    });
  }, [selectedType.title]);

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
      {selectedType.title.length > 0 ? (
        <div className="types-page">
          <TypesPageHeader />
          <div className="pokemon-damage-container">
            <DamageRelationsList damageRelations={damageRelations} />
            <PokemonWithTypeList type={selectedType.title} />
          </div>
          <MovesList allMoves={allMoves} isLoading={isLoading} type={selectedType.title} />
        </div>
      ) : (
        <div className="default-title">Choose a type!</div>
      )}
    </div>
  );
};

export default TypesPage;
