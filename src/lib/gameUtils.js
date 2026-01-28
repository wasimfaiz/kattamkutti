export const emptyBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const checkWinner = (board) => {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const val = board[a[0]][a[1]];
    if (val && val === board[b[0]][b[1]] && val === board[c[0]][c[1]]) {
      return val;
    }
  }

  if (board.flat().every((cell) => cell !== "")) return "draw";
  return null;
};

export const getWinningLine = (board) => {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const val = board[a[0]][a[1]];
    if (val && val === board[b[0]][b[1]] && val === board[c[0]][c[1]]) {
      return line;
    }
  }
  return null;
};

// AI Backend URL
export const API_URL = "https://tic-tac-toe-game-backend-g45w.onrender.com";
