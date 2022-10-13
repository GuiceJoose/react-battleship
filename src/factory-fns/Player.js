import { isArray1InArray2, indexOf2d } from "../helper-fns";
import Gameboard from "./Gameboard";

const Player = (playerType) => {
  let playerBoard = Gameboard();
  let isTurn = false;
  let possibleAttacks = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) possibleAttacks.push([i, j]);
  }
  let smartAttacks = [];

  function pickRandomAttack() {
    if (this.smartAttacks.length > 0) {
      const attackIndex = Math.floor(Math.random() * this.smartAttacks.length);
      const attack = this.smartAttacks[attackIndex];
      this.smartAttacks.splice(attackIndex, 1);
      console.log(indexOf2d(attack, possibleAttacks, isArray1InArray2));
      this.possibleAttacks.splice(
        indexOf2d(attack, possibleAttacks, isArray1InArray2),
        1
      );
      return attack;
    } else {
      const attackIndex = Math.floor(
        Math.random() * this.possibleAttacks.length
      );
      const attack = this.possibleAttacks[attackIndex];
      this.possibleAttacks.splice(attackIndex, 1);
      return attack;
    }
  }

  return {
    playerBoard,
    isTurn,
    possibleAttacks,
    pickRandomAttack,
    playerType,
    smartAttacks,
  };
};

export default Player;
