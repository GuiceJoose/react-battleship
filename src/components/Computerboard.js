import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import Gameboard from "../factory-fns/Gameboard";
import Player from "../factory-fns/Player";
import { isArray1InArray2 } from "../helper-fns";

let computerBoard = Gameboard();

const Computerboard = ({
  bugs,
  isPlayerTurn,
  setIsPlayerTurn,
  setIsGameOver,
}) => {
  const effectRan = useRef(false);
  const [areBugsPlaced, setAreBugsPlaced] = useState(false);
  const [hitsOnComputer, setHitsOnComputer] = useState([]);
  const randomlyPlaceBugs = computerBoard.randomlyPlaceShips;

  const handleAttackClick = (event) => {
    if (isPlayerTurn === true) {
      const x = parseInt(event.target.attributes.xcoord.value);
      const y = parseInt(event.target.attributes.ycoord.value);
      if (
        computerBoard.board[x][y] !== "miss" &&
        isArray1InArray2([x, y], computerBoard.hits) === false
      ) {
        computerBoard.recieveAttack(x, y);
        setHitsOnComputer([...computerBoard.hits]);
        setIsPlayerTurn(false);
      }
    }
  };

  // Place ships on mount
  useEffect(() => {
    if (effectRan.current === false) {
      randomlyPlaceBugs(bugs);
      setAreBugsPlaced(true);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  // Check for game over each turn
  useEffect(() => {
    if (computerBoard.allSunk()) {
      setIsGameOver("Player 1 wins!");
    }
  }, [hitsOnComputer]);

  const getSquareClass = (squareStatus, xcoord, ycoord) => {
    if (squareStatus === undefined) {
      return "";
    }
    if (squareStatus === "miss") {
      return "Miss";
    }
    if (squareStatus.ship.isSunk()) {
      if (squareStatus.ship.direction === "vertical") {
        return `${squareStatus.ship.name}-${squareStatus.position} vertical`;
      } else {
        return `${squareStatus.ship.name}-${squareStatus.position}`;
      }
    }
    if (isArray1InArray2([xcoord, ycoord], hitsOnComputer)) {
      return "Hit";
    } else return "";
  };

  return (
    <div className="computerBoard">
      {computerBoard.board.map((row, index) => {
        return (
          <div key={index}>
            {row.map((square, sIndex) => {
              return (
                <div
                  key={`${index + sIndex}`}
                  xcoord={index}
                  ycoord={sIndex}
                  onClick={handleAttackClick}
                  className={classNames(
                    "computerSquare",
                    getSquareClass(square, index, sIndex)
                  )}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Computerboard;
