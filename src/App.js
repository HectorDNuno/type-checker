/* eslint-disable */
import "./App.css";
import React, { useState } from "react";
import { selectedTypeContext } from "./selectedTypeContext";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

const App = () => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });

  return (
    <div className="app">
      <selectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
        <Main />
        <Sidebar />
      </selectedTypeContext.Provider>
    </div>
  );
};

export default App;
