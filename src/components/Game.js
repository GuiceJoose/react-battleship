import Playerboard from "./Playerboard";
import Computerboard from "./Computerboard";
import GameOverScreen from "./GameOverScreen";
import { useState } from "react";

const Game = ({ bugs }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  return (
    <div className="gameArea">
      <div className="playerArea">
        <div className="playerHeader">
          <img src="man.png"></img>
          <div>Your Bugs</div>
        </div>
        <Playerboard
          setIsGameOver={setIsGameOver}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
        />
      </div>
      <div className="computerArea">
        <div className="playerHeader">
          <div>Computer's bugs</div>
          <img src="computer.png"></img>
        </div>
        <Computerboard
          setIsGameOver={setIsGameOver}
          bugs={bugs}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
        />
        {isGameOver && <GameOverScreen message={isGameOver} />}
      </div>
    </div>
  );
};

export default Game;
