import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Handshake, Loader2 } from "lucide-react";

const GameStatus = ({ currentPlayer, player1Name, player2Name, winner, isThinking }) => {
  const getCurrentPlayerName = () => {
    return currentPlayer === "X" ? player1Name : player2Name;
  };

  const getWinnerName = () => {
    if (winner === "X") return player1Name;
    if (winner === "O") return player2Name;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-6"
    >
      {/* Player indicators */}
      <div className="flex justify-center items-center gap-8 mb-4">
        <div className={`flex flex-col items-center transition-all ${currentPlayer === "X" && !winner ? "scale-110" : "opacity-50"}`}>
          <span className="text-3xl font-display font-bold text-primary text-glow-cyan">X</span>
          <span className="text-sm text-muted-foreground">{player1Name}</span>
        </div>
        <span className="text-muted-foreground font-display">VS</span>
        <div className={`flex flex-col items-center transition-all ${currentPlayer === "O" && !winner ? "scale-110" : "opacity-50"}`}>
          <span className="text-3xl font-display font-bold text-secondary text-glow-pink">O</span>
          <span className="text-sm text-muted-foreground">{player2Name}</span>
        </div>
      </div>

      {/* Status message */}
      <AnimatePresence mode="wait">
        {winner ? (
          <motion.div
            key="winner"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            {winner === "draw" ? (
              <>
                <Handshake className="w-10 h-10 text-neon-yellow" />
                <span className="font-display text-2xl font-bold text-neon-yellow">
                  It's a Draw! 🤝
                </span>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Trophy className="w-10 h-10 text-neon-yellow" />
                </motion.div>
                <span className="font-display text-2xl font-bold text-neon-yellow">
                  {getWinnerName()} Wins! 🎉
                </span>
              </>
            )}
          </motion.div>
        ) : isThinking ? (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 text-secondary"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">AI is thinking...</span>
          </motion.div>
        ) : (
          <motion.div
            key="turn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={currentPlayer === "X" ? "text-primary" : "text-secondary"}
          >
            <span className="font-medium">
              {getCurrentPlayerName()}'s turn ({currentPlayer})
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameStatus;
