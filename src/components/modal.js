import React, { useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Types } from "../typesData";
import Barchart from "./barchart";

const Modal = ({ closeModal, content, shinySprite }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [pokedexEntry, setPokedexEntry] = useState("");
  const [abilityEntries, setAbilityEntries] = useState({
    abilityOne: {},
    abilityTwo: {},
  });

  const setBackgroundColor = (typeFromList) => {
    const typeColor = Types.find((type) => type.title === typeFromList)?.color;
    return typeColor;
  };

  const fetchPokedexEntry = async (url) => {
    try {
      const response = await axios.get(url);

      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${content}`);

        if (!isMounted) {
          return;
        }

        const { data } = response;

        const pokedexData = await fetchPokedexEntry(data.species.url);
        const abilityOneData = await fetchPokedexEntry(data.abilities[0].ability.url);

        setPokemonData(data);
        setPokedexEntry(pokedexData);
        setAbilityEntries({ ...abilityEntries, abilityOne: abilityOneData });

        if (data.abilities.length > 0) {
          const abilityTwoData = await fetchPokedexEntry(data.abilities[1].ability.url);
          setAbilityEntries({ ...abilityEntries, abilityTwo: abilityTwoData });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [content, abilityEntries]);

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

  const findHighestPokedexEntry = (entries) => {
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

  const classification = pokedexEntry.genera?.find((entry) => entry.language.name === "en");
  const entry = findHighestPokedexEntry(pokedexEntry?.flavor_text_entries);
  const stats = reorganizeStats(pokemonData?.stats);
  const firstAbility = findHighestAbilityEntry(abilityEntries.abilityOne?.flavor_text_entries);
  const secondAbility = findHighestAbilityEntry(abilityEntries.abilityTwo?.flavor_text_entries);

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
          <div> {pokedexEntry.genera && pokedexEntry.genera.length > 0 && classification.genus} </div>

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

          <div className="pokedex-entry">{pokedexEntry.flavor_text_entries && entry.flavor_text}</div>
        </div>

        <div className="stats">
          <Barchart stats={stats} />
        </div>

        <div className="abilities">
          <h5>Abilities</h5>

          {pokemonData.abilities && (
            <>
              <div className="ability-one">
                <div className="ability-name"> {abilityEntries.abilityOne.name} </div>
                <div> {firstAbility?.flavor_text} </div>
              </div>

              {abilityEntries.abilityTwo.name && abilityEntries.abilityTwo.name !== abilityEntries.abilityOne.name && (
                <div>
                  <div className="ability-name">
                    {abilityEntries.abilityTwo.name} <span> (hidden ability) </span>
                  </div>
                  <div> {secondAbility?.flavor_text} </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
