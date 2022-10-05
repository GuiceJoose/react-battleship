import { useState, useEffect } from "react";
import { isArray1InArray2 } from "../helper-fns";
import Gameboard from "../factory-fns/Gameboard";
import Player from "../factory-fns/Player";

let humanBoard = Gameboard();
let computerPlayer = Player();

const Playerboard = ({
  setIsGameOver,
  isPlayerTurn,
  setIsPlayerTurn,
  placementDirection,
  placedBugs,
  setPlacedBugs,
  bugs,
}) => {
  const [hitsOnPlayer, setHitsOnPlayer] = useState([]);
  let placeBug = humanBoard.placeShip;
  let tryPlacement = humanBoard.isPlacementValid;

  const handlePlaceShip = (event) => {
    if (placedBugs < 5) {
      const length = bugs[placedBugs].length;
      const xCoord = parseInt(event.target.attributes.xcoord.value);
      const yCoord = parseInt(event.target.attributes.ycoord.value);
      const direction = placementDirection;
      if (tryPlacement(length, xCoord, yCoord, direction) === true) {
        placeBug(length, xCoord, yCoord, direction);
        setPlacedBugs(++placedBugs);
      }
    }
  };

  // Gets attacked by computer and checks if game over
  useEffect(() => {
    if (isPlayerTurn === false) {
      let computerAttack = computerPlayer.pickRandomAttack();
      humanBoard.recieveAttack(computerAttack[0], computerAttack[1]);
      setHitsOnPlayer(humanBoard.hits);
      setIsPlayerTurn(true);
      if (humanBoard.allSunk()) {
        setIsGameOver("Player 2 wins!");
      }
    }
  }, [isPlayerTurn]);

  const getSquareClass = (squareStatus, xcoord, ycoord) => {
    if (squareStatus === undefined) {
      return "";
    }
    if (squareStatus === "miss") {
      return "Miss";
    }
    if (isArray1InArray2([xcoord, ycoord], hitsOnPlayer)) {
      return "Hit";
    } else return "Ship";
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
                  className={`playerSquare${getSquareClass(
                    square,
                    index,
                    sIndex
                  )}`}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Playerboard;