export const initBoard = () => {
  return [
    ["b", "-", "b", "-", "b", "-", "b", "-"],
    ["-", "b", "-", "b", "-", "b", "-", "b"],
    ["b", "-", "b", "-", "b", "-", "b", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "r", "-", "r", "-", "r", "-", "r"],
    ["r", "-", "r", "-", "r", "-", "r", "-"],
    ["-", "r", "-", "r", "-", "r", "-", "r"],
  ];
};

export const findJumps = (board, row, col, piece, jumpDirections) => {
  const jumps = [];
  const kingJumpDirections = [
    [2, 2],
    [2, -2],
    [-2, 2],
    [-2, -2],
  ];
  let stack = [[row, col, piece]]; //keep track of piece in case where kinged mid-jump
  let visited = new Set();
  while (stack.length) {
    const [currentRow, currentCol, piece] = stack.pop();
    for (let i = 0; i < kingJumpDirections.length; i++) {
      const direction = kingJumpDirections[i];
      //check if the jump is doable if not kinged
      if (
        (piece === "b" || piece === "r") &&
        !jumpDirections.some(
          (dir) => dir[0] === direction[0] && dir[1] === direction[1]
        )
      ) {
        continue;
      }
      const nextRow = currentRow + direction[0];
      const nextCol = currentCol + direction[1];
      const jumpRow = currentRow + direction[0] / 2;
      const jumpCol = currentCol + direction[1] / 2;

      // Ensure the next position is within bounds
      if (
        nextRow >= 0 &&
        nextRow < board.length &&
        nextCol >= 0 &&
        nextCol < board[0].length
      ) {
        if (
          !visited.has(`${nextRow},${nextCol}`) &&
          board[nextRow]?.[nextCol] === "-" && // next square is empty
          board[jumpRow]?.[jumpCol]?.toLowerCase() !== piece.toLowerCase() && // middle square has an opposite piece
          board[jumpRow]?.[jumpCol] !== "-" // check bounds for middle square
        ) {
          if (piece === "b" && nextRow === 7) {
            stack.push([nextRow, nextCol, "B"]);
          } else if (piece === "r" && nextRow === 0) {
            stack.push([nextRow, nextCol, "R"]);
          } else {
            stack.push([nextRow, nextCol, piece]);
          }
          visited.add(`${nextRow},${nextCol}`); // Use string for coordinates
          jumps.push([nextRow, nextCol]);
        }
      }
    }
  }
  return jumps;
};

export const getValidMoves = (board, row, col) => {
  const piece = board[row][col];
  const moves = [];
  let directions = [];
  let jumpDirections = [];
  if (piece === "b") {
    directions = [
      [1, 1],
      [1, -1],
    ];
    jumpDirections = [
      [2, 2],
      [2, -2],
    ];
  } else if (piece === "r") {
    directions = [
      [-1, 1],
      [-1, -1],
    ];
    jumpDirections = [
      [-2, 2],
      [-2, -2],
    ];
  } else {
    directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    jumpDirections = [
      [2, 2],
      [2, -2],
      [-2, 2],
      [-2, -2],
    ];
  }
  directions.forEach((direction) => {
    if (board[row + direction[0]][col + direction[1]] === "-") {
      moves.push([row + direction[0], col + direction[1]]);
    }
  });
  const jumpMoves = findJumps(board, row, col, piece, jumpDirections);
  moves.push(...jumpMoves);
  console.log(moves);
  return moves;
};

export const handleSquareClick = (
  i,
  j,
  board,
  setBoard,
  selectedPiece,
  setSelectedPiece,
  validMoves,
  setValidMoves,
  turn,
  setTurn
) => {
  const newBoard = [...board];
  if (
    board[i][j]?.toLowerCase() === turn &&
    selectedPiece?.row !== i &&
    selectedPiece?.col !== j
  ) {
    setSelectedPiece({ row: i, col: j });
    setValidMoves(getValidMoves(board, i, j));
    return;
  } else if (
    selectedPiece &&
    validMoves.some((move) => move[0] === i && move[1] === j)
  ) {
    newBoard[i][j] = newBoard[selectedPiece.row][selectedPiece.col];
    newBoard[selectedPiece.row][selectedPiece.col] = "-";
    setBoard(newBoard);
    setTurn(turn === "r" ? "b" : "r");
    setSelectedPiece(null);
    setValidMoves([]);
  } else {
    setValidMoves([]);
    setSelectedPiece(null);
  }
};
