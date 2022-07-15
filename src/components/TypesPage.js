import React from "react";
import "./TypesPage.css";

const TypesPage = ({ type }) => {
  return (
    <div className="types-page">
      {type ? (
        <div className="page-title">
          <div className="title-contents" style={{ backgroundColor: `#${type.color}` }}>
            <img className="title-image" src={type.imageUrl} alt={`${type.title} icon`} />
            <span className="title">{type.title}</span>
          </div>
        </div>
      ) : (
        <div className="type-title">Choose a type</div>
      )}
    </div>
  );
};

export default TypesPage;
