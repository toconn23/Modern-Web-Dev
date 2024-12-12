import React, { useEffect, useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import {
  handleSquareClick,
  initBoard,
  checkWin,
} from "./GameServices/GameLogicService";
import {
  updateGame,
  liveQuery,
  getGame,
} from "./GameServices/GameStateService";
import { updateLeaderboard } from "../../Services/Leaderboard";
import{getMove, createMove} from "../../Services/Move";

const Board = ({ id, minimized = false }) => {
  const [board, setBoard] = useState(initBoard());
  const [turn, setTurn] = useState("r");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [movePaths, setMovePaths] = useState([]);
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(Parse.User.current() ? "r" : "b");
  //check if the component is rendered for the first time to avoid updating the board to initial state
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [viewedMove, setViewedMove] = useState(0); // setting intial viewed move
  const [currMove, setCurrMove] = useState(0); // setting initial current move to start position
  const navigate = useNavigate();

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
      setMovePaths,
      setIsUpdated
    );
  };

  // run the liveQuery to update the board for both players
  useEffect(() => {
    if (minimized) {
      return;
    }
    liveQuery(setBoard, setTurn, setSelectedPiece, setValidMoves, setCurrMove, setViewedMove, id);
  }, [setBoard, setTurn, setSelectedPiece, setValidMoves, minimized, setCurrMove, setViewedMove, id]);

  useEffect(() => {
    // only retrive if first time loading page
    if (!loading) return;
    //retrieve the game from the database
    getGame(id).then((match) => {
      console.log(match);
      if (!match || match.length === 0) {
        alert("Match not found!");
        navigate(-1);
        return;
      }

      const blackPointer = match.get("black");
      const redPointer = match.get("red");
      Promise.all([blackPointer.fetch(), redPointer.fetch()])
        .then(([blackUser, redUser]) => {
          if (
            blackUser.get("username") === Parse.User.current()?.get("username")
          ) {
            setOpponent(redUser.get("username"));
            setPlayer("b");
          } else if (
            redUser.get("username") === Parse.User.current()?.get("username")
          ) {
            setOpponent(blackUser.get("username"));
            setPlayer("r");
          } else {
            alert("You are not a player in this match!");
            navigate(-1);
            return; // Prevent further execution
          }
          // Update state only if everything is successful
          setBoard(match.get("board"));
          setCurrMove(match.get("move"));
          setViewedMove(match.get("move"));
          setTurn(match.get("turn"));
          setWinner(match.get("winner"));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          alert(error.message);
          navigate(-1);
        });
    });
  }, [player, id, navigate, loading, winner, turn]);
  useEffect(() => {
    if (minimized) {
      return;
    }
    //check if game has just been won to update leaderboard
    let win = null;
    if (!winner && checkWin(board, turn)) {
      if (turn === "r") {
        setWinner("b");
        win = "b";
      } else {
        win = "r";
        setWinner("r");
      }
      //update leaderboard
      if (isUpdated) {
        if (win === player) {
          updateLeaderboard(opponent, Parse.User.current()?.get("username"));
        } else {
          updateLeaderboard(Parse.User.current()?.get("username"), opponent);
        }
      }
    }
    //only update game in databse if the board is updated
    if (isUpdated) {
      updateGame(id, board, turn, win, currMove + 1);
      createMove(id, currMove + 1, board);
      setIsUpdated(false);
    }
  }, [turn, winner, board, id, isUpdated, minimized, player, opponent, currMove]);

  if (loading) return null;

  // Render the Board, highlighting the selected piece and valid moves
  return (
    <>
      {winner === "r" && (
        <div
          className={`text-center  font-extrabold text-red-500 ${
            minimized ? "text-1xl" : "text-5xl"
          }`}
        >
          Red Wins!
        </div>
      )}
      {winner === "b" && (
        <div
          className={`text-center  font-extrabold text-black ${
            minimized ? "text-1xl" : "text-5xl"
          }`}
        >
          Black Wins!
        </div>
      )}
            {winner === "b" && (
        <div
          className={`text-center  font-extrabold text-black ${
            minimized ? "text-1xl" : "text-6xl"
          }`}
        >
          Black Wins!
        </div>
      )}
      {!minimized && (
        <div className="flex justify-center items-center space-x-8">
          <button
            onClick={async () => {
              //check if can go back
              if (viewedMove === 0) {
                return;
              } else if (viewedMove === 1) {//initial board is always the same
                setBoard(initBoard());
                setViewedMove(0);
                return;
              }
              setBoard(await getMove(id, viewedMove - 1));
              setViewedMove(viewedMove - 1);
            }}
            className="text-5xl font-extrabold"
          >
            &#8592; {/* Left arrow */}
          </button>
          <button
            onClick={async () => {
              //check if can go forward
              if (viewedMove === currMove) {
                return;
              }
              setBoard(await getMove(id, viewedMove + 1));
              setViewedMove(viewedMove + 1);
            }}
            className="text-5xl font-extrabold"
          >
            &#8594; {/* Right arrow */}
          </button>
        </div>
      )}
      {/* make grid of buttons for board. Add minimize option for dashboard preview to render*/}
      <div
        className={`flex justify-center items-center ${
          minimized ? "w-60" : "h-screen"
        }`}
      >
        <div
          className={`grid grid-cols-8 ${
            minimized
              ? "w-full"
              : "absolute top-[155px] w-10/12 sm:w-10/12 md:w-9/12 lg:w-5/12"
          } `}
        >
          {/* reverse the board if player is black */}
          {(player === "b"
            ? board.map((row) => [...row].reverse()).reverse()
            : board
          ).map((row, i) =>
            row.map((cell, j) => {
              //get the actual row and column of the game array based on the player color
              let actualI = player === "b" ? 7 - i : i;
              let actualJ = player === "b" ? 7 - j : j;
              return (
                <button
                  onClick={() => {
                    if (turn === player && viewedMove === currMove) {
                      handleClick(actualI, actualJ);
                    }
                  }}
                  key={`${i}-${j}`}
                  className={`aspect-square flex items-center justify-center  
                ${
                  (actualI + actualJ) % 2 === 0
                    ? "bg-[#b58863]"
                    : "bg-[#f0d9b5]"
                }
                ${
                  selectedPiece?.row === actualI &&
                  selectedPiece?.col === actualJ
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
                  {validMoves.some(
                    (move) => move[0] === actualI && move[1] === actualJ
                  ) && (
                    <div className="aspect-square w-4/12 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
export default Board;