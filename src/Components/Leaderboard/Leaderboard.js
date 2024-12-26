import React, { useEffect, useState } from "react";
import Header from "../Common/Header.js";
import {fetchLeaderboardData} from "../../Services/Leaderboard.js"

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);

    // Fetch data from the Leaderboard table
    useEffect(() => {
        fetchLeaderboardData(setPlayers);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <Header />
            <h1 className="text-4xl font-bold text-center text-blue-600 my-6">Leaderboard</h1>
            <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Player</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Wins</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Losses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length > 0 ? (
                            players.map((player, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                >
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {player.username}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {player.wins}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {player.losses}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
