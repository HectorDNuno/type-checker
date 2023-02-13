/* eslint-disable */
import "./App.css";
import Sidebar from "./components/sidebar.js";
import Navbar from "./components/topNavbar.js";
import { Types } from "./typesData";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar types={Types} />
    </div>
  );
}

export default App;
