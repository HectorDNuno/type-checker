/* eslint-disable */
import "./App.css";
import Sidebar from "/src/components/sidebar";
import Navbar from "./components/topNavbar";
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
