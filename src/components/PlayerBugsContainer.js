import { useRef } from "react";

const PlayerBugsContainer = () => {
  const dragItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(dragItem.current);
  };
  return (
    <div className="bugContainer">
      <img className="bug" src="/caterpillar.png"></img>
      <img className="bug" src="/wasp.png"></img>
      <img className="bug" src="/grasshopper.png"></img>
      <img className="bug" src="/ant.png"></img>
      <img className="bug" src="/ladybug.png"></img>
    </div>
  );
};
export default PlayerBugsContainer;
