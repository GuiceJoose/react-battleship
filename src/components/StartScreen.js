import Ship from "../factory-fns/Ship";
import Playerboard from "./Playerboard";
import RotateButton from "./RotateButton";
import { useState } from "react";
import PlayerBugsContainer from "./PlayerBugsContainer";

const StartScreen = ({ placedBugs, setPlacedBugs, bugs }) => {
  const [placementDirection, setPlacementDirection] = useState("horizontal");
  const handleRotate = () => {
    if (placementDirection === "horizontal") {
      setPlacementDirection("vertical");
    }
    if (placementDirection === "vertical") {
      setPlacementDirection("horizontal");
    }
  };

  return (
    <div className="startModal">
      <h3>Welcome to Battlebugs</h3>
      <h4>Please place your {bugs[placedBugs].name}</h4>
      <div className="boardContainer">
        <PlayerBugsContainer />
        <Playerboard
          placementDirection={placementDirection}
          placedBugs={placedBugs}
          setPlacedBugs={setPlacedBugs}
          bugs={bugs}
        />
      </div>

      <RotateButton handleRotate={handleRotate} />
    </div>
  );
};

export default StartScreen;
