import { useState } from "react";
import "./App.css";
import Playerboard from "./Playerboard";
import StartScreen from "./StartScreen";
function App() {
  const [placedBugs, setPlacedBugs] = useState(0);
  const bugs = [
    { name: "Caterpillar", length: 5 },
    { name: "Wasp", length: 4 },
    { name: "Grasshopper", length: 3 },
    { name: "Ant", length: 3 },
    { name: "Ladybug", length: 2 },
  ];

  return (
    <div className="App">
      <header className="App-header">Battlebugs</header>
      {placedBugs === 5 ? (
        ""
      ) : (
        <StartScreen
          setPlacedBugs={setPlacedBugs}
          placedBugs={placedBugs}
          bugs={bugs}
        />
      )}
      {/* <div className="gameArea">
        <Playerboard />
      </div> */}
    </div>
  );
}

export default App;
