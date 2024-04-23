import React, { useEffect, useRef, useState } from "react";
import "./modal.css";
import axios from "axios";
import InfoTab from "./modal-components/infoTab";
import MovesTab from "./modal-components/movesTab";
import EvolutionsTab from "./modal-components/evolutionsTab";
import { Types } from "../typesData";

const Modal = ({ closeModal, content, shinySprite }) => {
  const [pokemonInfo, setPokemonInfo] = useState({
    pokedexData: {},
    speciesData: {},
    abilityEntries: {},
  });

  const [activeTab, setActiveTab] = useState(1);

  const modalRef = useRef(null);

  const getColor = (typeFromList) => {
    const color = Types.find((type) => type.title === typeFromList)?.color;
    return color;
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

        const abilityEntriesToUpdate = {};

        const [abilityOneData, abilityTwoData, abilityThreeData] = await Promise.all([
          fetchAbility(0),
          pokedexData.abilities[1] ? fetchAbility(1) : null,
          pokedexData.abilities[2] ? fetchAbility(2) : null,
        ]);

        [abilityOneData, abilityTwoData, abilityThreeData].map((abilityData, index) => {
          if (abilityData) {
            const flavorText = findHighestAbilityEntry(abilityData.flavor_text_entries);
            const abilityName = `ability${index + 1}`;

            abilityEntriesToUpdate[abilityName] = {
              name: abilityData.name,
              flavorText: flavorText?.flavor_text || "",
              isHidden: pokedexData.abilities[index].is_hidden,
            };
          }
          return abilityEntriesToUpdate;
        });

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

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-inner">
        <div className="tab-nav">
          <button
            onClick={() => setActiveTab(1)}
            style={{
              backgroundColor:
                activeTab === 1 && pokemonInfo.pokedexData.types
                  ? getColor(pokemonInfo.pokedexData.types[0].type.name)
                  : "",
            }}
          >
            <i className="fa-solid fa-circle-info"></i> info
          </button>

          <button
            onClick={() => setActiveTab(2)}
            style={{
              backgroundColor:
                activeTab === 2 && pokemonInfo.pokedexData.types
                  ? getColor(pokemonInfo.pokedexData.types[0].type.name)
                  : "",
            }}
          >
            <i className="fa-solid fa-circle-nodes"></i>
            evolutions
          </button>

          <button
            onClick={() => setActiveTab(3)}
            style={{
              backgroundColor:
                activeTab === 3 && pokemonInfo.pokedexData.types
                  ? getColor(pokemonInfo.pokedexData.types[0].type.name)
                  : "",
            }}
          >
            <i className="fa-solid fa-bolt"></i>
            moves
          </button>
        </div>

        <button onClick={closeModal} className="close-btn">
          <i className="fa-regular fa-circle-xmark fa-lg"></i>
        </button>

        <div className="modal-content">
          {activeTab === 1 && <InfoTab pokemonInfo={pokemonInfo} shinySprite={shinySprite} getColor={getColor} />}

          {activeTab === 2 && <EvolutionsTab />}
          {activeTab === 3 && <MovesTab />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
