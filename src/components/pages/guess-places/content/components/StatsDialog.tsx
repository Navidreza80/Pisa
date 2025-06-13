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
}: StatsDialogProps) => (
  <Dialog open={showStats} onOpenChange={setShowStats}>
    <DialogContent className="bg-background  border border-background/50 rounded-xl max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-text text-right">
          :آمار بازی
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
          <Trophy className="text-primary mb-2" size={24} />
          <p className="text-sm text-text/70">
            امتیاز فعلی
          </p>
          <p className="text-xl font-bold">{score}</p>
        </div>
        <div className="bg-text-secondary/30  p-4 rounded-lg flex flex-col items-center">
          <Flame className="text-primary mb-2" size={24} />
          <p className="text-sm text-text/70">
            بیشترین امتیاز متوالی
          </p>
          <p className="text-xl font-bold">{maxStreak}</p>
        </div>
        <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
          <Medal className="text-primary mb-2" size={24} />
          <p className="text-sm text-text/70">سطح دشواری</p>
          <p className="text-xl font-bold">
            {difficulty === "easy"
              ? "آسان"
              : difficulty === "medium"
                ? "متوسط"
                : "سخت"}
          </p>
        </div>
        <div className="bg-text-secondary/30 p-4 rounded-lg flex flex-col items-center">
          <Zap className="text-primary mb-2" size={24} />
          <p className="text-sm text-text/70">حالت بازی</p>
          <p className="text-xl font-bold">
            {gameMode === GAME_MODES.NORMAL
              ? "عادی"
              : gameMode === GAME_MODES.TIME_ATTACK
                ? "زمان محدود"
                : "بی‌پایان"}
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
          مشاهده جدول امتیازات
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
