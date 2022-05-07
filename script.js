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
      gameController.playRound(e.target.dataset.index);
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
    let currentSign;
    if (round % 2 == 0){
      currentSign = playerX.getSign();
    }else{
      currentSign = playerO.getSign();
    }
    gameBoard.setField(index,currentSign);
    round += 1;
  }

  const emptyField = (index) =>{
    return (gameBoard.getField(index) === "");
  }

  return {playRound,emptyField};
})();
