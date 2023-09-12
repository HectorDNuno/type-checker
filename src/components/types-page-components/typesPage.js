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

  const fetchMovesData = async (moves) => {
    const movesUrls = moves.map((move) => move.url);

    const fetchMoves = movesUrls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    });

    const movesData = await Promise.all(fetchMoves);

    return movesData.map((move) => ({
      name: move.name,
      damageClass: move.damage_class.name,
    }));
  };

  const fetchAndFilterPokemonData = async (pokemon) => {
    const pokemonUrls = pokemon.map((monster) => monster.pokemon.url);

    const fetchPokemon = pokemonUrls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    });

    const pokemonData = await Promise.all(fetchPokemon);

    return pokemonData
      .map((pokemonData) => ({
        name: pokemonData.name,
        number: pokemonData.id,
        sprite: pokemonData.sprites.front_default,
        shinySprite: pokemonData.sprites.front_shiny,
        types: [pokemonData.types[0].type.name, pokemonData.types[1]?.type.name].filter(Boolean),
      }))
      .filter((pokemon) => !wordsToFilter.some((str) => pokemon.name.includes(str)));
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType.title}`);

        if (!isMounted) {
          return;
        }

        const { data } = typeResponse;
        const { damage_relations, moves, pokemon } = data;

        const movesData = await fetchMovesData(moves);
        const filteredPokemonData = await fetchAndFilterPokemonData(pokemon);

        console.log(filteredPokemonData);

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
