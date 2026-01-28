import { motion } from "framer-motion";
import { Bot, Users, Sparkles } from "lucide-react";

const ModeSelection = ({ onSelect }) => {
  const modes = [
    {
      id: "ai",
      title: "Play vs AI",
      description: "Challenge the computer",
      icon: Bot,
      gradient: "from-primary/20 to-primary/5",
      border: "border-primary/50 hover:border-primary",
      iconColor: "text-primary",
    },
    {
      id: "friend",
      title: "Play with Friend",
      description: "Two player mode",
      icon: Users,
      gradient: "from-secondary/20 to-secondary/5",
      border: "border-secondary/50 hover:border-secondary",
      iconColor: "text-secondary",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-lg"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-4"
        >
          <Sparkles className="w-12 h-12 text-neon-yellow" />
        </motion.div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 text-glow-cyan">
          TIC TAC TOE
        </h1>
        <p className="text-muted-foreground text-lg">Choose your game mode</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(mode.id)}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-300
              bg-gradient-to-br ${mode.gradient} ${mode.border}
              text-left group
            `}
          >
            <mode.icon className={`w-12 h-12 ${mode.iconColor} mb-4 group-hover:scale-110 transition-transform`} />
            <h3 className="font-display text-xl font-bold mb-1">{mode.title}</h3>
            <p className="text-muted-foreground text-sm">{mode.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ModeSelection;
