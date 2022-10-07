import { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
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
      <header className="App-header">BattleBugz</header>
      {placedBugs === 5 ? (
        <Game bugs={bugs} />
      ) : (
        <StartScreen
          setPlacedBugs={setPlacedBugs}
          placedBugs={placedBugs}
          bugs={bugs}
        />
      )}
    </div>
  );
}

export default App;
