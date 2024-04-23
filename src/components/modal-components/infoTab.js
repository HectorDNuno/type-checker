import React, { useMemo, useState } from "react";
import "./infoTab.css";
import Barchart from "../barchart";

const InfoTab = ({ pokemonInfo, shinySprite, getColor }) => {
  const [isModalImgShiny, setIsModalImgShiny] = useState(false);

  const findRecentSpeciesData = (entries) => {
    if (!entries || entries.length === 0) return null;

    const filteredByLanguage = entries.filter((entry) => entry.language.name === "en");
    const versionNumbers = filteredByLanguage.map((entry) => parseInt(entry.version.url.split("/").slice(-2, -1)[0]));
    const maxVersionNumber = Math.max(...versionNumbers);

    return filteredByLanguage.find(
      (entry) => parseInt(entry.version.url.split("/").slice(-2, -1)[0]) === maxVersionNumber
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
      "generation-ix": "Generation 9",
      "generation-x": "Generation 10",
    };

    return generationMap[generationString] || generationString;
  };

  const calculateGenderPercentage = (genderRate) => {
    if (genderRate === -1) return "Genderless";

    const remainder = genderRate % 8;
    const percentage = (remainder / 8) * 100;
    const femaleRate = percentage.toFixed(2).replace(/\.?0*$/, "");
    const maleRate = 100 - femaleRate;

    const maleSymbol = "\u2642";
    const femaleSymbol = "\u2640";

    return `${maleRate}% ${maleSymbol} ${femaleRate}% ${femaleSymbol}  `;
  };

  const classification = useMemo(
    () => pokemonInfo.speciesData.genera?.find((entry) => entry.language.name === "en"),
    [pokemonInfo.speciesData.genera]
  );
  const entry = findRecentSpeciesData(pokemonInfo.speciesData?.flavor_text_entries);
  const stats = reorganizeStats(pokemonInfo.pokedexData?.stats);

  const imageUrl = isModalImgShiny
    ? pokemonInfo.pokedexData.sprites?.other.home.front_shiny
    : pokemonInfo.pokedexData.sprites?.other.home.front_default;

  return (
    <div className="info-tab">
      {pokemonInfo.pokedexData.sprites ? (
        <img src={imageUrl} alt={`${pokemonInfo.pokedexData.name} sprite`} />
      ) : (
        <img alt="" />
      )}

      <div className="info">
        <div> #{pokemonInfo.pokedexData.id} </div>
        <h4> {pokemonInfo.pokedexData.name} </h4>
        <div>{pokemonInfo.speciesData.genera && pokemonInfo.speciesData.genera.length > 0 && classification.genus}</div>

        {pokemonInfo.pokedexData.types && (
          <div className="types">
            <div className="type" style={{ backgroundColor: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>
              {pokemonInfo.pokedexData.types[0].type.name}
            </div>
            {pokemonInfo.pokedexData.types[1] && (
              <div className="type" style={{ backgroundColor: getColor(pokemonInfo.pokedexData.types[1].type.name) }}>
                {pokemonInfo.pokedexData.types[1].type.name}
              </div>
            )}
            <i
              onClick={() => {
                setIsModalImgShiny(!isModalImgShiny);
              }}
              className="fa-solid fa-star fa-xl"
              style={{ color: isModalImgShiny ? "#febf00" : "#c1c1c1" }}
            ></i>
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
            {pokemonInfo.abilityEntries.ability1 && (
              <div className="ability">
                <div className="ability-name" style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                  {pokemonInfo.abilityEntries.ability1.name}
                </div>
                <div> {pokemonInfo.abilityEntries.ability1.flavorText} </div>
              </div>
            )}

            {pokemonInfo.abilityEntries.ability2 &&
              pokemonInfo.abilityEntries.ability2.name !== pokemonInfo.abilityEntries.ability1.name && (
                <div className="ability">
                  <div className="ability-name" style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                    {pokemonInfo.abilityEntries.ability2.name}
                    {pokemonInfo.abilityEntries.ability2.isHidden && <span> (hidden ability) </span>}
                  </div>
                  <div> {pokemonInfo.abilityEntries.ability2.flavorText} </div>
                </div>
              )}

            {pokemonInfo.abilityEntries.ability3 &&
              pokemonInfo.abilityEntries.ability3.name !== pokemonInfo.abilityEntries.ability2.name && (
                <div className="ability">
                  <div className="ability-name" style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>
                    {pokemonInfo.abilityEntries.ability3.name}
                    {pokemonInfo.abilityEntries.ability3.isHidden && <span> (hidden ability) </span>}
                  </div>
                  <div> {pokemonInfo.abilityEntries.ability3.flavorText} </div>
                </div>
              )}
          </>
        )}
      </div>

      <div className="characteristics">
        <h5>Characteristics</h5>
        {pokemonInfo.pokedexData.weight && pokemonInfo.speciesData.capture_rate && (
          <>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Weight</div>
            <div> {(pokemonInfo.pokedexData.weight / 4.536).toFixed(1)} lbs</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Height</div>
            <div> {(pokemonInfo.pokedexData.height / 3.048).toFixed(1)}'</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Base Experience</div>
            <div> {pokemonInfo.pokedexData.base_experience}</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Base Happiness</div>
            <div> {pokemonInfo.speciesData.base_happiness}</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Catch Rate</div>
            <div> {pokemonInfo.speciesData.capture_rate}</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Hatch Time</div>
            <div> {pokemonInfo.speciesData.hatch_counter}</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Gender Ratio</div>
            <div> {calculateGenderPercentage(pokemonInfo.speciesData.gender_rate)} </div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>Growth Rate</div>
            <div> {pokemonInfo.speciesData.growth_rate.name}</div>
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>
              {pokemonInfo.speciesData.egg_groups.length > 1 ? "Egg Groups" : "Egg group"}
            </div>
            <div>
              {" "}
              {pokemonInfo.speciesData.egg_groups.length > 1 ? pokemonInfo.speciesData.egg_groups[0].name : "N/A"}{" "}
            </div>
            {pokemonInfo.speciesData.egg_groups[1] && <div> {pokemonInfo.speciesData.egg_groups[1].name} </div>}
            <div style={{ color: getColor(pokemonInfo.pokedexData.types[0].type.name) }}>First Appeared</div>
            <div> {getFormattedGeneration(pokemonInfo.speciesData.generation?.name)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTab;
