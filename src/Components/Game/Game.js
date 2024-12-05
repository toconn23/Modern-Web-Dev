import React from "react";
import Board from "./Board";
import Header from "../Common/Header";
import { useParams } from "react-router-dom";
const Game = () => {
  const params = useParams();
  return (
    <div className="bg-gray-400">
      <Header />
      <Board id={params.id} />
    </div>
  );
};

export default Game;
