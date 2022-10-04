const GameController = () => {
  let board1 = player1.playerBoard.board;
  let board2 = player2.playerBoard.board;
  function checkGameOver() {
    if (player1.playerBoard.allSunk() === true) {
      return alert("player 2 wins");
    }
    if (player2.playerBoard.allSunk() === true) {
      return alert("player 1 wins");
    }
  }
  function switchTurns() {
    if (player1.isTurn === true) {
      player1.isTurn = false;
      player2.isTurn = true;
      return GameController();
    }
    if (player2.isTurn === true) {
      player2.isTurn = false;
      player1.isTurn = true;
      return GameController();
    }
  }
  function addClickListener() {
    let squares = document.querySelectorAll(".computer-tile");
    squares.forEach((square) =>
      square.addEventListener("click", handleAttackClick)
    );
  }

  function handleAttackClick(event) {
    let x = parseInt(event.target.attributes.xcoord.value);
    let y = parseInt(event.target.attributes.ycoord.value);

    if (
      // attack is a hit
      player2.playerBoard.board[x][y] !== undefined &&
      player2.playerBoard.board[x][y] !== "miss" &&
      isArray1InArray2([x, y], player1.hits) === false
    ) {
      player1.hits.push([x, y]);
      player2.playerBoard.recieveAttack(x, y);
      switchTurns();
    }
    if (
      // attack is a miss
      player2.playerBoard.board[x][y] === undefined
    ) {
      player2.playerBoard.recieveAttack(x, y);
      switchTurns();
    }
    if (
      // attack has already been selected -> do nothing
      player2.playerBoard.board[x][y] === "miss" ||
      isArray1InArray2([x, y], player1.hits) === true
    ) {
      return;
    }
  }

  renderGameBoards(board1, board2);
  console.log(player1.playerBoard.placedShips);
  if (player1.playerBoard.placedShips === 4) {
    addClickListener();
    checkGameOver();

    if (player2.isTurn === true) {
      let player2Attack = player2.pickRandomAttack();
      player1.playerBoard.recieveAttack(player2Attack[0], player2Attack[1]);

      switchTurns();
    }
  }
};

export default GameController;
