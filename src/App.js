/* eslint-disable */
import "./App.css";
import React, { useState } from "react";
import { SelectedTypeContext, SidebarContext } from "./Contexts";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

const App = () => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });
  const [menuClass, setMenuClass] = useState(screen.width <= 960 ? "hidden" : "");

  return (
    <div className="app">
      <SelectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
        <SidebarContext.Provider value={{ menuClass, setMenuClass }}>
          <Main />
          <Sidebar />
        </SidebarContext.Provider>
      </SelectedTypeContext.Provider>
    </div>
  );
};

export default App;
