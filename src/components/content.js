import React, { useContext, useEffect, useState } from "react";
import "./content.css";
import { SelectedTypeContext } from "../Contexts";
import { Types } from "../typesData";
import axios from "axios";
import { wordsToFilter } from "../wordsToFilter";
import Modal from "./modal";

const Content = () => {
  const [typeData, setTypeData] = useState({
    damageRelations: [],
    moves: [],
    pokemon: [],
    isLoading: true,
  });

  const [alphabeticalOrder, setAlphabeticalOrder] = useState(false);
  const [shinySprites, setShinySprites] = useState(false);
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    content: "",
  });

  const { selectedType } = useContext(SelectedTypeContext);

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

  const toggleOrder = () => {
    setAlphabeticalOrder(!alphabeticalOrder);
  };

  const toggleImage = () => {
    setShinySprites(!shinySprites);
  };

  const renderPokemonImage = (pokemon) => {
    const imageUrl = shinySprites ? pokemon.shinySprite : pokemon.sprite;

    return <img src={imageUrl} alt={`${pokemon.name} sprite`} loading="lazy" />;
  };

  if (alphabeticalOrder) {
    pokemonCopy.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  } else {
    pokemonCopy.sort((a, b) => a.number - b.number);
  }

  return (
    <div className="content">
      <div className="overview-boxes">
        <div className="box">
          <div className="box-topic">Total Pokémon</div>
          <div className="number"> {typeData.pokemon ? typeData.pokemon.length : 0} </div>
        </div>

        <a href="#physical" className="box physical">
          <div className="box-topic">Physical Moves</div>
          <div className="number"> {physicalMoves.length} </div>
        </a>

        <a href="#special" className="box special">
          <div className="box-topic">Special Moves</div>
          <div className="number">{specialMoves.length}</div>
        </a>

        <a href="#status" className="box status">
          <div className="box-topic">Status Moves</div>
          <div className="number">{statusMoves.length}</div>
        </a>
      </div>

      <div className="pokedex-container">
        <div className="type-matchups box">
          <div className="title">Type Matchups</div>
          <div className="type-details">
            <ul className="details">
              <div className="topic">Defense</div>
              <div className="sub-topic">Takes 2x from</div>
              <div className="li-container">
                {typeData.damageRelations.double_damage_from?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>

              <div className="sub-topic">Takes 1/2x from</div>
              <div className="li-container">
                {typeData.damageRelations.half_damage_from?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>

              <div className="sub-topic">Takes 0x from</div>
              <div className="li-container">
                {typeData.damageRelations.no_damage_from?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>
            </ul>

            <ul className="details">
              <div className="topic">Offense</div>
              <div className="sub-topic">Deals 2x to</div>
              <div className="li-container">
                {typeData.damageRelations.double_damage_to?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>

              <div className="sub-topic">Deals 1/2x to</div>
              <div className="li-container">
                {typeData.damageRelations.half_damage_to?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>

              <div className="sub-topic">Deals 0x to</div>
              <div className="li-container">
                {typeData.damageRelations.no_damage_to?.map((type) => (
                  <a href="#">
                    <li className="type" style={{ backgroundColor: setBackgroundColor(type.name) }}>
                      <p> {type.name} </p>
                    </li>
                  </a>
                ))}
              </div>
            </ul>
          </div>
        </div>

        <div className="all-pokemon box">
          <div className="switches">
            <div className="title">Pokémon</div>

            <label className="switch">
              <div>shiny</div>
              <input onClick={toggleImage} type="checkbox"></input>
              <span className="slider"></span>
            </label>

            <label className="switch">
              <div>alphabetical</div>
              <input onClick={toggleOrder} type="checkbox"></input>
              <span className="slider"></span>
            </label>
          </div>

          <ul>
            {pokemonCopy.map((pokemon) => (
              <li className="pokemon-list">
                <div
                  onClick={() => {
                    setOpenModal({
                      isOpen: true,
                      content: pokemon.name,
                    });
                  }}
                  className="pokemon-list-item"
                >
                  {renderPokemonImage(pokemon)}
                  <span> #{pokemon.number} </span>
                  <span className="name"> {pokemon.name} </span>
                </div>

                <div className="type">
                  <span style={{ backgroundColor: setBackgroundColor(pokemon.types[0]) }}>{pokemon.types[0]}</span>

                  <span style={{ backgroundColor: setBackgroundColor(pokemon.types[1]) }}>
                    {pokemon.types[1] && pokemon.types[1]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pokedex-container">
        <div className="all-pokemon box moves" id="physical">
          <div className="title">Physical Moves</div>
          <ul>
            {physicalMoves.map((move) => (
              <li>
                <p>
                  <span className="name"> {move.name} </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="all-pokemon box moves" id="special">
          <div className="title">Special Moves</div>
          <ul>
            {specialMoves.map((move) => (
              <li>
                <p>
                  <span className="name"> {move.name} </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="all-pokemon box moves" id="status">
          <div className="title">Status Moves</div>
          <ul>
            {statusMoves.map((move) => (
              <li>
                <p>
                  <span className="name"> {move.name} </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {openModal.isOpen && <Modal setOpenModal={setOpenModal} content={openModal.content} shinySprite={shinySprites} />}
    </div>
  );
};

export default Content;
