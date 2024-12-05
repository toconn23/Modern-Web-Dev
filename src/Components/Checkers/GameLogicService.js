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
  let paths = [];
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
              !(
                path[path.length - 2]?.[0] === row &&
                path[path.length - 2]?.[1] === col
              ))) && //check if can jump back, path.length > 2 to stop king from jumping back after one jump
          board[jumpRow]?.[jumpCol]?.toLowerCase() !== piece.toLowerCase() &&
          board[jumpRow]?.[jumpCol] !== "-"
        ) {
          const newVisited = new Set(visited); // Create a copy of visited
          newVisited.add(`${nextRow},${nextCol}`); // Add the new entry
          const newPath = [...path, [nextRow, nextCol]];
          jumps.push([nextRow, nextCol]);
          paths.push(newPath);
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
  return paths;
};

export const getValidMoves = (board, row, col) => {
  const piece = board[row][col];
  const moves = [];
  let directions = [];
  if (piece === "b") {
    directions = [
      [1, 1],
      [1, -1],
    ];
  } else if (piece === "r") {
    directions = [
      [-1, 1],
      [-1, -1],
    ];
  } else {
    directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
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
      let path = [];
      path.push([row, col]);
      path.push([row + direction[0], col + direction[1]]);
      moves.push(path);
    }
  });
  const jumpPaths = findJumps(board, row, col, piece);
  moves.push(...jumpPaths);
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
  setTurn,
  movePaths,
  setMovePaths
) => {
  const newBoard = [...board];
  if (
    selectedPiece &&
    validMoves.some((move) => move[0] === i && move[1] === j)
  ) {
    //find the path(s) that ends at the selected square
    const paths = movePaths.filter(
      (path) => path[path.length - 1][0] === i && path[path.length - 1][1] === j
    );
    //find the longest path if multiple possible paths to same square
    const path = paths.reduce((longest, curren) => {
      return curren.length > longest.length ? curren : longest;
    }, []);
    let isKinged = false;
    for (let i = 1; i < path.length; i++) {
      //check if piece is kinged along the way
      if (
        (path[i][0] === 0 && turn === "r") ||
        (path[i][0] === 7 && turn === "b")
      ) {
        isKinged = true;
      }
      let distance = Math.abs(path[i][0] - path[i - 1][0]);
      if (distance === 2) {
        let jumpRow = (path[i][0] + path[i - 1][0]) / 2;
        let jumpCol = (path[i][1] + path[i - 1][1]) / 2;
        newBoard[jumpRow][jumpCol] = "-";
      }
    }

    if (isKinged) {
      newBoard[path[path.length - 1][0]][path[path.length - 1][1]] =
        turn.toUpperCase();
    } else {
      newBoard[i][j] = newBoard[selectedPiece.row][selectedPiece.col];
    }
    //check if end up in same spot, if not set the original spot to empty
    if (selectedPiece.row !== i || selectedPiece.col !== j) {
      newBoard[selectedPiece.row][selectedPiece.col] = "-";
    }
    setBoard(newBoard);
    setTurn(turn === "r" ? "b" : "r");
    setSelectedPiece(null);
    setValidMoves([]);
    setMovePaths([]);
  } else if (board[i][j]?.toLowerCase() === turn) {
    setSelectedPiece({ row: i, col: j });
    let moves = getValidMoves(board, i, j);
    setMovePaths(moves);
    setValidMoves(moves.map((path) => path[path.length - 1]));
    return;
  } else {
    setValidMoves([]);
    setMovePaths([]);
    setSelectedPiece(null);
  }
};

export const checkWin = (board, turn) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      //check if there are any valid moves for the current player
      if (
        board[i][j]?.toLowerCase() === turn &&
        getValidMoves(board, i, j).length > 0
      ) {
        return false;
      }
    }
  }
  return true;
};
