const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };

  return {getSign};
};

const gameBoard = (() => {
  const board = ["","","","","","","","",""];

  const setField = (index, sign) => {
    if (index > board.length || index < 0 || !gameController.emptyField(index)) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length || index < 0) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length ; i++){
      board[i] = "";
    }
  };

  return {setField, getField, reset};
})();


const displayController = (() => {
  const gridEle = document.querySelectorAll(".grid-ele");
  const mark = document.querySelector(".mark");
  const action = document.querySelector("#action");

  for (let i = 0 ; i < gridEle.length; i++){
    gridEle[i].dataset.index = i;
  }

  gridEle.forEach((ele) =>

    ele.addEventListener("click",(e) =>{
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    }))

  action.addEventListener("click", (e) =>{
    gameBoard.reset();
    updateGameboard();
  })

  const updateGameboard = () =>{
    for (let i = 0 ; i < gridEle.length; i++){
      gridEle[i].textContent = gameBoard.getField(i);
    }
  }

  return {updateGameboard};
})();



const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 0;
  let gameOver = false;

  const playRound = (index) => {
    if (!gameController.emptyField(index) || gameOver) return;
    gameBoard.setField(index,getCurrentPlayerSign());
    if (gameController.checkWinner(index)){
      gameOver = true;
      console.log("asdf")
    }
    round += 1;
  }

  const getCurrentPlayerSign = () => {
    let currentSign;
    if (round % 2 == 0){
      currentSign = playerX.getSign();
    }else{
      currentSign = playerO.getSign();
    }
    return currentSign;
  }

  const emptyField = (index) =>{
    return (gameBoard.getField(index) === "");
  }

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayerSign()
        )
      );
  };

  return {playRound,emptyField,checkWinner};
})();
