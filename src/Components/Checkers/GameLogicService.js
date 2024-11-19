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

export const findJumps = (board, row, col, piece) => {
  const jumps = [];
  //use DFS to find all possible jumps with their paths
  const getJumps = (currentRow, currentCol, piece, path, visited) => {
    let jumpDirections = [];
    if (piece === "b") {
      jumpDirections = [
        [2, 2],
        [2, -2],
      ];
    } else if (piece === "r") {
      jumpDirections = [
        [-2, 2],
        [-2, -2],
      ];
    } else {
      jumpDirections = [
        [2, 2],
        [2, -2],
        [-2, 2],
        [-2, -2],
      ];
    }
    for (let i = 0; i < jumpDirections.length; i++) {
      const direction = jumpDirections[i];
      const nextRow = currentRow + direction[0];
      const nextCol = currentCol + direction[1];
      const jumpRow = currentRow + direction[0] / 2;
      const jumpCol = currentCol + direction[1] / 2;

      if (
        nextRow >= 0 &&
        nextRow < board.length &&
        nextCol >= 0 &&
        nextCol < board[0].length
      ) {
        if (
          !visited.has(`${nextRow},${nextCol}`) &&
          (board[nextRow]?.[nextCol] === "-" ||
            (nextRow === row &&
              nextCol === col &&
              path[path.length - 2]?.[0] !== row &&
              path[path.length - 2]?.[1] !== col)) && //check if can jump back, path.length > 2 to stop king from jumping back after one jump
          board[jumpRow]?.[jumpCol]?.toLowerCase() !== piece.toLowerCase() &&
          board[jumpRow]?.[jumpCol] !== "-"
        ) {
          const newVisited = new Set(visited); // Create a copy of visited
          newVisited.add(`${nextRow},${nextCol}`); // Add the new entry
          const newPath = [...path, [nextRow, nextCol]];
          jumps.push([nextRow, nextCol]);
          console.log("path", newPath);
          if (piece === "b" && nextRow === 7) {
            getJumps(nextRow, nextCol, "B", newPath, newVisited);
          } else if (piece === "r" && nextRow === 0) {
            getJumps(nextRow, nextCol, "R", newPath, newVisited);
          }
          getJumps(nextRow, nextCol, piece, newPath, newVisited);
        }
      }
    }
  };
  getJumps(row, col, piece, [[row, col]], new Set());
  console.log(jumps);
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
    if (
      row + direction[0] >= 0 &&
      row + direction[0] < board.length &&
      col + direction[1] >= 0 &&
      col + direction[1] < board[0].length &&
      board[row + direction[0]][col + direction[1]] === "-"
    ) {
      moves.push([row + direction[0], col + direction[1]]);
    }
  });
  const jumpMoves = findJumps(board, row, col, piece);
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
    selectedPiece &&
    validMoves.some((move) => move[0] === i && move[1] === j)
  ) {
    newBoard[i][j] = newBoard[selectedPiece.row][selectedPiece.col];
    newBoard[selectedPiece.row][selectedPiece.col] = "-";
    setBoard(newBoard);
    setTurn(turn === "r" ? "b" : "r");
    setSelectedPiece(null);
    setValidMoves([]);
  } else if (board[i][j]?.toLowerCase() === turn) {
    setSelectedPiece({ row: i, col: j });
    setValidMoves(getValidMoves(board, i, j));
    return;
  } else {
    setValidMoves([]);
    setSelectedPiece(null);
  }
};
