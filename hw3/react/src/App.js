import { useState } from 'react';

const Square = ({ value, onSquareClick, className }) => {
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
};

const calculateWinner = (squares) => {
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

  // Array.find stops after the first True is returned and will return the row that evaluated to true
  const foundWinner = lines.find((row) => {
    const [a, b, c] = row;
    return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
  });

  return foundWinner ? foundWinner : null;
};

const Board = ({ xIsNext, squares, onPlay, move }) => {
  const handleClick = (i) => {
    const nextSquares = squares.slice(); // make copy of squares array

    if (squares[i] || calculateWinner(squares)) {
      return; // then ith square has already been set
    }

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;
  status = move === 9 && !winner ? 'Draw' : status;

  const boardDims = Array.from({ length: 3 });

  // build the board
  return (
    <>
      <div className="status">{status}</div>

      {boardDims.map((_, row) => {
        return (
          <div key={row} className="board-row">
            {boardDims.map((_, col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  className={
                    winner?.includes(index) ? 'square winning-square' : 'square'
                  }
                  onSquareClick={() => {
                    handleClick(index);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // track current move in history we are viewing
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // only store history for the preivous moves + new move
    setHistory(nextHistory); // turn 'append' nextSquares array to history array via spread syntax
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';

    if (move == currentMove) {
      return <p key={move}>{`You Are At Move ${move}`}</p>;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          move={currentMove}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
