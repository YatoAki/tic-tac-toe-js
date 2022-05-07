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
    gameController.reset();
    removeAnimation();
    mark.textContent = "";
    updateGameboard();
  })

  const updateGameboard = () =>{
    for (let i = 0 ; i < gridEle.length; i++){
      gridEle[i].textContent = gameBoard.getField(i);
    }
  }

  const showMessage = () => {
    if (gameController.isDraw()){
      mark.textContent = "IT IS DRAW!";
      addDrawAnimation();
    }
    else if (gameController.isOver()){
      mark.textContent = gameController.getCurrentPlayerSign() + " WIN!";
      addWinAnimation();
    }else{
      let nextPlayer = gameController.getCurrentPlayerSign() == "X" ? "O" : "X";
      mark.textContent =  nextPlayer + " TURN";
    }
  }

  const addWinAnimation = () => {
    gridEle.forEach((ele) => ele.classList.add("turn-green"))
  }

  const removeWinAnimation = () => {
    gridEle.forEach((ele) => ele.classList.remove("turn-green"))
  }

  const addDrawAnimation = () => {
    gridEle.forEach((ele) => ele.classList.add("turn-red"))
  }

  const removeDrawAnimation = () => {
    gridEle.forEach((ele) => ele.classList.remove("turn-red"))
  }

  const removeAnimation = () => {
    removeWinAnimation();
    removeDrawAnimation();
  }

  return {updateGameboard,showMessage};
})();



const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 0;
  let gameOver = false;
  let draw = false;

  const playRound = (index) => {
    if (!gameController.emptyField(index) || gameOver) return;
    gameBoard.setField(index,getCurrentPlayerSign());
    displayController.showMessage();
    if (checkWinner(index)){
      gameOver = true;
      displayController.showMessage();
    }
    if (round >= 8){
      draw = true;
      displayController.showMessage();
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

  const reset = () => {
    gameOver = false;
    draw = false;
    round = 0;
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

  const isOver =() => {
    return gameOver;
  }

  const isDraw = () => {
    return draw;
  }

  return {playRound,emptyField,isOver,isDraw,reset,getCurrentPlayerSign};
})();
