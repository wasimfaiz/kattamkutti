import { motion } from "framer-motion";

const GameCell = ({ value, onClick, isWinningCell, disabled }) => {
  return (
    <motion.button
      whileHover={!disabled && !value ? { scale: 1.05 } : {}}
      whileTap={!disabled && !value ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || !!value}
      className={`
        aspect-square w-full rounded-xl border-2 
        flex items-center justify-center text-5xl sm:text-6xl font-display font-bold
        transition-all duration-300 cursor-pointer
        ${isWinningCell 
          ? "border-neon-yellow bg-neon-yellow/20 animate-pulse" 
          : "border-border bg-card hover:bg-muted"
        }
        ${disabled ? "cursor-not-allowed opacity-70" : ""}
      `}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`
            ${value === "X" ? "text-primary text-glow-cyan" : "text-secondary text-glow-pink"}
          `}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default GameCell;
