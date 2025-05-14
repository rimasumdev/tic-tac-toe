import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-16 w-12 btn btn-primary border border-gray-300 rounded px-8 py-4 font-bold text-xl cursor-pointer hover:bg-gray-100"
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [players, setPlayers] = useState({});
  function handleAddPlayer(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const player1 = formData.get("player1"); // Remove .value since it's the input name
    const player2 = formData.get("player2"); // Remove .value since it's the input name
    setPlayers({ player1, player2 });
    e.target.reset();
    // Move console.log after state update to see new values
    console.log("Updated players:", { player1, player2 });
  }

  // handle click function
  function handleClick(index) {
    // console.log(index);
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  // console.log(squares);
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleAddPlayer}
        className="w-full max-w-xl flex gap-4 mb-4 justify-between"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            placeholder="Enter player name"
            name="player1"
            id="player1" // Added id attribute
            className="input border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            placeholder="Enter player name"
            name="player2"
            id="player2" // Added id attribute
            className="input border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary border border-gray-300 rounded px-4 py-1 font-bold self-end cursor-pointer hover:bg-gray-100"
        >
          Add Player
        </button>
      </form>
      {players.player1 && players.player2 && (
        <div className="w-full max-w-xl flex items-center justify-between gap-4 border border-gray-300 rounded p-4">
          <div>
            <div className="flex flex-col gap-4 mb-4">
              <p> Player 1: {players.player1}</p>
              <p> Player 2: {players.player2}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">Tic Tac Toe</h1>
            <p>
              {calculateWinner(squares)
                ? `Winner: ${
                    players[
                      calculateWinner(squares) === "X" ? "player1" : "player2"
                    ]
                  }`
                : `Next player: ${xIsNext ? players.player1 : players.player2}`}
            </p>
            <div className="max-w-sm mx-auto grid grid-cols-3 place-items-center gap-4 p-4">
              {squares.map((square, index) => (
                <Square
                  key={index}
                  value={square}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(a, b, c);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
