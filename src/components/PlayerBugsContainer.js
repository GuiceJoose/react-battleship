import classNames from "classnames";
import RotateButton from "./RotateButton";
import { useRef } from "react";

const PlayerBugsContainer = ({
  placementDirection,
  placedBugs,
  bugs,
  handleRotate,
}) => {
  const getActiveBug = (bug) => {
    if (bugs[placedBugs].name === bug) {
      return "activeBug";
    }
  };
  return (
    <div className="bugContainer">
      <div>Placement:</div>
      <div>{placementDirection}</div>
      <RotateButton handleRotate={handleRotate} />
      <img
        className={classNames("bug", getActiveBug("Caterpillar"))}
        src="/caterpillar.png"
      ></img>
      <img
        className={classNames("bug", getActiveBug("Wasp"))}
        src="/wasp.png"
      ></img>
      <img
        className={classNames("bug", getActiveBug("Grasshopper"))}
        src="/grasshopper.png"
      ></img>
      <img
        className={classNames("bug", getActiveBug("Ant"))}
        src="/ant.png"
      ></img>
      <img
        className={classNames("bug", getActiveBug("Ladybug"))}
        src="/ladybug.png"
      ></img>
    </div>
  );
};
export default PlayerBugsContainer;
