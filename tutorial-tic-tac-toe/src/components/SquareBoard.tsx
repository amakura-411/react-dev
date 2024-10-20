import React from "react";
import { useState } from "react";
import "./SquareBoard.css";

const Board = ({ rows }: { rows: number }) => {
  const [isxNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(rows * rows).fill(null));

  const winner = calculateWinner(squares, rows);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isxNext ? "X" : "O");
  }

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    //isXNext is true, then X is next
    // 値がnullであるかどうかを確認する
    if (newSquares[i]|| winner) {
      console.log("Square is already filled");
      return;
    }
    newSquares[i] = isxNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isxNext);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {Array.from({ length: rows }, (_, i) => (
          <div className="board-row" key={i}>
            {Array.from({ length: rows }, (_, j) => (
              <Square
                key={rows * i + j}
                value={squares[rows * i + j] || ""}
                onSquareClick={() => handleClick(rows * i + j)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const Square = ({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Board;

// 勝敗の判定
const calculateWinner = (squares: string[], num: number) => {
  // 累積和で勝敗を判定する(x = -1. o = 1として、累積和がnumか-numかで勝敗を判定する)

  // 横の判定
  for (let i = 0; i < num; i++) {
    let sum = 0;
    for (let j = 0; j < num; j++) {
      sum +=
        squares[i * num + j] === "X"
          ? -1
          : squares[i * num + j] === "O"
          ? 1
          : 0;
    }
    if (sum === num) {
      return "O";
    } else if (sum === -num) {
      return "X";
    }
  }

  // 縦の判定
  for (let i = 0; i < num; i++) {
    let sum = 0;
    for (let j = 0; j < num; j++) {
      sum +=
        squares[j * num + i] === "X"
          ? -1
          : squares[j * num + i] === "O"
          ? 1
          : 0;
    }
    if (sum === num) {
      return "O";
    } else if (sum === -num) {
      return "X";
    }
  }

  // 斜めの判定
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < num; i++) {
    sum1 +=
      squares[i * num + i] === "X" ? -1 : squares[i * num + i] === "O" ? 1 : 0;
    sum2 +=
      squares[i * num + (num - 1 - i)] === "X"
        ? -1
        : squares[i * num + (num - 1 - i)] === "O"
        ? 1
        : 0;
  }
  if (sum1 === num || sum2 === num) {
    return "O";
  } else if (sum1 === -num || sum2 === -num) {
    return "X";
  }

  return null;
};
