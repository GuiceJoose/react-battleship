import Ship from "./Ship";
import { generateRandomCoords, pickRandomDirection } from "../helper-fns";

const Gameboard = () => {
  let board = [...Array(10)].map((_) => Array(10).fill(undefined));
  let placedShips = 0;
  let humanShips = [5, 4, 3, 2];
  let placementDirection = "horizontal";
  let hits = [];

  const placeShip = (name, length, xCoord, yCoord, direction) => {
    if (direction === "horizontal") {
      const ship = Ship(name, length, "horizontal");
      for (let i = 0; i < length; i++) {
        let position = i;
        board[xCoord + i][yCoord] = { ship, position };
      }
    }
    if (direction === "vertical") {
      const ship = Ship(name, length, "vertical");
      for (let i = 0; i < length; i++) {
        let position = i;
        board[xCoord][yCoord + i] = { ship, position };
      }
    }
  };

  const recieveAttack = (xCoord, yCoord) => {
    if (board[xCoord][yCoord] === undefined) {
      board[xCoord][yCoord] = "miss";
    }
    if (board[xCoord][yCoord].ship !== undefined) {
      board[xCoord][yCoord].ship.hit();
      console.log(board[xCoord][yCoord].ship);
      hits.push([xCoord, yCoord]);
    }
  };
  const allSunk = () => {
    const flatBoard = board.flat();
    const ships = flatBoard.filter((el) => typeof el === "object");
    const remainingShips = ships.filter((obj) => obj.ship.isSunk() !== true);
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
      let coords = tryShipPlacement(ship.length);
      placeShip(ship.name, ship.length, coords.x, coords.y, coords.dir);
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
    hits,
  };
};

export default Gameboard;
