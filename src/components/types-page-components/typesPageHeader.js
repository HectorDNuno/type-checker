/* eslint-disable */
import React, { useContext } from "react";
import { selectedTypeContext } from "../../selectedTypeContext";
import "./typesPageHeader.css";

function TypesPageHeader() {
  const { selectedType } = useContext(selectedTypeContext);

  return (
    <header className="types-page-header">
      <div className="title-container" style={{ backgroundColor: `${selectedType.color}` }}>
        <h1 className="type-title">{selectedType.title}</h1>
      </div>
    </header>
  );
}

export default TypesPageHeader;
