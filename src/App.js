import "./App.css";
import Sidebar from "./components/Sidebar";
import { Types } from "./components/TypesData";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Sidebar types={Types} />
    </div>
  );
}

export default App;
