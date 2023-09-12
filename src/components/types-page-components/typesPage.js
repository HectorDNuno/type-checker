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
  const [typeData, setTypeData] = useState({
    damageRelations: [],
    allMoves: [],
    isLoading: true,
  });

  const { selectedType } = useContext(selectedTypeContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType.title}`);

        if (!isMounted) {
          return;
        }

        const { data } = response;
        const { damage_relations, moves } = data;

        const movesUrls = moves.map((move) => move.url);

        const fetchMovesData = await Promise.all(
          movesUrls.map(async (url) => {
            const response = await axios.get(url);
            return response;
          })
        );

        const movesData = fetchMovesData.map((response) => ({
          name: response.data.name,
          damageClass: response.data.damage_class.name,
        }));

        setTypeData({
          damageRelations: damage_relations,
          allMoves: movesData,
          isLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedType.title]);

  const { damageRelations, allMoves, isLoading } = typeData;

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
