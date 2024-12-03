import React from "react";
import Board from "./Board";
import { useParams } from "react-router-dom";
const Game = () => {
  const params = useParams();
  return <Board id={params.id} />;
};

export default Game;
