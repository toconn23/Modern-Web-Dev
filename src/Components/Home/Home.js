import React from "react";
import Header from "../Common/Header.js";
import { Link } from "react-router-dom";

// Home Page
const HomePage = () => {
  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Checkerboard Background */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className={`${
              Math.floor(i / 8) % 2 === i % 2 ? "bg-gray-300" : "bg-gray-100"
            }`}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Welcome Section */}
        <section className="text-center py-10 bg-blue-100/90">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to the Checkers Page</h2>
          <p className="text-lg text-gray-600 mt-2">
            Explore our Checkers game and climb to the top of the leaderboard!
          </p>
          <div className="flex justify-center space-x-4 py-8">
          <Link to="/Dashboard">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
              Dashboard
            </button>
          </Link>
          <Link to="/Leaderboard">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
              Leaderboard
            </button>
          </Link>
        </div>
        </section>

        {/* Checkers Rules Section */}
        <section className="py-6 bg-white/90">
          <header className="text-center mb-4">
            <h1 className="text-3xl font-bold text-red-600">Checkers Rules</h1>
            <p className="text-lg text-gray-600 mt-2">
              Master the classic game of Checkers with these rules and gameplay tips!
            </p>
          </header>
        </section>

        {/* Objective Section */}
        <section className="max-w-4xl mx-auto py-6 px-4 text-gray-700 bg-white/90">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">History and Objective</h2>
          <p className="text-left">
            Historians believe that checkers was played in 3000 BC in Ur in Ancient Mesopotamia. Checkers is known as
            Draughts in England, and there are multiple variations of it around the world. The game is played on an 8x8
            chequered board, essentially a chessboard. Each player starts with 12 pieces placed on the dark squares of the
            board closest to them. The objective of the game is to capture all the opponent's pieces by jumping over.
          </p>
        </section>

        {/* How to Win Section */}
        <section className="max-w-4xl mx-auto py-6 px-4 text-gray-700 bg-white/90">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">How to Win</h2>
          <p className="text-left">The game can be won in 4 different ways:</p>
          <ul className="list-disc list-inside mt-2">
            <li>If a player loses all their pieces, they lose.</li>
            <li>If a player cannot make any further moves, they lose.</li>
            <li>
              The exact same board setup comes about three times without pieces captured, they draw.
            </li>
            <li>There have been 50 moves each side with no pieces captured, they draw.</li>
          </ul>
        </section>

        {/* Gameplay Section */}
        <section className="max-w-4xl mx-auto py-6 px-4 text-gray-700 bg-white/90">
          <h2 className="text-2xl font-semibold text-red-600 mb-4 text-center">Gameplay</h2>
          <p className="text-left">The pieces work as follows:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Pieces can move diagonally on the dark squares.</li>
            <li>
              Pieces can move forward and backward once they become Kings. A Piece can become a King by reaching the last
              row of the opposite side.
            </li>
            <li>
              Jumping
              <ul className="list-disc list-inside ml-6">
                <li>
                  Remove your opponent's piece from the board by jumping them if your piece is diagonal to your opponent's
                  and there is an empty dark space to hop to. Jump the checker by moving your piece straight over theirs and
                  landing on the empty dark space.
                </li>
              </ul>
            </li>
            <li>
              Double Jumping
              <ul className="list-disc list-inside ml-6">
                <li>
                  If the space you land on after jumping your opponent's checker puts you in position to jump another of
                  their checkers, you can make a “double jump” in one move. A double jump is when two jumps are made
                  consecutively within a single turn.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Dashboard Link */}
       
      </div>
    </div>
  );
};

export default HomePage;
