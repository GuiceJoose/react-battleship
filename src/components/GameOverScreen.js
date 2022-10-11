import Computerboard from "./Computerboard";

const GameOverScreen = ({ message }) => {
  const getWinnerImage = (message) => {
    if (message === "Player 1 wins!") {
      return "man.png";
    }
    if (message === "Player 2 wins!") {
      return "computer.png";
    }
  };
  const handlePlayAgain = () => {
    window.location.reload();
  };
  return (
    <div className="gameOver">
      <div className="gameOverModal">
        <img className="winnerImage" src={getWinnerImage(message)}></img>
        <div>{message}</div>
        <button onClick={handlePlayAgain}>Play again</button>
      </div>
    </div>
  );
};

export default GameOverScreen;
