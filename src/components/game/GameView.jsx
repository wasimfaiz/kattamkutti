import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "../ui/button";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import Confetti from "./Confetti";
import { 
  emptyBoard, 
  checkWinner, 
  getWinningLine,
  API_URL 
} from "../../lib/gameUtils";

const GameView = ({ mode, player1Name, player2Name, onBackToMenu }) => {
  const [board, setBoard] = useState(emptyBoard.map(row => [...row]));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const makeAIMove = useCallback(async (currentBoard) => {
    setIsThinking(true);
    
    try {
      const res = await fetch(`${API_URL}/api/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: currentBoard }),
      });

      const data = await res.json();
      setBoard(data.board);

      if (data.winner) {
        setWinner(data.winner);
        setWinningLine(getWinningLine(data.board));
        if (data.winner !== "draw") {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        setCurrentPlayer("X");
      }
    } catch (err) {
      console.error("AI move failed:", err);
      setCurrentPlayer("X");
    } finally {
      setIsThinking(false);
    }
  }, []);

  const handleCellClick = useCallback((row, col) => {
    if (board[row][col] || winner || isThinking) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    
    if (result) {
      setWinner(result);
      setWinningLine(getWinningLine(newBoard));
      if (result !== "draw") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      return;
    }

    if (mode === "ai") {
      setCurrentPlayer("O");
      setTimeout(() => makeAIMove(newBoard), 500);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }, [board, currentPlayer, winner, isThinking, mode, makeAIMove]);

  const resetGame = () => {
    setBoard(emptyBoard.map(row => [...row]));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
    setIsThinking(false);
    setShowConfetti(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-sm flex flex-col items-center"
    >
      <Confetti isActive={showConfetti} />

      <GameStatus
        currentPlayer={currentPlayer}
        player1Name={player1Name}
        player2Name={player2Name}
        winner={winner}
        isThinking={isThinking}
      />

      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={!!winner || isThinking}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 mt-6 w-full"
      >
        <Button
          variant="outline"
          onClick={onBackToMenu}
          className="flex-1 h-12 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Home className="w-5 h-5 mr-2" />
          Menu
        </Button>
        <Button
          onClick={resetGame}
          className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Restart
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default GameView;
