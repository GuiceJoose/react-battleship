import Playerboard from "./Playerboard";
import Computerboard from "./Computerboard";
import GameOverScreen from "./GameOverScreen";
import { useState } from "react";

const Game = ({ bugs }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  return (
    <div className="gameArea">
      <Playerboard
        setIsGameOver={setIsGameOver}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
      />
      <Computerboard
        setIsGameOver={setIsGameOver}
        bugs={bugs}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
      />
      {isGameOver && <GameOverScreen message={isGameOver} />}
    </div>
  );
};

export default Game;
