
const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return this.sign;
  }

  return {getSign};
}

const gameBoard = (() => {
  const board = ["","","","","","","","",""];

  const setField = (index, sign) => {
    if (index > board.length || index < 0) return;
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
      gameBoard.setField(e.target.dataset.index,"X");
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

displayController.updateGameboard();
