import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart4, Flame, Medal, Trophy, Zap } from "lucide-react";
import { Difficulty, GameMode } from "../types";
import { GAME_MODES } from "../utils/constants";
import { useTranslations } from 'next-intl';

type StatsDialogProps = {
  showStats: boolean;
  setShowStats: (show: boolean) => void;
  score: number;
  maxStreak: number;
  difficulty: Difficulty;
  gameMode: GameMode | "";
  setShowLeaderboard: (show: boolean) => void;
};

export const StatsDialog = ({
  showStats,
  setShowStats,
  score,
  maxStreak,
  difficulty,
  gameMode,
  setShowLeaderboard,
}: StatsDialogProps) => {
  const t = useTranslations('guessPlace');

  const getDifficultyLabel = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return t('difficulty.easy');
      case "medium":
        return t('difficulty.medium');
      case "hard":
        return t('difficulty.hard');
      default:
        return "";
    }
  };

  const getGameModeLabel = (gameMode: GameMode | "") => {
    switch (gameMode) {
      case GAME_MODES.NORMAL:
        return t('modes.normal.title');
      case GAME_MODES.TIME_ATTACK:
        return t('modes.timeAttack.title');
      case GAME_MODES.ENDLESS:
        return t('modes.endless.title');
      default:
        return "";
    }
  };

  return (
    <Dialog open={showStats} onOpenChange={setShowStats}>
      <DialogContent className="bg-background border border-background/50 rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text text-right">
            {t('stats.title')}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
            <Trophy className="text-primary mb-2" size={24} />
            <p className="text-sm text-text/70">
              {t('stats.currentScore')}
            </p>
            <p className="text-xl font-bold">{score}</p>
          </div>
          <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
            <Flame className="text-primary mb-2" size={24} />
            <p className="text-sm text-text/70">
              {t('stats.maxStreak')}
            </p>
            <p className="text-xl font-bold">{maxStreak}</p>
          </div>
          <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
            <Medal className="text-primary mb-2" size={24} />
            <p className="text-sm text-text/70">{t('stats.difficulty')}</p>
            <p className="text-xl font-bold">
              {getDifficultyLabel(difficulty)}
            </p>
          </div>
          <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
            <Zap className="text-primary mb-2" size={24} />
            <p className="text-sm text-text/70">{t('stats.gameMode')}</p>
            <p className="text-xl font-bold">
              {getGameModeLabel(gameMode)}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => setShowLeaderboard(true)}
            variant="outline"
            className="w-full border border-border text-text cursor-pointer"
          >
            <Trophy className="text-text mx-1" size={16} />
            {t('stats.viewLeaderboard')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};