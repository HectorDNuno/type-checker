/* eslint-disable */
import "./App.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { Types } from "./components/typesData";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar types={Types} />
    </div>
  );
};

export default App;
