import React, { useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Types } from "../typesData";
import Barchart from "./barchart";

const Modal = ({ closeModal, content, shinySprite }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [speciesData, setSpeciesData] = useState({});
  const [abilityEntries, setAbilityEntries] = useState({
    abilityOne: {},
    abilityTwo: {},
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${content}`);

        if (!isMounted) {
          return;
        }

        const { data } = response;

        setPokemonData(data);
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
        const response = await axios.get(pokemonData.species.url);

        if (!isMounted) {
          return;
        }

        const { data } = response;

        setSpeciesData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpeciesData();
    return () => {
      isMounted = false;
    };
  }, [pokemonData.species]);

  useEffect(() => {
    let isMounted = true;

    const fetchAbilityData = async () => {
      try {
        if (pokemonData.abilities && pokemonData.abilities[1]) {
          const responseForAbilityOne = await axios.get(pokemonData.abilities[0].ability.url);
          const responseForAbilityTwo = await axios.get(pokemonData.abilities[1].ability.url);

          const dataForAbilityOne = responseForAbilityOne.data;
          const dataForAbilityTwo = responseForAbilityTwo.data;

          const flavorTextOne = findHighestAbilityEntry(dataForAbilityOne.flavor_text_entries);
          const flavorTextTwo = findHighestAbilityEntry(dataForAbilityTwo.flavor_text_entries);

          if (!isMounted) {
            return;
          }

          setAbilityEntries({
            abilityOne: {
              name: dataForAbilityOne.name,
              flavorText: flavorTextOne.flavor_text,
            },
            abilityTwo: {
              name: dataForAbilityTwo.name,
              flavorText: flavorTextTwo.flavor_text,
            },
          });
        } else {
          const responseForAbilityOne = await axios.get(pokemonData.abilities[0].ability.url);

          if (!isMounted) {
            return;
          }
          const { dataAbilityOne } = responseForAbilityOne;
          const flavorTextOne = findHighestAbilityEntry(dataAbilityOne.flavor_text_entries);

          setAbilityEntries({
            abilityOne: {
              name: dataAbilityOne.name,
              flavorText: flavorTextOne.flavor_text,
            },
          });
        }
      } catch (error) {}
    };

    fetchAbilityData();
    return () => {
      isMounted = false;
    };
  }, [abilityEntries, pokemonData.abilities]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modalInner = document.querySelector(".modal-inner");
      if (modalInner && !modalInner.contains(event.target)) {
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

  const classification = speciesData.genera?.find((entry) => entry.language.name === "en");
  const entry = findRecentSpeciesData(speciesData?.flavor_text_entries);
  const stats = reorganizeStats(pokemonData?.stats);

  const imageUrl = shinySprite
    ? pokemonData.sprites?.other.home.front_shiny
    : pokemonData.sprites?.other.home.front_default;

  return (
    <div className="modal">
      <div className="modal-inner">
        <button onClick={closeModal} className="close-btn">
          <i className="fa-regular fa-circle-xmark fa-lg"></i>
        </button>

        {pokemonData.sprites ? <img src={imageUrl} alt={`${pokemonData.name} sprite`} /> : <img alt="" />}

        <div className="info">
          <div> #{pokemonData.id} </div>
          <h4> {pokemonData.name} </h4>
          <div> {speciesData.genera && speciesData.genera.length > 0 && classification.genus} </div>

          {pokemonData.types && (
            <div className="types">
              <div className="type" style={{ backgroundColor: setBackgroundColor(pokemonData.types[0].type.name) }}>
                {pokemonData.types[0].type.name}{" "}
              </div>
              {pokemonData.types[1] && (
                <div className="type" style={{ backgroundColor: setBackgroundColor(pokemonData.types[1].type.name) }}>
                  {pokemonData.types[1].type.name}{" "}
                </div>
              )}
            </div>
          )}

          <div className="pokedex-entry">{speciesData.flavor_text_entries && entry.flavor_text}</div>
        </div>

        <div className="stats">
          <Barchart stats={stats} />
        </div>

        <div className="abilities">
          <h5>Abilities</h5>

          {pokemonData.abilities && (
            <>
              <div className="ability-one">
                <div className="ability-name" style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>
                  {abilityEntries.abilityOne.name}
                </div>
                <div> {abilityEntries.abilityOne.flavorText} </div>
              </div>

              {abilityEntries.abilityTwo.name && abilityEntries.abilityTwo.name !== abilityEntries.abilityOne.name && (
                <div>
                  <div className="ability-name" style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>
                    {abilityEntries.abilityTwo.name} <span> (hidden ability) </span>
                  </div>
                  <div> {abilityEntries.abilityTwo.flavorText} </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="characteristics">
          <h5>Characteristics</h5>

          {pokemonData.weight && speciesData.base_happiness && (
            <>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Weight</div>
              <div> {(pokemonData.weight / 4.536).toFixed(1)} lbs</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Height</div>
              <div> {(pokemonData.height / 3.048).toFixed(1)} lbs</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Base Experience</div>
              <div> {pokemonData.base_experience}</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Base Happiness</div>
              <div> {speciesData.base_happiness}</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Catch Rate</div>
              <div> {speciesData.capture_rate}</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Growth Rate</div>
              <div> {speciesData.growth_rate.name}</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>Hatch Time</div>
              <div> {speciesData.hatch_counter}</div>
              <div style={{ color: setBackgroundColor(pokemonData.types[0].type.name) }}>First Appeared</div>
              <div> {speciesData.generation.name}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
