import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bot, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const PlayerSetup = ({ mode, onStart, onBack }) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1 = player1Name.trim() || "Player 1";
    const p2 = mode === "ai" ? "AI Bot" : (player2Name.trim() || "Player 2");
    onStart(p1, p2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary mb-4"
        >
          {mode === "ai" ? (
            <Bot className="w-10 h-10 text-primary" />
          ) : (
            <Users className="w-10 h-10 text-secondary" />
          )}
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
          {mode === "ai" ? "Play vs AI" : "Play with Friend"}
        </h2>
        <p className="text-muted-foreground">Enter player names to begin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-2 text-sm font-medium text-primary">
            <User className="w-4 h-4" />
            Player 1 (X)
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className="h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            maxLength={20}
          />
        </motion.div>

        {mode === "friend" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="flex items-center gap-2 text-sm font-medium text-secondary">
              <User className="w-4 h-4" />
              Player 2 (O)
            </label>
            <Input
              type="text"
              placeholder="Enter friend's name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary"
              maxLength={20}
            />
          </motion.div>
        )}

        {mode === "ai" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/30"
          >
            <Bot className="w-8 h-8 text-secondary" />
            <div>
              <p className="font-medium text-secondary">AI Bot</p>
              <p className="text-sm text-muted-foreground">Your opponent</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 pt-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold"
          >
            Start Game
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PlayerSetup;
