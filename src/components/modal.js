import React, { useEffect, useMemo, useRef, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Types } from "../typesData";
import Barchart from "./barchart";

const Modal = ({ closeModal, content, shinySprite }) => {
  const [pokemonInfo, setPokemonInfo] = useState({
    pokedexData: {},
    speciesData: {},
    abilityEntries: {
      abilityOne: {},
      abilityTwo: {},
    },
  });

  const modalRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${content}`);

        if (!isMounted) {
          return;
        }

        const { data } = response;

        setPokemonInfo((prevInfo) => ({
          ...prevInfo,
          pokedexData: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [content]);

  useEffect(() => {
    let isMounted = true;

    const fetchSpeciesData = async () => {
      try {
        const { pokedexData } = pokemonInfo;

        const response = await axios.get(pokedexData.species.url);

        if (!isMounted) {
          return;
        }

        const { data } = response;

        setPokemonInfo((prevInfo) => ({
          ...prevInfo,
          speciesData: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpeciesData();
    return () => {
      isMounted = false;
    };
  }, [pokemonInfo]);

  useEffect(() => {
    let isMounted = true;

    const fetchAbilityData = async () => {
      try {
        const { pokedexData } = pokemonInfo;

        if (!pokedexData.abilities) return;

        const fetchAbility = async (abilityIndex) => {
          const response = await axios.get(pokedexData.abilities[abilityIndex].ability.url);
          return response.data;
        };

        const [abilityOneData, abilityTwoData] = await Promise.all([
          fetchAbility(0),
          pokedexData.abilities[1] ? fetchAbility(1) : null,
        ]);

        const flavorTextOne = findHighestAbilityEntry(abilityOneData.flavor_text_entries);

        const abilityEntriesToUpdate = {
          abilityOne: {
            name: abilityOneData.name,
            flavorText: flavorTextOne?.flavor_text || "",
          },
        };

        if (abilityTwoData) {
          const flavorTextTwo = findHighestAbilityEntry(abilityTwoData.flavor_text_entries);

          abilityEntriesToUpdate.abilityTwo = {
            name: abilityTwoData.name,
            flavorText: flavorTextTwo?.flavor_text || "",
          };
        }

        if (!isMounted) return;

        setPokemonInfo((prevInfo) => ({
          ...prevInfo,
          abilityEntries: {
            ...prevInfo.abilityEntries,
            ...abilityEntriesToUpdate,
          },
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbilityData();

    return () => {
      isMounted = false;
    };
  }, [pokemonInfo]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

  const setBackgroundColor = (typeFromList) => {
    const typeColor = Types.find((type) => type.title === typeFromList)?.color;
    return typeColor;
  };

  const findRecentSpeciesData = (entries) => {
    if (!entries || entries.length === 0) return null;

    const filteredByLanguage = entries.filter((entry) => entry.language.name === "en");
    const versionNumbers = filteredByLanguage.map((entry) => parseInt(entry.version.url.split("/").slice(-2, -1)[0]));
    const maxVersionNumber = Math.max(...versionNumbers);

    return filteredByLanguage.find(
      (entry) => parseInt(entry.version.url.split("/").slice(-2, -1)[0]) === maxVersionNumber
    );
  };

  const findHighestAbilityEntry = (entries) => {
    if (!entries || entries.length === 0) return null;

    const filteredByLanguage = entries.filter((entry) => entry.language.name === "en");
    const versionNumbers = filteredByLanguage.map((entry) =>
      parseInt(entry.version_group.url.split("/").slice(-2, -1)[0])
    );
    const maxVersionNumber = Math.max(...versionNumbers);

    return filteredByLanguage.find(
      (entry) => parseInt(entry.version_group.url.split("/").slice(-2, -1)[0]) === maxVersionNumber
    );
  };

  const reorganizeStats = (stats) => {
    return (
      stats?.map(({ base_stat, stat }) => ({
        name: stat.name,
        base_stat,
      })) ?? []
    );
  };

  const getFormattedGeneration = (generationString) => {
    const generationMap = {
      "generation-i": "Generation 1",
      "generation-ii": "Generation 2",
      "generation-iii": "Generation 3",
      "generation-iv": "Generation 4",
      "generation-v": "Generation 5",
      "generation-vi": "Generation 6",
      "generation-vii": "Generation 7",
      "generation-viii": "Generation 8",
      "generation-viiii": "Generation 9",
      "generation-x": "Generation 10",
    };

    return generationMap[generationString] || generationString;
  };

  const classification = useMemo(
    () => pokemonInfo.speciesData.genera?.find((entry) => entry.language.name === "en"),
    [pokemonInfo.speciesData.genera]
  );
  const entry = findRecentSpeciesData(pokemonInfo.speciesData?.flavor_text_entries);
  const stats = reorganizeStats(pokemonInfo.pokedexData?.stats);
  const formattedGeneration = getFormattedGeneration(pokemonInfo.speciesData.generation?.name);

  const imageUrl = shinySprite
    ? pokemonInfo.pokedexData.sprites?.other.home.front_shiny
    : pokemonInfo.pokedexData.sprites?.other.home.front_default;

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-inner">
        <button onClick={closeModal} className="close-btn">
          <i className="fa-regular fa-circle-xmark fa-lg"></i>
        </button>

        {pokemonInfo.pokedexData.sprites ? (
          <img src={imageUrl} alt={`${pokemonInfo.pokedexData.name} sprite`} />
        ) : (
          <img alt="" />
        )}

        <div className="info">
          <div> #{pokemonInfo.pokedexData.id} </div>
          <h4> {pokemonInfo.pokedexData.name} </h4>
          <div>
            {" "}
            {pokemonInfo.speciesData.genera && pokemonInfo.speciesData.genera.length > 0 && classification.genus}{" "}
          </div>

          {pokemonInfo.pokedexData.types && (
            <div className="types">
              <div
                className="type"
                style={{ backgroundColor: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}
              >
                {pokemonInfo.pokedexData.types[0].type.name}{" "}
              </div>
              {pokemonInfo.pokedexData.types[1] && (
                <div
                  className="type"
                  style={{ backgroundColor: setBackgroundColor(pokemonInfo.pokedexData.types[1].type.name) }}
                >
                  {pokemonInfo.pokedexData.types[1].type.name}{" "}
                </div>
              )}
            </div>
          )}

          <div className="pokedex-entry">{pokemonInfo.speciesData.flavor_text_entries && entry.flavor_text}</div>
        </div>

        <div className="stats">
          <Barchart stats={stats} />
        </div>

        <div className="abilities">
          <h5>Abilities</h5>

          {pokemonInfo.pokedexData.types && (
            <>
              <div className="ability-one">
                <div
                  className="ability-name"
                  style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}
                >
                  {pokemonInfo.abilityEntries.abilityOne.name}
                </div>
                <div> {pokemonInfo.abilityEntries.abilityOne.flavorText} </div>
              </div>

              {pokemonInfo.abilityEntries.abilityTwo.name &&
                pokemonInfo.abilityEntries.abilityTwo.name !== pokemonInfo.abilityEntries.abilityOne.name && (
                  <div>
                    <div
                      className="ability-name"
                      style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}
                    >
                      {pokemonInfo.abilityEntries.abilityTwo.name} <span> (hidden ability) </span>
                    </div>
                    <div> {pokemonInfo.abilityEntries.abilityTwo.flavorText} </div>
                  </div>
                )}
            </>
          )}
        </div>

        <div className="characteristics">
          <h5>Characteristics</h5>

          {pokemonInfo.pokedexData.weight && pokemonInfo.speciesData.base_happiness && (
            <>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>Weight</div>
              <div> {(pokemonInfo.pokedexData.weight / 4.536).toFixed(1)} lbs</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>Height</div>
              <div> {(pokemonInfo.pokedexData.height / 3.048).toFixed(1)} lbs</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                Base Experience
              </div>
              <div> {pokemonInfo.pokedexData.base_experience}</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                Base Happiness
              </div>
              <div> {pokemonInfo.speciesData.base_happiness}</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>Catch Rate</div>
              <div> {pokemonInfo.speciesData.capture_rate}</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>Growth Rate</div>
              <div> {pokemonInfo.speciesData.growth_rate.name}</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>Hatch Time</div>
              <div> {pokemonInfo.speciesData.hatch_counter}</div>
              <div style={{ color: setBackgroundColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                First Appeared
              </div>
              <div> {formattedGeneration}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
