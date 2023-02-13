/* eslint-disable */
import "./App.css";
import Sidebar from "./components/sidebar";
import TopNavbar from "./components/topNavbar";
import { Types } from "./typesData";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Sidebar types={Types} />
    </div>
  );
}

export default App;
