import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart4,
  Clock,
  Flame,
  Info,
  Shuffle,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { Difficulty, GameMode } from "../types";
import { GAME_MODES } from "../utils/constants";
import GameModeAndDifficulty from "./GameModeAndDifficulty";
import { useTranslations } from 'next-intl';

type GameOverScreenProps = {
  score: number;
  maxStreak: number;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: (mode: GameMode) => void;
  setShowLeaderboard: (show: boolean) => void;
  setShowStats: (show: boolean) => void;
  mousePosition: { x: number; y: number };
};

export const GameOverScreen = ({
  score,
  maxStreak,
  difficulty,
  setDifficulty,
  startGame,
  setShowLeaderboard,
  setShowStats,
  mousePosition,
}: GameOverScreenProps) => {
  const t = useTranslations('guessPlace');

  return (
    <motion.div
      key="game-over"
      className="w-full max-w-[620px] backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden p-8 text-center z-10 border border-white/50 dark:border-gray-800/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <motion.div
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Trophy className="text-yellow-400 w-24 h-24 mx-auto mb-6" />
      </motion.div>

      <motion.h2
        className="text-4xl font-extrabold mb-8 text-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('gameOver.title')}
      </motion.h2>

      <div className="rtl mb-8 flex justify-between">
        <div className="flex justify-between gap-2 w-[46%] border border-border px-2 rounded-[6px] p-1">
          <span className="text-lg font-medium text-text-secondary my-auto">
            {t('gameOver.finalScore')}
          </span>
          <span className="text-3xl text-primary font-bold my-auto mx-2">
            {score}
          </span>
        </div>

        <div className="flex justify-between gap-2 w-[50%] border border-border px-2 rounded-[6px] p-1">
          <span className="text-lg font-medium text-text-secondary my-auto">
            {t('gameOver.maxStreak')}
          </span>
          <span className="text-3xl text-primary font-bold my-auto mx-1">
            {maxStreak}
          </span>
        </div>
      </div>

      <GameModeAndDifficulty
        setDifficulty={setDifficulty}
        difficulty={difficulty}
        startGame={startGame}
      />

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={() => setShowLeaderboard(true)}
          variant="outline"
          className="border-border shadow-none text-text cursor-pointer w-[48%] flex gap-2 items-center hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all"
        >
          <Trophy className="text-text w-5 h-5" />
          <span>{t('gameOver.leaderboardButton')}</span>
        </Button>
        <Button
          onClick={() => setShowStats(true)}
          variant="outline"
          className="border-border shadow-none text-text cursor-pointer w-[48%] flex gap-2 items-center hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all"
        >
          <BarChart4 className="text-text w-5 h-5" />
          <span>{t('gameOver.statsButton')}</span>
        </Button>
      </div>
    </motion.div>
  );
};