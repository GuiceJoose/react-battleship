import { useRef, useState, useEffect } from "react";
import { isArray1InArray2 } from "../helper-fns";
import Gameboard from "../factory-fns/Gameboard";
import Player from "../factory-fns/Player";
import PlayerSquare from "./playerSquare";

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
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  let placeBug = humanBoard.placeShip;
  let tryPlacement = humanBoard.isPlacementValid;

  const handleMouseEnter = (event) => {
    if (placedBugs < 5) {
      const length = bugs[placedBugs].length;
      const xCoord = parseInt(event.target.attributes.xcoord.value);
      const yCoord = parseInt(event.target.attributes.ycoord.value);
      const direction = placementDirection;
      if (placementDirection === "horizontal") {
        if (tryPlacement(length, xCoord, yCoord, direction)) {
          let squares = [];
          for (let i = 0; i < length; i++) {
            squares.push([xCoord + i, yCoord]);
            setHighlightedSquares([squares]);
          }
        } else {
          setHighlightedSquares([]);
        }
      }
      if (placementDirection === "vertical") {
        if (tryPlacement(length, xCoord, yCoord, direction)) {
          let squares = [];
          for (let i = 0; i < length; i++) {
            squares.push([xCoord, yCoord + i]);
            setHighlightedSquares([squares]);
          }
        } else {
          setHighlightedSquares([]);
        }
      }
    }
  };

  const handleMouseLeave = () => {
    setHighlightedSquares([]);
  };

  const handlePlaceShip = (event) => {
    if (placedBugs < 5) {
      const name = bugs[placedBugs].name;
      const length = bugs[placedBugs].length;
      const xCoord = parseInt(event.target.attributes.xcoord.value);
      const yCoord = parseInt(event.target.attributes.ycoord.value);
      const direction = placementDirection;

      if (tryPlacement(length, xCoord, yCoord, direction) === true) {
        placeBug(name, length, xCoord, yCoord, direction);
        setPlacedBugs(++placedBugs);
      }
    } else {
    }
  };

  // Gets attacked by computer and checks if game over
  useEffect(() => {
    if (isPlayerTurn === false) {
      let computerAttack = computerPlayer.pickRandomAttack();
      humanBoard.recieveAttack(computerAttack[0], computerAttack[1]);
      if (
        humanBoard.board[computerAttack[0]][computerAttack[1]] !== undefined &&
        humanBoard.board[computerAttack[0]][computerAttack[1]] !== "miss"
      ) {
        let nearbySquares = [
          [computerAttack[0] + 1, computerAttack[1]],
          [computerAttack[0] - 1, computerAttack[1]],
          [computerAttack[0], computerAttack[1] + 1],
          [computerAttack[0], computerAttack[1] - 1],
        ];
        computerPlayer.smartAttacks = nearbySquares.filter(
          (square) =>
            isArray1InArray2(square, computerPlayer.possibleAttacks) === true
        );
      }
      setHitsOnPlayer(humanBoard.hits);
      setIsPlayerTurn(true);
      if (humanBoard.allSunk()) {
        setIsGameOver("Player 2 wins!");
      }
    }
  }, [isPlayerTurn, setIsGameOver, setIsPlayerTurn]);

  return (
    <div className="playerBoard">
      {humanBoard.board.map((column, index) => {
        return column.map((square, sIndex) => {
          return (
            <PlayerSquare
              key={`${index}${sIndex}`}
              xcoord={index}
              ycoord={sIndex}
              handlePlaceShip={handlePlaceShip}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              highlightedSquares={highlightedSquares}
              hitsOnPlayer={hitsOnPlayer}
              status={square}
              placementDirection={placementDirection}
            ></PlayerSquare>
          );
        });
      })}
    </div>
  );
};

export default Playerboard;
