import classNames from "classnames";
import { useEffect, useState } from "react";
import { isArray1InArray2 } from "../helper-fns";

const PlayerSquare = ({
  xcoord,
  ycoord,
  status,
  handlePlaceShip,
  handleMouseEnter,
  handleMouseLeave,
  hitsOnPlayer,
  highlightedSquares,
}) => {
  const [classes, setClasses] = useState();

  useEffect(() => {
    console.log("effect");
    const getSquareClass = (squareStatus, xcoord, ycoord) => {
      let hit = "";
      if (isArray1InArray2([xcoord, ycoord], highlightedSquares)) {
        setClasses("highlighted");
      }
      if (
        !isArray1InArray2([xcoord, ycoord], highlightedSquares) &&
        squareStatus === undefined
      ) {
        setClasses("");
      }
      if (squareStatus === "miss") {
        setClasses("Miss");
        return;
      }
      if (isArray1InArray2([xcoord, ycoord], hitsOnPlayer)) {
        hit = "Hit";
      }

      if (
        squareStatus !== undefined &&
        squareStatus !== "Miss" &&
        squareStatus.ship.isSunk() === false
      ) {
        if (squareStatus.ship.direction === "vertical") {
          setClasses(
            `${squareStatus.ship.name}-${squareStatus.position} vertical ${hit}`
          );
        }
        if (squareStatus.ship.direction === "horizontal") {
          setClasses(
            `${squareStatus.ship.name}-${squareStatus.position} ${hit}`
          );
        }
      }
      if (
        squareStatus !== undefined &&
        squareStatus !== "Miss" &&
        squareStatus.ship.isSunk() === true
      ) {
        if (squareStatus.ship.direction === "vertical") {
          setClasses(
            `dead${squareStatus.ship.name}-${squareStatus.position} vertical`
          );
        }
        if (squareStatus.ship.direction === "horizontal") {
          setClasses(`dead${squareStatus.ship.name}-${squareStatus.position}`);
        }
      }
    };
    getSquareClass(status, xcoord, ycoord);
  }, [
    highlightedSquares,
    highlightedSquares.length,
    status,
    xcoord,
    ycoord,
    hitsOnPlayer,
    hitsOnPlayer.length,
  ]);

  // const getSquareClass = (squareStatus, xcoord, ycoord) => {
  //   if (squareStatus === undefined) {
  //     if (isArray1InArray2([xcoord, ycoord], highlightedSquares)) {
  //       return "highlighted";
  //     } else return "";
  //   }
  //   if (squareStatus === "miss") {
  //     return "Miss";
  //   }
  //   if (isArray1InArray2([xcoord, ycoord], hitsOnPlayer)) {
  //     return "Hit";
  //   }
  //   if (squareStatus.ship.direction === "vertical") {
  //     return `${squareStatus.ship.name}-${squareStatus.position} vertical`;
  //   } else {
  //     return `${squareStatus.ship.name}-${squareStatus.position}`;
  //   }
  // };

  return (
    <div
      xcoord={xcoord}
      ycoord={ycoord}
      onClick={handlePlaceShip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames("playerSquare", classes)}
    ></div>
  );
};

export default PlayerSquare;
