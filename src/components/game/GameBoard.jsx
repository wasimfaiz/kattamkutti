import { motion } from "framer-motion";
import GameCell from "./GameCell";

const GameBoard = ({ board, onCellClick, winningLine, disabled }) => {
  const isWinningCell = (row, col) => {
    if (!winningLine) return false;
    return winningLine.some(([r, c]) => r === row && c === col);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="grid grid-cols-3 gap-3 w-full max-w-sm p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <GameCell
            key={`${i}-${j}`}
            value={cell}
            onClick={() => onCellClick(i, j)}
            isWinningCell={isWinningCell(i, j)}
            disabled={disabled}
          />
        ))
      )}
    </motion.div>
  );
};

export default GameBoard;
