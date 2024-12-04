import React, { useEffect, useState } from "react";
import { handleSquareClick, initBoard, checkWin } from "./GameLogicService";
import { updateGame, liveQuery, getGame } from "./GameStateService";

const Board = ({ id }) => {
  const [board, setBoard] = useState(initBoard());
  const [turn, setTurn] = useState("r");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [movePaths, setMovePaths] = useState([]);
  const [winner, setWinner] = useState(null);
  //const [player, setPlayer] = useState();
  //check if the component is rendered for the first time to avoid updating the board to initial state
  const [isInitialRender, setIsInitialRender] = useState(true);
  //avoid render of initial board
  const [loading, setLoading] = useState(true);

  const handleClick = (i, j) => {
    handleSquareClick(
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
    );
  };
  // run the liveQuery to update the board for both players
  liveQuery(setBoard, setTurn, setSelectedPiece, setValidMoves);
  useEffect(() => {
    getGame(id).then((match) => {
      setBoard(match.get("board"));
      setTurn(match.get("turn"));
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (isInitialRender || loading) {
      setIsInitialRender(false);
      return;
    } else {
      if (checkWin(board, turn)) {
        if (turn === "r") setWinner("b");
        else setWinner("r");
      }
      updateGame(id, board, turn);
    }
  }, [turn]);

  if (loading) return null;

  // Render the Board, highlighting the selected piece and valid moves
  return (
    <>
      {winner === "r" && (
        <div className="text-center text-6xl font-extrabold text-red-500">
          Red Wins!
        </div>
      )}
      {winner === "b" && (
        <div className="text-center text-6xl font-extrabold text-black">
          Black Wins!
        </div>
      )}
      {/* make grid of buttons for board */}
      <div className="flex justify-center items-center h-screen ">
        <div className="grid grid-cols-8 w-5/12">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                onClick={() => handleClick(i, j)}
                key={`${i}-${j}`}
                className={`aspect-square flex items-center justify-center  
                ${(i + j) % 2 === 0 ? "bg-[#b58863]" : "bg-[#f0d9b5]"}
                ${
                  selectedPiece?.row === i && selectedPiece?.col === j
                    ? "border-4 border-yellow-500"
                    : ""
                }  // Highlight selected square}`}
              >
                {cell === "b" && (
                  <div className="aspect-square w-8/12  bg-black rounded-full"></div>
                )}
                {cell === "r" && (
                  <div className="aspect-square w-8/12 bg-red-500 rounded-full"></div>
                )}
                {cell === "R" && (
                  <div className="aspect-square w-8/12 bg-red-500 rounded-full flex items-center justify-center">
                    <img
                      src="/images/king.png"
                      alt="king"
                      className="w-3/4 object-contain"
                    />
                  </div>
                )}
                {cell === "B" && (
                  <div className="aspect-square w-8/12 bg-black rounded-full flex items-center justify-center">
                    <img
                      src="/images/king.png"
                      alt="king"
                      className="w-3/4 object-contain"
                    />
                  </div>
                )}
                {validMoves.some((move) => move[0] === i && move[1] === j) && (
                  <div className="aspect-square w-4/12 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default Board;
