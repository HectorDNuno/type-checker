/* eslint-disable */
import React from "react";
import "./typesPageHeader.css";

function TypesPageHeader({ type }) {
  return (
    <header className="types-page-header">
      <div className="title-container" style={{ backgroundColor: `${type.color}` }}>
        <h1 className="type-title">{type}</h1>
      </div>
    </header>
  );
}

export default TypesPageHeader;
