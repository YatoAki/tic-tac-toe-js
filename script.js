
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

  const resetField = () => {
    for (let i = 0; i < board.length ; i++){
      board[i] = "";
    }
  };

  return {setField, getField, resetField};
})();
