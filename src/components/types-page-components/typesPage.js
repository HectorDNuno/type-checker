/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { selectedTypeContext } from "../../selectedTypeContext";
import axios from "axios";
import TypesPageHeader from "./typesPageHeader";
import MovesList from "../list-components/movesWithType";
import DamageRelationsList from "../list-components/damageRelations";
import PokemonWithTypeList from "../list-components/pokemonWithType";
import { wordsToFilter } from "./wordsToFilter";
import "./typesPage.css";

const TypesPage = () => {
  const [typeData, setTypeData] = useState({
    damageRelations: [],
    moves: [],
    pokemon: [],
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
        const { damage_relations, moves, pokemon } = data;

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

        const pokemonUrls = pokemon.map((monster) => monster.pokemon.url);

        const fetchPokemonData = await Promise.all(
          pokemonUrls.map(async (url) => {
            const response = await axios.get(url);
            const { data } = response;
            return data;
          })
        );

        const pokemonData = fetchPokemonData.map((pokemon) => ({
          name: pokemon.name,
          number: pokemon.id,
          sprite: pokemon.sprites.front_default,
          shinySprite: pokemon.sprites.front_shiny,
          types: [pokemon.types[0].type.name, pokemon.types[1] && pokemon.types[1].type.name],
        }));

        const filteredPokemonData = pokemonData.filter(
          (pokemon) => !wordsToFilter.some((str) => pokemon.name.includes(str))
        );

        setTypeData({
          damageRelations: damage_relations,
          moves: movesData,
          pokemon: filteredPokemonData,
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

  const { damageRelations, moves, pokemon, isLoading } = typeData;

  return (
    <div className="page-container">
      {selectedType.title.length > 0 ? (
        <div className="types-page">
          <TypesPageHeader />
          <div className="pokemon-damage-container">
            <DamageRelationsList damageRelations={damageRelations} />
            <PokemonWithTypeList pokemon={pokemon} />
          </div>
          <MovesList moves={moves} isLoading={isLoading} type={selectedType.title} />
        </div>
      ) : (
        <div className="default-title">Choose a type!</div>
      )}
    </div>
  );
};

export default TypesPage;
