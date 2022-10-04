import Ship from "./Ship";
import { generateRandomCoords, pickRandomDirection } from "../helper-fns";

const Gameboard = () => {
  let board = [...Array(10)].map((_) => Array(10).fill(undefined));
  let placedShips = 0;
  let humanShips = [5, 4, 3, 2];
  let placementDirection = "horizontal";

  const placeShip = (length, xCoord, yCoord, direction) => {
    const ship = Ship(length);
    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        board[xCoord + i][yCoord] = ship;
      }
    }
    if (direction === "vertical") {
      for (let i = 0; i < length; i++) {
        board[xCoord][yCoord + i] = ship;
      }
    }
    console.log(board);
  };

  const recieveAttack = (xCoord, yCoord) => {
    if (board[xCoord][yCoord] === undefined) {
      board[xCoord][yCoord] = "miss";
    }
    if (board[xCoord][yCoord].hits !== undefined) {
      board[xCoord][yCoord].hit();
    }
  };
  const allSunk = () => {
    const flatBoard = board.flat();
    const ships = flatBoard.filter((el) => el.hits !== undefined);
    const remainingShips = ships.filter((ship) => ship.isSunk() !== true);
    if (remainingShips.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isPlacementValid = (length, xCoord, yCoord, direction) => {
    if (direction === "horizontal") {
      // Does ship fit on board
      if (xCoord + length > 10) {
        return false;
      }
      // Is another ship in the way
      for (let i = 0; i < length; i++) {
        if (board[xCoord + i][yCoord] != undefined) {
          return false;
        }
      }
      // Is another ship above or below
      for (let i = 0; i < length; i++) {
        if (board[xCoord + i][yCoord + 1] != undefined) {
          return false;
        }
        if (board[xCoord + i][yCoord - 1] != undefined) {
          return false;
        }
      }
    }
    if (direction === "vertical") {
      // Does ship fit on board
      if (yCoord + length > 10) {
        return false;
      }
      // Is another ship in the way
      for (let i = 0; i < length; i++) {
        if (board[xCoord][yCoord + i] != undefined) {
          return false;
        }
      }
      // Is another ship left or right
      for (let i = 0; i < length; i++) {
        // only check right side if not on edge
        if (xCoord < 9) {
          if (board[xCoord + 1][yCoord + i] != undefined) {
            return false;
          }
        }
        // only check left side if not on edge
        if (xCoord > 0) {
          if (board[xCoord - 1][yCoord + i] != undefined) {
            return false;
          }
        }
      }
    }

    return true;
  };

  function tryShipPlacement(length) {
    let x = generateRandomCoords();
    let y = generateRandomCoords();
    let dir = pickRandomDirection();
    if (isPlacementValid(length, x, y, dir) === true) {
      return { x, y, dir };
    } else {
      return tryShipPlacement(length);
    }
  }

  const randomlyPlaceShips = (ships) => {
    ships.forEach((ship) => {
      let coords = tryShipPlacement(ship);
      placeShip(ship, coords.x, coords.y, coords.dir);
    });
  };

  const handlePlaceShip = (event) => {
    let x = parseInt(event.target.attributes.xcoord.value);
    let y = parseInt(event.target.attributes.ycoord.value);
    let dir = placementDirection;
    let shipNumber = placedShips;
    if (isPlacementValid(humanShips[placedShips], x, y, dir)) {
      placeShip(humanShips[shipNumber], x, y, dir);
      ++placedShips;
    }
  };

  return {
    board,
    placeShip,
    randomlyPlaceShips,
    recieveAttack,
    allSunk,
    placedShips,
    handlePlaceShip,
    placementDirection,
    isPlacementValid,
  };
};

export default Gameboard;
