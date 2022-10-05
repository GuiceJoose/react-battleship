import Gameboard from "./Gameboard";

const Player = (playerType) => {
  let playerBoard = Gameboard();
  let isTurn = false;
  let possibleAttacks = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) possibleAttacks.push([i, j]);
  }

  function pickRandomAttack() {
    const attackIndex = Math.floor(Math.random() * possibleAttacks.length);
    const attack = possibleAttacks[attackIndex];
    possibleAttacks.splice(attackIndex, 1);
    return attack;
  }

  return {
    playerBoard,
    isTurn,
    possibleAttacks,
    pickRandomAttack,
    playerType,
  };
};

export default Player;
