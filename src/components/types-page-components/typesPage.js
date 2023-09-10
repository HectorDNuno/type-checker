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

  const getTypeData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType.title}`);

      const { data } = response;
      const { damage_relations, moves } = data;

      const moveUrls = moves.map((move) => {
        const url = move.url;
        return url;
      });

      setDamageRelations(damage_relations);
      setMovesUrls(moveUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovesData = async () => {
    try {
      const responses = await Promise.all(
        movesUrls.map(async (url) => {
          const response = await axios.get(url);
          return response;
        })
      );

      const movesData = responses.map((response) => {
        const object = {
          name: response.data.name,
          damageClass: response.data.damage_class.name,
        };
        return object;
      });

      setAllMoves(movesData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTypeData();
    getMovesData();
  }, [selectedType.title, movesUrls]);

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
