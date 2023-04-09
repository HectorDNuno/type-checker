/* eslint-disable */
import "./App.css";
import { useState } from "react";
import { selectedTypeContext } from "./selectedTypeContext";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import TypesPage from "./components/types-page-components/typesPage";

const App = () => {
  const [selectedType, setSelectedType] = useState({ title: "", color: "" });

  return (
    <div className="App">
      <selectedTypeContext.Provider value={{ selectedType, setSelectedType }}>
        <Navbar />
        <Sidebar />
        <TypesPage />
      </selectedTypeContext.Provider>
    </div>
  );
};

export default App;
