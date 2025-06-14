import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Info, Shuffle, Trophy, Zap } from "lucide-react";
import { Difficulty, GameMode } from "../types";
import { GAME_MODES } from "../utils/constants";
import GameModeAndDifficulty from "./GameModeAndDifficulty";
import { useTranslations } from "next-intl";

type GameModeSelectionProps = {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: (mode: GameMode) => void;
  setShowLeaderboard: (show: boolean) => void;
  highScores: { name: string; score: number }[];
  mousePosition: { x: number; y: number };
};

export const GameModeSelection = ({
  difficulty,
  setDifficulty,
  startGame,
  setShowLeaderboard,
  highScores,
  mousePosition,
}: GameModeSelectionProps) => {
  const t = useTranslations("guessPlace");

  return (
    <motion.div
      key="game-mode-selection"
      className="backdrop-blur-xl p-10 rounded-2xl shadow-xl max-w-4xl mx-auto border border-border"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-primary">
        {t("modeSelection.title")}
      </h2>

      <GameModeAndDifficulty
        setDifficulty={setDifficulty}
        difficulty={difficulty}
        startGame={startGame}
      />

      {/* Leaderboard Button */}
      {highScores.length > 0 && (
        <Button
          onClick={() => setShowLeaderboard(true)}
          variant="outline"
          className="w-full mt-8 border-border text-text shadow-none cursor-pointer hover:scale-105 transition-transform"
        >
          <Trophy className="mr-2" size={18} />
          {t("modeSelection.leaderboardButton")}
        </Button>
      )}
    </motion.div>
  );
};
