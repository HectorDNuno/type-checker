import "./App.css";
import Sidebar from "./components/Sidebar";
import { Types } from "./components/SidebarData";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Sidebar options={Types} />
    </div>
  );
}

export default App;
