/* eslint-disable */
import "./App.css";
import React, { useState } from "react";
import { selectedTypeContext, sidebarContext } from "./selectedTypeContext";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

const App = () => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });
  const [menuClass, setMenuClass] = useState(screen.width <= 960 ? "hidden" : "");

  return (
    <div className="app">
      <selectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
        <sidebarContext.Provider value={{ menuClass, setMenuClass }}>
          <Main />
          <Sidebar />
        </sidebarContext.Provider>
      </selectedTypeContext.Provider>
    </div>
  );
};

export default App;
