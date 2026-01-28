import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModeSelection from "../components/game/ModeSelection";
import PlayerSetup from "../components/game/PlayerSetup";
import GameView from "../components/game/GameView";

const Index = () => {
  const [gameState, setGameState] = useState("menu");
  const [gameMode, setGameMode] = useState(null);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setGameState("setup");
  };

  const handleStartGame = (p1, p2) => {
    setPlayer1Name(p1);
    setPlayer2Name(p2);
    setGameState("playing");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
    setGameMode(null);
    setPlayer1Name("");
    setPlayer2Name("");
  };

  const handleBackToSetup = () => {
    setGameState("menu");
    setGameMode(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <AnimatePresence mode="wait">
        {gameState === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10"
          >
            <ModeSelection onSelect={handleModeSelect} />
          </motion.div>
        )}

        {gameState === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10"
          >
            <PlayerSetup 
              mode={gameMode} 
              onStart={handleStartGame} 
              onBack={handleBackToSetup}
            />
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10"
          >
            <GameView
              mode={gameMode}
              player1Name={player1Name}
              player2Name={player2Name}
              onBackToMenu={handleBackToMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
