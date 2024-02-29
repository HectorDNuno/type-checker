import React, { useContext, useEffect, useState } from "react";
import "./content.css";
import { selectedTypeContext } from "../selectedTypeContext";
import { Types } from "./typesData";
import axios from "axios";
import { wordsToFilter } from "./types-page-components/wordsToFilter";

const Content = () => {
  const [typeData, setTypeData] = useState({
    damageRelations: [],
    moves: [],
    pokemon: [],
    isLoading: true,
  });

  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);

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
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType.title}`);

        if (!isMounted) {
          return;
        }

        const { data } = response;
        const { damage_relations, moves, pokemon } = data;

        const movesData = await fetchMovesData(moves);

        const filteredPokemonData = await fetchAndFilterPokemonData(pokemon);

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

  const setBackgroundColor = (typeFromList) => {
    const typeColor = Types.find((type) => type.title === typeFromList)?.color;
    return typeColor;
  };

  const physicalMoves = typeData.moves.filter((move) => move.damageClass === "physical");
  const specialMoves = typeData.moves.filter((move) => move.damageClass === "special");
  const statusMoves = typeData.moves.filter((move) => move.damageClass === "status");

  const pokemonCopy = [...typeData.pokemon];

  if (alphabeticalOrder) {
    pokemonCopy.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  } else {
    pokemonCopy.sort((a, b) => a.number - b.number);
  }

  return (
    <div className="content">
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Pokémon</div>
            <div className="number"> {typeData.pokemon ? typeData.pokemon.length : 0} </div>
          </div>
        </div>

        <div className="box">
          <div className="right-side">
            <div className="box-topic">Physical Moves</div>
            <div className="number"> {physicalMoves.length} </div>
          </div>
        </div>

        <div className="box">
          <div className="right-side">
            <div className="box-topic">Special Moves</div>
            <div className="number">{specialMoves.length}</div>
          </div>
        </div>

        <div className="box">
          <div className="right-side">
            <div className="box-topic">Status Moves</div>
            <div className="number">{statusMoves.length}</div>
          </div>
        </div>
      </div>

      <div className="pokedex-container">
        <div className="type-matchups box">
          <div className="title">Type Matchups</div>
          <div className="type-details">
            <ul className="details">
              <li className="topic">Defense</li>
              <li className="sub-topic">Takes 2x from</li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
              <li>
                <a href="#">02 Jan 2021</a>
              </li>
            </ul>

            <ul className="details">
              <li className="topic">Offense</li>
              <li>
                <a href="#">Alex Doe</a>
              </li>
              <li>
                <a href="#">David Mart</a>
              </li>
              <li>
                <a href="#">Roe Parter</a>
              </li>
              <li>
                <a href="#">Diana Penty</a>
              </li>
              <li>
                <a href="#">Martin Paw</a>
              </li>
              <li>
                <a href="#">Doe Alex</a>
              </li>
              <li>
                <a href="#">Aiana Lexa</a>
              </li>
              <li>
                <a href="#">Rexel Mags</a>
              </li>
              <li>
                <a href="#">Tiana Loths</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="all-pokemon box">
          <div className="title">Pokémon</div>

          <ul>
            {pokemonCopy.map((pokemon) => (
              <li>
                <a href="#" className="pokemon-list">
                  <img src={pokemon.sprite} alt={`${pokemon.name} sprite`}></img>
                  <span> #{pokemon.number} </span>
                  <span className="name"> {pokemon.name} </span>
                </a>

                <div className="dex-details">
                  <div className="type" style={{ backgroundColor: setBackgroundColor(pokemon.types[0]) }}>
                    {pokemon.types[0]}{" "}
                  </div>
                  {pokemon.types[1] && (
                    <div className="type" style={{ backgroundColor: setBackgroundColor(pokemon.types[1]) }}>
                      {pokemon.types[1]}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pokedex-container">
        <div className="all-pokemon box moves">
          <div className="title">Physical Moves</div>
          <ul>
            {physicalMoves.map((move) => (
              <li>
                <a href="#">
                  <span className="name"> {move.name} </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="all-pokemon box moves">
          <div className="title">Special Moves</div>
          <ul>
            {specialMoves.map((move) => (
              <li>
                <a href="#">
                  <span className="name"> {move.name} </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="all-pokemon box moves">
          <div className="title">Status Moves</div>
          <ul>
            {statusMoves.map((move) => (
              <li>
                <a href="#">
                  <span className="name"> {move.name} </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
