import Gameboard from "./factory-fns/Gameboard";

let humanBoard = Gameboard();

const PlayerBoard = ({
  placementDirection,
  placedBugs,
  setPlacedBugs,
  bugs,
}) => {
  let placeBug = humanBoard.placeShip;
  let tryPlacement = humanBoard.isPlacementValid;

  const handlePlaceShip = (event) => {
    const length = bugs[placedBugs].length;
    const xCoord = parseInt(event.target.attributes.xcoord.value);
    const yCoord = parseInt(event.target.attributes.ycoord.value);
    const direction = placementDirection;
    if (tryPlacement(length, xCoord, yCoord, direction) === true) {
      placeBug(length, xCoord, yCoord, direction);
      setPlacedBugs(++placedBugs);
    }
  };
  return (
    <div className="playerBoard">
      {humanBoard.board.map((row, index) => {
        return (
          <div key={index}>
            {row.map((square, sIndex) => {
              return (
                <div
                  key={`${index + sIndex}`}
                  xcoord={index}
                  ycoord={sIndex}
                  onClick={handlePlaceShip}
                  className="playerSquare"
                >
                  {square === undefined ? square : "b"}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerBoard;
